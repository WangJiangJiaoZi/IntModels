


class UpdateIntLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;
		this.intersection = intModel.intersection;
		this.redrawIntGeo = drawGeo.redrawIntGeo;
	}

	updateIntId(nextIntId) {
		this.intersection.controllers.geoController.updateGeo.updateIntId(
			this.intersection, nextIntId
		);
		//intersection.drawers.drawIntGeo(intModel, division, canvasSize, true);
	}

	updateIntLocation(nextIntLocation) {
		this.intersection.controllers.geoController.updateGeo.updateIntLocation(
			this.intersection, nextIntLocation
		);
	}

	updateIntClass(nextIntClass) {
		this.intersection.controllers.geoController.updateGeo.updateIntClass(
			this.intersection, nextIntClass
		);
	}


	updateIntRoadColor(nextRoadColor, ifReDraw) {
		this.intersection.controllers.geoController.updateGeo.updateIntRoadColor(
			this.intersection, nextRoadColor
		);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateIntCornerIslandColor(nextCornerIslandColor, ifReDraw) {
		this.intersection.controllers.geoController.updateGeo.updateIntCornerIslandColor(
			this.intersection, nextCornerIslandColor
		);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateIntCrosswalkColor(nextCrosswalkColor, ifReDraw) {
		this.intersection.controllers.geoController.updateGeo.updateIntCrosswalkColor(
			this.intersection, nextCrosswalkColor
		);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}

	updateIntTextColor(nextTextColor, ifReDraw) {
		this.intersection.controllers.geoController.updateGeo.updateIntTextColor(
			this.intersection, nextTextColor
		);
		if (ifReDraw) {
			this.redrawIntGeo();
		}
	}


	updateIntLayerMaterialValues(layerId,  materialValuesObj, language = 1) {
		this.intersection.controllers.geoController.updateGeo.updateIntLayerMaterialValues(
			this.intersection, layerId,  materialValuesObj, language
		);
	}
}


export default UpdateIntLevelGeo;
