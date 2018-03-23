document.addEventListener("DOMContentLoaded", shuffle);

function shuffle() {
  const bodySelection = d3.select("body")
  const svgSelection = bodySelection.append("svg")
  .attr("width", 400)
  .attr("height", 400);
  
  function makeLine (x, y) {
    let generateLine = d3.timer( () => {
      for (let i = 0; i < 10; i ++) {
        const line = svgSelection.append("line")  
        .style("stroke", "green") 
        .attr("x1", 0)     // x position of the first end of the line
        .attr("y1", 0)      // y position of the first end of the line
        .attr("x2", 20)     // x position of the second end of the line
        .attr("y2", 20);    // y position of the second end of the line
      }
    })
  }
  
  
  let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
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
