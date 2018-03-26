import * as d3 from "d3";
import {scaleLinear} from "d3-scale";


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

let merge = document.getElementById("merge")


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

  // Start the animation!
  function start() {
    let passes = mergesort(data).reverse();

    update();

    function update() {
      let pass = passes.pop();

      l.data(pass, Number)
          .transition()
          .duration(duration)
          .attr("transform", transform);

      if (passes.length) {
        setTimeout(update, duration);
      } else {
        d3.shuffle(data);
        setTimeout(start, duration + 4000);
      }
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
        i,
        low,
        arrLength = array.length,
        size = 1;

    // double the size each pass
    while (size < arrLength) {
      for (size = 1; size < arrLength; size=size * 2) {
        for (let low = 0; low < arrLength - size; low += (size * 2)) {
          let middle = low + size - 1;
          let high = Math.min(low + (size*2 - 1), arrLength - 1)
          merge(low, middle, high)
        }
        // if (low) sorted.push(array.slice());
      }
      // return array
      // i = j = 0; while (i < array.length) j += merge(i, i += m, i += m);
      // if (j) sorted.push(array.slice());
      // else m <<= 1;
    }

    // Merges two adjacent sorted arrays in-place.
    function merge(start, middle, end) {
      debugger
      middle = Math.min(array.length, middle);
      end = Math.min(array.length, end);
      debugger
      for (; start < middle; start++) { //size of subarray
        if (array[start] > array[middle]) {
          debugger
          let v = array[start];
          array[start] = array[middle]; //move the one on the right to the left
          insert(middle, end, v);
          return true;
        }
      }
      return false;
    }

    // Inserts the value v into the subarray specified by start and end.
    function insert(startIdx, endIdx, target) {
      while (startIdx + 1 < endIdx && array[startIdx + 1] < target) { //while startIdx and end are at least 2
        //while array[startIdx + 1] is less than the target valu
        let temp = array[startIdx]; //temporary = array[startIdx]
        array[startIdx] = array[startIdx + 1]; // array[startIdx] is the next value
        array[startIdx + 1] = temp; // the next value is set to temporary
        start++; //start incremented
      }
      array[start] = target; //array[start] is target value once the while loop breaks
    }

    return sorted;
  }
  // function mergesort(array) {
  //   if (array.length <= 1) return array;
  //
  //   let callback = (left,  right) => {
  //     return left < right ? -1 : left > right ? 1 : 0;
  //   };
  //
  //   const mid = Math.floor(array.length / 2);
  //   const sortedLeft = mergesort(array.slice(0, mid), callback);
  //   const sortedRight = mergesort(array.slice(mid), callback);
  //
  //   return merge(sortedLeft, sortedRight, callback);
  // }
  //
  // function merge(left, right, callback) {
  //   let merged = [];
  //
  //   while (left.length && right.length) {
  //     switch(callback(left[0], right[0])) {
  //       case -1:
  //         merged.push(left.shift());
  //         break;
  //       case 0:
  //         merged.push(left.shift());
  //         break;
  //       case 1:
  //         merged.push(right.shift());
  //         break;
  //     }
  //   }
  //
  //   merged = merged.concat(left);
  //   merged = merged.concat(right);
  //
  //   return merged;
  // }

};
  merge.addEventListener("click", () => generateLines());
