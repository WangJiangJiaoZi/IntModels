

/************************************************************************
	Get counter clockwise angle between two vectors given in the form of
	THREE.Vector3

	 - Input:
	 	1. vector1 (an instance of THREE.Vector3)
	 	2. vector2 (an instance of THREE.Vector3)
	 - Output:
	 	Radian angle.

	Note:
		None
************************************************************************/

const getCcwAngleBtwTwoVectors = (vector1, vector2) => {

	let angle = vector1.angleTo(vector2);
	//const endAngle = endVector.angle();

	vector1.cross(vector2);
	//if startVector.z > 0, the angle is counter clockwise (which is what we want)
	if (vector1.z > 0) 	{
		return angle;
	}
	//else, it is clockwise (which is not what we what; processing needed)
	else {
		return Math.PI * 2 - angle;
	}
};


export default getCcwAngleBtwTwoVectors;
