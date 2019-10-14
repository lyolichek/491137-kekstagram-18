'use strict';

(function () {
  var HASHTAG_ERRORS = {
    'symbol': 'Отсутствует обязательный символ #',
    'symbol_wrong': 'Символ # должен стоять в начале хештега',
    'max': 'Максимальное кол-во хештегов должно быть 5',
    'same': 'Есть повторяющиеся хештеги',
    'maxLength': 'Слишком длинный хештег'
  };
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputComments = document.querySelector('.text__description');

  function checkHashtag(array) {
    if (array.length > 5) {
      return 'max';
    }

    for (var k = 0; k < array.length; k++) {
      if (array[k].length > 20) {
        return 'maxLength';
      }
      if (array[k].indexOf('#') < 0) {
        return 'symbol';
      }
      if (array[k].indexOf('#') > 0) {
        return 'symbol_wrong';
      }
      for (var j = 0; j < array.length; j++) {
        if ((array[k].toLowerCase() === array[j].toLowerCase()) && (k !== j)) {
          return 'same';
        }
      }
    }

    return '';
  }

  inputHashtags.addEventListener('change', function () {
    var hashtagsArr = inputHashtags.value.split(' ');
    var errorCode = checkHashtag(hashtagsArr);

    if (errorCode !== '') {
      inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
    } else {
      inputHashtags.setCustomValidity(errorCode);
    }
  });

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
