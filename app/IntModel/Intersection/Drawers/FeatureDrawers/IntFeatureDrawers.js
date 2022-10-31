
import drawFeaturePanel from "./Drawers/DrawFeaturePanel";

class IntFeatureDrawers {
	constructor(intersection, modelScene) {
		this.intersection = intersection;
	}

	_initializeIntFeatureGroup(modelScene) {
		const THREE = this.intersection.THREE;
		const intFeatureGroup = new THREE.Group();
		this.intersection.intFeatureGroup = intFeatureGroup;
		modelScene.add(intFeatureGroup);
	}

	drawIntFeature(type, modelScene, clickableObjs, meterToPix) {
		const envSetters = this.intersection.intModel.envSetters;
		const panelExtHeight = (envSetters.roadHeight + envSetters.roadMarkHeight) * meterToPix;
		const panelDiameter = this.intersection.intFeatureGeo.centerPanelDiameter;

		if (!this.intersection.intFeatureGroup) {
			this._initializeIntFeatureGroup(modelScene);
		}

		const intFeatureGroup = this.intersection.intFeatureGroup;
		this.undrawIntFeature(clickableObjs);
		drawFeaturePanel(this.intersection, intFeatureGroup, panelExtHeight, panelDiameter, type, clickableObjs);
	}

	undrawIntFeature(clickableObjs) {
		const centerPanelMesh = this.intersection.centerPanelMesh;
		if (centerPanelMesh) {
			this.intersection.intFeatureGroup.remove(centerPanelMesh);
			centerPanelMesh.geometry.dispose();
			centerPanelMesh.material.dispose();
			if (centerPanelMesh.material.map) {
				centerPanelMesh.material.map.dispose();
			}
			clickableObjs.delete(centerPanelMesh);  //delete it no matter what
		}

		this.intersection.centerPanelMesh = null;
	}

	drawMovementArrow(modelScene, clickableObjs, meterToPix, movArrowScale) {
		const THREE = this.intersection.THREE;
		const envSetters = this.intersection.intModel.envSetters;
		const movArrowColor = envSetters.movArrowColor;
		const movArrowMaterial = new THREE.MeshLambertMaterial({color: movArrowColor});
		const extSettings = {
			depth: envSetters.roadMarkHeight * meterToPix,
			bevelEnabled: false
		};

		if (!this.intersection.intFeatureGroup) {
			this._initializeIntFeatureGroup(modelScene);
		}

		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawMovementArrow(
				this.intersection.intFeatureGroup, clickableObjs, movArrowMaterial, extSettings, movArrowScale
			);
		});
	}

	drawMovementFeature(modelScene, clickableObjects, type, meterToPix) {
		const envSetters = this.intersection.intModel.envSetters;
		const textFont = envSetters.textFont;  //a string
		const textColor = envSetters.movTextColor;
		const backgroundColor = (this.intersection.backgroundColor) ? this.intersection.backgroundColor : envSetters.backgroundColor;

		if (!this.intersection.intFeatureGroup) {
			this._initializeIntFeatureGroup(modelScene);
		}

		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawMovementFeature(
				type, this.intersection.intFeatureGroup, clickableObjects,
				textFont, textColor, backgroundColor
			);
		});
	}

	undrawMovementArrow(clickableObjects) {
		const approaches = this.intersection.approaches;
		const scene = this.intersection.intFeatureGroup;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.undrawMovementArrow(scene, clickableObjects);
		});
	}

	undrawMovementFeature(clickableObjects) {
		const approaches = this.intersection.approaches;
		const scene = this.intersection.intFeatureGroup;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.undrawMovementFeature(scene, clickableObjects);
		});
	}
}


export default IntFeatureDrawers;
