

class AppFeatureDrawers {
	constructor(approach) {
		this.approach = approach;
	}


	drawMovementArrow(scene, clickableObjs, movArrowMaterial, extSettings, movArrowScale) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.drawMovementArrow(
			scene, clickableObjs, movArrowMaterial, extSettings, movArrowScale
		);
	}

	drawMovementFeature(type, scene, clickableObjects, textFont, textColor, backgroundColor) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.drawMovementFeature(
			type, scene, clickableObjects, textFont,
			textColor, backgroundColor
		);
	}

	undrawMovementArrow(scene, clickableObjects) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.undrawMovementArrow(
			scene, clickableObjects
		);
	}

	undrawMovementFeature(scene, clickableObjects) {
		const laneGG = this.approach.laneGG;
		laneGG.laneGGDrawers.undrawMovementFeature(
			scene, clickableObjects
		);
	}
}


export default AppFeatureDrawers;
