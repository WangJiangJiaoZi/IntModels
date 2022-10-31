



const drawIntCenterDivider = (divider, scene, clickableObjs, meterToPix, envSetters, roadDepth, options) => {
	//type:
	//null: none
	//1: dash line
	//2: single line
	//3: double line
	//4: left line and right dash line
	//5: left dash line and right line
	//6: wall (usually for median or hov)
	//7: sticks
	//8: grass
	//9: shadow
	const type = divider.type;
	const color = divider.color;

	const markHeight = envSetters.roadMarkHeight;  //in meters
	const sideDivHeight = envSetters.sideDivHeight;  //in meters

	//non linear divider: grass
	if (type === 8  && options.ifDrawThick) {
		const grassHeight = sideDivHeight;  //in meters
		const divExtSettings = {depth: grassHeight * meterToPix + roadDepth, bevelEnabled: false};
		const divMaterial = new divider.THREE.MeshLambertMaterial({color: color});

		const divCurves = divider.divShape.divCurves[0];

		const divGeo = new divider.THREE.ExtrudeBufferGeometry(divCurves, divExtSettings);
		const divMesh = new divider.THREE.Mesh(divGeo, divMaterial);

		const appId = divider.divGroup.approach.appId;
		divMesh.name = "center-divider-" + appId;
		const layerId = divider.layerId;
		divMesh.layers.set(layerId);

		scene.add(divMesh);
	}
	//non linear divider: shadow lines
	else if (type === 9) {

	}
	else {
		const linearDivHeight = markHeight;
		const divExtSettings = {depth: linearDivHeight * meterToPix + roadDepth, bevelEnabled: false};
		const divMaterial = new divider.THREE.MeshLambertMaterial({color: color});

		const divCurvesArray = divider.divShape.divCurves;

		divCurvesArray.forEach((divCurves, index) => {
			const divGeo = new divider.THREE.ExtrudeBufferGeometry(divCurves, divExtSettings);
			const divMesh = new divider.THREE.Mesh(divGeo, divMaterial);

			const appId = divider.divGroup.approach.appId;
			divMesh.name = "center-divider-" + appId + "-" + index;
			const layerId = divider.layerId;
			divMesh.layers.set(layerId);

			scene.add(divMesh);
		});
	}
};

export default drawIntCenterDivider;
