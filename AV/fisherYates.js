document.addEventListener("DOMContentLoaded", shuffle);

function shuffle() {
  const bodySelection = d3.select("body")
  const svgSelection = bodySelection.append("svg")
  .attr("width", 400)
  .attr("height", 400);


  var samp = shuffleSample();

  //
  d3.timer( () => {
    for (let i = 0; i < 10; i ++) {
      var s = samp();
      // debugger
      if (!s) return true;
      const line = svgSelection.append("line")
      .style("stroke", "green")
      .attr("x1", s[0])     // x position of the first end of the line
      .attr("y1", 0)      // y position of the first end of the line
      .attr("x2", s[1])     // x position of the second end of the line
      .attr("y2", 30)    // y position of the second end of the line
      .transition()
    }
  })


  // function drawLines() {
  //   for (let i = 0; i < 10; i ++) {
  //     let s = sample();
  //     // debugger
  //     if (!s) return true;
  //     const line = svgSelection.append("line")
  //     .style("stroke", "green")
  //     .attr("x1", s[0])     // x position of the first end of the line
  //     .attr("y1", 0)      // y position of the first end of the line
  //     .attr("x2", s[1])     // x position of the second end of the line
  //     .attr("y2", 30)    // y position of the second end of the line
  //     .transition()
  //   }
  // }
  //
   // drawLines()

  function shuffleSample() {
    var queue = [],
    queueSize = 0,
    sampleSize = 0;
    let arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    debugger
    return function() {
      while (sampleSize <= 0) {
        return sample(Math.random() * 20, Math.random() * 20);
      }
      // debugger
      if (queueSize > 0) {
        debugger
        var i = Math.random() * queueSize | 0,
            s = queue[i];
            for (var j = 0; j < arr.length; j++) {
              var x1 = arr[j],
                  x2 = arr[j + 1]
            if (x1 >= 0 && x2 >= 0 && x1 < 400 && x2 < 400) return sample(x1, x2);
            debugger
          }
          // debugger
            queue[i] = queue[--queueSize];
            queue.length = queueSize;
            // drawLines();
      }
    };

    function sample(x1, x2) {
      // debugger
      var s = [x1, x2]
      // debugger
      queue.push(s);
      ++queueSize;
      ++sampleSize;
      return s;
    }
  }

  //
  // function shuffle(array) {
  //   var m = array.length, t, i;
  //
  //   // While there remain elements to shuffle…
  //   while (m) {
  //
  //     // Pick a remaining element…
  //     i = Math.floor(Math.random() * m--);
  //
  //     // And swap it with the current element.
  //     t = array[m];
  //     array[m] = array[i];
  //     array[i] = t;
  //   }
  //
  //   return array;
  // }

}
