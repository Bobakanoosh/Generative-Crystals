class Layer {
  constructor() {
    this.name = "";
    this.sides = SIDES
    this.numShapes = this.sides
    this.angle = 360 / this.numShapes
    this.stepsOut = 8
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut
    this.weight = random([1, 3])
    this.layerColor = random(PALLETE)
    this.chance = 0.2
  }
}

class Circles extends Layer {
  constructor(chance) {
    super()
    this.name = "Circles";
    this.chance = chance

    this.shapeSize = (CRYSTAL_SIZE/2) * 0.93
    this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2)
  }

  render() {
    noFill()
    stroke(this.layerColor)
    strokeWeight(1)
    pushPop(() => {
      for(let i = 0; i <= this.numShapes; i++) {
        ellipse(this.position, 0, this.shapeSize, this.shapeSize)
        rotate(this.angle)
      }
    })
  }
}

class SimpleLines extends Layer {
  constructor(chance) {
    super()
    this.name = "SimpleLines";
    this.chance = chance

    this.numSteps = random([this.stepsOut, int(this.stepsOut * 1.25)])
    this.start = floor(random(0, this.numSteps))
    this.end = floor(random(this.start, this.numSteps +1))
  }

  render() {
    noFill();
    stroke(PALLETE[0])
    strokeWeight(this.weight)

    pushPop(() => {
      stroke(this.layerColor)
      for(let i = 0; i < this.numShapes; i++) {
        line(this.start * this.singleStep, 0, this.end * this.singleStep, 0)
        rotate(this.angle)
      }
    })
  } 
}

class OutlineShape extends Layer {

  constructor(chance) {
    super()
    this.name = "OutlineShape";
    this.chance = chance

    this.drawHexagon = random([true, false])
  }

  render() {

    noFill()
    stroke(this.layerColor)
    strokeWeight(this.weight)

    pushPop(() => {
      if(this.drawHexagon) {
        hexagon(0, 0, CRYSTAL_SIZE / 2)
      } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      }
    })
  }
}

class DottedLines extends Layer {

  constructor (chance) {
    super()
    this.name = "DottedLines";
    this.chance = chance

    this.numShapes = random([this.sides, this.sides * 2])
    this.angle = 360 / this.numShapes
    this.shapeSize = 3
    this.centerOffset = this.singleStep
  }

  render () {
    fill(this.layerColor)
    noStroke()

    pushPop(() => {
      for(let i = 0; i <= this.numShapes; i++) {
        for(let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
          rect(x, 0, this.shapeSize, this.shapeSize)
        }
        rotate(this.angle)
      }
    })
  }
}

class CenteredShape extends Layer {                     
  constructor (chance) {
    super()
    this.name = "CenteredShape";
    this.chance = chance
  }

  render () {
    this.generateRandom()
    fill(this.layerColor)
    noStroke()

    pushPop(() => {
      if (this.randomShape < 0.3) {
        //star
        myTriangle(0, this.radius, true)
        myTriangle(0, this.radius, false)
      } else if (this.randomShape >= 0.3 && this.randomShape < 0.6) {
        ellipse(0, 0, this.shapeSize * 1.5, this.shapeSize * 1.5)
      } else if (this.randomShape >= 0.6) {
        rotate(this.angle / 2) 
        hexagon(0, 0, this.shapeSize)
      }
    })
  }

  generateRandom() {
    this.weight = random([1, 3])
    this.layerColor = random(PALLETE)
    this.randomShape = random(1)
    this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut)) * this.singleStep
  
    this.steps = floor(random(1, this.stepsOut))

    if (this.steps < this.stepsOut / 2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep
    } else if (this.steps > this.stepsOut / 2) {
      this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
    } else {
      this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
    }
  }
}

class RingOfShapes extends Layer {                    
  constructor (chance) {
    super()
    this.name = "RingOfShapes";
    this.chance = chance

    this.steps = floor(random(1, this.stepsOut))
    this.center = this.steps * this.singleStep
    this.randomShape = random([1, 2, 3])
    this.direction = random([true, false]) // used for triangle only
    this.fillColor = random([this.layerColor])

    if (this.steps < this.stepsOut / 2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep
    } else if (this.steps > this.stepsOut / 2) {
      this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
    } else {
      this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
    }
  }

  render () {
    stroke(this.layerColor)
    fill(this.fillColor)
    strokeWeight(this.weight)

    pushPop(() =>{
      for (let i = 0; i < this.numShapes; i++) {
        if (this.randomShape == 1) {
          ellipse(0, this.center, this.radius, this.radius)
        } else if (this.randomShape == 2) {
          rect(0, this.center, this.radius, this.radius)
        } else if (this.randomShape == 3) {
          myTriangle(this.center, this.radius, this.direction)
        }
        rotate(this.angle)
      }
    })
  }
}

class SteppedHexagons extends Layer {                 
  constructor (chance) {
    super()
    this.name = "SteppedHexagons";
    this.chance = chance

    this.numSteps = random(this.stepsOut, this.stepsOut * 1.25)
    this.centerOffset = (CRYSTAL_SIZE / 2) * random(0.1, 1)
    this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numSteps
    
  }

  render () {
    stroke(this.layerColor)
    noFill()
    strokeWeight(this.weight)
    pushPop(() => {
      rotate(this.angle / 2) 
      for (let i = 1; i < this.numSteps + 1; i++) {
        hexagon(0, 0, this.centerOffset + (i * this.singleStep * 0.8))
      }
    })
  }
}

// class Layer {
//   constructor() {
//     this.name = "";
//     this.sides = SIDES
//     this.numShapes = this.sides
//     this.angle = 360 / this.numShapes
//     this.stepsOut = 8
//     this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut
//     this.chance = 0.2
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)

//     randomSeed(random(0, 1000));
//   }
// }

// class Circles extends Layer {
//   constructor(chance) {
//     super()
//     this.name = "Circles";
//     this.chance = chance

//     this.shapeSize = (CRYSTAL_SIZE/2) * 0.93
//     this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2)
//   }

//   render() {
//     noFill()
//     stroke(this.layerColor)
//     strokeWeight(1)
//     pushPop(() => {
//       for(let i = 0; i <= this.numShapes; i++) {
//         ellipse(this.position, 0, this.shapeSize, this.shapeSize)
//         rotate(this.angle)
//       }
//     })
//   }
// }

// class SimpleLines extends Layer {
//   constructor(chance) {
//     super()
//     this.name = "SimpleLines";
//     this.chance = chance

//   }

//   render() {

//     this.genRand()

//     noFill();
//     stroke(PALLETE[0])
//     strokeWeight(this.weight)

//     pushPop(() => {
//       stroke(this.layerColor)
//       for(let i = 0; i < this.numShapes; i++) {
//         line(this.start * this.singleStep, 0, this.end * this.singleStep, 0)
//         rotate(this.angle)
//       }
//     })
//   } 

//   genRand() {
//     this.numSteps = random([this.stepsOut, int(this.stepsOut * 1.25)])
//     this.start = floor(random(0, this.numSteps))
//     this.end = floor(random(this.start, this.numSteps +1))
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)
//   }
// }

// class OutlineShape extends Layer {

//   constructor(chance) {
//     super()
//     this.name = "OutlineShape";
//     this.chance = chance
//   }

//   render() {

//     this.genRand()

//     noFill()
//     stroke(this.layerColor)
//     strokeWeight(this.weight)

//     pushPop(() => {
//       if(this.drawHexagon) {
//         hexagon(0, 0, CRYSTAL_SIZE / 2)
//       } else {
//         ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
//       }
//     })
//   }

//   genRand() {
//     this.drawHexagon = random([true, false])
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)
//   }
// }

// class DottedLines extends Layer {

//   constructor (chance) {
//     super()
//     this.name = "DottedLines";
//     this.chance = chance
//   }

//   render () {
//     this.genRand()

//     fill(this.layerColor)
//     noStroke()

//     pushPop(() => {
//       for(let i = 0; i <= this.numShapes; i++) {
//         for(let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
//           rect(x, 0, this.shapeSize, this.shapeSize)
//         }
//         rotate(this.angle)
//       }
//     })
//   }

//   genRand() {
//     this.numShapes = random([this.sides, this.sides * 2]);
//     this.angle = 360 / this.numShapes
//     this.shapeSize = 3
//     this.centerOffset = this.singleStep
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)
//   }

// }

// class CenteredShape extends Layer {                     
//   constructor (chance) {
//     super()
//     this.name = "CenteredShape";
//     this.chance = chance

//   }

//   render () {
//     this.genRand();

//     fill(this.layerColor)
//     noStroke()

//     pushPop(() => {
//       if (this.randomShape < 0.3) {
//         //star
//         myTriangle(0, this.radius, true)
//         myTriangle(0, this.radius, false)
//       } else if (this.randomShape >= 0.3 && this.randomShape < 0.6) {
//         ellipse(0, 0, this.shapeSize * 1.5, this.shapeSize * 1.5)
//       } else if (this.randomShape >= 0.6) {
//         rotate(this.angle / 2) 
//         hexagon(0, 0, this.shapeSize)
//       }
//     })
//   }

//   genRand() {
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)

//     this.randomShape = random(1)
//     this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut)) * this.singleStep
  
//     this.steps = floor(random(1, this.stepsOut))

//     if (this.steps < this.stepsOut / 2) {
//       this.radius = floor(random(1, this.steps)) * this.singleStep
//     } else if (this.steps > this.stepsOut / 2) {
//       this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
//     } else {
//       this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
//     }
//   }
// }

// class RingOfShapes extends Layer {                    
//   constructor (chance) {
//     super()
//     this.name = "RingOfShapes";
//     this.chance = chance

//     this.steps = floor(random(1, this.stepsOut))
//     this.center = this.steps * this.singleStep

//     if (this.steps < this.stepsOut / 2) {
//       this.radius = floor(random(1, this.steps)) * this.singleStep
//     } else if (this.steps > this.stepsOut / 2) {
//       this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
//     } else {
//       this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
//     }
//   }

//   render () {
//     this.genRand()

//     stroke(this.layerColor)
//     fill(this.fillColor)
//     strokeWeight(this.weight)

//     pushPop(() =>{
//       for (let i = 0; i < this.numShapes; i++) {
//         if (this.randomShape == 1) {
//           ellipse(0, this.center, this.radius, this.radius)
//         } else if (this.randomShape == 2) {
//           rect(0, this.center, this.radius, this.radius)
//         } else if (this.randomShape == 3) {
//           myTriangle(this.center, this.radius, this.direction)
//         }
//         rotate(this.angle)
//       }
//     })
//   }

//   genRand() {
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)

//     this.direction = random([true, false]) // used for triangle only
//     this.fillColor = random([this.layerColor])
//     this.randomShape = random([1, 2, 3]) 
//   }
// }

// class SteppedHexagons extends Layer {                 
//   constructor (chance) {
//     super()
//     this.name = "SteppedHexagons";
//     this.chance = chance
//   }

//   render () {
//     this.genRand()

//     stroke(this.layerColor)
//     noFill()
//     strokeWeight(this.weight)
//     pushPop(() => {
//       rotate(this.angle / 2) 
//       for (let i = 1; i < this.numSteps + 1; i++) {
//         hexagon(0, 0, this.centerOffset + (i * this.singleStep))
//       }
//     })
//   }

//   genRand() {
//     this.weight = random([1, 3])
//     this.layerColor = random(PALLETE)
    
//     this.numSteps = random([this.stepsOut, this.stepsOut * 1.25])
//     this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
//     this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numSteps
//   }
// }