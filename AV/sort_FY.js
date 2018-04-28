import * as d3 from 'd3';

const bodySelection = d3.select("body");
const svg2 = bodySelection.append("svg")
.attr('width', 800)
.attr("height", 25)
.attr("id", "textbox")
.style("padding", 10);

const svgSelection = bodySelection.append("svg")
  .attr("width", 800)
  .attr("height", 50)
  .style("display", "inline-block")
  .attr("id", "fy");


svg2.append("text")
  .attr("x", 10)
  .attr("y", 10)
  .style("font-size", "16px")
  .style("font-family", "Courier")
  .text("Fisher-Yates Shuffle: Click Below");

let fy = document.getElementById("fy");




const play = () => {
  d3.selectAll("#fy > *").remove();
  shuffle();
};


export const shuffle = () => {

  let w = 800,
      h = 50;

  let n = 150,
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
      l.data(pass, Number)
          .transition()
          .duration(duration)
          .attr("transform", transform);

      if (passes.length) {
        setTimeout(update, duration);
      }
    }
  }

  function transform(d, i) {
    return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
  }

  function shuff(array) {
    var arrLength = array.length, target, i;
    let newArr = [];
    // var newArr = Array(array.length)
    // While there remain elements to shuffle…
    while (arrLength) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * arrLength--);
      // And swap it with the current element.
      target = array[arrLength];
      array[arrLength] = array[i];
      insert(i, i, target);
      newArr.push(array.slice());
    }

    function insert(s, end, tar) {
      array[s] = tar;
    }
    return newArr;
  }

};

fy.addEventListener("click", () => play());
