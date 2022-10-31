

/************************************************************************
	Get critial points (in the form of THREE.Vector2) on the curves connecting
	two parallel lines with a bezier curve.

	 - Input:
	 	1. sp; //[x, y] for curves start point
	 	2. ep; //[x, y] for curves end point
	 	3. cp1; //[x, y] for control point 1
	 	4. cp2; //[x, y] for control point 2
	 	5. r; //radius to decide the start and end point of the bezier curve
	 - Output:
	 	An array of THREE.Vector2 representing:
	 	[
			curves start point, //same as sp
			bezier start point,
			bezier end point,
			curves end point,  //same as ep
			bezier control point1, //same as cp1
			bezier control point2  //same as cp2
	 	]

	Note:
		The line of (sp, cp1) and the line of (ep, cp2) must be parallel..
************************************************************************/

const getVectorsOnBzConnectParaLines = (THREE, sp, ep, cp1, cp2, r) => {

	//build vectors:
	const spVec = new THREE.Vector2(sp[0], sp[1]);
	const epVec = new THREE.Vector2(ep[0], ep[1]);
	const cp1Vec = new THREE.Vector2(cp1[0], cp1[1]);
	const cp2Vec = new THREE.Vector2(cp2[0], cp2[1]);


	//decide bezier curve start point (an THREE.Vector2):
	const cp1ToBzSpVec = new THREE.Vector2(spVec.x - cp1Vec.x, spVec.y - cp1Vec.y);
	const cp1ToBzSpVecLenSq = cp1ToBzSpVec.lengthSq();
	const dist1 = (Math.pow(r, 2) < cp1ToBzSpVecLenSq) ? r : Math.pow(cp1ToBzSpVecLenSq, 0.5);
	cp1ToBzSpVec.setLength(dist1);
	const bzSpVec = new THREE.Vector2();
	bzSpVec.addVectors(cp1Vec, cp1ToBzSpVec);


	//decide bezier curve end point (an THREE.Vector2):
	const cp2ToBzEpVec = new THREE.Vector2(epVec.x - cp2Vec.x, epVec.y - cp2Vec.y);
	const cp2ToBzEpVecLenSq = cp2ToBzEpVec.lengthSq();
	const dist2 = (Math.pow(r, 2) < cp2ToBzEpVecLenSq) ? r : Math.pow(cp2ToBzEpVecLenSq, 0.5);
	cp2ToBzEpVec.setLength(dist2);
	const bzEpVec = new THREE.Vector2();
	bzEpVec.addVectors(cp2Vec, cp2ToBzEpVec);


	//return the result:
	const connectedParaLineVectors = [spVec, bzSpVec, bzEpVec, epVec, cp1Vec, cp2Vec];
	return connectedParaLineVectors;
};


export default getVectorsOnBzConnectParaLines;
