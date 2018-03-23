document.addEventListener("DOMContentLoaded", shuffle);

function shuffle() {
  const bodySelection = d3.select("body")
  const svgSelection = bodySelection.append("svg")
  .attr("width", 400)
  .attr("height", 400);
  
  
  var invoke = shuffleSample(); 
  
  d3.timer( () => {
    for (let i = 0; i < 10; i ++) {
      let s = sample();
      // debugger
      if (!s) return true;
      const line = svgSelection.append("line")  
      .style("stroke", "green") 
      .attr("x1", s[0])     // x position of the first end of the line
      .attr("y1", 0)      // y position of the first end of the line
      .attr("x2", s[1])     // x position of the second end of the line
      .attr("y2", 30);    // y position of the second end of the line
    }
  })
  
  
  
  
  // let queue = []
  var width = 400;
  var height = 400;
  var queue = [],
  queueSize = 0,
  sampleSize = 0;
  
  
  function shuffleSample() {
    debugger
    var queue = [],
        queueSize = 0,
        sampleSize = 0;
    return function() {
      // debugger
      if (sampleSize < 1) return sample(Math.random() * 20, Math.random() * 20);
      // debugger
      let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      while (queueSize) {
        // debugger
        var i = Math.random() * queueSize | 0,
            s = queue[i]; 
            for (var j = 0; j < arr.length; j++) {
              var x1 = arr[j],
                  x2 = arr[j + 1]
               return sample(x1, x2)
            }
            queue[i] = queue[--queueSize];
            queue.length = queueSize;
      }
    }
    
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
