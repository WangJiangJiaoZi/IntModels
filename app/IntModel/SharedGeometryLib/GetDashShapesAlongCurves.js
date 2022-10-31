


/************************************************************************
	Get an array of THREE.Shape representing dash rectangles along the two
	prallel given curves.

	 - Input:
	 	1. curves1; //an instance of THREE.Shape
	 	2. curves2; //an instance of THREE.Shape
	 	3. dashLen;  //the length of the dash
	 - Output:
	 	[Three.shape]

	Note:
		The two curves must be "parallel"
************************************************************************/

const getDashShapesAlongCurves = (THREE, curves1, curves2, dashLen) => {

	const curveLen = curves1.getLength(); //curves1 and curves2 have the same length

	const dashCount = Math.floor(curveLen / dashLen);
	const cur1DashPoints = [];
	const cur2DashPoints = [];
	let accumLen = 0;


	//get points dividing the curves into pieces:
	for (let i = 0; i < dashCount; i++) {
		const division = accumLen / curveLen;
		const rightP = curves1.getPoint(division);
		const leftP = curves2.getPoint(division);
		cur1DashPoints.push(rightP);
		cur2DashPoints.push(leftP);

		accumLen += dashLen;
	}


	//build the array of rectangles:
	const dashLineShapes = [];

	for (let i = 1; i < cur1DashPoints.length - 1; i = i + 2) {
		const oneDashRect = new THREE.Shape();
		oneDashRect.moveTo(cur1DashPoints[i].x, cur1DashPoints[i].y);
		oneDashRect.lineTo(cur1DashPoints[i + 1].x, cur1DashPoints[i + 1].y);
		oneDashRect.lineTo(cur2DashPoints[i + 1].x, cur2DashPoints[i + 1].y);
		oneDashRect.lineTo(cur2DashPoints[i].x, cur2DashPoints[i].y);
		oneDashRect.closePath();
		dashLineShapes.push(oneDashRect);
	}

	return dashLineShapes;
};

export default getDashShapesAlongCurves;
