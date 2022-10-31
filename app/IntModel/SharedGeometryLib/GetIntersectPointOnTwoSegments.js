

import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";
import getAbFromTwoPoints from "./GetAbFromTwoPoints";
import testIfPointBtwTwoPoints from "./TestIfPointBtwTwoPoints";
/************************************************************************
	Get intersect point of two line segments.

	-Input:
		1. x11, y11, x12, y12; (start and end point of the first segment)
		2. x21, y21, x22, y22; (start and end point of the second segment)
		3. accuracy (in pixel)
	-Output:
		[x, y], if there is one intersect point;
		null, if there is not

	Note:

************************************************************************/
const getIntersectPointOnTwoSegments = (x11, y11, x12, y12, x21, y21, x22, y22, accuracy) => {
	const line1AB = getAbFromTwoPoints(x11, y11, x12, y12, accuracy);
	const line2AB = getAbFromTwoPoints(x21, y21, x22, y22, accuracy);

	const interPoint = getIntersectedPointBySlopeAndIntersect(
						line1AB.a, line1AB.b,
						line2AB.a, line2AB.b,
						accuracy
					);

	const ifOnSeg1 = testIfPointBtwTwoPoints(
						interPoint[0], interPoint[1],
						x11, y11, x12, y12,
						accuracy
					);

	const ifOnSeg2 = testIfPointBtwTwoPoints(
						interPoint[0], interPoint[1],
						x21, y21, x22, y22,
						accuracy
					);

	if (ifOnSeg1 && ifOnSeg2) {
		return interPoint;
	}
	else {
		return null;
	}

};


export default getIntersectPointOnTwoSegments;
