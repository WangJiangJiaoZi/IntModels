

/************************************************************************
	Get the line that passes the given point (x, y) and is perpendicular to the given line (a, b).

	-Input:
		1. x, y;
		2. a, b (if parallel to y, a would be null and b would be intersect on X)
		3. accuracy (accepted accuracy)
	-Output: {a: xx, b:  xx}.

	Note: The input or output line maybe parallel to X.
************************************************************************/

const getPerpendicularLineBySlopAndIntersect = (x, y, a, b, accuracy) => {
	let perpA, perpB;
	if (a === null) {
		perpA = 0;
		perpB = y;
	}
	else if (a === 0) {
		perpA = null;
		perpB = x;
	}
	else {
		perpA = -1 / a;
		perpB = y - perpA * x;
	}

	return {a: perpA, b: perpB};
};


export default getPerpendicularLineBySlopAndIntersect;
