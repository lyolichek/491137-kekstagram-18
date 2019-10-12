'use strict';

(function () {

  var QUANTITY = 25;
  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var templateArray = createDataArray();   // массив элементов  ---- как передать массив обьектов в другой модуль

  console.log(templateArray);
  // формирует массив элементов
  function createDataArray() {
    var arrayObj = [];
    for (var i = 0; i < QUANTITY; i++) {
      arrayObj.push(createDataObject(i + 1));
    }

    return arrayObj;
  }

  // формируем объект
  function createDataObject(i) {
    return {
      src: 'photos/' + i + '.jpg',
      likes: window.utils.randomInteger(5, 200),
      comments: window.comments.generateComments(),
      description: 'test'
    };
  }

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

    image.src = obj.src;
    imageComments.textContent = obj.comments.length;
    imageLikes.textContent = obj.likes;
    cloneElement.dataset.objIndex = index;

    return cloneElement;
  }

  createElements(templateArray);

  // наполняем контейнер pictures элементами
  pictures.appendChild(fragment);
})();
