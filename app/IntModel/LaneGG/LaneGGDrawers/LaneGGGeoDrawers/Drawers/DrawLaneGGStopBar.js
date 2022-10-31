/************************************************************
	Draw LaneGG stop bar Geometry:
		1. Would draw stop bar itself.
*************************************************************/
const drawLaneGGStopBar = (laneGG, scene, roadMarkExtSettings, roadMarkMaterial) => {

	const stopBarShape = laneGG.laneGGShape.stopBarCurves;
	const stopBarGeometry = new laneGG.THREE.ExtrudeBufferGeometry(stopBarShape, roadMarkExtSettings);
	const stopBarMesh = new laneGG.THREE.Mesh(stopBarGeometry, roadMarkMaterial);

	const appId = laneGG.approach.appId;
	const layerId = laneGG.layerId;
	stopBarMesh.layers.set(layerId);

	stopBarMesh.name = "stopBarMesh " + appId;
	scene.add(stopBarMesh);
};


export default drawLaneGGStopBar;
