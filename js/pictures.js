'use strict';

(function () {
  var RANDOM_PHOTOS = 10;
  var PICTURE_FILTERS = {
    'filter-popular': function (arr) {
      return arr;
    },
    'filter-random': function (arr) {
      var copyArray = arr.slice();
      var randomArray = [];

      for (var i = 0; i < RANDOM_PHOTOS; i++) {
        var newItem = copyArray[window.utils.randomInteger(0, copyArray.length - 1)];
        randomArray.push(newItem);
        copyArray.splice(copyArray.indexOf(newItem), 1);
      }

      return randomArray;
    },
    'filter-discussed': function (arr) {
      var copyArray = arr.slice();

      copyArray.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      return copyArray;
    }
  };

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');

  var filters = document.querySelector('.img-filters');
  var buttons = filters.querySelectorAll('.img-filters__button');
  var filterName = 'filter-popular';

  window.fragment = document.createDocumentFragment();
  window.templateArray = [];

  function onLoad(data) {
    window.templateArray = data;
    createElements(data);
    pictures.appendChild(window.fragment); // наполняем контейнер pictures элементами
    window.addEventToGalleryItem();
  }

  // создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
  function createElements(arrayElements) {
    var sortedArr = arrayElements.slice(0);
    var deletedItems = pictures.querySelectorAll('a.picture');
    window.filtersArray = PICTURE_FILTERS[filterName](sortedArr);

    deletedItems.forEach(function (item) {
      pictures.removeChild(item);
    });

    window.filtersArray.forEach(function (filter, i) {
      window.fragment.appendChild(createFragment(filter, i));
    });
  }

  // формируем фрагменты
  function createFragment(obj, index) {
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

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var temp = filters.querySelector('.img-filters__button--active');
      temp.classList.remove('img-filters__button--active');
      btn.classList.add('img-filters__button--active');
      filterName = btn.getAttribute('id');
      window.load(window.utils.serverLink + '/data', onLoad, window.popup.onError);
    });
  });

  window.load(window.utils.serverLink + '/data', onLoad, window.popup.onError);

  filters.classList.remove('img-filters--inactive');
})();
