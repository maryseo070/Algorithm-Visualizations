import * as d3 from 'd3';

const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
.attr("width", 300)
.attr("height", 300);



export const mc = () => {

  var start = draw();

  d3.timer(function () {
    for (let i = 0; i < 5; i++) {

      var s = start();
      if (!s) return true;
      svgSelection.append("circle")
      .attr("cx", s[0])
      .attr("cy", s[1])
      .attr("r", 1)
      .transition()
      // .attr("r", 2)
      .style("fill", "black")
      // .style("stroke", function(d) { return d3.rgb(fill(d.id)).darker(2); })
    }
    // setTimeout(() => generateDots.stop(), 3000);

  });
    //if you change the dimensions of SVG then remember to change
    //row and column dimensions as well



    function draw() {
      let r  = 10; //min dstance between points
      let k = 30; //limit to # of samples to choose before rejection
      let radius2 = r * r;
      let R = 3 * radius2;
      let w = r * Math.SQRT1_2, //size of cells holding samples / n = 2 in the grid
      active = [],
      queueSize = 0,
      sampleSize = 0;
      let cols = Math.floor(300 / w),
          rows = Math.floor(300 / w);
      let grid = new Array(cols * rows);

      return function() {

        if (!sampleSize) return queueUp(Math.random() * 300, Math.random() * 300);

          while (queueSize) {

          let idx = Math.random() * active.length | 0;
          let position = active[idx];

          for (let m = 0; m < k; ++m) {

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
        let colPosition = x / w | 0; // sample's position on the grid
        let rowPosition = y / w | 0;
        let i0 = Math.max(colPosition - 2, 0),
            j0 = Math.max(rowPosition - 2, 0),
            i1 = Math.min(colPosition + 3, cols),
            j1 = Math.min(rowPosition + 3, rows);

        for (rowPosition = j0; rowPosition < j1; ++rowPosition) {
          var o = rowPosition * cols;
          for (colPosition = i0; colPosition < i1; ++colPosition) {

            if (s = grid[o + colPosition]) {
              var s,
                  dx = s[0] - x,
                  dy = s[1] - y;

              if (dx * dx + dy * dy < radius2) return false;
            }
          }
        }

        return true;

      }

    function queueUp(a, b){
      var samp = [a, b];
      active.push(samp);
      grid[cols * (b / w | 0) + (a / w | 0)] = samp;
      ++sampleSize;
      ++queueSize;
      return samp;
    }
  }
};


mc();
