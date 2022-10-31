
import drawCenterPoly from "./Drawers/DrawCenterPoly";



class IntGeoDrawers {
	constructor(intersection) {
		this.intersection = intersection;
	}

	/**************************************************************************
		Draw Intersection Geometry:
			1. Would draw intersection center polygon.
			2. Would draw north arrow.
			3. Would ask approaches to draw themselves.

		Would return intGroup which is an instance of THREE.Group containing
		all meshes for the intersection.
	***************************************************************************/
	drawIntGeo(modelScene, intBoxSize, meterToPix, options, clickableObjs) {
		//******************** Prepare parameters **********************
		const intersection = this.intersection;
		//road extrude settings:
		let roadExtHeight = 0;  //would be in meters
		if (options.ifDrawThick) {
			const envSetters = intersection.intModel.envSetters;
			roadExtHeight = envSetters.roadHeight;  //meters
		}
		const roadExtSettings = {depth: roadExtHeight * meterToPix, bevelEnabled: false};
		const roadColor = intersection.roadColor;
		const roadMaterial = new intersection.THREE.MeshLambertMaterial({color: roadColor});

		const intGroup = new intersection.THREE.Group();
		intersection.intGroup = intGroup;
		//intModel.scene.add(intGroup);

		//******************** Draw center ploygon **********************
		drawCenterPoly(intersection, intGroup, roadExtSettings, roadMaterial);


		//******************** Draw north arrow **********************
		if (options.ifDrawNorthArrow) {
			const northArrow = intersection.northArrow;
			northArrow.northArrowDrawer.drawNorthArrow(
				northArrow, intGroup, clickableObjs, intBoxSize, meterToPix
			);
		}


		//******************** Draw approaches **********************
		const type = "int";
		intersection.approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawAppGeo(
				intGroup, roadExtSettings,
				roadMaterial, clickableObjs, type,
				meterToPix, options
			);
		});

		roadMaterial.dispose();

		intGroup.translateX(options.translateX * meterToPix);
		intGroup.translateY(options.translateY * meterToPix);
		intGroup.translateZ(options.translateZ * meterToPix);


		// const intAxis = new this.intersection.THREE.AxesHelper(2000);
		// intGroup.add(intAxis);
		modelScene.add(intGroup);
	}

	drawIntRoadNames(clickableObjects) {
		const approaches = this.intersection.approaches;
		const scene = this.intersection.intGroup;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawAppRoadName(scene, clickableObjects);
		});
	}

	undrawIntRoadNames(clickableObjects) {
		const approaches = this.intersection.approaches;
		const scene = this.intersection.intGroup;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.undrawAppRoadName(scene, clickableObjects);
		});
	}


	drawIntStartConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawAppStartConnectP(
				modelScene, clickableObjects, translate, meterToPix, roadThick
			);
		});
	}

	undrawIntStartConnectP(modelScene, clickableObjects) {
		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.undrawAppStartConnectP(modelScene, clickableObjects);
		});
	}

	drawIntEndConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick) {
		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.drawAppEndConnectP(
				modelScene, clickableObjects, translate, meterToPix, roadThick
			);
		});
	}

	undrawIntEndConnectP(modelScene, clickableObjects) {
		const approaches = this.intersection.approaches;
		approaches.forEach((oneApp) => {
			oneApp.appDrawers.undrawAppEndConnectP(modelScene, clickableObjects);
		});
	}


	drawLaneArrowColor(appIndex, laneIndex, colorHexCode) {
		//check if intGroup exists:
		const intersection = this.intersection;
		const intGroup = intersection.intGroup;  //THREE.Group containing int geometries

		if (!intGroup) {
			const message = "Failed to draw lane arrow color. Please draw intersection geometry first.";
			const modelOwner = "IntGeoDrawers";
			throw {
				message: message,
				modelOwner: modelOwner
			};
		}

		//ask approach to draw:
		if (intersection.approaches.length > appIndex) {
			const approach = intersection.approaches[appIndex];
			approach.appDrawers.drawLaneArrowColor(laneIndex, colorHexCode);
		}
		else {
			const message = "Failed to draw lane arrow color. Please provide a valid appIndex.";
			const modelOwner = "IntGeoDrawers";
			throw {
				message: message,
				modelOwner: modelOwner
			};
		}

	}

}

export default IntGeoDrawers;
