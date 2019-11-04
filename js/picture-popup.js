'use strict';

(function () {
  var MIN_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var btnCommentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  window.addEventToGalleryItem = function () {
    var galleryItems = document.querySelectorAll('a.picture');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', fillImgPopupHandler);
    });
  };

  function fillImgPopupHandler(evt) {
    for (var m = 0; m < evt.path.length; m++) {
      if (evt.path[m].classList && evt.path[m].classList.contains('picture')) {
        var clickedElement = evt.path[m];

        openBigPictureOverlay(window.filtersArray[clickedElement.dataset.objIndex]);
        window.popup.open(bigPicture);

        break;
      }
    }
  }

  // создание полноэкранного показа изображения
  function openBigPictureOverlay(obj) {
    var bigPictureImages = bigPicture.querySelector('.big-picture__img img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var allCommentsCount = bigPicture.querySelector('.comments-count');
    var caption = bigPicture.querySelector('.social__caption');

    bigPictureImages.setAttribute('src', obj.url);
    likesCount.textContent = obj.likes;
    caption.textContent = obj.description;
    allCommentsCount.textContent = obj.comments.length;

    obj.comments.forEach(function (comment) {
      fragment.appendChild(createCommentItem(comment));
    });

    deleteDefaultComments(commentsList);
    commentsList.appendChild(fragment);

    var allComments = bigPicture.querySelectorAll('.social__comment');

    if (allComments.length <= MIN_COMMENTS) {
      btnCommentsLoader.style.display = 'none';
    } else {
      btnCommentsLoader.style.display = 'block';
    }

    for (var j = MIN_COMMENTS; j < allComments.length; j++) {
      allComments[j].classList.add('visually-hidden');
    }

    getCommentsCount();
  }

  // Создает li пользователей написавших комментарий
  function createCommentItem(comment) {
    var commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    return commentItem;
  }

  // Удаляет дефолтные комментарии
  function deleteDefaultComments(listOfComments) {
    listOfComments.innerHTML = '';
  }

  // Изменяет значение количества комментариев
  function getCommentsCount() {
    var commentsCount = document.querySelector('.social__comment-count');
    var allComments = bigPicture.querySelectorAll('.social__comment');
    var commentsHidden = bigPicture.querySelectorAll('.social__comment.visually-hidden');

    if (allComments.length <= MIN_COMMENTS) {
      commentsCount.firstChild.nodeValue = allComments.length + ' из ';
    } else {
      commentsCount.firstChild.nodeValue = allComments.length - commentsHidden.length + ' из ';
    }
  }

  // Загрузка скрытых комментариев
  function loadComments() {
    var commentsHidden = bigPicture.querySelectorAll('.social__comment.visually-hidden');

    for (var i = 0; i < commentsHidden.length; i++) {
      if (i < MIN_COMMENTS) {
        commentsHidden[i].classList.remove('visually-hidden');
      }

      if (commentsHidden.length <= MIN_COMMENTS) {
        btnCommentsLoader.style.display = 'none';
      }

      if (i === commentsHidden.length) {
        break;
      }
    }
  }

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.popup.close(bigPicture);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC) {
      evt.preventDefault();
      window.popup.close(bigPicture);
    }
  });

  // Загрузить еще
  btnCommentsLoader.addEventListener('click', function () {
    loadComments();
    getCommentsCount();
  });
})();
