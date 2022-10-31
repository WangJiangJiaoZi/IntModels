


/************************************************************************
	Test if the given point (x, y) is on line given by two points ([x1, y1], [x2, y2])

	 - Input:
	 	1. x, y: the point to test
	 	2. [x1, y1], [x2, y2]: two points on the line
	 	3. accuray to accept
	 - Output: true if on line; false if not.

	Note: None.
************************************************************************/
const testIfPointOnLineByTwoPoints = (x, y, x1, y1, x2, y2, accuray) => {
	let ifOnLine = false;

	//if the line is perpendicular to X
	if (x1 === x2) {
		ifOnLine = (Math.abs(x - x1) < accuray) ? true : false;
	}
	//else, the line is normal
	else {
		const a = (y1 - y2) / (x1 - x2);
		const b = y1 - a * x1;
		ifOnLine = (Math.abs(y - (a * x + b)) < accuray) ? true : false;
	}

	return ifOnLine;
};


export default testIfPointOnLineByTwoPoints;
