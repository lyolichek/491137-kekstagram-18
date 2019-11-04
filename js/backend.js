'use strict';

(function () {
  var STATUS_VALUE = 200;
  var TIMEOUT_VALUE = 10000;

  window.load = function (url, onLoad, onError) {
    var xhr = getXhr(onLoad, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = getXhr(onLoad, onError);
    xhr.open('POST', window.utils.serverLink);
    xhr.send(data);
  };

  var getXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

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

    return xhr;
  };
})();
