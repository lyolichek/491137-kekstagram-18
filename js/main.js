'use strict';

var QUANTITY = 25;

var commentsParams = {
  COMMENTS: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  NAMES: ['Лёля', 'Слава', 'Аня', 'Ваня', 'Елена', 'Вова']
};

var pictures = document.querySelector('.pictures');  //Контейнер для изображений от других пользователей
var template = document.querySelector('#picture').content.querySelector('.picture');  // template
var fragment = document.createDocumentFragment();

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
    comments: generateComments(commentsParams.COMMENTS)
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
    fragment.appendChild(createFragment(arrayElements[i]));
  }
}

createElements(teplateArray);
pictures.appendChild(fragment);
