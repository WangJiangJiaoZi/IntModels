



/************************************************************************
	Get counter clockwise angle between two lines given in the form two points
	The calculation would use THREE.js

	 - Input:
	 	1. x1, y1 (the unique point on start side)
	 	2. x2, y2 (the unique point on end side)
	 	3. x3, y3 (the intersect point of the two sides)
	 	4. accuracy (accepted pixel accuracy)
	 - Output:
	 	Radian angle, if point 1 & 3 or 2 & 3 are not the same; null, if they are.

	Note:
		The three points maybe the same
************************************************************************/

const getCcwAngleBtwTwoLine = (THREE, x1, y1, x2, y2, x3, y3, accuracy) => {

	const x12 = Math.abs(x1 - x2);
	const x13 = Math.abs(x1 - x3);
	const x23 = Math.abs(x2 - x3);
	const y12 = Math.abs(y1 - y2);
	const y13 = Math.abs(y1 - y3);
	const y23 = Math.abs(y2 - y3);

	//if point 1 & 3 or 2 & 3 are the same, return null
	if ((x13 < accuracy && y13 < accuracy) || (x23 < accuracy && y23 < accuracy)) {
		return null;
	}
	else {
		const startVector = new THREE.Vector3(
							x1 - x3,
							y1 - y3,
							0
						);

		const endVector = new THREE.Vector3(
							x2 - x3,
							y2 - y3,
							0
						);

		let angle = startVector.angleTo(endVector);
		//const endAngle = endVector.angle();

		startVector.cross(endVector);
		//if startVector.z > 0, the angle is counter clockwise (which is what we want)
		if (startVector.z > 0) 	{
			return angle;
		}
		//else, it is clockwise (which is not what we what; processing needed)
		else {
			return Math.PI * 2 - angle;
		}
	}
};


export default getCcwAngleBtwTwoLine;

