'use strict';

(function () {
  window.popup = {
    open: function (element) {
      element.classList.remove('hidden');
    },

    close: function (element) {
      element.classList.add('hidden');
    }
  };
})();
