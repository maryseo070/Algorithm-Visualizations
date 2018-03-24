import * as d3 from "d3";
import {scaleLinear} from "d3-scale";


const bodySelection = d3.select("body");
const svgSelection = bodySelection.append("svg")
.attr("width", 200)
.attr("height", 200);


export const mergesort = (array) => {
  let sorted = [],
      i,
      j,
      n = array.length,
      increment = 1;

  // double the size each pass
  while (increment < array.length) {
    debugger
    i = j = 0; while (i < array.length) j += merge(i, i += increment, i += increment);
    if (j) sorted.push(array.slice());
    else increment <<= 1;
    debugger
  }

  // Merges two adjacent sorted arrays in-place.
  function merge(start, middle, end) {
    middle = Math.min(array.length, middle);
    end = Math.min(array.length, end);
    for (; start < middle; start++) {
      if (array[start] > array[middle]) {
        let starter = array[start];
        array[start] = array[middle];
        stepper(middle, end, starter);
        return true;
      }
    }
    return false;
  }

  // Inserts the value v into the subarray specified by start and end.
  function stepper(start, end, v) {
    while (start + 1 < end && array[start + 1] < v) {
      let tmp = array[start];
      array[start] = array[start + 1];
      array[start + 1] = tmp;
      start++;
    }
    array[start] = v;
  }

  return sorted;
}
// console.log(mergesort([1,3,56,2,4,8]));
//
//
// Array.prototype.mergeSort = function (func) {
//   if (this.length <= 1) return this;
//
//   if (!func) func = (left,  right) => {
//     return left < right ? -1 : left > right ? 1 : 0;
//   }
//
//   const midpoint = Math.floor(this.length / 2);
//   const sortedLeft = this.slice(0, midpoint).mergeSort(func);
//   const sortedRight = this.slice(midpoint).mergeSort(func);
//   debugger
//   return sortedLeft.merge(sortedRight, func);
//
//   function merge (arr, func) {
//     let merged = [];
//
//     while (this.length && arr.length) {
//       switch(func(this[0], arr[0])) {
//         case -1:
//         merged.push(this.shift());
//         break
//         case 0:
//         merged.push(this.shift());
//         break
//         case 1:
//         merged.push(arr.shift());
//         break
//       }
//     }
//
//     function insert(start, end, v) {
//       while (start + 1 < end && this[start + 1] < v) {
//         let tmp = this[start];
//         this[start] = this[start + 1];
//         this[start + 1] = tmp;
//         start++;
//       }
//       this[start] = v;
//     }
// }
//
//
//
//   merged = merged.concat(this);
//   merged = merged.concat(arr);
//
//   return merged;
// }
// console.log(([1,3,56,2,4,8]).mergeSort())
