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
    }
  };
})();
