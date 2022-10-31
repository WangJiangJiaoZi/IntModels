


import getTangentPointsOf3pAndRadius from "./GetTangentPointsOf3pAndRadius";
import getPerpendicularLineByTwoPoints from "./GetPerpendicularLineByTwoPoints";
import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";

/************************************************************************
	Get center point of a tangent circle for two given lines.

	 - Input:
	 	1. point1: [x1, y1]  //end point on line 1
	 	2. point2: [x2, y2]  //end point on line2
	 	3. point3: [x3, y3]  //intersected point of the two lines
	 	4. radius: r  //radius to calculate the arc
	 	5. accuracy: p //accepted pixel accuracy
	 - Output:
	 	[x, y] for the circle center

	Note: The three points should be totally different.
************************************************************************/

const getTangentCenterPoint = (x1, y1, x2, y2, x3, y3, r, accuracy) => {
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

	return centerPoint;
};


export default getTangentCenterPoint;
