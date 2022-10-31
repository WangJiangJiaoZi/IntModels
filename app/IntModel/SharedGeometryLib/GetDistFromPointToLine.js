

import getCcwAngleBtwVectors from "./GetCcwAngleBtwTwoVectors";

/************************************************************************
	Get distance from a point to a line (in the form of two points)

	-Input:
		1. x0, y0
		2. x1, y1: point 1 on line
		3. x2, y2: point 2 on line
	-Output:
		dist

	Note: None.
************************************************************************/


const getDistFromPointToLine = (THREE, x0, y0, x1, y1, x2, y2) => {

	const p1ToP2Vec3 = new THREE.Vector3(x2 - x1, y2 - y1, 0);
	const p1ToP0Vect3 = new THREE.Vector3(x0 - x1, y0 - y1, 0);

	const p1ToP0Vect2 = new THREE.Vector2(x0 - x1, y0 - y1);
	const len = p1ToP0Vect2.length();

	let angle = getCcwAngleBtwVectors(p1ToP2Vec3, p1ToP0Vect3);
	angle = (angle > Math.PI) ? (Math.PI * 2 - angle) : angle;

	const dist = len * Math.sin(angle);

	return dist;

};


export default getDistFromPointToLine;
