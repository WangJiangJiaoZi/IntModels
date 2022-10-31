


/************************************************************
	Draw Approach Geometry:
		1. Would draw approach itself.
*************************************************************/
const drawApproach = (approach, scene, roadExtSettings, roadMaterial) => {
	const appShape = approach.appShape.curves;
	const appGeometry = new approach.THREE.ExtrudeBufferGeometry(appShape, roadExtSettings);
	const appMesh = new approach.THREE.Mesh(appGeometry, roadMaterial);

	const appId = approach.appId;
	const layerId = approach.layerId;
	appMesh.layers.set(layerId);

	appMesh.name = "appMesh " + appId;
	scene.add(appMesh);
};


export default drawApproach;
