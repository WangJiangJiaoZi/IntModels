


const drawCrosswalk = (crosswalk, scene, clickableObjs, crosswalkExtSettings, crosswalkMaterial) => {
	const rectCurves = crosswalk.crosswalkShape.rectCurves;

	rectCurves.forEach((oneRect) => {
		const oneRectGeo = new crosswalk.THREE.ExtrudeBufferGeometry(oneRect, crosswalkExtSettings);
		const oneRectMesh = new crosswalk.THREE.Mesh(oneRectGeo, crosswalkMaterial);

		const appId = crosswalk.approach.appId;
		oneRectMesh.name = "crosswalk-" + appId;
		const layerId = crosswalk.layerId;
		oneRectMesh.layers.set(layerId);

		scene.add(oneRectMesh);
	});
};

export default drawCrosswalk;
