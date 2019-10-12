'use strict';

(function () {
  var inputComments = document.querySelector('.text__description');

  // Добавление комментария к изображению
  inputComments.addEventListener('change', function () {
    var str = inputComments.value;
    if (str.length > 140) {
      inputComments.setCustomValidity('Комментарий не должен превышать 140-ка символов');
    } else {
      inputComments.setCustomValidity('');
    }
  });
})();
