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
	layers.forEach((layer) => {
		let rand = random(1);
		if(rand > layer.chance) {
			layersToRender.push(layer)
			console.log(layer.name);
		}
	})

	// Make sure we have between 2-4 layers to render
	if(layersToRender.length <= 1 || layersToRender.length >= 5)
		return getLayersToRender()
	else
		return layersToRender;

}
