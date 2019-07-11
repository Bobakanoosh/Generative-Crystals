//TODO: Detect the layer below and brighten color if it has the same color?
//TODO: Make slider to adjust number of sides but KEEP current layer config

const CRYSTAL_SIZE = 150
const SIDES = 6

//layout
const COLUMNS = 3
const ROWS = 4
const PADDING = CRYSTAL_SIZE / 5
const MARGIN = CRYSTAL_SIZE / 2
const GRIDBOX = CRYSTAL_SIZE + PADDING

const backgroundColor = [49,39,45]
let PALLETE = []

let crystals = []

///////////////////////////////////////////////////////////////
/////                   Setup & Draw                      /////
///////////////////////////////////////////////////////////////

function setup() {

  const totalX = MARGIN + GRIDBOX * COLUMNS
  const totalY = MARGIN + GRIDBOX * ROWS
  createCanvas(totalX, totalY, SVG)

  initData()
  initSettings()

}

function draw() {

  let layersRendered = []

  // Create the grid of crystals
  for(let x = 1; x < COLUMNS+1; x++) {
    for(let y = 1; y < ROWS+1; y++) {
      const posX = x * GRIDBOX;
      const posY = y * GRIDBOX;
      crystals.push(new Crystal(posX, posY))
    }
  }
  
  crystals.forEach(crystal => {
    crystal.render()
  })

}

function initData() {

  PALLETE = [
    color(245,85,62), //orange
    color(104,138,148), //blue
  ]

}

function initSettings() {
  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
  background(backgroundColor)
}