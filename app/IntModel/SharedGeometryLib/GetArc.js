

/************************************************************************
	Get an arc starts from vector [x1 - x0, y1 - y0] to [x2 - x0, y2 - y0]
	with a center of [x0, y0] and radius of r.
	The arc would be no more than 180 degrees.

	 - Input:
	 	1. x0, y0  //arc center
	 	2. x1, y1  //for start vector of the arc
	 	3. x2, y2  //for end vector of the arc
	 	4. r //radius
	 - Output:
	 	An arc which is NO more than 180 degrees and is an intance of Three.Curve

	Note: It is fine that [x1, y1] and [x2, y2] may not on the same circle with
		 a center of [x0, y0] and radius of r.
************************************************************************/
const getArc = (THREE, x0, y0, x1, y1, x2, y2, r) => {
	const arcStartPoint = [x1, y1];
	const arcEndPoint = [x2, y2];
	const centerPoint = [x0, y0];

	const startVector3 = new THREE.Vector3(
							arcStartPoint[0] - centerPoint[0],
							arcStartPoint[1] - centerPoint[1],
							0
						);
	const endVector3 = new THREE.Vector3(
							arcEndPoint[0] - centerPoint[0],
							arcEndPoint[1] - centerPoint[1],
							0
						);

	const startVector2 = new THREE.Vector2(
							arcStartPoint[0] - centerPoint[0],
							arcStartPoint[1] - centerPoint[1]
						);

	const endVector2 = new THREE.Vector2(
							arcEndPoint[0] - centerPoint[0],
							arcEndPoint[1] - centerPoint[1]
						);

	const startAngle = startVector2.angle();
	const endAngle = endVector2.angle();

	let angle = startVector3.angleTo(endVector3);

	startVector3.cross(endVector3);
	let ifClockWise;
	//if startVector.z > 0, the angle is counter clockwise
	if (startVector3.z > 0) 	{
		ifClockWise = (angle < Math.PI) ? false : true;
	}
	//else, it is clockwise
	else {
		ifClockWise = (angle < Math.PI) ? true : false;
	}


	const arcShape = new THREE.Shape([new THREE.Vector2(arcStartPoint[0], arcStartPoint[1])]);
	arcShape.absarc(
		centerPoint[0], centerPoint[1], r,
		startAngle, endAngle, ifClockWise
	);

	const arc = arcShape.curves[0];

	return arc;
};


export default getArc;
