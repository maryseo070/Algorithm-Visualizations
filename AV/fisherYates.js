// import * as d3 from 'd3';
document.addEventListener("DOMContentLoaded", shuffle);
function shuffle() {
  const bodySelection = d3.select("body");
  const svgSelection = bodySelection.append("svg")
  .attr("width", 400)
  .attr("height", 400);


  var samp = shuffleSample();

  //
  d3.timer( () => {
    for (let i = 0; i < 10; i ++) {
      var s = samp();
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
    // let arr = [5, 10, 15, 20, 25, 30]
        let arr = [97,5,34,74,23,18]
    return function() {
      if (sampleSize <= 0) {
        return sample(Math.random() * 20, Math.random() * 20);
      }

      while (queueSize > 0) {
        var i = Math.random() * queueSize | 0,
            s = queue[i];
            for (var j = 0; j < arr.length; j++) {
              var randomIndex = Math.random() * arr.length | 0
              var randomIndex2 = Math.random() * arr.length | 0
              var randomPair = arr[randomIndex]
              var randomPair2 = arr[randomIndex2]
              var x1 = randomPair,
                  x2 = randomPair2
              if (x1 >= 0 && x2 >= 0 && x1 < 400 && x2 < 400) {
                return sample(x1, x2);
              }
          }
            queue[i] = queue[--queueSize];
            queue.length = queueSize;
      }
    };

    function sample(x1, x2) {
      var s = [x1, x2]
      queue.push(s);
      ++queueSize;
      ++sampleSize;
      return s;
    }
  }


  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

}
