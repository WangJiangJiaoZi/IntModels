



/************************************************************************
	Test if the given point is between the given two points.

	-Input:
		1. x, y;
		2. x1, y1;
		3. x2, y2;
		4. accuracy
	-Output: True, if point is between the two points; False, if not.

	Note:
		The two points should not be the same.
************************************************************************/
const testIfPointBtwTwoPoints = (x, y, x1, y1, x2, y2, accuracy) => {
	const xdistPtoP1 = Math.abs(x - x1);
	const ydistPtoP1 = Math.abs(y - y1);
	const xdistPtoP2 = Math.abs(x - x2);
	const ydistPtoP2 = Math.abs(y - y2);
	const xdistP1toP2 = Math.abs(x1 - x2);
	const ydistP1toP2 = Math.abs(y1 - y2);

	const ifxBtwP1P2 = ((xdistPtoP1 + xdistPtoP2) < xdistP1toP2 + accuracy) ? true : false;

	const ifyBtwP1P1 = ((ydistPtoP1 + ydistPtoP2) < ydistP1toP2 + accuracy) ? true : false;

	const ifBtw = (ifxBtwP1P2 && ifyBtwP1P1) ? true : false;

	return ifBtw;
};


export default testIfPointBtwTwoPoints;
