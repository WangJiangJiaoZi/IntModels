

/************************************************************************
	Get an instance of THREE.Shape representing the shifted given curves.
	The given curves is given in the form of an array of THREE.Vector2
	representing critial points on curves that connects two parallel lines
	with a bezier curve.

	 - Input:
	 	1.An array of THREE.Vector2 representing:
		 	[
				curves start point, //same as sp
				bezier start point,
				bezier end point,
				curves end point,  //same as ep
				bezier control point1, //same as cp1
				bezier control point2  //same as cp2
		 	]
		2. shift vector: an instance of THREE.Vector2
	 - Output:
	 	an instance of THREE.Shape for the shifted curves.


	Note:

************************************************************************/

const shiftConnectedParaLines = (THREE, vecArray, shiftVec) => {

	//get the critial points (vectors) for the shifted curves:
	const shiftedVecArray = [];
	vecArray.forEach((oneVec) => {
		const shiftedOneVec = oneVec.clone();
		shiftedOneVec.add(shiftVec);
		shiftedVecArray.push(shiftedOneVec);
	});

	const shiftedSpVec = shiftedVecArray[0];
	const shiftedBzSpVec = shiftedVecArray[1];
	const shiftedBzEpVec = shiftedVecArray[2];
	const shiftedEpVec = shiftedVecArray[3];
	const shiftedCp1Vec = shiftedVecArray[4];
	const shiftedCp2Vec = shiftedVecArray[5];

	//build the shifted curves:
	const shiftedCurves = new THREE.Shape();
	shiftedCurves.moveTo(shiftedSpVec.x, shiftedSpVec.y);
	shiftedCurves.lineTo(shiftedBzSpVec.x, shiftedBzSpVec.y);
	shiftedCurves.bezierCurveTo(
		shiftedCp1Vec.x, shiftedCp1Vec.y,
		shiftedCp2Vec.x, shiftedCp2Vec.y,
		shiftedBzEpVec.x, shiftedBzEpVec.y
	);
	shiftedCurves.lineTo(shiftedEpVec.x, shiftedEpVec.y);

	return shiftedCurves;
};

export default shiftConnectedParaLines;
