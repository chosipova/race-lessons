const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

car.classList.add('car');

//Объект нажатия клавиш
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

//Общие настройки
const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

const elementsSetting = {
  lines: 9,
  linesHeight: getHightElements(9) / 2
};

function getQuantityElements(hightElement) {
  return document.documentElement.clientHeight / hightElement + 1;
}

function getHightElements(quantityElements) {
  return document.documentElement.clientHeight / quantityElements;
}

//Функция начала игры
function startGame() {
  start.classList.add('hide');
  //создаем линии
  for (let i = 0; i <= elementsSetting.lines ; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.y = i * getHightElements(elementsSetting.lines);
    line.style.height = elementsSetting.linesHeight + 'px';
    line.style.top = line.y + 'px';
    gameArea.appendChild(line);
  }
  //создаем препятствия
  for (let i = 1; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * i;
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat';
    gameArea.appendChild(enemy);
  }
  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

//Функция начала движения
function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
  console.log(event.key);
}

//Функция остановки движения
function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
  console.log(event.key);
}

//Функция анимации игры
function playGame() {
  if (setting.start) {
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    car.style.top = setting.y + 'px';
    car.style.left = setting.x + 'px';
    requestAnimationFrame(playGame);
  }
}

//обновление разметки дороги
function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line) {
    line.y += setting.speed;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -getHightElements(elementsSetting.lines);
    }
  });
}

//обновление препятсвий
function moveEnemy() {
  let enemeis = document.querySelectorAll('.enemy');
  enemeis.forEach(function (enemy) {
    enemy.y += setting.speed / 2;
    enemy.style.top = enemy.y + 'px';
    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * setting.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });
}


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);