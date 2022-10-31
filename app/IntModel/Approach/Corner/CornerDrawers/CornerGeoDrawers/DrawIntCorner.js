

/***********************************************************************
				Draw Intersection Corner Geometry.
************************************************************************/

const drawIntCorner = (corner, scene, roadExtSettings, roadMaterial, clickableObjs) => {
	//not all corner have curves...
	//if the angle between two apps is more than 180 degrees, there would be no curves...
	if (corner.cornerShape.intCornerShape.cornerCurves) {
		corner.cornerShape.intCornerShape.cornerCurves.forEach((oneCornerShape, index) => {
			const oneCornerGeo = new corner.THREE.ExtrudeBufferGeometry(oneCornerShape, roadExtSettings);
			const oneCornerMesh = new corner.THREE.Mesh(oneCornerGeo, roadMaterial);

			const appId = corner.approach.appId;
			oneCornerMesh.name = "corner-" + appId + "-" + index;
			const layerId = corner.layerId;
			oneCornerMesh.layers.set(layerId);

			scene.add(oneCornerMesh);
		});
	}
};


export default drawIntCorner;
