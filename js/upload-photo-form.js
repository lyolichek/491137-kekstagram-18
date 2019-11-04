'use strict';

(function () {
  var COMMENTS_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var MAX_HASHTAG = 5;
  var HASHTAG_ERRORS = {
    'symbol': 'Отсутствует обязательный символ #',
    'symbol_only': 'Хэш-тег должен состоять из знака # и минимум 1 символа',
    'symbol_wrong': 'Символ # должен стоять в начале хештега',
    'max': 'Максимальное кол-во хештегов должно быть 5',
    'same': 'Есть повторяющиеся хештеги',
    'maxLength': 'Слишком длинный хештег'
  };
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputComments = document.querySelector('.text__description');


  // 2.3. Хэш-теги

  inputHashtags.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  function checkHashtag(array) {
    if (array.length > MAX_HASHTAG) {
      return 'max';
    }

    for (var k = 0; k < array.length; k++) {
      if (array[k].length > HASHTAG_MAX_LENGTH) {
        return 'maxLength';
      }
      if (array[k].indexOf('#') < 0) {
        return 'symbol';
      }
      if (array[k].indexOf('#') > 0) {
        return 'symbol_wrong';
      }
      if (array[k] === '#') {
        return 'symbol_only';
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
    var newHashtagsArr = [];

    hashtagsArr.forEach(function (tag) {
      if(tag && tag.length > 0) {
        newHashtagsArr.push(tag);
      }
    });

    var errorCode = checkHashtag(newHashtagsArr);

    if (errorCode !== '') {
      inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
    } else {
      inputHashtags.setCustomValidity(errorCode);
    }
  });


  // 2.4. Комментарий

  inputComments.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  inputComments.addEventListener('change', function () {
    var str = inputComments.value;
    if (str.length > COMMENTS_MAX_LENGTH) {
      inputComments.setCustomValidity('Комментарий не должен превышать 140-ка символов');
    } else {
      inputComments.setCustomValidity('');
    }
  });
})();
