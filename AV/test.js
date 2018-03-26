// function mergesort(array, callback) {
//   if (array.length <= 1) return array;
//
//   if (!callback) callback = (left,  right) => {
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
