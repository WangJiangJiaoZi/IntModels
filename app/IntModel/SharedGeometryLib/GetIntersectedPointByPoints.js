

import getAbFromTwoPoints from "./GetAbFromTwoPoints";
import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";

/************************************************************************
	Get intersect point of two lines that are in the form of
	two points.

	-Input:
		1. x1, y1, x2, y2: two points on line 1
		2. x3, y3, x4, y4: two points on line 2
		3. accuracy
	-Output:
		[x, y], if there is intersected point; null, if no.

	Note: The two lines maybe parallel to each other.
************************************************************************/

const getIntersectedPointByPoints = (x1, y1, x2, y2, x3, y3, x4, y4, accuracy) => {

	const line1 = getAbFromTwoPoints(x1, x2, y1, y2, accuracy);
	const line2 = getAbFromTwoPoints(x3, x4, y3, y4, accuracy);

	const interPoint = getIntersectedPointBySlopeAndIntersect(
						line1.a, line1.b, line2.a, line2.b, accuracy
					);

	return interPoint;  //could be null...
};

export default getIntersectedPointByPoints;
