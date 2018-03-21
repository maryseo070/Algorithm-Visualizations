document.addEventListener("DOMContentLoaded", setup);

function setup() {
  var canvas = document.getElementById('myCanvas');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var ctx = canvas.getContext("2d");
  var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "green"; // Red color

  createDots()

  function createDots() {

    let m = 0;
    while (m < 200) {
      m++;
      var generateDots = d3.timeout(makeDot, 20);
      // makeDot()

    }
    // generateDots.stop();
  }

  function makeDot(){
    let x = Math.floor(Math.random() * 500);
    let y = Math.floor(Math.random() * 500);
    ctx.beginPath(); //Start path
    ctx.arc(x, y, 1, 20, Math.PI * 2, true);
    ctx.fill();
  }
}
