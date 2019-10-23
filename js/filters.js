(function () {
  var PICTURE_FILTERS = {
    'filter-popular': function (arr) {
      return arr;
    },
    'filter-random': function (arr) {
      var copyArray = arr.slice();
      var randomArray = [];

      for (var i = 0; i < RANDOM_PHOTOS; i++) {
        var newItem = arr[window.utils.randomInteger(0, arr.length - 1)];
        randomArray.push(newItem);

        console.log(copyArray);
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
  var RANDOM_PHOTOS = 10;

  var filters = document.querySelector('.img-filters');
  var buttons = filters.querySelectorAll('.img-filters__button');
  var filterName = 'filter-popular';

  var onLoad = function (data) {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      createElements(data);
      window.pictures.appendChild(window.fragment); // наполняем контейнер pictures элементами
      window.addEventToGalleryItem();
    }, 500);
  };

  var onError = function (data) {

  };

  function createElements (arrElements) {
    var deletedItems = window.pictures.querySelectorAll('a.picture');
    var sortedArr = arrElements.slice(0);

    deletedItems.forEach(function (item) {
      window.pictures.removeChild(item);
    });
    //console.log(arrElements);
    PICTURE_FILTERS[filterName](sortedArr).forEach(function (element) {
      window.fragment.appendChild(window.createFragment(element));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var temp = filters.querySelector('.img-filters__button--active');
      temp.classList.remove('img-filters__button--active');
      btn.classList.add('img-filters__button--active');
      filterName = btn.getAttribute('id');
      window.backend.load(window.utils.serverLink + '/data', onLoad, onError);
    });
  });

  filters.classList.remove('img-filters--inactive');
})();
