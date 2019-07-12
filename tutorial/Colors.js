var colorHash = {};
var palletes = {};

function getBackgroundColor() {
  return palletes[PALLETE].backgroundColor
}

function getColors() {
  return palletes[PALLETE].colors
}

function populateColors() {
  colorHash['dark-grey'] = color(35, 35, 35)
  colorHash['pale-green'] = color(130, 255, 138)
  colorHash['pale-red'] = color(255, 97, 97)
  
  colorHash['purple-maroon'] = color(49, 39, 45)
  colorHash['neon-orange'] = color(245, 85, 62)
  colorHash['dark-sky-blue'] = color(104, 138, 148)

  palletes['gray-green-red'] = {
    backgroundColor: colorHash['dark-grey'], 
    colors: [
      colorHash['pale-green'], 
      colorHash['pale-red'],
    ] 
  }

  palletes['80s-purple'] = {
    backgroundColor: colorHash['purple-maroon'],
    colors: [
      colorHash['neon-orange'],
      colorHash['dark-sky-blue']
    ]
  }
}
