


const drawLaneWaitingArea = (lane, scene, clickableObjs, roadMarkExtSettings, laneLineMaterial) => {
	const wAreaLsShapes = lane.laneShape.wAreaLsCurves;  //[instances of THREE.Shape]
	const wAreaRsShapes = lane.laneShape.wAreaRsCurves;  //[instances of THREE.Shape]
	const wAreaStopBar = lane.laneShape.wAreaStopBar;  //an instance of THREE.Shape

	const layerId = lane.laneGroup.laneGG.layerId;

	wAreaLsShapes.forEach((oneShape) => {
		const leftGeometry = new lane.THREE.ExtrudeBufferGeometry(oneShape, roadMarkExtSettings);
		const leftDashMesh = new lane.THREE.Mesh(leftGeometry, laneLineMaterial);

		leftDashMesh.layers.set(layerId);
		leftDashMesh.name = "waitingAreaLeftDash";

		scene.add(leftDashMesh);
	});

	wAreaRsShapes.forEach((oneShape) => {
		const rightGeometry = new lane.THREE.ExtrudeBufferGeometry(oneShape, roadMarkExtSettings);
		const rightDashMesh = new lane.THREE.Mesh(rightGeometry, laneLineMaterial);

		rightDashMesh.layers.set(layerId);
		rightDashMesh.name = "waitingAreaRightDash";

		scene.add(rightDashMesh);
	});

	const stopBarGeometry = new lane.THREE.ExtrudeBufferGeometry(wAreaStopBar, roadMarkExtSettings);
	const stopBarMesh = new lane.THREE.Mesh(stopBarGeometry, laneLineMaterial);

	stopBarMesh.layers.set(layerId);
	stopBarMesh.name = "waitingAreaStopBar";

	scene.add(stopBarMesh);
};


export default drawLaneWaitingArea;
