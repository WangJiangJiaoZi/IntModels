



class DivGroupDrawers {
	constructor(divGroup) {
		this.divGroup = divGroup;
	}

	drawDivGroupGeo(divGroup, scene, clickableObjs, type, meterToPix, roadDepth, options) {
		const dividers = divGroup.dividers;  //an array of dividers

		dividers.forEach((oneDiv) => {
			oneDiv.dividerDrawers.drawDividerGeo(
				oneDiv, scene, clickableObjs, type, meterToPix, roadDepth, options
			);
		});
	}

	drawDivGroupStartConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const dividers = this.divGroup.dividers;
		dividers.forEach((oneDiv) => {
			if (oneDiv.dividerType === 1 || oneDiv.dividerType === 3) {
				oneDiv.dividerDrawers.drawDividerConnectPoint(
					modelScene, clickableObjects, translate, meterToPix, roadThick
				);
			}
		});
	}

	drawDivGroupEndConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const dividers = this.divGroup.dividers;

		dividers.forEach((oneDiv) => {
			if (oneDiv.dividerType === 2 || oneDiv.dividerType === 3) {
				oneDiv.dividerDrawers.drawDividerConnectPoint(
					modelScene, clickableObjects, translate, meterToPix, roadThick
				);
			}
		});
	}


	undrawDivGroupStartConnectP(modelScene, clickableObjects) {
		const dividers = this.divGroup.dividers;
		dividers.forEach((oneDiv) => {
			if (oneDiv.dividerType === 1 || oneDiv.dividerType === 3) {
				oneDiv.dividerDrawers.undrawDividerConnectPoint(
					modelScene, clickableObjects
				);
			}
		});
	}

	undrawDivGroupEndConnectP(modelScene, clickableObjects) {
		const dividers = this.divGroup.dividers;
		dividers.forEach((oneDiv) => {
			if (oneDiv.dividerType === 2 || oneDiv.dividerType === 3) {
				oneDiv.dividerDrawers.undrawDividerConnectPoint(
					modelScene, clickableObjects
				);
			}
		});
	}
}

export default DivGroupDrawers;
