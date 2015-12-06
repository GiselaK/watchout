// start slingin' some d3 here.

var width =   window.innerWidth;
var height =  window.innerHeight;
var circle;
var current_score = 0;
var highScore = 0;

var svg = d3.select(".board")
  .append('svg')
  .attr("height", height)
  .attr("width", width);



var numEnemies = 20;


// make original dataset
var gamePlayer = [{
   x : width /2,
   y: height /2,
   r: 200
}]

var dataset = [];

for ( var i = 0 ; i < numEnemies ; i++) {
  dataset.push({
    x : Math.random() * width,
    y : Math.random() * height,
    r : 60
  })
}

var drag = d3.behavior.drag()  
  .on('drag', function() { 
  player
  .attr('x', d3.event.x)
  .attr('y', d3.event.y);
})



// make enemy 
circle = svg.selectAll('.enemy')
.data(dataset)
.enter()
.append("svg:image")
.attr("xlink:href", "http://vignette1.wikia.nocookie.net/clubpenguin/images/c/c9/Donut_chocolate_sprinkles.png/revision/20130518082345")
.attr("x", function(d) {return d.x })
.attr("y", function(d) {return d.y})
.attr("height", function(d) {return d.r})
.attr("width", function(d) {return d.r})
.attr("class", 'enemy')

   

  
// make player 
var player = svg.selectAll('.player')
.data(gamePlayer)
.enter()
.append("svg:image")
.attr("xlink:href", "https://s-media-cache-ak0.pinimg.com/originals/d8/55/9f/d8559f57d2cfcc8db35f032b424f1fe8.gif")
.attr("x", function(d) {return d.x })
.attr("y", function(d) {return d.y})
.attr("width", function(d) {return d.r})
.attr("height", function(d) {return d.r})
.attr("class", 'player')
.call(drag)



var moveEnemies = function(){
// var lastX 
  svg.selectAll('.enemy')
    .transition()
    .duration(1000)
    .tween('track-position', tracker)
    .attr("x", function(d) {d.x = Math.random() * width; return d.x;})
    .attr("y", function(d) {d.y = Math.random() * height; return d.y;})
}


var tracker = function(){
  var lastX = 0;
  var lastY = 0;
   
  // This function returned by tracker is what will execute at each 'tick'
  // in the transition animation
  return function(){

    var curX = Math.floor(d3.select(this).attr("x"));
    var curY = Math.floor(d3.select(this).attr("y"));
    // only update if circle has moved at least a pixel in x and y
    // directions
    if(collision(this)){
      var collisionCount = Number(d3.select(".collisions span").text())
      d3.select(".collisions span").text(++collisionCount)
      // console.log("game over!", d)
      // console.log( Number(d.height))
      // update homers size
      // d3.select('.player').attr("height", function(d) {return d.height + 100})
      // d3.select('.player').attr("width", function(d) {return d.width + 100})
      if(current_score > highScore){
        highScore = current_score;
      }
      d3.select(".highscore span").text(Math.floor(highScore));
      current_score = 0;
    } else {
      current_score+=0.01      
    }
    d3.select(".current span").text(Math.floor(current_score))   
  }
}


// use d3.select to get the single play by the .attr()
// d3 each provides a this which allows access to attr()

var collision = function (enemy) {
  var PlayerX = d3.select('.player').attr("x");
  var PlayerY = d3.select('.player').attr("y");
  var PlayerR = d3.select('.player').attr("height");

  // d3.selectAll('.enemy').each(function(d,i) { 
    var xDiff = Math.abs(d3.select(enemy).attr("x") - PlayerX); 
    var yDiff = Math.abs(d3.select(enemy).attr("y") - PlayerY);
    var enemyRadius = d3.select(enemy).attr("height")
    var totalRadius = Number(enemyRadius) + Number(PlayerR);
    var difference = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2))
    if(difference <= totalRadius){ 
      return true;
    }
  // })
}

// collision();

// setInterval(collision,100)


setInterval(moveEnemies,2000);










