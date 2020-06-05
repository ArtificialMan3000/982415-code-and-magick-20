'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Получает случайное число в указанном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

// Получает случайный элемент массива
var getRandomArrayElement = function (arr) {
  if (arr) {
    var arrIndex = getRandomNumber(0, arr.length - 1);
    return arr[arrIndex];
  } else {
    return false;
  }
};

// Генерирует массив из 4х случайных магов
var generateWizardsData = function () {
  var wizardsData = [];

  for (var i = 0; i < 4; i++) {
    var currWizardData = {};
    currWizardData.name = getRandomArrayElement(NAMES) + ' ' + getRandomArrayElement(SURNAMES);
    currWizardData.coatColor = getRandomArrayElement(COAT_COLORS);
    currWizardData.eyesColor = getRandomArrayElement(EYES_COLORS);
    wizardsData.push(currWizardData);
  }

  return wizardsData;
};

// Создаёт мага по шаблону на основе переданных данных
var createSimilarWizard = function (wizardData, template) {
  var setupSimilarItem = template.querySelector('.setup-similar-item').cloneNode(true);
  var setupSimilarLabel = template.querySelector('.setup-similar-label');
  var wizardCoat = setupSimilarItem.querySelector('.wizard-coat');
  var wizardEyes = setupSimilarItem.querySelector('.wizard-eyes');

  setupSimilarLabel.textContent = wizardData.name;
  wizardCoat.style = 'fill: ' + wizardData.coatColor + ';';
  wizardEyes.style = 'fill: ' + wizardData.eyesColor + ';';

  return setupSimilarItem;
};

// Отрисовывает похожих магов
var renderSimilarWizards = function (data) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilarListFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var setupSimilarItem = createSimilarWizard(data[i], similarWizardTemplate);
    setupSimilarListFragment.appendChild(setupSimilarItem);
  }
  setupSimilarList.appendChild(setupSimilarListFragment);
};

// Генерируем массив магов
var wizardsData = generateWizardsData();

// Заполняем блок похожих магов
renderSimilarWizards(wizardsData);

// Показываем блок настройки персонажа
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Показываем блок похожих магов
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
