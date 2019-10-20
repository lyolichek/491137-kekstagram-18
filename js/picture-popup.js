'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');  // commentsList
  var commentTemplate = document.querySelector('.social__comment');   // commentTemplate
  var fragment = document.createDocumentFragment();

  window.addEventToGalleryItem = function () {
    var galleryItems = document.querySelectorAll('a.picture');

    for (var l = 0; l < galleryItems.length; l++) {
      galleryItems[l].addEventListener('click', fillImgPopup);
    }
  };

  function fillImgPopup(evt) {
    for (var m = 0; m < evt.path.length; m++) {
      if (evt.path[m].classList && evt.path[m].classList.contains('picture')) {
        var clickedElement = evt.path[m];

        openBigPictureOverlay(window.templateArray[clickedElement.dataset.objIndex]);
        window.popup.open(bigPicture);

        break;
      }
    }
  }

  // создание полноэкранного показа изображения
  function openBigPictureOverlay(obj) {
    var bigPictureImages = bigPicture.querySelector('.big-picture__img img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var caption = bigPicture.querySelector('.social__caption');

    bigPictureImages.setAttribute('src', obj.url);
    likesCount.textContent = obj.likes;
    caption.textContent = obj.description;
    commentsCount.textContent = obj.comments.length;

    for (var i = 0; i < obj.comments.length; i++) {
      fragment.appendChild(createCommentItem(obj.comments[i]));
    }

    deleteDefaultComments(commentsList);
    commentsList.appendChild(fragment);

    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
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

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.popup.close(bigPicture);
  });

  document.addEventListener('keydown', function (evt) {
    //evt.preventDefault();
    if (evt.keyCode === 27) {
      window.popup.close(bigPicture);
    }
  });
})();
