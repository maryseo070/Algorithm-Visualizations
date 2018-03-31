import * as d3 from "d3";

let margin = {top: 50, right: 50, bottom: 230, left: 40};
let width = 800;
let height = 50;


const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "inline-block")
    .style("padding", 50)
    .attr("id", "quicksort");

svgSelection.append("text")
    .attr("x", 10)
    .attr("y", -10)
    .style("font-size", "16px")
    .style("font-family", "Courier")
    .text("Quick Sort: Click Below");

let quicksort = document.getElementById("quicksort");



export const sort = () => {
  let n = 300,
    data = d3.shuffle(d3.range(n)),
    actions = quickSort(data.slice()).reverse(),
    x = d3.scaleLinear().domain([0, n]).range([height, width - height]),
    a = d3.scaleLinear().domain([0, n - 1]).range([-45, 45]),
    duration = 250;

  let line = svgSelection.append("g")
    .attr("class", "line")
    .selectAll("line")
    .data(data)
    .enter().append("line")
    .attr("transform", transform)
    .attr("y2", -height)
    .style("stroke", "pink");

  let transition = d3.transition()
    .duration(duration)
    .on("start", function start() {
      let action = actions.pop();
      switch(action.type) {
        case "rotate": {
          debugger
          let current = action[0],
              next = action[1],
              currentLi = Array(line)[0][current],
              nextLi = Array(line)[1][next];
          line[0][current] = nextLi;
          line[1][next] = currentLi;
          transition.on(function () {
            line.transition().attr("transform", transform);
          });
          break;
        }
        case "partition": {
          line.attr("class", function(d, i) {
            return i === action.pivot ? "line--pivot"
            : action.left <= i && action.right? null
            : "line--inactive";
          });
          break;
        }
      }
      if (actions.length) {
        transition = transition.transition().on("start", start);
      }
      else {
        transition.on("end", function() { line.attr("class", null);} );
      }
    });

  function transform(d, i) {
    return "translate(" + x(i) + "," + height + ")rotate(" + a(d) + ")";
   }

  function quickSort(array) {
    let todos = [];
    function partition(left, right, pivot) {
      let midPt = array[pivot];
      rotate(pivot, --right);
      for (let i = left; i < right; i++) {
        if (array[i] <= midPt) {
          rotate(i, left++);
        }
        rotate(left, right);
        return left;
      }
    }

    function rotate(left, right) {
      if (left === right) return;
      let target = array[left];
      array[left] = array[right];
      array[right] = target;
      todos.push({type: "rotate", "0": left, "1": right});
    }

    function recursiveCall(left, right) {
      if (left < right - 1) {
        let pivot = (left + right) >> 1;
        todos.push({type: "partition", "left": left, "pivot": pivot, "right": right})
        pivot = partition(left, right, pivot);
        recursiveCall(left, pivot);
        recursiveCall(pivot + 1, right);
      }
    }
    recursiveCall(0, array.length);
    return todos;
  }
};

quicksort.addEventListener("click", () => sort());
