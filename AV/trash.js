import * as d3 from 'd3';

const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
.attr("width", 300)
.attr("height", 300);

export const makeCircles = () => {



  function generateCircle(x, y) {
    // debugger
    // d3.timer(function () {
      for (let i = 0; i < 10; i++) {
        svgSelection.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)
        .style("fill", "purple");

      }
    // })

  }


    //if you change the dimensions of SVG then remember to change
    //row and column dimensions as well

    let r  = 10; //min dstance between points
    let k = 30; //limit to # of samples to choose before rejection
    let grid = [];
    let w = r / Math.sqrt(2); //size of cells holding samples / n = 2 in the grid
    let active = [];
    let cols, rows;
    let ordered = [];

    function setup() {
      cols = Math.floor(400 / w);
      rows = Math.floor(400 / w);

      for (var i = 0; i < cols * rows; i++) {
        grid[i] = undefined;
      }
    }
    setup()


    let x = Math.floor(Math.random() * 400); //random point
    let y = Math.floor(Math.random() * 400); //random point
    let i = Math.floor(x / w); //column position of sample
    let j = Math.floor(y / w); //width position of sample
    let randomPoint = {x: x, y: y}; //point coordinates
    // debugger

    grid[i + j * cols] = randomPoint; //inserting the point into the grid

    active.push(randomPoint);


    function draw() {
      //TODO add while loop with cells of grid --until they all contain samples
      for (let total = 0; total < 8500; total++) {
        // console.log(ordered.length);
        if (active.length > 0) {

          let found = false;
          let randomIndex = Math.floor(Math.random() * active.length);
          let position = active[randomIndex];

          for (let m = 0; m < k; m++) {
            let magnitude = Math.floor(Math.random() * (r + 1)) + r;
            let randomAngle = Math.random() * Math.PI * 2
            let randomAngle2 = Math.random() * Math.PI * 2
            let sampleX = Math.cos(randomAngle) * magnitude + position.x
            let sampleY = Math.sin(randomAngle2) * magnitude + position.y
            let sample = {x: sampleX, y: sampleY}
            // console.log(sample)


            let colPosition = Math.floor(sample.x / w) // sample's position on the grid
            let rowPosition = Math.floor(sample.y / w)

            if (colPosition > -1 && rowPosition > -1 &&
                colPosition < cols && rowPosition < rows &&
                !grid[colPosition + rowPosition * cols]) {

              let acceptableDistance = true;

              for (let i = -1; i <= 1; i++) { //spot to left, spot to right
                for (let j = -1; j<= 1; j++) {
                  let neighborIndex = (colPosition + i) + (rowPosition + j) * cols
                  let neighbor = grid[neighborIndex]
                  // debugger
                  if (neighbor) {
                    let a = neighbor.x - sample.x
                    let b = neighbor.y - sample.y

                    let dist = Math.sqrt(a*a + b*b)//distance between sample and neighbor
                    if (dist < r) {
                      acceptableDistance = false;
                    }
                  }
                }
              }
              if (acceptableDistance) {
                found = true
                grid[colPosition + rowPosition * cols] = sample;
                active.push(sample);
                ordered.push(sample);
                break;
              }
            }


            // if (!found) {
            //   active.splice(randomIndex, 1);
            // }
          }
        }


      }
      function dots () {
        let generateDots = d3.timer( () => {
          for (let z = 0; z < ordered.length; z++) {
            generateCircle(ordered[z].x, ordered[z].y);
          }
        })
      }
      dots()
      //
      // for (var z = 0; z < ordered.length; z++) {
      //   if (ordered[z].x) {
      //     // console.log(ordered)
      //     // generateCircle(ordered[z].x, ordered[z].y)
      //
      //
      //   }
      // }
    }

    draw()
}
makeCircles()
