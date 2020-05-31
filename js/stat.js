'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 20;
var WIN_TEXT_GAP = 30;
var HISTOGRAMM_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_HORIZ_GAP = 50;
var BAR_VERT_GAP = 10;
var FONT_SIZE = 16;
var FONT_FAMILY = 'PT Mono';
var DEFAULT_FILL_STYLE = '#000';

// Получает максимальный элемент массива
var getMaxElement = function (arr) {
  if (!arr.length) {
    return false;
  }
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Выводит прямоугольник статистики
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Выводит строки текста друг под другом
var renderStrings = function (ctx, strings, x, y, font, color) {
  if (!strings.length) {
    return false;
  }

  ctx.font = font;
  ctx.fillStyle = color;

  var offset = 0;

  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], x, y + offset);
    offset += FONT_SIZE;
  }

  ctx.fillStyle = DEFAULT_FILL_STYLE;
  return offset + WIN_TEXT_GAP;
};

// Выводит столбец статистики с именем игрока и временем
var renderBar = function (ctx, x, y, playerName, time, maxTime) {
  var barMaxHeight = HISTOGRAMM_HEIGHT - (FONT_SIZE * 2) - (BAR_VERT_GAP * 2);
  var barHeight = ((barMaxHeight * time) / maxTime);
  var timeOffset = barMaxHeight - barHeight;
  var barOffset = FONT_SIZE + BAR_VERT_GAP + barMaxHeight - barHeight;
  var nameOffset = FONT_SIZE + BAR_VERT_GAP + barMaxHeight + BAR_VERT_GAP;

  // Вывод времени
  ctx.fillText(
      parseInt(time, 10),
      x,
      y + timeOffset
  );

  // Вывод столбца
  // Определение цвета столбца
  if (playerName === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    var saturation = (Math.random() * 80) + 10; // Насыщенность между 10 и 90
    ctx.fillStyle = 'hsl(240, 100%, ' + saturation + '%)';
  }
  // Вывод прямоугольника
  ctx.fillRect(
      x,
      y + barOffset,
      BAR_WIDTH,
      barHeight
  );
  // Сброс цвета
  ctx.fillStyle = DEFAULT_FILL_STYLE;

  // Вывод имени
  ctx.fillText(
      playerName,
      x,
      y + nameOffset
  );

};

// TODO Причесать код

window.renderStatistics = function (ctx, players, times) {
  ctx.textBaseline = 'hanging';

  // Вывод экрана статистики
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Вывод победного текста
  var winTextStrings = [
    'Ура вы победили!',
    'Список результатов:'
  ];

  var textOffset = renderStrings(
      ctx,
      winTextStrings,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      FONT_SIZE + 'px "' + FONT_FAMILY + '"',
      '#000'
  );

  // Вывод результатов игроков
  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderBar(
        ctx,
        CLOUD_X + GAP + (BAR_WIDTH + BAR_HORIZ_GAP) * i,
        CLOUD_Y + GAP + textOffset,
        players[i],
        times[i],
        maxTime
    );
  }
};
