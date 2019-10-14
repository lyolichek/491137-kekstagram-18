'use strict';

(function () {
  window.popup = {
    openPopup: function (element) {
      element.classList.remove('hidden');

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          this.closePopup(element);
        }
      });
    },

    closePopup: function (element) {
      element.classList.add('hidden');
    }
  };
})();
