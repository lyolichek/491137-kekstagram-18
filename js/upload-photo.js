'use strict';

(function () {
  var FILTERS = {
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  var STEP = 25;
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
  var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
  var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  scaleControlValue.setAttribute('value', '100%');

  var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);
  var imageUploadEffects = document.querySelector('.img-upload__effects');
  var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');

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
      var picture = imageUploadPreview.querySelector('img');
      picture.removeAttribute('class');

      if (FILTERS[filterName]) {
        picture.classList.add(FILTERS[filterName]);
      }
    });
  }
})();
