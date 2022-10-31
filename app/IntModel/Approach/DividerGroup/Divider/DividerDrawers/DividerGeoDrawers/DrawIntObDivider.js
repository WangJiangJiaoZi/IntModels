


const drawIntObDivider = (divider, scene, clickableObjs, meterToPix, envSetters, roadDepth, options) => {

	const type = divider.type;  //1 for white dash, 2 for white solid, 3.......


	let obDividerHeight;
	if ((type === 6 || type === 7 || type === 8) && options.ifDrawThick) {
		const sideDivHeight = envSetters.sideDivHeight;  //in meters
		obDividerHeight = sideDivHeight;  //in meters
	}
	else {
		const roadMarkerHeight = envSetters.roadMarkHeight;  //in meters
		obDividerHeight = roadMarkerHeight;  //in meters
	}


	const divExtSettings = {depth: obDividerHeight * meterToPix + roadDepth, bevelEnabled: false};
	const color = divider.color;
	const divMaterial = new divider.THREE.MeshLambertMaterial({color: color});

	const divCurves = divider.divShape.divCurves[0];

	const divGeo = new divider.THREE.ExtrudeBufferGeometry(divCurves, divExtSettings);
	const divMesh = new divider.THREE.Mesh(divGeo, divMaterial);

	const appId = divider.divGroup.approach.appId;
	divMesh.name = "outbound-divider-" + appId;
	const layerId = divider.layerId;
	divMesh.layers.set(layerId);

	scene.add(divMesh);
};


export default drawIntObDivider;
