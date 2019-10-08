'use strict';

var QUANTITY = 25;
var FILTERS = {
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat'
};

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = ['Лёля', 'Слава', 'Аня', 'Ваня', 'Елена', 'Вова'];

var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var bigPictureComments = document.querySelector('.social__comments');
var bigPictureComment = document.querySelector('.social__comment');

var teplateArray = createDataArray();

// формирует массив объектов
function createDataArray() {
  var arrayObj = [];
  for (var i = 0; i < QUANTITY; i++) {
    arrayObj.push(createDataObject(i + 1));
  }

  return arrayObj;
}


// формируем случайное значение
function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

// формируем объект
function createDataObject(i) {
  return {
    src: 'photos/' + i + '.jpg',
    likes: randomInteger(5, 200),
    comments: generateComments(comments),
    description: 'test'
  };
}

// формируем массив комментариев
function generateComments(array) {
  var number = randomInteger(0, 5);
  var newArray = [];
  for (var i = 0; i <= number; i++) {
    newArray.push(array[i]);
  }

  return newArray;
}

// формируем фрагменты
function createFragment(obj) {
  // клон элемента – со всеми атрибутами и дочерними элементами
  var cloneElement = template.cloneNode(true);
  var image = cloneElement.querySelector('.picture__img');
  var imageComments = cloneElement.querySelector('.picture__comments');
  var imageLikes = cloneElement.querySelector('.picture__likes');

  image.src = obj.src;
  imageComments.textContent = obj.comments;
  imageLikes.textContent = obj.likes;

  return cloneElement;
}

// создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
function createElements(arrayElements) {
  for (var i = 0; i < arrayElements.length; i++) {

    if (i === 0) {
      openBigPictureOverlay(arrayElements[i]);
    }

    fragment.appendChild(createFragment(arrayElements[i]));
  }
}

// создание полноэкранного показа изображения
function openBigPictureOverlay(obj) {
  bigPicture.querySelector('.big-picture__img img').src = obj.src;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.comments-count').textContent = obj.comments.length;
  bigPicture.querySelector('.social__caption').textContent = obj.description;

  for (var i = 0; i < obj.comments.length; i++) {
    fragment.appendChild(createCommentItem(obj.comments[i], names));
  }

  deleteDefaultComments(bigPictureComments);
  bigPictureComments.appendChild(fragment);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
}

// Создает li пользователей написавших комментарий
function createCommentItem(comment, arrNames) {
  var commentItem = bigPictureComment.cloneNode(true);

  commentItem.querySelector('.social__picture').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
  commentItem.querySelector('.social__picture').alt = arrNames[randomInteger(0, 5)];
  commentItem.querySelector('.social__text').textContent = comment;

  return commentItem;
}

// Удаляет дефолтные комментарии
function deleteDefaultComments(listOfComments) {
  listOfComments.innerHTML = '';
}

createElements(teplateArray);
pictures.appendChild(fragment);

bigPictureCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(bigPicture);
});

// Загрузка нового изображения
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayCancel = uploadOverlay.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', function () {
  openPopup(uploadOverlay);
});

uploadOverlayCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(uploadOverlay);
});

// Увеличение масштаба изображения
var STEP = 25;
var imageUploadScale = document.querySelector('.img-upload__scale');
var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
var imageUploadPreview = document.querySelector('.img-upload__preview');

scaleControlValue.setAttribute('value', '100%');

var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);

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

// Наложение эффекта на изображение
var imageUploadEffects = document.querySelector('.img-upload__effects');
var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');

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

// Интенсивность эффекта регулируется перемещением ползунка в слайдере
// var uploadEffectLevelPin = document.querySelector('.effect-level__pin');  // ползунок

// uploadEffectLevelPin.addEventListener('mouseup', function () {
//  alert('hello');
// });


// Добавление хэш-тегов и комментария к изображению
var HASHTAG_ERRORS = {
  'symbol': 'Отсутствует обязательный символ #',
  'symbol_wrong': 'Символ # должен стоять в начале хештега',
  'max': 'Максимальное кол-во хештегов должно быть 5',
  'same': 'Есть повторяющиеся хештеги',
  'maxLength': 'Слишком длинный хештег'
};

var inputHashtags = document.querySelector('.text__hashtags');

inputHashtags.addEventListener('change', function () {
  var hashtagsArr = inputHashtags.value.split(' ');
  var errorCode = checkHashtag(hashtagsArr);

  if (errorCode !== '') {
    inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
  } else {
    inputHashtags.setCustomValidity(errorCode);
  }
});

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

// Добавление комментария к изображению
var inputComments = document.querySelector('.text__description');

inputComments.addEventListener('change', function () {
  var str = inputComments.value;
  if (str.length > 140) {
    inputComments.setCustomValidity('Комментарий не должен превышать 140-ка символов');
  } else {
    inputComments.setCustomValidity('');
  }
});

// Открываем и закрываем попап с изображением
function openPopup(element) {
  element.classList.remove('hidden');
}

function closePopup(element) {
  element.classList.add('hidden');
}


// ------------------------------------------------------

var galleryItems = document.querySelectorAll('a.picture');

function addEventToGalleryItem(itemsArray) {
  for (var i = 0; i < itemsArray.length; i++) {
    itemsArray[i].addEventListener('click', fillImgPopup);
  }
}

addEventToGalleryItem(galleryItems);

function fillImgPopup(evt) {
  for (var i = 0; i < evt.path.length; i++) {
    if (evt.path[i].classList && evt.path[i].classList.contains('picture')) {
      var clickedObj = {};
      var clickedElement = evt.path[i];
      clickedObj.url = clickedElement.querySelector('img').getAttribute('src');
      clickedObj.likes = clickedElement.querySelector('.picture__likes').textContent;
      clickedObj.comments = clickedElement.querySelector('.picture__comments').textContent;
      openGalleryPhoto(clickedObj);
      openPopup(bigPicture);
    }
  }
}

function openGalleryPhoto(obj) {
  var bigPictureImages = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var socialComments = bigPicture.querySelectorAll('.social__comment');
  bigPictureImages.setAttribute('src', obj.url);
  likesCount.textContent = obj.likes;
  socialComments.textContent = obj.comments;
  console.log(bigPictureImages);
}

// не работает ;( !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
bigPictureCancel.addEventListener('keydown', function (evt) {
  if (evt.code === 27) {
    closePopup(bigPicture);
    console.log(evt);
  }
});
