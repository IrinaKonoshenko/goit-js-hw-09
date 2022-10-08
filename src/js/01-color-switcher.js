function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
const body = document.querySelector("body");
let timerId = null;

const timer = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute("disabled", true)
}

btnStart.addEventListener("click", timer);

btnStop.addEventListener("click", () => {
  clearInterval(timerId);
  btnStart.removeAttribute("disabled")
})

