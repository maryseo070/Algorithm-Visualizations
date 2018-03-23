// import * as d3 from "d3";
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
      .style("stroke", "pink")
      .attr("x1", s[0])     // x position of the first end of the line
      .attr("y1", 0)      // y position of the first end of the line
      .attr("x2", s[1])     // x position of the second end of the line
      .attr("y2", 30)    // y position of the second end of the line
      .transition();
    }
  });


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

  function positionLines() {
    let x1 = 50
    let x2 = 50
    let decrementer = 1
    let incrementer = 1
    // var arr =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1,1,1,1,1,1,1,1,1,1,1,1,]
    let coords = [];
    var median = 8

    for (let i = 0; i <= 20; i++) {
      debugger
      coords.push([x1 - (decrementer * 3), x2 - (decrementer * 2)])
      decrementer = decrementer - 6
    }
    for (let j = 21; j < 50; j++) {
      debugger
      coords.push([x1 + (decrementer * 2), x2 + (decrementer * 3)]);
      incrementer += 6;
    }
    return coords;
  }

  function shuffleSample() {
    var queue = [],
    queueSize = 0,
    sampleSize = 0;
    // let arr = [5, 10, 15, 20, 25, 30]
        // let arr = [[0,0],[5,5],[10,10],[15,15],[20,20],[25,25],[30,30],[35,35],[40, 40]];
        // var arr =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        let array = positionLines();
        console.log(array)
    return function() {
      if (sampleSize <= 0) {
        return sample(Math.random() * 20, Math.random() * 20);
      }

      while (queueSize > 0) {
        var i = Math.random() * queueSize | 0,
            s = queue[i];
            for (var j = 0; j < 2; j++) {
              var randomIndex = Math.random() * array.length | 0;
              var randomPair = array[randomIndex];
              var x1 = randomPair[0],
                  x2 = randomPair[1];
              // if (x1 >= 0 && x2 >= 0 && x1 < 400 && x2 < 400) {
                return sample(x1, x2);
              // }
          }
            queue[i] = queue[--queueSize];
            queue.length = queueSize;
      }
    };

    function sample(x1, x2) {
      var s = [x1, x2];
      queue.push(s);
      ++queueSize;
      ++sampleSize;
      return s;
    }
  }


  function shuffle2(array) {
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
