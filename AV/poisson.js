
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
