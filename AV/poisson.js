document.addEventListener("DOMContentLoaded", makeCircle);

function makeCircle () {
  const bodySelection = d3.select("body");
  const svgSelection = bodySelection.append("svg")
  .attr("width", 200)
  .attr("height", 200);
  var circleSelection = svgSelection.append("circle")
  .attr("cx", 2)
  .attr("cy", 2)
  .attr("r", 2)
  .style("fill", "purple");

}

function generateCircles () {
  
}




// const poissonCanvas = d3.select("svg")
//
// poissonCanvas.append("circle")
//         .attr("cx", 5)
//         .attr("cy", 5)
//         .attr("r", 5)
//         .attr("fill", 'purple');
