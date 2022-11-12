const body = document.body;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let idForInt = null;

btnStart.addEventListener('click', onRunChanger);
btnStop.addEventListener('click', onStopChanger);

function onRunChanger(e) {
  e.currentTarget.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled');

  changeBodyStyle();

  idForInt = setInterval(changeBodyStyle, 1000);
}

function onStopChanger(e) {
  e.currentTarget.setAttribute('disabled', 'disabled');
  btnStart.removeAttribute('disabled');

  clearInterval(idForInt);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyStyle() {
  body.style.backgroundColor = getRandomHexColor();
}
