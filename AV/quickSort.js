import * as d3 from "d3";

let margin = {top: 50, right: 50, bottom: 230, left: 40};
let width = 800;
let height = 50;

const bodySelection = d3.select("body");

const svg2 = bodySelection.append("svg")
.attr('width', 800)
.attr("height", 25)
.attr("id", "textbox")
.style("padding", 10);

const svgSelection = bodySelection.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "inline-block")
    .attr("id", "quicksort")
    // .append("g");


svg2.append("text")
    .attr("x", 10)
    .attr("y", 10)
    .style("font-size", "16px")
    .style("font-family", "Courier")
    .text("Quick Sort: Click Below");

let quicksort = document.getElementById("quicksort");

const play = () => {
  d3.selectAll("#quicksort > *").remove();
  sort();
};


export const sort = () => {

  let n = 100,
      data = d3.shuffle(d3.range(n)),
      actions = quickSort(data.slice()).reverse(),
      x = d3.scaleLinear().domain([0, n]).range([height, width - height]),
      a = d3.scaleLinear().domain([0, n - 1]).range([-45, 45]),
      duration = 150;

  let line = svgSelection.append("g")
    .attr("class", "line")
    .selectAll("line")
    .data(data)
    .enter().append("line")
    .attr("transform", transform)
    .attr("y2", -height)
    .style("stroke", "purple");

  let transition = d3.transition()
    .duration(duration)
    .on("start", function start() {
      let action = actions.pop();
          let mid = action[0],
              end = action[1],
              midLi = (line._groups)[0][mid],
              endLi = (line._groups)[0][end];
          line._groups[0][mid] = endLi;
          line._groups[0][end] = midLi;
          transition.each(function() { line.transition().attr("transform", transform); });

      if (actions.length) {
        transition = transition.transition().on("start", start);
      }

    });

  function transform(d, i) {
    return "translate(" + x(i) + "," + height + ")rotate(" + a(d) + ")";
   }

  function quickSort(array) {
    let todos = [];

    function partition(left, right, pivot) {
      let target = array[pivot];
      rotate(pivot, --right);
      for (let i = left; i < right; ++i) {
        if (array[i] <= target) rotate(i, left++);
      }
      rotate(left, right);
      return left;
    }

    function rotate(left, right) {
      if (left === right) return;
      let target = array[left];
      array[left] = array[right];
      array[right] = target;
      todos.push([left, right]);
    }

    function recursiveCall(left, right) {
      if (left < right - 1) {
        let pivot = partition(left, right, (left + right) >> 1);
        recursiveCall(left, pivot);
        recursiveCall(pivot + 1, right);
      }
    }
    recursiveCall(0, array.length);
    return todos;
  }

};

quicksort.addEventListener("click", () => play());
