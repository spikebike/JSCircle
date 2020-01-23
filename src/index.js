var canvas;
var ctx;
var width;
var height;
var pointSize = 1;
var angleStep = (2 * Math.PI) / 36; // 36 points per circle

drawCircle(200);

function drawCircle(radius) {
  // allocate array?
  // build sqRoot lookup array
  var angle = 0.0;
  var x = 0.0;
  var y = 0.0;
  var t1 = performance.now();

  initGraphics();
  ctx.fillStyle = "rgb(30, 30, 30)";
  PlotAxis();
  ctx.fillStyle = "rgb(255, 30, 30)";
  // draw 1/8th of a cicrle then plot the other 7 symmetric points
  while (angle < Math.PI / 4) {
    y = lsin(angle) * radius;
    // cos (x) = sin(x+PI/2);
    x = lsin(angle + Math.PI / 2) * radius;
    angle = angle + angleStep;
    PlotPixel(width / 2 + x, height / 2 + y);
    PlotPixel(width / 2 - x, height / 2 + y);
    PlotPixel(width / 2 - x, height / 2 - y);
    PlotPixel(width / 2 + x, height / 2 - y);
    PlotPixel(width / 2 + y, height / 2 + x);
    PlotPixel(width / 2 - y, height / 2 + x);
    PlotPixel(width / 2 - y, height / 2 - x);
    PlotPixel(width / 2 + y, height / 2 - x);
  }
  var t2 = performance.now();
  console.log("done.");
  console.log("Rendering circle: " + (t2 - t1) + "ms");
}

function lsin(x) {
  // squarish circle
  // angle = x - x ** 3 / factorial(3) + x ** 5 / factorial(5);
  // better
  return (
    x - x ** 3 / factorial(3) + x ** 5 / factorial(5) - x ** 7 / factorial(7)
  );
}

function factorial(num) {
  // much faster than recursive version
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}
// initGraphics and PlotPixel based on https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
function initGraphics() {
  canvas = document.querySelector(".circleExample");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
}

function PlotPixel(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
  ctx.fill();
}

function PlotAxis() {
  var x = 0;
  var y = height / 2;
  while (x < width) {
    PlotPixel(x, y);
    x++;
  }
  x = width / 2;
  y = 0;
  while (y < height) {
    PlotPixel(x, y);
    y++;
  }
}
