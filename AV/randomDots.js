import * as d3 from 'd3';
// document.addEventListener("DOMContentLoaded", setup);

function setup() {
  var canvas = document.getElementById('myCanvas');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var ctx = canvas.getContext("2d");
  var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);



  function randomDots() {
      let generateDots = d3.timer(() => {
        for (let i = 0; i < 5; i++) {
          let x = Math.floor(Math.random() * 500);
          let y = Math.floor(Math.random() * 500);
          ctx.beginPath(); //Start path
          ctx.arc(x, y, 6, 20, Math.PI * 2, true);
          ctx.fill();
          // ctx.fillStyle = '#fff';
        }
      });
      setTimeout(() => generateDots.stop(), 3000);
  }

  randomDots();

}
setup();
