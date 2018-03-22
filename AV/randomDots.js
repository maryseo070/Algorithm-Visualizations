document.addEventListener("DOMContentLoaded", setup);

function setup() {
  var canvas = document.getElementById('myCanvas');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var ctx = canvas.getContext("2d");
  var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);


  randomDots()


  function randomDots() {
      let generateDots = d3.timer(() => {
        for (let i = 0; i < 10; i++) {
          let x = Math.floor(Math.random() * 500);
          let y = Math.floor(Math.random() * 500);
          ctx.beginPath(); //Start path
          ctx.arc(x, y, 1, 20, Math.PI * 2, true);
          ctx.fill();
        }
      });
      setTimeout(() => generateDots.stop(), 4000);
  }


  function makeDot(){
    let x = Math.floor(Math.random() * 500);
    let y = Math.floor(Math.random() * 500);
    ctx.beginPath(); //Start path
    ctx.arc(x, y, 1, 20, Math.PI * 2, true);
    ctx.fill();
  }
}