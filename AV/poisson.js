
var width = 960,
    height = 500;
var sample = poissonDiscSampler(width, height, 10);
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
d3.timer(function() {
  for (var i = 0; i < 10; ++i) {
    var s = sample();
    if (!s) return true;
    svg.append("circle")
        .attr("cx", s[0])
        .attr("cy", s[1])
        .attr("r", 0)
      .transition()
        .attr("r", 2);
  }
});
// Based on https://www.jasondavies.com/poisson-disc/
function poissonDiscSampler(width, height, radius) {
  var k = 30, // maximum number of samples before rejection
      radius2 = radius * radius,
      R = 3 * radius2,
      cellSize = radius * Math.SQRT1_2,
      gridWidth = Math.ceil(width / cellSize),
      gridHeight = Math.ceil(height / cellSize),
      grid = new Array(gridWidth * gridHeight),
      queue = [],
      queueSize = 0,
      sampleSize = 0;
  return function() {
    if (!sampleSize) return sample(Math.random() * width, Math.random() * height);
    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      var i = Math.random() * queueSize | 0,
          s = queue[i];
      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (var j = 0; j < k; ++j) {
        var a = 2 * Math.PI * Math.random(),
            r = Math.sqrt(Math.random() * R + radius2),
            x = s[0] + r * Math.cos(a),
            y = s[1] + r * Math.sin(a);
        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) return sample(x, y);
      }
      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };
  function far(x, y) {
    var i = x / cellSize | 0,
        j = y / cellSize | 0,
        i0 = Math.max(i - 2, 0),
        j0 = Math.max(j - 2, 0),
        i1 = Math.min(i + 3, gridWidth),
        j1 = Math.min(j + 3, gridHeight);
    for (j = j0; j < j1; ++j) {
      var o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        if (s = grid[o + i]) {
          var s,
              dx = s[0] - x,
              dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) return false;
        }
      }
    }
    return true;
  }
  function sample(x, y) {
    var s = [x, y];
    queue.push(s);
    grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
    ++sampleSize;
    ++queueSize;
    return s;
  }
}

  // let line ==  ("20", 0), ("25", 30)
  //                     x1          x2
  // let x1 = 50
  // let x2 = 50
  // let decrementer = 1
  //
  // var arr =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  // let coords = [];
  // var median = 8
  // var lower_half = arr[0..7]
  //
  // for (let i = 0; i < lower_half.length; i++) {
  //   coords.push([x1 - (decrementer * 1.2), x2 - decrementer])
  //   decrementer ++
  // }









  var margin = {top: 230, right: 30, bottom: 230, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var n = 240,
    index = d3.range(n),
    data = shuffle(index.slice());

var x = d3.scale.ordinal().domain(index).rangePoints([0, width]),
    a = d3.scale.linear().domain([0, n - 1]).range([-Math.PI / 4, Math.PI / 4]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

var line = svg.selectAll("line")
    .data(data)
  .enter().append("line")
    .attr("index", function(d, i) { return "i" + i; })
    .attr("x2", function(d) { return height * Math.sin(a(d)); })
    .attr("y2", function(d) { return -height * Math.cos(a(d)); })
    .attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });

// Fisher–Yates shuffle
function shuffle(array) {
  var i = array.length, j, t;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
  return array;
}

// function quicksort(array) {
//   var actions = [];
//
//   function partition(left, right, pivot) {
//     var v = array[pivot];
//     swap(pivot, --right);
//     for (var i = left; i < right; ++i) if (array[i] <= v) swap(i, left++);
//     swap(left, right);
//     return left;
//   }
//
//   function swap(i, j) {
//     var t = array[i];
//     array[i] = array[j];
//     array[j] = t;
//     actions.push({type: "swap", i: i, j: j});
//   }
//
//   function recurse(left, right) {
//     if (left < right) {
//       var pivot = left + ~~(Math.random() * (right - left));
//       actions.push({type: "partition", pivot: pivot});
//       pivot = partition(left, right, pivot);
//       recurse(left, pivot);
//       recurse(pivot + 1, right);
//     }
//   }
//
//   recurse(0, array.length);
//   return actions;
// }

var actions = quicksort(data).reverse();

setInterval(function step() {
  var action = actions.pop();
  if (action) switch (action.type) {
    case "partition": {
      line.style("stroke", function(d, i) { return i == action.pivot ? "red" : null; });
      step();
      break;
    }
    case "swap": {
      var t = line[0][action.i];
      line[0][action.i] = line[0][action.j];
      line[0][action.j] = t;
      line.attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
      break;
    }
  }
}, 20);






Array.prototype.mergeSort = function (callback) {
  if (this.length <= 1) return this;

  if (!callback) callback = (left,  right) => {
    return left < right ? -1 : left > right ? 1 : 0;
  }

  const mid = Math.floor(this.length / 2);
  const sortedLeft = this.slice(0, mid).mergeSort(callback);
  const sortedRight = this.slice(mid).mergeSort(callback);

  return sortedLeft.merge(sortedRight, callback);
}

Array.prototype.merge = function (arr, callback) {
  let merged = [];

  while (this.length && arr.length) {
    switch(callback(this[0], arr[0])) {
      case -1:
        merged.push(this.shift());
        break
      case 0:
        merged.push(this.shift());
        break
      case 1:
        merged.push(arr.shift());
        break
    }
  }

  merged = merged.concat(this);
  merged = merged.concat(arr);

  return merged;
}
