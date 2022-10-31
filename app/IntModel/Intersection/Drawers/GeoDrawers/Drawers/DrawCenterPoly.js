


/************************************************************
	Draw Intersection Center Polygon Geometry:
		1. Would draw intersection center polygon.
*************************************************************/
const drawCenterPoly = (intersection, scene, roadExtSettings, roadMaterial) => {
	const centerPolyShape = intersection.intShape.centerPoly;
	const centerPolyGeo = new intersection.THREE.ExtrudeBufferGeometry( centerPolyShape, roadExtSettings );
	const centerPolyMesh = new intersection.THREE.Mesh(centerPolyGeo, roadMaterial);
	//const centerPolyMesh = new THREE.Mesh(centerPolyGeo, new THREE.MeshLambertMaterial({color: "#646464"}));


	const layerId = intersection.layerId;
	centerPolyMesh.layers.set(layerId);

	centerPolyMesh.name = "centerPolyMesh";
	scene.add(centerPolyMesh);
};

export default drawCenterPoly;
