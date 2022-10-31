


class UpdateModelLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;
		this.intersection = intModel.intersection;
		this.redrawIntGeo = drawGeo.redrawIntGeo;
	}


	updateBackgroundColor(nextBgColor, ifReDraw) {
		this.intersection.controllers.geoController.updateGeo.updateIntBackgroundColor(
			this.intersection, nextBgColor
		);
		if (ifReDraw) {
			this.intModel.renderer.setClearColor(nextBgColor, 1);
			this.redrawIntGeo();
		}
	}

	disposeIntModel() {
		//remove everything from scene:
		if (this.intModel.scene) {
			const scene = this.intModel.scene;
			for (let i = scene.children.length - 1; i >= 0; i--) {
				let obj = scene.children[i];
				scene.remove(obj);
			}
		}

		//dispose meshes:
		this.intersection.controllers.geoController.updateGeo.disposeGeoAndMaterial(
			this.intersection, this.intModel.clickableObjects
		);
		//dispose and clear environment:
		this.intModel.envSetters.clearEnv(this.intModel);

		//clear model level parameters:
        this.intModel.canvasSize = null;  //size for drawing
        this.intModel.meterToPixel = null;
        this.intModel.dimension = null;  //2d or 3d dimension
        this.intModel.containerId = null;  //id of the html container

        this.intModel.clickableObjects.clear();

        this.intModel.geoVersionId = null;
        this.intModel.geoData = null;
        this.intModel.tmVersionId = null;
        this.intModel.tmData = null;
        this.intModel.photoInfoVersionId = null;
        this.intModel.photoInfo = null;
	}
}


export default UpdateModelLevelGeo;
