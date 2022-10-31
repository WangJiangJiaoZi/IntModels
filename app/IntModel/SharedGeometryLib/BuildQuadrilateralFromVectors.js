
//import * as THREE from "../../Vendors/three/three.min";



/************************************************************************
	Build an instance of THREE.Shape for an quadilateral from three vectors

	 - Input:
	 	1. initial vector: an instance of THREE.Vector2
	 	2. width vector: an instance of THREE.Vector2
	 	3. height vector: an instance of THREE.Vector2

	 - Output:
	 	an instance of THREE.Shape

	Note:
		None
************************************************************************/

const buildQuadrilateralFromVectors = (THREE, initVector, widthVector, heightVector) => {

	const quad = new THREE.Shape();
	quad.moveTo(initVector.x, initVector.y);

	let curVector = initVector.clone();

	curVector = curVector.add(widthVector);
	const point2 = [curVector.x, curVector.y];
	quad.lineTo(point2[0], point2[1]);

	curVector = curVector.add(heightVector);
	const point3 = [curVector.x, curVector.y];
	quad.lineTo(point3[0], point3[1]);

	const minusWidthVector = new THREE.Vector2(-widthVector.x, -widthVector.y);
	curVector = curVector.add(minusWidthVector);
	const point4 = [curVector.x, curVector.y];
	quad.lineTo(point4[0], point4[1]);

	quad.closePath();

	return quad;
};


export default buildQuadrilateralFromVectors;
