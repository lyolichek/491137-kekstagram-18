'use strict';

(function () {
  window.load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.popup.getError();
      }
    });

    xhr.addEventListener('error', function () {
      window.popup.getError();
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
