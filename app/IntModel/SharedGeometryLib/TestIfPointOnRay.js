
/************************************************************************
	Test if the given point (x, y) is on a ray defined by (x1, y1) and (x2, y2).
	Where (x1, y1) is the start point.

	 - Input:
	 	1. x, y: the point to test
	 	2. [x1, y1], [x2, y2]
	 	3. accuray to accept
	 - Output: true if on the ray; false if not.

	Note: None.
************************************************************************/

//import ./././TestIfPointOnLineByTwoPoints from "././././TestIfPointOnLineByTwoPoints";

const testIfPointOnRay = (x0, y0, x1, y1, x2, y2, accuracy) => {
	let ifOnRay = false;
	let ifOnLine = false;

	// *************** First of all, test if on line ***************
	//if the line is perpendicular to X
	if (x1 === x2) {
		ifOnLine = (Math.abs(x0 - x1) < accuracy) ? true : false;
	}
	//else, the line is normal
	else {
		const a = (y1 - y2) / (x1 - x2);
		const b = y1 - a * x1;
		ifOnLine = (Math.abs(y0 - (a * x0 + b)) < accuracy) ? true : false;
	}

	// *************** Second, test if on ray if it is on line ******************
	if (ifOnLine) {
		if (x1 < x2) {
			ifOnRay = (x0 > x1 - accuracy) ? true : false;
		}
		else {
			ifOnRay = (x0 < x1 + accuracy) ? true : false;
		}
	}

	return ifOnRay;
};


export default testIfPointOnRay;
