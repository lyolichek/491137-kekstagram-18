'use strict';

(function () {
  var FILTERS = {
    'effect-chrome': function (value) {
      imageUploadPreview.classList.add('effects__preview--chrome');
      imageUploadPreview.style.filter = 'grayscale(' + parseInt(value, 10) * 0.01 + ')';
    },
    'effect-sepia': function (value) {
      imageUploadPreview.classList.add('effects__preview--sepia');
      imageUploadPreview.style.filter = 'sepia(' + parseInt(value, 10) * 0.01 + ')';
    },
    'effect-marvin': function (value) {
      imageUploadPreview.classList.add('effects__preview--marvin');
      imageUploadPreview.style.filter = 'invert(' + parseInt(value, 10) * 0.01 + ')';
    },
    'effect-phobos': function (value) {
      imageUploadPreview.classList.add('effects__preview--phobos');
      imageUploadPreview.style.filter = 'blur(' + parseInt(value, 10) * 0.03 + 'px' + ')';
    },
    'effect-heat': function (value) {
      imageUploadPreview.classList.add('effects__preview--heat');
      imageUploadPreview.style.filter = 'brightness(' + parseInt(value, 10) * 0.03 + ')';
    }
  };
  var STEP = 25;
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

  var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelLine = uploadOverlay.querySelector('.effect-level__line');
  var effectLevelPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadOverlay.querySelector('.effect-level__depth');
  var currentPinPossition = effectLevelPin.style.left = 20 + '%';
  var currentDepthPossition = effectLevelDepth.style.width = 20 + '%';
  var newPinPosiition = 0;

  uploadFile.addEventListener('change', function () {
    window.popup.openPopup(uploadOverlay);
  });

  uploadOverlayCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.popup.closePopup(uploadOverlay);
  });

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
    } else if (isGrow && value < 100) {
      value += STEP;
    }

    resizeImage(value);
    currentValue = value;
    scaleControlValue.setAttribute('value', value + '%');
  }

  function resizeImage(value) {
    imageUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  for (var i = 0; i < effectsItems.length; i++) {
    addThumbnailClickHandler(effectsItems[i]);
  }

  function addThumbnailClickHandler(thumbnail) {
    thumbnail.addEventListener('click', function () {
      var item = thumbnail.querySelector('.effects__label');
      var filterName = item.getAttribute('for');
      imageUploadPreview.removeAttribute('class');

      if (FILTERS[filterName]) {
        FILTERS[filterName](currentPinPossition);
      }
    });
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var pinPosition = evt.clientX;
    var lineWidth = getComputedStyle(effectLevelLine).width;

    function getPinShift(evtPin) {
      var pinShift = evtPin.clientX - pinPosition;

      newPinPosiition = Math.round(parseInt(currentPinPossition, 10) + (pinShift * 100) / parseInt(lineWidth, 10));

      if (newPinPosiition < 0) {
        newPinPosiition = 0;
      }

      if (newPinPosiition > 100) {
        newPinPosiition = 100;
      }

      applayFilter(newPinPosiition, imageUploadPreview);
      effectLevelPin.style.left = newPinPosiition + '%';
      effectLevelDepth.style.width = newPinPosiition + '%';
    }

    function onMouseUp() {
      currentPinPossition = newPinPosiition;

      document.removeEventListener('mousemove', getPinShift);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', getPinShift);
    document.addEventListener('mouseup', onMouseUp);
  });

  function applayFilter(value, element) {
    var elementClass = element.getAttribute('class');

    if(elementClass === 'effects__preview--chrome') {
      element.style.filter = 'grayscale(' + parseInt(value, 10) * 0.01 + ')';
    }
    if(elementClass === 'effects__preview--sepia') {
      element.style.filter = 'sepia(' + parseInt(value, 10) * 0.01 + ')';
    }
    if(elementClass === 'effects__preview--marvin') {
      element.style.filter = 'invert(' + parseInt(value, 10) * 0.01 + ')';
    }
    if(elementClass === 'effects__preview--phobos') {
      element.style.filter = 'blur(' + parseInt(value, 10) * 0.03 + 'px' + ')';
    }
    if(elementClass === 'effects__preview--heat') {
      element.style.filter = 'brightness(' + parseInt(value, 10) * 0.03 + ')';
    }
  }
})();
