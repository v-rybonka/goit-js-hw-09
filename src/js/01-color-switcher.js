const bodyEl = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = 0;

btnStart.addEventListener('click', onStartButtonClick);
btnStop.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  if (btnStart.classList.contains('.is-active')) {
    return;
  }
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.classList.add('.is-active');
}
function onStopButtonClick() {
  clearInterval(timerId);
  btnStart.classList.remove('.is-active');
}
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
