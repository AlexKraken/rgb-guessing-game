// Press r, g, b to guess the color with the greatest change

var prevColors = []
var currentColor = 50
var prevColor = 0
var score = 0
var highScore = 0

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight)
  cnv.style('display', 'block')
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {

  translate(width/2, height/2)
  background(255)

  push()
    for(var i = 0; i < prevColors.length; i++){
      prevColors[i].display()
    }
  pop()

  push()
    strokeWeight(7)
    fill(currentColor)
    ellipse(-width * .45 + height * .35, -height * .05, height * .70)
  pop()

  push()
    stroke(0)
    strokeWeight(7)
    fill(255)
    textSize(height * .05)
    textFont('Monospace')
    text('current: \xa0r: ' + red(currentColor) +
         ' g: ' + green(currentColor) +
         ' b: ' + blue(currentColor), -width * .45, height * .40)
    text('previous: r: ' + red(prevColor) +
         ' g: ' + green(prevColor) +
         ' b: ' + blue(prevColor), -width * .45, height * .45)
    text('score: ' + score, width/4, height * .40)
    text('high score: ' + highScore, width/4, height * .45)
  pop()
}

function calcDifference(channel) {
  if(channel == 'red') {
    return abs(red(currentColor) - red(prevColor))
  } else if(channel == 'green') {
    return abs(green(currentColor) - green(prevColor))
  } else if(channel == 'blue') {
    return abs(blue(currentColor) - blue(prevColor))
  }
}

function keyTyped() {
  if('rgb'.includes(key)){
    nextColor()
    var red = calcDifference('red')
    var green = calcDifference('green')
    var blue = calcDifference('blue')
    var points = 0
    //console.log('r: ' + red)
    //console.log('g: ' + green)
    //console.log('b: ' + blue)

    if(key == 'r') {
      if(max(red, green) == max(red, blue)){
        points++
        //console.log("Right!")
      } else if(min(red, green) == min(red, blue)) {
        points--
        //console.log("Wrong!")
      }
    } else if(key == 'g') {
      if(max(green, red) == max(green, blue)){
        points++
        //console.log("Right!")
      } else if(min(green, red) == min(green, blue)) {
        points--
        //console.log("Wrong!")
      }
    } else if(key == 'b') {
      if(max(blue, red) == max(blue, green)){
        points++
        //console.log("Right!")
      } else if(min(blue, red) == min(blue, green)) {
        points--
        //console.log("Wrong!")
      }
    }

    updateScore(points)
  }
}

function nextColor() {
  prevColor = currentColor
  currentColor = color(floor(random(256)),
                       floor(random(256)),
                       floor(random(256)))

  prevColors.push(new Swatch())
  for(var i = 0; i < prevColors.length; i++){
   prevColors[i].move()
  }
  if(prevColors.length > 15) {
    prevColors.shift()
  }
  //console.log(prevColors.length)
}

function Swatch() {
  this.color = prevColor
  this.y = -height * .05
  this.x = -width * .45 + height * .35
  this.circleW = height * .70
  this.strokeWeight = 5
  this.move = function() {
    this.y += height * .05
    this.x += width * .10
    this.strokeWeight -= .35
    this.circleW -= height * .05 - this.x * .50
  }
  this.display = function() {
    strokeWeight(this.strokeWeight)
    fill(this.color)
    ellipse(this.x, this.y, this.circleW)
  }
}

function updateScore(checkPoints) {
  if(checkPoints > 0) {
    score++
    if(score > highScore) {
      highScore = score
    }
  } else if(checkPoints < 0) {
    score = 0
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
