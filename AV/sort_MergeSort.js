import * as d3 from "d3";
// import {scaleLinear} from "d3-scale";


const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
  .attr("width", 800)
  .attr("height", 50)
  .attr("id", "merge")
  .style("display", "inline-block")
  .style("padding", 50);


svgSelection.append("text")
  .attr("x", 10)
  .attr("y", -10)
  .style("font-size", "16px")
  .style("font-family", "Courier")
  .text("Merge Sort: Click Below");

let mergeSrt = document.getElementById("merge");


export const generateLines = () => {

  let w = 800,
      h = 50;

  let n = 300,
      x = d3.scaleLinear().domain([0, n]).range([h, w - h]),
      a = d3.scaleLinear().domain([0, n - 1]).range([90 + 60, 270 - 60]),
      data = d3.shuffle(d3.range(n)),
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
    let passes = mergesort(data).reverse();


    update();

    function update() {
      let pass = passes.pop();
      // debugger

      l.data(pass, Number)
          .transition()
          .duration(duration)
          .attr("transform", transform);

      if (passes.length) {
        setTimeout(update, duration);
      }
        // d3.shuffle(data);
        // debugger
        // setTimeout(start, duration + 4000);

    }
  }

  function transform(d, i) {
    return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
  }

  // let trans = d3.transform()
  //   .translate(function(d, i) { return [x(i), h]})
  //   .rotate(a(d));

  // Sorts the specified array using bottom-up mergesort, returning an array of
  // arrays representing the state of the specified array after each insertion for
  // each parallel pass. The first pass is performed at size = 2.
  function mergesort(array) {
    let sorted = [],
        size,
        j,
        m = 1;

    // double the size each pass
    while (m < array.length) {
      size = j = 0;
      while (size < array.length) {
        j += merge(size, size += m, size += m);
        //adding true to j increments it by 1
        //adding false increments it by 0....after being 0 it will always be true
      }
      if (j) sorted.push(array.slice());
      else m *= 2;
    }

    //checks if arra[start] > arrat[middle] and if so switches them
    //if not returns false
    function merge(start, middle, end) {
      middle = Math.min(array.length - 1, middle);
      end = Math.min(array.length - 1, end);
      for (; start < middle; start++) {
        if (array[start] > array[middle]) { //i.e., if array[0] > array[1]
          let v = array[start]; //set v = array[0]
          array[start] = array[middle]; //set array[0] = array[1]
          insert(middle, end, v); //insert v into array[0]'s position
          return true;
        }
      }
      return false;
    }

    // Inserts the value target into the subarray specified by start and end.
    function insert(startIdx, endIdx, target) {
      while (startIdx + 1 < endIdx && array[startIdx + 1] < target) {
        let temp = array[startIdx];
        array[startIdx] = array[startIdx + 1];
        array[startIdx + 1] = temp;
        startIdx++;
      }
      array[startIdx] = target;
    }
    return sorted;
  }

};
  mergeSrt.addEventListener("click", () => generateLines());
