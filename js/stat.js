'use strict';

const CLOUD_X = 100;
const CLOUD_Y = 10;
const TEXT_X = 120;
const TEXT_Y = 30;
const GAP = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_GAP = 50;
const DATA_GAP = 30;
const DATA_Y = 250;
const MY_COLOR_BAR = `rgba(255, 0, 0, 1)`;
const MAX_BRIGHTNESS = 100;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const getMaxTime = function (arr) {
  let maxTime = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.font = `16px PT Mono`;
  ctx.Baseline = `hanging`;
  ctx.fillStyle = `#000`;
  ctx.fillText(`Ура вы победили!`,
      TEXT_X + GAP,
      TEXT_Y + GAP
  );
  ctx.fillText(`Список результатов:`,
      TEXT_X + GAP,
      TEXT_Y + (GAP * 3)
  );

  const maxTime = getMaxTime(times);

  for (let i = 0; i < names.length; i++) {
    let roundedTime = Math.round(times[i]);
    if (names[i] === `Вы`) {
      ctx.fillStyle = MY_COLOR_BAR;
    } else {
      ctx.fillStyle = `hsl(237, 100%,  ${getRandomInt(MAX_BRIGHTNESS)}%)`;
    }
    ctx.fillRect(CLOUD_X + DATA_GAP + (BAR_WIDTH + BAR_GAP) * i, DATA_Y - GAP - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = `#000`;
    ctx.fillText(names[i], CLOUD_X + DATA_GAP + (BAR_WIDTH + BAR_GAP) * i, DATA_Y + GAP);
    ctx.fillText(roundedTime, CLOUD_X + DATA_GAP + (BAR_WIDTH + BAR_GAP) * i, DATA_Y - GAP * 2 - (BAR_HEIGHT * times[i]) / maxTime);
  }
};
