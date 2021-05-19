const clearButton = document.getElementById("clear-button");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const { drawStart, drawEnd, draw, clear } = (() => {
  let isDraw = false;

  const getX = (value) => value - canvas.offsetLeft;
  const getY = (value) => value - canvas.offsetTop;

  const drawStart = ({ pageX, pageY }) => {
    ctx.beginPath();
    ctx.moveTo(getX(pageX), getY(pageY));
    isDraw = true;
  };

  const drawEnd = (event) => {
    draw(event);
    isDraw = false;
  };

  const draw = ({ pageX, pageY }) => {
    if (!isDraw) return;
    ctx.lineTo(getX(pageX), getY(pageY));
    ctx.strokeStyle = "#7159c1";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const clear = () => {
    ctx.moveTo(0, 0);
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return {
    drawStart,
    drawEnd,
    draw,
    clear
  };
})();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("mousedown", drawStart);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", drawEnd);

canvas.addEventListener("touchstart", (e) => drawStart(e.touches[0]));
canvas.addEventListener("touchmove", (e) => {
  draw(e.touches[0]);
  e.preventDefault();
});
canvas.addEventListener("touchend", (e) => drawEnd(e.changedTouches[0]));

clearButton.addEventListener("click", clear);
