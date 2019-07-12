class Crystal {

	constructor(posX, posY) {
		this.x = posX
		this.y = posY
		this.layers = getLayersToRender()
	}

	render() {
		pushPop(() => {
			translate(this.x, this.y)
			this.layers.forEach(layer => {
				layer.render();
			})
		})
	}

} 

function getLayersToRender() {

	let layersToRender = []
	let layers = [
		new CenteredShape(0.6),
		new SteppedHexagons(0.6),
		new RingOfShapes(0.3),
		new OutlineShape(0.3),
		new DottedLines(0.3),
		new SimpleLines(0.3),
		new Circles(0.3)
	]	

	layers.forEach((layer) => {
		let rand = random(1)
		if(rand > layer.chance) {
			layersToRender.push(layer)
		}
	})

	//Make sure we have between 2-4 layers to render
	if(layersToRender.length <= 1 || layersToRender.length >= 5)
		return getLayersToRender()
	else {
		return shuffle(layersToRender)
	}

}
