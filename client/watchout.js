// start slingin' some d3 here.

var width = 800;
var height = 800;
var circle;


var svg = d3.select(".board")
  .append('svg')
  .attr("height", height)
  .attr("width", width);


var numEnemies = 30;


// make original dataset
var gamePlayer = [{
   x : width /2,
   y: height /2,
   r: 5
}]

var dataset = [];

for ( var i = 0 ; i <= numEnemies ; i++) {
  dataset.push({
    x : Math.random() * width,
    y : Math.random() * height,
    r : 20
  })
}

var drag = d3.behavior.drag()  
  .on('drag', function() { player.attr('cx', d3.event.x)
  .attr('cy', d3.event.y);})



// make enemy 
circle = svg.selectAll('.enemy')
.data(dataset)
.enter()
.append("circle")
.attr("cx", function(d) {return d.x })
.attr("cy", function(d) {return d.y})
.attr("r", function(d) {return d.r})
.attr("class", 'enemy')
.attr("fill",'grey')
   

  
// make player 
var player = svg.selectAll('.player')
.data(gamePlayer)
.enter()
.append("circle")
.attr("cx", function(d) {return d.x })
.attr("cy", function(d) {return d.y})
.attr("r", function(d) {return d.r})
.attr("class", 'player')
.attr("fill",'red')
.call(drag)



var moveEnemies = function(dataset){

  svg.selectAll('.enemy')
    .transition().delay(100)
    .attr("cx", function(d) {d.x = Math.random() * width; return d.x;})
    .attr("cy", function(d) {d.y = Math.random() * height; return d.y;})
}

setInterval(moveEnemies,2000);


