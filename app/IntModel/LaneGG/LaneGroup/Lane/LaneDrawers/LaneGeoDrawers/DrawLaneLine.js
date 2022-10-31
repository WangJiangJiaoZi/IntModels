



const drawLaneline = (lane, scene, clickableObjs, extSettings, material, bound) => {
	const solidLineShape = lane.laneShape.laneSolidLineCurves;
	const dashLineShapes = lane.laneShape.laneDashLineCurves;

	const layerId = lane.laneGroup.laneGG.layerId;


	if (bound === "inbound") {
		const solidLineGeometry = new lane.THREE.ExtrudeBufferGeometry(solidLineShape, extSettings);
		const solidLineMesh = new lane.THREE.Mesh(solidLineGeometry, material);

		solidLineMesh.layers.set(layerId);
		solidLineMesh.name = "solidLineMesh";

		scene.add(solidLineMesh);

	}

	dashLineShapes.forEach((oneDashShape) => {
		const oneDashGeometry = new lane.THREE.ExtrudeBufferGeometry(oneDashShape, extSettings);
		const oneDashMesh = new lane.THREE.Mesh(oneDashGeometry, material);

		oneDashMesh.layers.set(layerId);
		oneDashMesh.name = "dashLineMesh";

		scene.add(oneDashMesh);
	});

};


export default drawLaneline;
