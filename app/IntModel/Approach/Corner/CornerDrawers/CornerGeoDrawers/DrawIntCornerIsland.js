

/***********************************************************************
				Draw Intersection Corner Island.
************************************************************************/
const drawIntCornerIsland = (corner, scene, islandMaterial, islandExtSettings) => {



	//Not all corner of type 3 has island....
	if (corner.cornerShape.intCornerShape.islandCurves) {
		const islandShape = corner.cornerShape.intCornerShape.islandCurves;
		const islandGeo = new corner.THREE.ExtrudeBufferGeometry(islandShape, islandExtSettings);
		const islandMesh = new corner.THREE.Mesh(islandGeo, islandMaterial);

		const appId = corner.approach.appId;
		islandMesh.name = "island-" + appId;
		const layerId = corner.layerId + 1; //would be 1
		islandMesh.layers.set(layerId);

		scene.add(islandMesh);

	}
};


export default drawIntCornerIsland;
