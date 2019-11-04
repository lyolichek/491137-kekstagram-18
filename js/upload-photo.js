'use strict';

(function () {
  var FILTERS = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  var STEP = 25;
  var MAX_VALUE = 100;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
  var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
  var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  scaleControlValue.setAttribute('value', '100%');

  var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);
  var imageUploadEffects = document.querySelector('.img-upload__effects');
  var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');

  var effectLevel = uploadOverlay.querySelector('.effect-level');
  var effectLevelPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadOverlay.querySelector('.effect-level__depth');

  var currentPinPossition = 0;
  var newPinPosiition = 0;

  var successBlock = document.querySelector('#success').content.querySelector('.success');
  var buttonSuccess = successBlock.querySelector('.success__button');

  window.blockPictures = document.querySelector('.pictures');
  window.errorBlock = document.querySelector('#error').content.querySelector('.error');
  window.buttonError = window.errorBlock.querySelectorAll('.error__button');

  effectLevel.style.display = 'none';

  uploadFile.addEventListener('change', function () {
    window.popup.open(uploadOverlay);
  });

  uploadOverlayCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.popup.close(uploadOverlay);
  });


  // 2.1. изменение масштаба изображения

  buttonSmall.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeValue(currentValue, false);
  });

  buttonlBig.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeValue(currentValue, true);
  });

  function changeValue(value, isGrow) {
    if (!isGrow && value > STEP) {
      value -= STEP;
    } else if (isGrow && value < MAX_VALUE) {
      value += STEP;
    }

    resizeImage(value);
    currentValue = value;
    scaleControlValue.setAttribute('value', value + '%');
  }

  function resizeImage(value) {
    imageUploadPreview.style.transform = 'scale(' + value / MAX_VALUE + ')';
  }


  // 2.2. Наложение эффекта на изображение

  effectsItems.forEach(function (item) {
    addThumbnailClickHandler(item);
  });

  function addThumbnailClickHandler(thumbnail) {
    thumbnail.addEventListener('click', function () {
      var item = thumbnail.querySelector('.effects__label');
      var filterName = item.getAttribute('for');
      imageUploadPreview.removeAttribute('class');

      if (filterName === 'effect-none') {
        imageUploadPreview.classList.add('effects__preview--none');
        effectLevel.style.display = 'none';
        imageUploadPreview.removeAttribute('style');
      } else {
        imageUploadPreview.classList.add(FILTERS[filterName]);
        effectLevel.style.display = 'block';
        pinStartPosition();
        applayFilter(imageUploadPreview, MAX_VALUE);
      }
    });
  }

  function pinStartPosition() {
    currentPinPossition = effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  }

  function applayFilter(element, value) {
    var elementClass = element.getAttribute('class');

    if (elementClass === 'effects__preview--chrome') {
      element.style.filter = 'grayscale(' + parseInt(value, 10) * 0.01 + ')';
    }
    if (elementClass === 'effects__preview--sepia') {
      element.style.filter = 'sepia(' + parseInt(value, 10) * 0.01 + ')';
    }
    if (elementClass === 'effects__preview--marvin') {
      element.style.filter = 'invert(' + parseInt(value, 10) * 0.01 + ')';
    }
    if (elementClass === 'effects__preview--phobos') {
      element.style.filter = 'blur(' + parseInt(value, 10) * 0.03 + 'px' + ')';
    }
    if (elementClass === 'effects__preview--heat') {
      element.style.filter = 'brightness(' + parseInt(value, 10) * 0.03 + ')';
    }
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var pinPosition = evt.clientX;
    var effectLevelLine = uploadOverlay.querySelector('.effect-level__line');
    var lineWidth = getComputedStyle(effectLevelLine).width;

    function onMouseMove(evtPin) {
      var pinShift = evtPin.clientX - pinPosition;

      newPinPosiition = Math.round(parseInt(currentPinPossition, 10) + (pinShift * MAX_VALUE) / parseInt(lineWidth, 10));

      if (newPinPosiition < 0) {
        newPinPosiition = 0;
      }

      if (newPinPosiition > MAX_VALUE) {
        newPinPosiition = MAX_VALUE;
      }

      applayFilter(imageUploadPreview, newPinPosiition);
      effectLevelPin.style.left = newPinPosiition + '%';
      effectLevelDepth.style.width = newPinPosiition + '%';
    }

    function onMouseUp() {
      currentPinPossition = newPinPosiition;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC) {
      evt.preventDefault();
      window.popup.close(uploadOverlay);
    }
  });

  // Отправка формы
  var onLoad = function () {
    window.popup.close(uploadOverlay);
    uploadForm.reset();
    window.blockPictures.appendChild(successBlock);

    buttonSuccess.addEventListener('click', function () {
      successBlock.remove();
    });
  }

  // Ошибка
  var onError = function () {
    window.popup.close(uploadOverlay);
    uploadForm.reset();

    window.popup.onError();
  }

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(uploadForm), onLoad, onError);
  });
})();
