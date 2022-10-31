

class LaneGGFeatureDrawers {
	constructor(laneGG) {
		this.laneGG = laneGG;
	}

	drawMovementArrow(scene, clickableObjs, movArrowMaterial, extSettings, movArrowScale) {
		const movements = this.laneGG.movements;
		movements.forEach((oneMov) => {
			oneMov.movDrawers.drawMovementArrow(
				scene, clickableObjs, movArrowMaterial, extSettings, movArrowScale
			);
		});
	}

	drawMovementFeature(type, scene, clickableObjects, textFont, textColor, backgroundColor) {
		const movements = this.laneGG.movements;
		movements.forEach((oneMov) => {
			oneMov.movDrawers.drawMovementFeature(
				type, scene, clickableObjects, textFont, textColor, backgroundColor
			);
		});
	}

	undrawMovementArrow(scene, clickableObjects) {
		const movements = this.laneGG.movements;
		movements.forEach((oneMov) => {
			oneMov.movDrawers.undrawMovementArrow(
				scene, clickableObjects
			);
		});
	}

	undrawMovementFeature(scene, clickableObjects) {
		const movements = this.laneGG.movements;
		movements.forEach((oneMov) => {
			oneMov.movDrawers.undrawMovementFeature(
				scene, clickableObjects
			);
		});
	}
}

export default LaneGGFeatureDrawers;
