
/************************************************************************
	Get the line that passes the given point (x, y) and
	is perpendicular to the given line (in the form of two points).

	-Input:
		1. x0, y0;
		2. x1, y1, x2, y2; //two points on line
		3. accuracy;  //accepted accuracy
	-Output: {a: xx, b:  xx}.

	Note: The input or output line maybe parallel to X.
************************************************************************/

const getPerpendicularLineByTwoPoints = (x0, y0, x1, y1, x2, y2, accuracy) => {

	let a, b;

	//when the line is perpendicular to X
	if (x1 - accuracy < x2 && x2 < x1 + accuracy) {
		a = 0;
		b = y0 - a * x0;
	}
	//when the line is parallel to X
	else if (y1 - accuracy < y2 && y2 < y1 + accuracy) {
		a = null;
		b = x0;
	}
	else {
		const a0 = (y1 - y2) / (x1 - x2);
		a = -1 / a0;
		b = y0 - a * x0;
	}

	return {a: a, b: b};
};


export default getPerpendicularLineByTwoPoints;
