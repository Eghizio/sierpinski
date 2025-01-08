const translateCanvasCenter = (context) => {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  context.canvas.width = size;
  context.canvas.height = size;
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

translateCanvasCenter(ctx);

export const clearCanvas = () => {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(-w, -h, 2 * w, 2 * h);
};

export const rngColor = () =>
  ["r", "g", "b"].reduce(
    (acc) =>
      acc +
      Math.round(Math.random() * 255)
        .toString(16)
        .padStart(2, "0"),
    "#"
  );

export const drawLine = (
  { x: startX, y: startY },
  { x: endX, y: endY },
  color = rngColor(),
  context = ctx
) => {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.closePath();
  context.stroke();
};

export const drawCircle = (
  { x, y },
  radius = 10,
  color = rngColor(),
  context = ctx
) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
};
