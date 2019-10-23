'use strict';

(function () {

  window.pictures = document.querySelector('.pictures');
  window.fragment = document.createDocumentFragment();
  window.templateArray = [];

  var template = document.querySelector('#picture').content.querySelector('.picture');

  var onLoad = function (data) {
    window.templateArray = data;
    createElements(data);
    window.pictures.appendChild(window.fragment); // наполняем контейнер pictures элементами
    window.addEventToGalleryItem();
  };

  // создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
  function createElements(arrayElements) {
    for (var i = 0; i < arrayElements.length; i++) {
      window.fragment.appendChild(window.createFragment(arrayElements[i], i));
    }
  }

  // формируем фрагменты
  window.createFragment = function (obj, index) {
    // клон элемента – со всеми атрибутами и дочерними элементами
    var cloneElement = template.cloneNode(true);
    var image = cloneElement.querySelector('.picture__img');
    var imageComments = cloneElement.querySelector('.picture__comments');
    var imageLikes = cloneElement.querySelector('.picture__likes');

    image.src = obj.url;
    imageComments.textContent = obj.comments.length;
    imageLikes.textContent = obj.likes;
    cloneElement.dataset.objIndex = index;

    return cloneElement;
  }

  window.backend.load(window.utils.serverLink + '/data', onLoad);
})();

