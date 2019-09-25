'use strict';

var QUANTITY = 25;

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
var bigPictureComments = document.querySelector('.social__comments');  // юл
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
      openBigPictureOverlay(arrayElements[i]);  // вызов 1 большой картинки
    }

    fragment.appendChild(createFragment(arrayElements[i]));
  }
}

// создание полноэкранного показа изображения
function openBigPictureOverlay(obj) {
  bigPicture.querySelector('.big-picture__img img').src = obj.src;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.comments-count').textContent = obj.comments.length;  // 2 comments
  bigPicture.querySelector('.social__caption').textContent = obj.description;

  for (var i = 0; i < obj.comments.length; i++) {
    var comments = obj.comments[i];
    fragment.appendChild(createCommentItem(comments, names));
  }

  deleteDefaultComments(bigPictureComments);
  bigPictureComments.appendChild(fragment);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
}

// Создает li пользователей написавших комментарий
function createCommentItem(comments, arrNames) {
  var commentItem = bigPictureComment.cloneNode(true);

  commentItem.querySelector('.social__picture').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
  commentItem.querySelector('.social__picture').alt = arrNames[randomInteger(0, 5)];
  commentItem.querySelector('.social__text').textContent = comments;

  return commentItem;
}

// Удаляет дефолтные комментарии
function deleteDefaultComments(listOfComments) {
  listOfComments.innerHTML = '';
}

createElements(teplateArray);
pictures.appendChild(fragment);
