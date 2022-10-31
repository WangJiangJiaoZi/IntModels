
/************************************************************************
	Rotate an 2D vector counter clockwise around its origin by certain angle.

	 - Input:
	 	1. vector: an instance of THREE.Vector2
	 	2. angle: angle in radians

	 - Output:
	 	A new rotated vector.

	Note:
		The input vector will stay the same. A new cloned vector would be
		rotated and return.
************************************************************************/

const rotateVectorCcw = (THREE, vector, angle) => {
	const rotVec = vector.clone();

	const centerVec = new THREE.Vector2(0, 0);

	rotVec.rotateAround(centerVec, angle);

	return rotVec;
};


export default rotateVectorCcw;
