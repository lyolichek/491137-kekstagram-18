'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var onLoad = function (data) {
    createElements(data);
    pictures.appendChild(fragment); // наполняем контейнер pictures элементами
    console.log(data)
  };

  // создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
  function createElements(arrayElements) {
    for (var i = 0; i < arrayElements.length; i++) {
      fragment.appendChild(createFragment(arrayElements[i], i));
    }
  }

  // формируем фрагменты
  function createFragment(obj, index) {
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

  window.load(window.utils.serverLink + '/data', onLoad);
})();

