

/********************************************************************
	Would:
		1.Reset env if necessary.
		2.Setup env according to dimension.
		3.Draw int geometry.

	Would update:
		simlationIntModel.dimension;
		simlationIntModel.containerId;
*********************************************************************/
const drawIntGeo = (drawSimu, dimension, containerId, ifResetEnv = true) => {
	const simulationIntModel = drawSimu.simulationIntModel;

	//*************** Verify canvasSize ***************
	const canvasSize = simulationIntModel.intModel.canvasSize; //{width: xxx, height: xxx}

	simulationIntModel.dimension = dimension;

	if (!canvasSize) {
		const modelOwner = "SimulationIntModelControllers";
		const message = drawSimu.errorHints.drawIntGeo;
		const oneValueError = new drawSimu.sharedErrors.SingleValueError(modelOwner, message);
		throw oneValueError;
	}

	const clickableObjects = simulationIntModel.clickableObjects;
	if (ifResetEnv) {
		//************** Clear Env if any ****************
		if (simulationIntModel.dimension) {
			//when dimension exists, it is necessary to clear env
			simulationIntModel.envSetters.clearEnv();

			//remove and dispose int and all vehicles:
			//intModel:
			const intersection = simulationIntModel.intModel.intersection;
			if (intersection.intGroup) {
				simulationIntModel.scene.remove(intersection.intGroup);
				intersection.controllers.geoController.updateGeo.disposeGeoAndMaterial(
					intersection, clickableObjects
				);
			}

			//vehicles:
			//!!!!!!!!!!!!!!!!!!!!! to be done !!!!!!!!!!!!!!!!!!!

		}

		//************** Setup env accroding to dimension *************
		//would update intModel.dimension
		if (dimension === 2) {
			simulationIntModel.envSetters.twoDSetters.setupTwoDEnv({
				domHeight: canvasSize,
				domWidth: canvasSize,
				containerId: containerId
			});
		}
		else {
			simulationIntModel.envSetters.threeDSetters.setupThreeDEnv({
				domHeight: canvasSize,
				domWidth: canvasSize,
				containerId: containerId
			});
		}

		simulationIntModel.camera.layers.toggle(1);
		simulationIntModel.camera.layers.toggle(2);
	}

	// ************** Draw intModel geo **************

	const options = {};
	simulationIntModel.intModel.intModelControllers.intModelGeoController.drawGeo.drawIntGeoForNetwork(
		simulationIntModel.scene,
		simulationIntModel.meterToPixel,
		options,
		clickableObjects
	);

	drawSimu.drawStats();

	// ************** Animate scene **************
	drawSimu.animateNetworkModel();
};


export default drawIntGeo;
