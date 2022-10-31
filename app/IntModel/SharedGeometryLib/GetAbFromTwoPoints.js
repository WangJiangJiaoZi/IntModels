

/************************************************************************
	Get intersect and slope of a line from two on line points.

	 - Input:
	 	1. x1, y1;  //on line point 1
	 	2. x2, y2;  //on line point 2
	 	3. accuracy; //in pixel
	 - Output:
	 	{a: xx, b: xx}

	Note:
		When x1 == x2, a would be null, and b would be x1
************************************************************************/
const getAbFromTwoPoints = (x1, x2, y1, y2, accuracy) => {
	let a, b;
	if (Math.abs(x1 - x2) < accuracy) {
		a = null;
		b = x1;
	}
	else if (Math.abs(y1 - y2) < accuracy) {
		a = 0;
		b = y1;
	}
	else {
		a = (y1 - y2) / (x1 - x2);
		b = y1 - a * x1;
	}

	return {a: a, b: b};
};

export default getAbFromTwoPoints;
