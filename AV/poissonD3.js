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



    function draw() {
      let r  = 10; //min dstance between points
      let k = 30; //limit to # of samples to choose before rejection
      let grid = [];
      let radius2 = r * r;
      let R = 3 * radius2;
      let w = r / Math.sqrt(2), //size of cells holding samples / n = 2 in the grid
      active = [],
      queueSize = 0,
      sampleSize = 0;
      let cols = Math.floor(300 / w),
      rows = Math.floor(300 / w);

      // let x = Math.floor(Math.random() * 300); //random point
      // let y = Math.floor(Math.random() * 300); //random point
      // let i = Math.floor(x / w); //column position of sample
      // let j = Math.floor(y / w); //width position of sample
      // let randomPoint = {x: x, y: y}; //point coordinates
      //
      // grid[i + j * cols] = randomPoint; //inserting the point into the grid

      // active.push(randomPoint);
      // debugger
      return function() {

        if (!sampleSize) return queueUp(Math.random() * 300, Math.random() * 300);
        // if (active.length > 0) {

          while (queueSize) {
            // let idx = Math.random() * queueSize | 0,

          let idx = Math.floor(Math.random() * active.length) | 0;
          let position = active[idx];

          for (let m = 0; m < k; m++) {

            let angle = 2 * Math.PI * Math.random(),
                rad = Math.sqrt(Math.random() * R + radius2),
                samplex = position[0] + r * Math.cos(rad),
                sampley = position[1] + r * Math.sin(rad);

            if (0 <= samplex && samplex < 300 && 0 <= sampley && sampley < 300 && dist(samplex, sampley)) {
              return queueUp(samplex, sampley);
            }
          }
          active[idx] = active[--queueSize];
          active.length = queueSize;
        }
      };

      function dist(x, y) {
        let colPosition = Math.floor(x / w) | 0; // sample's position on the grid
        let rowPosition = Math.floor(y / w) | 0;
        let i0 = Math.max(colPosition - 2, 0),
            j0 = Math.max(rowPosition - 2, 0),
            i1 = Math.min(colPosition + 3, cols),
            j1 = Math.min(rowPosition + 3, rows);

        for (rowPosition = j0; rowPosition < j1; ++rowPosition) {
          var o = rowPosition * cols;
          for (colPosition = i0; colPosition < i1; ++colPosition) {
            if (position = grid[o + rowPosition]) {
              var s,
                  dx = s[0] - x,
                  dy = s[1] - y;
              if (dx * dx + dy * dy < radius2) return false;
            }
          }
        }
        return true;

      }
        //
        //
        //     if (colPosition > -1 && rowPosition > -1 &&
        //         colPosition < cols && rowPosition < rows &&
        //         !grid[colPosition + rowPosition * cols]) {
        //
        //       let acceptableDistance = true;
        //
        //       for (let e = -1; e <= 1; e++) { //spot to left, spot to right
        //         for (let p = -1; p<= 1; p++) {
        //           let neighborIndex = (colPosition + e) + (rowPosition + p) * cols
        //           let neighbor = grid[neighborIndex]
        //           debugger
        //           if (neighbor) {
        //             let a = neighbor.x - sample.x;
        //             let b = neighbor.y - sample.y;
        //
        //             let dist = Math.sqrt(a*a + b*b);//distance between sample and neighbor
        //             debugger
        //             if (dist < r) {
        //               debugger
        //               acceptableDistance = false;
        //             }
        //           }
        //         }
        //       }
        //       if (acceptableDistance) {
        //         return queueUp(sample.x, sample.y)
        //       }
        //     }
        //   }
        //   active[idx] = active[--queueSize];
        //   active.length = queueSize;
        // }
        // }
      // }
    // }
    function queueUp(a, b){
      var samp = [a, b];
      active.push(samp);
      ++sampleSize;
      ++queueSize;
      return samp;
    }
  }
};


mc();
