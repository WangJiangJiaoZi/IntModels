
/************************************************************************
	Get distance between two points given in the form of x1, y1, x2, y2.

	-Input: x1, y1, x2, y2
	-Output: dist

	Note: None.
************************************************************************/
const getDistBtwTwoPoints = (x1, y1, x2, y2) => {

	const distPower2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	const dist = Math.pow(distPower2, 0.5);

	return dist;
};


export default getDistBtwTwoPoints;
