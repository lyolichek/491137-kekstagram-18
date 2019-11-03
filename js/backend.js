'use strict';

(function () {
  var STATUS_VALUE = 200;
  var TIMEOUT_VALUE = 10000;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  window.backend = {
    load: function (url, onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_VALUE) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.timeout = TIMEOUT_VALUE;

      xhr.open('GET', url);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_VALUE) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', window.utils.serverLink);
      xhr.send(data);
    }
  };
})();
