import * as d3 from "d3";

const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
  .attr("width", 800)
  .attr("height", 50)
  .attr("id", "rt")
  .style("display", "inline-block")
  .style("padding", 50);

svgSelection.append("text")
  .attr("x", 10)
  .attr("y", -10)
  .style("font-size", "16px")
  .style("font-family", "Courier")
  .text("Random Traversal: Click Below");

let rt = document.getElementById("rt");


export const traverse = () => {

};

rt.addEventListener("click", () => traverse());
