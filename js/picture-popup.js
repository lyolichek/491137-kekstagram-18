'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureComment = document.querySelector('.social__comment');
  var galleryItems = document.querySelectorAll('a.picture');
  var names = ['Лёля', 'Слава', 'Аня', 'Ваня', 'Елена', 'Вова'];

  function addEventToGalleryItem(itemsArray) {
    for (var l = 0; l < itemsArray.length; l++) {
      itemsArray[l].addEventListener('click', fillImgPopup);
    }
  }

  function fillImgPopup(evt) {
    for (var m = 0; m < evt.path.length; m++) {
      if (evt.path[m].classList && evt.path[m].classList.contains('picture')) {
        var clickedElement = evt.path[m];
        openBigPictureOverlay(templateArray[clickedElement.dataset.objIndex]);
        window.popup.openPopup(bigPicture);

        break;
      }
    }
  }

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.popup.closePopup(bigPicture);
  });

  // создание полноэкранного показа изображения
  function openBigPictureOverlay(obj) {
    var bigPictureImages = bigPicture.querySelector('.big-picture__img img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');

    bigPictureImages.setAttribute('src', obj.src);
    likesCount.textContent = obj.likes;
    commentsCount.textContent = obj.comments.length;

    for (var i = 0; i < obj.comments.length; i++) {
      fragment.appendChild(createCommentItem(obj.comments[i], names));
    }

    deleteDefaultComments(bigPictureComments);
    bigPictureComments.appendChild(fragment);

    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  // Создает li пользователей написавших комментарий
  function createCommentItem(comment, arrNames) {
    var commentItem = bigPictureComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = 'img/avatar-' + window.utils.randomInteger(1, 6) + '.svg';
    commentItem.querySelector('.social__picture').alt = arrNames[window.utils.randomInteger(0, 5)];
    commentItem.querySelector('.social__text').textContent = comment;

    return commentItem;
  }

  // Удаляет дефолтные комментарии
  function deleteDefaultComments(listOfComments) {
    listOfComments.innerHTML = '';
  }

  addEventToGalleryItem(galleryItems);
})();
