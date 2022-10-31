


import getPointOnCircleBySlopAndIntersect from "./GetPointOnCircleBySlopAndIntersect";
import getAbFromTwoPoints from "./GetAbFromTwoPoints";
import testIfPointBtwTwoPoints from "./TestIfPointBtwTwoPoints";
/************************************************************************
	Get intersect point of a line segment and a circle.

	-Input:
		1. x1, y1, x2, y2; (start and end point of the segment)
		2. x0, y0; (center of the circle)
		3. r; (circle radius)
		4. accuracy (to accuracy difference accepted)
	-Output:
		[x, y], if there is one intersect point;
		[[x1, y1], [x2, y2]] if there are two intersect points
		null, if no or segment on line.

	Note:

************************************************************************/

const getIntersectPointOfSegmentAndCircle = (x1, y1, x2, y2, x0, y0, r, accuracy) => {
	const segAB = getAbFromTwoPoints(x1, y1, x2, y2, accuracy);
	const segA = segAB.a;
	const segB = segAB.b;

	const interPoints = getPointOnCircleBySlopAndIntersect(
							x0, y0,
							r, segA, segB, accuracy
						);

	if (interPoints === null) {
		return null;
	}
	else {
		let interX1 = null;
		let interY1 = null;
		let interX2 = null;
		let interY2 = null;

		const interP1 = interPoints[0];
		const interP2 = interPoints[1];

		const ifP1onSeg = testIfPointBtwTwoPoints(
							interP1[0], interP1[1],
							x1, y1, x2, y2, accuracy
						);

		const ifP2onSeg = testIfPointBtwTwoPoints(
							interP2[0], interP2[1],
							x1, y1, x2, y2, accuracy
						);

		if (ifP1onSeg) {
			interX1 = interP1[0];
			interY1 = interP1[1];
		}
		if (ifP2onSeg) {
			interX2 = interP2[0];
			interY2 = interP2[1];
		}

		if (interX1 && interX2) {
			return [[interX1, interY1], [interX2, interY2]];
		}
		else if (interX1 !== null) {
			return [interX1, interY1];
		}
		else if (interX2 !== null) {
			return [interX2, interY2];
		}
		else {
			return null;
		}


	}
};


export default getIntersectPointOfSegmentAndCircle;
