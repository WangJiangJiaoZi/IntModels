


/************************************************************************
	Test if the given point is on the line given in the form of
	slopes and intersects.

	-Input:
		1. x, y;
		2. a, b (if parallel to y, a would be null and b would be intersect on X)
		3. accuray to accept
	-Output: True, if point is on line; False, if not.

	Note: The line maybe perpendicular to X.
************************************************************************/
const testIfPointOnLineBySlopeAndIntersect = (x, y, a, b, accuracy) => {
	let ifOnLine = false;


	if (a === null) {
		ifOnLine = (Math.abs(x - b) < accuracy) ? true : false;
	}
	else {
		ifOnLine = (Math.abs(y - (a * x + b)) < accuracy) ? true : false;
	}

	return ifOnLine;
};


export default testIfPointOnLineBySlopeAndIntersect;
