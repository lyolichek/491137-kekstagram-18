'use strict';

(function () {
  window.popup = {
    open: function (element) {
      element.classList.remove('hidden');

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          this.close(element);
        }
      });
    },

    close: function (element) {
      element.classList.add('hidden');
    },

    getError: function () {
      var blockPictures = document.querySelector('.pictures');
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      var buttonError = errorBlock.querySelectorAll('.error__button');
      buttonError[1].remove();

      blockPictures.appendChild(errorBlock);

      buttonError[0].addEventListener('click', function () {
        errorBlock.remove();
      });
    }
  };
})();
