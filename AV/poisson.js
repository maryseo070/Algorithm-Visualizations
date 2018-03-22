document.addEventListener("DOMContentLoaded", makeCircle);

function makeCircle () {
  const bodySelection = d3.select("body");
  const svgSelection = bodySelection.append("svg")
    .attr("width", 400)
    .attr("height", 400);
  const circleSelection = svgSelection.append("circle")
    .attr("cx", 50)
    .attr("cy", 100)
    .attr("r", 2)
    .style("fill", "purple");


  function generateCircle(x, y) {
    svgSelection.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 2)
        .style("fill", "purple");

  }

    //if you change the dimensions of SVG then remember to change
    //row and column dimensions as well

    let r  = 2; //min dstance between points
    let k = 30; //limit to # of samples to choose before rejection
    let grid = [];
    let w = r / Math.sqrt(2); //size of cells holding samples / n = 2
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


    let x = Math.floor(Math.random() * 400);
    let y = Math.floor(Math.random() * 400);
    let i = Math.floor(x / w); //column position of sample
    let j = Math.floor(y / w); //width position of sample
    let pos = generateCircle(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);

    if (active.length > 0) {
      let randomIndex = Math.floor(Math.random() * active.length);
      let position = active[randomIndex];
      for (let m = 0; m < k; m++) {
        let magnitude = Math.floor((Math.random() * r) * (Math.random() * 2 * r) );
      }
    }
}





// const poissonCanvas = d3.select("svg")
//
// poissonCanvas.append("circle")
//         .attr("cx", 5)
//         .attr("cy", 5)
//         .attr("r", 5)
//         .attr("fill", 'purple');
