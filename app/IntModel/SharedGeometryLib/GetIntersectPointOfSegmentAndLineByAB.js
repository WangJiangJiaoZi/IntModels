

import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";

/************************************************************************
	Get intersect point of two a line segment and a line given by a and b.

	-Input:
		1. x1, y1, x2, y2 (start and end points of the line segment)
		2. a, b (if parallel to y, a would be null and b would be intersect on X)
		3. accuracy (to accuracy difference accepted)
	-Output: [x, y], if there is one intersected point; null, if no or segment on line.

	Note:
		1. The line segment could be parallel to the line.
		2. The line segment could be on the line.
		3. There could be no intersect point of the segment and the line.
************************************************************************/
const getIntersectPointOfSegmentAndLineByAB = (x1, y1, x2, y2, a, b, accuracy) => {
	let x, y, segA, segB;
	if (x1 === x2) {
		if (a === null && b === x1) {
			//no point if segment on line
			return null;
		}
		segA = null;
		segB = x1;
	}
	else {
		segA = (y1 - y2) / (x1 - x2);
		segB = y1 - segA * x1;
		if (segA === a && segB === b) {
			//no point if segment on line
			return null;
		}
	}

	const candidate = getIntersectedPointBySlopeAndIntersect(segA, segB, a, b);
	if (candidate === null) {
		return null;
	}
	else {
		x = candidate[0];
		y = candidate[1];
		if (((x1 - accuracy <= x && x <= x2 + accuracy) ||
			(x2 - accuracy <= x && x <= x1 + accuracy)) &&
			((y1 - accuracy <= y && y <= y2 + accuracy) ||
			(y2 - accuracy <= y && y <= y1 + accuracy)))
		{
			return [x, y];
		}
		else {
			return null;
		}
	}
};


export default getIntersectPointOfSegmentAndLineByAB;
