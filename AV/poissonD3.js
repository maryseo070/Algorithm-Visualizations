import * as d3 from 'd3';

const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
.attr("width", 300)
.attr("height", 300);


export const mc = () => {

  var start = draw();
  // debugger
  let generateDots = d3.timer(function () {
    for (let i = 0; i < 10; i++) {
      // debugger
      var s = start();
      if (!s) return true;
      svgSelection.append("circle")
      .attr("cx", s[0])
      .attr("cy", s[1])
      .attr("r", 4)
      .transition()
      // .attr("r", 2)
      .style("fill", "purple")
      // .style("stroke", function(d) { return d3.rgb(fill(d.id)).darker(2); })
    }
    setTimeout(() => generateDots.stop(), 3000);

  });
    //if you change the dimensions of SVG then remember to change
    //row and column dimensions as well

    let r  = 10; //min dstance between points
    let k = 30; //limit to # of samples to choose before rejection
    let grid = [];
    let w = r / Math.sqrt(2), //size of cells holding samples / n = 2 in the grid
        active = [],
        cols, rows,
        // ordered = [],
        // queue = [],
        queueSize = 0,
        sampleSize = 0;

    function setup() {
      cols = Math.floor(400 / w);
      rows = Math.floor(400 / w);

      for (var i = 0; i < cols * rows; i++) {
        grid[i] = undefined;
      }
    }

    setup();
    let x = Math.floor(Math.random() * 300); //random point
    let y = Math.floor(Math.random() * 300); //random point
    let i = Math.floor(x / w); //column position of sample
    let j = Math.floor(y / w); //width position of sample
    let randomPoint = {x: x, y: y}; //point coordinates

    grid[i + j * cols] = randomPoint; //inserting the point into the grid

    active.push(randomPoint);

    function draw() {
      // debugger
      return function() {
        debugger
        if (!sampleSize) return queueUp(Math.random() * 300, Math.random() * 300);
        // if (active.length > 0) {
        debugger

          while (queueSize) {
            debugger
            let idx = Math.random() * queueSize | 0,
            position = active[idx];
          // let found = false;
          // let randomIndex = Math.floor(Math.random() * active.length);
          // let position = active[randomIndex];

          for (let m = 0; m < k; m++) {
            debugger
            let magnitude = Math.floor(Math.random() * (r + 1)) + r;
            let randomAngle = Math.random() * Math.PI * 2;
            let randomAngle2 = Math.random() * Math.PI * 2;
            let sampleX = Math.cos(randomAngle) * magnitude + position.x;
            let sampleY = Math.sin(randomAngle2) * magnitude + position.y;
            let sample = {x: sampleX, y: sampleY};
            // console.log(sample)


            let colPosition = Math.floor(sample.x / w); // sample's position on the grid
            let rowPosition = Math.floor(sample.y / w);

            if (colPosition > -1 && rowPosition > -1 &&
                colPosition < cols && rowPosition < rows &&
                !grid[colPosition + rowPosition * cols]) {

              let acceptableDistance = true;

              for (let e = -1; e <= 1; e++) { //spot to left, spot to right
                // for (let p = -1; p<= 1; p++) {
                  let neighborIndex = (colPosition + i) + (rowPosition + j) * cols
                  let neighbor = grid[neighborIndex]
                  // debugger
                  if (neighbor) {
                    let a = neighbor.x - sample.x;
                    let b = neighbor.y - sample.y;

                    let dist = Math.sqrt(a*a + b*b);//distance between sample and neighbor
                    if (dist < r) {
                      acceptableDistance = false;
                      debugger
                    }
                  }
                // }
              }
              if (acceptableDistance) {
                return queueUp(sample.x, sample.y)
                debugger
              }
            }
          }
          active[idx] = active[--queueSize];
          active.length = queueSize;
        }
        // }
      }
    }
    function queueUp(a, b){
      var samp = [a, b];
      active.push(samp);
      // found = true;
      // grid[300 * (b / w | 0) + (a / w | 0)] = samp;
      // ordered.push(samp);
      ++sampleSize;
      ++queueSize;
      return samp;
    }
};


mc();
