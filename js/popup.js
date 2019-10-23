'use strict';

(function () {
  window.popup = {
    open: function (element) {
      element.classList.remove('hidden');
    },

    close: function (element) {
      element.classList.add('hidden');
    },

    onError: function () {
      window.buttonError[1].remove();
      window.blockPictures.appendChild(window.errorBlock);

      window.buttonError[0].addEventListener('click', function () {
        window.errorBlock.remove();
      });
    }
  };
})();
