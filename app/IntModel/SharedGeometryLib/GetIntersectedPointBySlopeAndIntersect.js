
/************************************************************************
	Get intersect point of two lines that are in the form of
	slopes and intersects.

	-Input:
		1. a1, b1, a2, b2 (if parallel to y, a would be null and b would be intersect on X)
		2. accuracy
	-Output: [x, y], if there is intersected point; null, if no.

	Note: The two lines maybe parallel to each other.
************************************************************************/

const getIntersectedPointBySlopeAndIntersect = (a1, b1, a2, b2, accuracy) => {
	let x, y;

	const v11 = a1 + b1;
	const v12 = a1 * 2 + b1;
	const v21 = a2 + b2;
	const v22 = a2 * 2 + b2;

	if ( a1 === a2 ) {
		return null;
	}
	else if (a1 === null) {
		x = b1;
		y = a2 * x + b2;
	}
	else if (a2 === null) {
		x = b2;
		y = a1 * x + b1;
	}
	//if the two lines between angle is less than 0.25 degrees, we treat the them as parallel lines
	else if (Math.abs(Math.atan(a1) - Math.atan(a2)) < (Math.PI / 720)) {
		return null;
	}
	else {
		x = (b2 - b1) / (a1 - a2);
		y = a1 * x + b1;
	}

	return [x, y];
};


export default getIntersectedPointBySlopeAndIntersect;
