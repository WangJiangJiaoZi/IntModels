


/************************************************************************
	Get the intersected point(s) of a circle and a line (given by slope and intersect)

	-Input: xc, yc, r; a, b (if parallel to y, a would be null and b would be intersect on X)
	-Output: [x1, y1], [x2, y2].

	Note: There would be 0 or 1 or 2 intersected points.
************************************************************************/


const getPointOnCircleBySlopAndIntersect = (xc, yc, r, a, b, accuracy) => {
	let x1, y1, x2, y2, A, B, C, delta, x, y;
	if (a === null) {
		x1 = b;
		x2 = b;
		A = 1;
		B = -2 * yc;
		C = -2 * b * xc + xc * xc + yc * yc - r * r + b * b;
		delta = B * B - 4 * A * C;
		if ( delta >= 0) {
			y1 = (-1 * B + Math.pow(delta, 0.5)) / (2 * A);
			y2 = (-1 * B - Math.pow(delta, 0.5)) / (2 * A);
			return [[x1, y1], [x2, y2]];
		}
		else if (delta > -1 * accuracy) {
			y = (-1 * B) / (2 * A);
			return [[x1, y], [x2, y]];
		}
		else {
			return null;
		}
	}
	else {
		A = a * a + 1;
		B = 2 * a * b - 2 * xc - 2 * a * yc;
		C = xc * xc + b * b - 2 * b * yc + yc * yc - r * r;
		delta = B * B - 4 * A * C;
		if (delta >= 0) {
			x1 = (-1 * B + Math.pow(delta, 0.5)) / (2 * A);
			x2 = (-1 * B - Math.pow(delta, 0.5)) / (2 * A);
			y1 = a * x1 + b;
			y2 = a * x2 + b;
			return [[x1, y1], [x2, y2]];
		}
		else if (delta > -1 * accuracy) {
			x = (-1 * B) / (2 * A);
			y = a * x + b;
			return [[x, y], [x, y]];
		}
		else {
			return null;
		}

	}
};

export default getPointOnCircleBySlopAndIntersect;
