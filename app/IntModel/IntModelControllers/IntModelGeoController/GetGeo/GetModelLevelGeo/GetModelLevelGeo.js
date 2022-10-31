


class GetModelLevelGeo {
	constructor (intModel) {
		this.intModel = intModel;
	}

	//get domElement which is a canvas where the renderer draws it output
	getCanvasDom() {
		const canvas = this.intModel.renderer.domElement;
		return canvas;
	}

	//would toggle renderer.preserveDrawingBuffer
	getScreenShot() {
		this.intModel.renderer.render(this.intModel.scene, this.intModel.camera);
		const imgShot = this.intModel.renderer.domElement.toDataURL();
		return imgShot;
	}
}


export default GetModelLevelGeo;
