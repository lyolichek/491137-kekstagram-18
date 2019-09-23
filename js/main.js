'use strict';

var QUANTITY = 25;

var comments =  [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
var names = ['Лёля', 'Слава', 'Аня', 'Ваня', 'Елена', 'Вова'];

var pictures = document.querySelector('.pictures');  //Контейнер для изображений от других пользователей
var template = document.querySelector('#picture').content.querySelector('.picture');  // содержимое тега template
var fragment = document.createDocumentFragment();
var bigPictureOverlay = document.querySelector('.big-picture');

var teplateArray = createDataArray();

// формирует массив объектов
function createDataArray() {
  var arrayObj = [];
  for(var i = 0; i < QUANTITY; i++) {
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
    comments: generateComments(comments)
  }
}

// формируем массив комментариев
function generateComments(array) {
  var number = randomInteger(0, 5);
  var newArray = [];

  for(var i = 0; i <= number; i++){
    newArray.push(array[i]);
  }

  return newArray;
}

// формируем фрагменты
function createFragment(obj) {
  var cloneElement = template.cloneNode(true);  // клон элемента – со всеми атрибутами и дочерними элементами
  var image = cloneElement.querySelector('.picture__img');
  var imageComments = cloneElement.querySelector('.picture__comments');
  var imageLikes = cloneElement.querySelector('.picture__likes');

  image.setAttribute('src', obj.src);
  imageComments.textContent = obj.comments;
  imageLikes.textContent = obj.likes;

  return cloneElement;
}

// создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
function createElements(arrayElements) {
  for(var i = 0; i < arrayElements.length; i++) {

    if(i === 0) {
      openBigPictureOverlay(arrayElements[i]);
    }

    fragment.appendChild(createFragment(arrayElements[i]));
  }
}

// создание полноэкранного показа изображения
function openBigPictureOverlay(obj) {
  var bigPicture = bigPictureOverlay.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPictureOverlay.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPictureOverlay.querySelector('.comments-count');
  var bigPictureComments = bigPictureOverlay.querySelector('.social__comments'); // ul

  bigPicture.setAttribute('src', obj.src);
  bigPictureLikes.textContent = obj.likes;
  bigPictureCommentsCount.textContent = obj.comments.length;
  bigPictureComments.innerHTML = createSocialCommentsBlock(obj.comments); // 2 comments
}

// создание блока с аватаром и комментами
function createSocialCommentsBlock(array) {
  var newArray = [];
  for(var i = 0; i < array.length; i++) {
    var item = createObjectCommentBlock(array[i], i, names); //вызываем ф-ю создания li с контентом
    newArray.push(item);
    console.log(newArray)
  }

  return newArray; // вернет обект с 2 значениями
}

// формируем объект блока комментов
function createObjectCommentBlock(text, i, arr) {
  var commentItem = document.querySelector('.social__comment');
  var cloneElement = commentItem.cloneNode(true);
  var socialPicture = cloneElement.querySelector('.social__picture');
  var socialText = cloneElement.querySelector('.social__text');

  socialPicture.setAttribute('src', 'img/avatar-' + randomInteger(i + 1, 6) + '.svg');
  socialPicture.setAttribute('alt', arr[i]);
  socialText.textContent = text;

  //console.log(i)
  return commentItem;
}

createElements(teplateArray);
pictures.appendChild(fragment);
bigPictureOverlay.classList.remove('hidden');
