
import sharedErrors from "../../../SharedErrors/SharedErrors";
import Stats from "stats.js";

class DrawGeo {
	constructor(intModel) {
		this.intModel = intModel;
		this.envSetters = intModel.envSetters;
		this.stats = null;

		this.singleIntDefaultOptions = {
			translateX: 0,  //in pixel
			translateY: 0,  //in pixel
			translateZ: 0,  //in pixel
			ifDrawLineAndDiv: true,   //if to draw lane lines and dividers
			ifDrawArrow: true,  //if to draw lane arrows
			ifDrawCross: true,  //if to draw crosswalks
			ifDrawText: true,   //if to draw texts
			ifDrawNorthArrow: true,  //if to draw north arrow
			ifDrawThick: true,  //if to draw model with a thickness
			ifSingleInt: true,  //if to draw only a single intersection
			onUpdate: null,      //call back function on animating the scene
			objs: null
		};

		this.multiIntDefaultOptions = {
			translateX: 0,  //in pixel
			translateY: 0,  //in pixel
			translateZ: 0,  //in pixel
			ifDrawLineAndDiv: true,   //if to draw lane lines and dividers
			ifDrawArrow: true,  //if to draw lane arrows
			ifDrawCross: true,  //if to draw crosswalks
			ifDrawText: false,   //if to draw texts
			ifDrawNorthArrow: false,  //if to draw north arrow
			ifDrawThick: true,  //if to draw model with a thickness
			ifSingleInt: false,  //if to draw only a single intersection
			onUpdate: null      //call back function on animating the scene
		};

		this.redrawIntGeo = this.redrawIntGeo.bind(this);
	}

	/********************************************************************
		Complete initialOptions with default values.
	*********************************************************************/
	completeDrawOptions(initialOptions, ifSingleInt) {
		//default drawing options:
		const options = (ifSingleInt) ?
							JSON.parse(JSON.stringify(this.singleIntDefaultOptions)) :
							JSON.parse(JSON.stringify(this.multiIntDefaultOptions));

		if (!ifSingleInt) {
			options.translateX = this.intModel.intersection.transformedLocation[0];  //in meters
			options.translateY = this.intModel.intersection.transformedLocation[1];  //in meters
			options.translateZ = this.intModel.intersection.transformedLocation[2];  //in meters
		}

		Object.keys(initialOptions).forEach((oneKey) => {
			options[oneKey] = initialOptions[oneKey];
		});

		return options;
	}

	/********************************************************************
		Would:
			1.Reset env if necessary.
			2.Setup env according to dimension.
			3.Draw int geometry.

		Would update:
			intModel.dimension;
			intModel.containerId;
	*********************************************************************/
	drawIntGeo(dimension, containerId, ifResetEnv = true, options = {}) {

		//*************** Verify canvasSize ***************
		const canvasSize = this.intModel.canvasSize;

		this.intModel.dimension = dimension;

		if (!canvasSize) {
			const modelOwner = "IntModelGeoController";
			const message = "Invalid canvasSize. Please model geometry first.";
			const oneValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw oneValueError;
		}

		const clickableObjects = this.intModel.clickableObjects;
		if (ifResetEnv) {
			//************** Clear Env if any ****************
			if (this.intModel.dimension) {
				//when dimension exists, it is necessary to clear env
				this.intModel.envSetters.clearEnv();

				if (this.intModel.intersection.intGroup) {
					const intersection = this.intModel.intersection;
					this.intModel.scene.remove(intersection.intGroup);
					intersection.controllers.geoController.updateGeo.disposeGeoAndMaterial(
						intersection, clickableObjects
					);
				}
			}

			//************** Setup env accroding to dimension *************
			//would update intModel.dimension
			if (dimension === 2) {
				this.intModel.envSetters.twoDSetters.setupTwoDEnv({
					domHeight: canvasSize,
					domWidth: canvasSize,
					containerId: containerId
				});
			}
			else {
				this.intModel.envSetters.threeDSetters.setupThreeDEnv({
					domHeight: canvasSize,
					domWidth: canvasSize,
					containerId: containerId
				});
			}

			this.intModel.camera.layers.toggle(1);
			this.intModel.camera.layers.toggle(2);
		}

		// ************** temporary **************
		if (options.objs) {
			options.objs.forEach((oneObj) => {
				this.intModel.scene.add(oneObj);
			});
		}


		// ************** Draw int geo **************
		const intersection = this.intModel.intersection;
		const modelScene = this.intModel.scene;
		const intBoxSize = canvasSize;  //canvasSize === intBoxSize when drawing single intersection
		const ifSingleInt = true;
		options = this.completeDrawOptions(options, ifSingleInt);

		intersection.drawers.drawIntGeo(
			modelScene,
			intBoxSize,
			this.intModel.meterToPixel,
			options,
			clickableObjects
		);

		this.drawStats();

		// ************** Animate scene **************
		this.animateIntModel(options.onUpdate);
		window.routeX = [];
		window.routeY = [];
	}

	/********************************************************************
		Would:
			1.Clear intModel.scene but not re-instantiate it.
			2.Reset control to pan the view back to initial set if necessary
			3.Draw int geometry according to current dimension.
	********************************************************************/
	redrawIntGeo(ifResetControl = false, options = {}) {
		//******************** Clean up scene (leave alone the light) **********************

		//tell scene to remove its meshes (let the lights alone):
		const scene = this.intModel.scene;
		/**/

		for (let i = scene.children.length - 1; i >= 0; i--) {
			let obj = scene.children[i];
			if (!obj.isLight) {
				scene.remove(obj);
				obj = undefined;
			}
		}

		//dispose geometry and material to avoid memoery leaks:
		const intersection = this.intModel.intersection;
		const clickableObjects = this.intModel.clickableObjects;
		intersection.controllers.geoController.updateGeo.disposeGeoAndMaterial(intersection, clickableObjects);

		// ************************** Reset control if necessary *************************
		if (ifResetControl) {
			this.intModel.controls.reset();
		}

		// ******************************** Draw int geo ********************************
		const modelScene = this.intModel.scene;
		const intBoxSize = this.intModel.canvasSize;  //canvasSize === intBoxSize when drawing single intersection
		const ifSingleInt = true;
		options = this.completeDrawOptions(options, ifSingleInt);
		intersection.drawers.drawIntGeo(
			modelScene,
			intBoxSize,
			this.intModel.meterToPixel,
			options,
			clickableObjects
		);
	}

	/********************************************************************
		Would:
			1.Draw int geometry.

		Would update:
			nothing
	*********************************************************************/
	drawIntGeoForNetwork(modelScene, meterToPixel, options, clickableObjects) {
		const intersection = this.intModel.intersection;
		const intBoxSize = intersection.intDiameter * meterToPixel;
		const ifSingleInt = false;
		options = this.completeDrawOptions(options, ifSingleInt);

		intersection.drawers.drawIntGeo(
			modelScene,
			intBoxSize,
			meterToPixel,
			options,
			clickableObjects
		);
	}

	/********************************************************************
		Would:
			1.Get current !dimension.
			2.Reset camera and controls according to the new dimension
			(canvasSize should not change)
	********************************************************************/
	drawToggledDimensionIntGeo() {
		//Get current !dimension
		const toggledDimension = (this.intModel.dimension === 2) ? 3 : 2;
		const canvasSize = this.intModel.canvasSize;

		//Reset camera and controls according to the new dimension
		if (toggledDimension === 2) {
			this.intModel.dimension = 2;
			this.intModel.envSetters.twoDSetters.resetTwoDEnv({
				domHeight: canvasSize,
				domWidth: canvasSize
			});
		}
		else {
			this.intModel.dimension = 3;
			this.intModel.envSetters.threeDSetters.resetThreeDEnv({
				domHeight: canvasSize,
				domWidth: canvasSize
			});
		}
		this.intModel.camera.layers.toggle(1);
		this.intModel.camera.layers.toggle(2);
	}


	drawStats() {
		//show the running resource comsuption
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}



	/********************************************************************
		Would:
			draw roads' names if not done already
	*********************************************************************/
	drawIntRoadNames(clickableObjects = this.intModel.clickableObjects) {
		const intersection = this.intModel.intersection;
		intersection.drawers.drawIntRoadNames(clickableObjects);
	}


	/********************************************************************
		Would:
			undraw roads' names
	*********************************************************************/
	undrawIntRoadNames(clickableObjects = this.intModel.clickableObjects) {
		const intersection = this.intModel.intersection;
		intersection.drawers.undrawIntRoadNames(clickableObjects);
	}



	/********************************************************************
		Would:
			draw int lanes' start points
	********************************************************************/
	drawIntStartPoints(modelScene, clickableObjects, meterToPix) {
		const intersection = this.intModel.intersection;
		const transformedLocation = intersection.transformedLocation; //[x, y, z] in meters
		const translate = [
			transformedLocation[0] * meterToPix,
			transformedLocation[1] * meterToPix,
			transformedLocation[2] * meterToPix
		];

		const roadThick = this.intModel.envSetters.roadHeight * meterToPix;
		intersection.drawers.drawIntStartConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick);
	}

	/********************************************************************
		Would:
			remove and dispose int lanes' start points
	********************************************************************/
	drawIntEndPoints(modelScene, clickableObjects, meterToPix) {
		const intersection = this.intModel.intersection;
		const transformedLocation = intersection.transformedLocation; //[x, y, z] in meters
		const translate = [
			transformedLocation[0] * meterToPix,
			transformedLocation[1] * meterToPix,
			transformedLocation[2] * meterToPix
		];

		const roadThick = this.intModel.envSetters.roadHeight * meterToPix;
		intersection.drawers.drawIntEndConnectP(modelScene, clickableObjects, translate, meterToPix, roadThick);
	}

	/********************************************************************
		Would:
			draw int lanes' end points
	********************************************************************/
	undrawIntStartPoints(modelScene, clickableObjects) {
		const intersection = this.intModel.intersection;
		intersection.drawers.undrawIntStartConnectP(modelScene, clickableObjects);
	}

	/********************************************************************
		Would:
			remove and dispose int lanes' end points
	********************************************************************/
	undrawIntEndPoints(modelScene, clickableObjects) {
		const intersection = this.intModel.intersection;
		intersection.drawers.undrawIntEndConnectP(modelScene, clickableObjects);
	}

	/********************************************************************
	 Would:
	 reset a lane arrow color if the appIndex & laneIndex are valid
	 ********************************************************************/
	drawLaneArrowColor(appIndex, laneIndex, colorHexCode) {
		const intersection = this.intModel.intersection;
		intersection.drawers.drawLaneArrowColor(appIndex, laneIndex, colorHexCode);
	}

	/********************************************************************
		Would:
			1.Animate intModel.scene.
			2.render using intModel.renderer

		Would update:
			intModel.anmimationFrameId
	********************************************************************/
	animateIntModel(onUpdate) {
		this.intModel.anmimationFrameId = requestAnimationFrame(() => {
			//animate(intModel, sigClickHandler, stats);
			this.animateIntModel(onUpdate, this.intModel);
		});
		this.intModel.controls.update();
		if (onUpdate) {
			onUpdate();
		}

		//mouse interaction:
		/*
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(intModel.sceneMouse.mouse, intModel.camera);
		const intersects = raycaster.intersectObjects(intModel.clickableObjects);

		if (intersects.length > 0) {

			intersects.forEach((oneObj, oneObjIndex) => {
				const objName = oneObj.object.name;
				console.log(objName)
			})


			//sigClickHandler(parseInt(sigBoundId));
		}
		*/

		//sigClickHandler();

		/*		 */
		this.stats.begin();	//status
		this.intModel.renderer.render(
			this.intModel.scene,
			this.intModel.camera
		);
		this.stats.end();  	//status
	}

}


export default DrawGeo;
