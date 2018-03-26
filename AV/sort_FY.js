import * as d3 from 'd3';

const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
  .attr("width", 800)
  .attr("height", 50)
  .style("display", "inline-block")
  .style("padding", 50)
  .attr("id", "fy");

svgSelection.append("text")
  .attr("x", 10)
  .attr("y", -10)
  .style("font-size", "16px")
  .style("font-family", "Courier")
  .text("Fisher-Yates Shuffle: Click Below");

let fy = document.getElementById("fy")

export const shuffle = () => {
  let w = 800,
      h = 50;

  let n = 300,
      x = d3.scaleLinear().domain([0, n]).range([h, w - h]),
      a = d3.scaleLinear().domain([0, n - 1]).range([90 + 60, 270 - 60]),
      data = (d3.range(n)),
      duration = 250;

  let l = svgSelection.selectAll("line")
    .data(data)
    .enter().append("line")
    .style("stroke", "pink")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", h)
      .attr("transform", transform);

  start();

  function start() {
    let passes = shuff(data).reverse();

    update();

    function update() {
      let pass = passes.pop();
      // debugger
      l.data(pass, Number)
          .transition()
          .duration(duration)
          .attr("transform", transform);

      if (passes.length) {
        // debugger
        setTimeout(update, duration);
      }

        // debugger
        // setTimeout(start, duration + 4000);
      // }
    }
  }

  function transform(d, i) {
    return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
  }

  function shuff(array) {
    var arrLength = array.length, target, i;

    // While there remain elements to shuffle…
    while (arrLength) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * arrLength--);

      // And swap it with the current element.
      target = array[arrLength];
      array[arrLength] = array[i];
      array[i] = target;
    }
    return array;
  }
};

fy.addEventListener("click", () => shuffle());
