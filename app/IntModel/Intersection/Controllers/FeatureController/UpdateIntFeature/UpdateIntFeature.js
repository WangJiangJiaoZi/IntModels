

class UpdateIntFeature {
	constructor(intFeatureController, intersection) {
		this.intFeatureController = intFeatureController;
		this.intersection = intersection;
	}


	updateIntControlType(nextIntControlType) {
		const verifyIntControlType = this.intFeatureController.verifyIntFeature.verifyIntControlType;
		verifyIntControlType(nextIntControlType);
		this.intersection.controlType = nextIntControlType;
	}

	disposeGeoAndMaterial(clickableObjects) {
		const intFeatureGroup = this.intersection.intFeatureGroup;
		if (intFeatureGroup) {
			intFeatureGroup.children.forEach((oneMesh) => {
				oneMesh.geometry.dispose();
				oneMesh.material.dispose();
				if (oneMesh.material.map) {
					oneMesh.material.map.dispose();
				}
				clickableObjects.delete(oneMesh);  //delete it no matter what
			});
		}
		this.intersection.intFeatureGroup = null;
	}
}


export default UpdateIntFeature;
