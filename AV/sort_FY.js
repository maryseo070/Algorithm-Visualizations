import * as d3 from 'd3';
import {scaleLinear} from "d3-scale";


// const bodySelection = d3.select("body");
// const svgSelection = bodySelection.append("svg")
//   .attr("width", 800)
//   .attr("height", 50)
//   .style("display", "inline-block")
//   .style("padding", 50)
//   .attr("id", "fy");
//
// svgSelection.append("text")
//   .attr("x", 10)
//   .attr("y", -10)
//   .style("font-size", "16px")
//   .style("font-family", "Courier")
//   .text("Fisher-Yates Shuffle: Click Below");

let fy = document.getElementById("fy")


var n = 200,
    array = d3.shuffle(d3.range(n)),
    actions = mergesort(array.slice()).reverse();

var margin = {top: 180, right: 40, bottom: 180, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .domain([1, 0])
    .rangeRoundBands([height, 0], .3);

var x = d3.scale.ordinal()
    .domain(d3.range(n))
    .rangePoints([0, width]);

var a = d3.scale.linear()
    .domain([0, n - 1])
    .range([-45, 45]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("text")
    .attr("x", 10)
    .attr("y", -10)
    .style("font-size", "16px")
    .style("font-family", "Courier")
    .text("Fisher-Yates Shuffle: Click Below");

var line = svg.append("g")
    .attr("class", "line")
  .selectAll("line")
    .data(array.map(function(v, i) {
      return {
        value: v,
        index: i,
        array: 0
      };
    }))
  .enter().append("line")
    .attr("transform", transform)
    .attr("y2", -y.rangeBand());

var line0 = line[0],
    line1 = new Array(n);

var transition = d3.transition()
    .duration(75)
    .each("start", function start() {
      var action = actions.pop();
      switch (action.type) {
        case "copy": {
          var i = action[0],
              j = action[1],
              e = line1[j] = line0[i],
              d = e.__data__;
          d.index = j;
          d.array = (d.array + 1) & 1;
          transition.each(function() { d3.select(e).transition().attr("transform", transform); });
          break;
        }
        case "swap": {
          var t = line0;
          line0 = line1;
          line1 = t;
          break;
        }
      }
      if (actions.length) transition = transition.transition().each("start", start);
    });

function transform(d) {
  return "translate(" + x(d.index) + "," + y(d.array) + ")rotate(" + a(d.value) + ")";
}

function mergesort(array) {
  var actions = [],
      n = array.length,
      array0 = array,
      array1 = new Array(n);

  for (var m = 1; m < n; m <<= 1) {
    for (var i = 0; i < n; i += (m << 1)) {
      merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
    }
    actions.push({type: "swap"});
    array = array0, array0 = array1, array1 = array;
  }

  function merge(left, right, end) {
    for (var i0 = left, i1 = right, j = left; j < end; ++j) {
      if (i0 < right && (i1 >= end || array0[i0] <= array0[i1])) {
        array1[j] = array0[i0];
        actions.push({type: "copy", "0": i0++, "1": j});
      } else {
        array1[j] = array0[i1];
        actions.push({type: "copy", "0": i1++, "1": j});
      }
    }
  }

  return actions;
};

fy.addEventListener("click", () => shuffle());
