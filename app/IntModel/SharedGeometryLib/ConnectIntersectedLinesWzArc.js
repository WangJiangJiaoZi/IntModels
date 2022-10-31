


import getTangentPointsOf3pAndRadius from "./GetTangentPointsOf3pAndRadius";
import getPerpendicularLineByTwoPoints from "./GetPerpendicularLineByTwoPoints";
import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";
import testIfPointOnLineByTwoPoints from "./TestIfPointOnLineByTwoPoints";

/************************************************************************
	Connect two intersected lines with an arc (by using Three.js)

	 - Input:
	 	1. point1: [x1, y1]  //end point on line 1
	 	2. point2: [x2, y2]  //end point on line2
	 	3. point3: [x3, y3]  //intersected point of the two lines
	 	4. radius: r  //radius to calculate the arc
	 	5. accuracy: p //accepted pixel accuracy
	 - Output: connectionCurve which is an intance of Three.shape

	Note: The three points should be totally different.
************************************************************************/

const connectIntersectedLinesWzArc = (THREE, x1, y1, x2, y2, x3, y3, r, accuracy) => {

	const arcPoints = getTangentPointsOf3pAndRadius(x1, y1, x2, y2, x3, y3, r);
	const arcStartPoint = [arcPoints[0][0], arcPoints[0][1]];
	const arcEndPoint = [arcPoints[1][0], arcPoints[1][1]];

	const startSidePerpLine = getPerpendicularLineByTwoPoints(
								arcStartPoint[0], arcStartPoint[1],
								x1, y1, x3, y3, accuracy
							);  //in the form of {a: xx, b: xx}
	const endSidePerpLine = getPerpendicularLineByTwoPoints(
								arcEndPoint[0], arcEndPoint[1],
								x2, y2, x3, y3, accuracy
							);  //in the form of {a: xx, b: xx}

	const centerPoint = getIntersectedPointBySlopeAndIntersect(
							startSidePerpLine.a, startSidePerpLine.b,
							endSidePerpLine.a, endSidePerpLine.b
						);  //in the form of [x, y]


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

	//console.log(arcStartPoint, arcEndPoint);
	//console.log(startAngle)


	//let ifClockWise = (startAngle > endAngle) ? true : false;
	//ifClockWise = ((startAngle > endAngle) && (startAngle - endAngle > Math.PI)) ? (!ifClockWise) : ifClockWise;



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


	const connectionCurve = new THREE.Shape([new THREE.Vector2(arcStartPoint[0], arcStartPoint[1])]);
	connectionCurve.absarc(
		centerPoint[0], centerPoint[1], r,
		startAngle, endAngle, ifClockWise
	);

	return connectionCurve;

};


export default connectIntersectedLinesWzArc;
