
import SharedGeometryLib from "../../../../SharedGeometryLib";
import convexHull from  "../../../../../Vendors/convex-hull/src/convex-hull";


/*********************************************************************************
	Would model:
		Center Polygon, which is only for normal intersection (not a roundabout).
		svgScale, which is the scale for all svgs in the intersection.

	Would update:
		1.intersection.intShape.centerPoly = an instance of intersection.THREE.shape.
		2.intersection.intGeo.initCenterPoly = an array of [x, y] for initial
		center polygon with no curves in special cases
		3.intersection.intGeo.svgScale = x.
**********************************************************************************/
const modelCenterPoly = (intersection, intSize, meterToPixel, accuracy) => {

	/*****************************************************************************
					Step 1: Preparation (prepare lines)
	******************************************************************************/
	const sharedGeometryLib = new SharedGeometryLib(intersection.THREE);

	//calculate outerSides for each approach:
	//would be an array of [l1, l2]
	//where l1 is right side (in the form of a and b), and l2 is left side
	const appOuterSides = [];


	intersection.approaches.forEach((oneApp) => {
		appOuterSides.push(oneApp.appGeo.outerSides);
	});


	//clcualte neighbor app index which is within 180 degrees clockwise for each approach:
	//would be an array of [index1, index2, ...],
	//where index1 is the index approach number that meets the requirement
	//appCN180 stands for "approach clockwise neighbors within 180 degrees"
	const appCN180 = [];
	let specialCaseIndex = null;
	const appCounts = intersection.approaches.length; //number of approaches
	let curAppIndex, neiAppIndex, curApp, neiApp, curAppAngle, neiAppAngle, curAppCN180;
	//traverse all approaches
	for (curAppIndex = 0; curAppIndex < appCounts; curAppIndex++) {
		curAppCN180 = [];
		curApp = intersection.approaches[curAppIndex];
		curAppAngle = curApp.appAngle;
		//traverse all neighbor approaches clockwise and find if it is within 180 degrees
		let j;
		for (j = curAppIndex + 1; j < appCounts + curAppIndex; j++) {

			//get neiApp by neiAppIndex:
			neiAppIndex = (j >= appCounts) ? (j - appCounts) : j;
			neiApp = intersection.approaches[neiAppIndex];
			//check angle:
			neiAppAngle = neiApp.appAngle;
			let upperAngle;

			if (curAppAngle + 180 >= 360) {
				upperAngle = curAppAngle + 180 - 360;
				if ((curAppAngle < neiAppAngle && neiAppAngle < 360) || (neiAppAngle >= 0 && neiAppAngle < upperAngle)) {
					curAppCN180.push(neiAppIndex);
				}
			}
			else {
				upperAngle = curAppAngle + 180;
				if (neiAppAngle < upperAngle && neiAppAngle > curAppAngle) {
					curAppCN180.push(neiAppIndex);
				}
			}
			/*
			if (curAppAngle === 180 && neiAppAngle > 180 && neiAppAngle < 360) {
				curAppCN180.push(neiAppIndex);
			}
			*/

		}

		appCN180.push(curAppCN180);

		//there could be at most one special case
		//where there is no app within 180 clockwise degree
		if (curAppCN180.length === 0) {
			specialCaseIndex = curAppIndex;
		}

	}
	//console.log(appCN180)



	/*****************************************************************************
						Step 2: Vertex Candidates (normal case)
	******************************************************************************/
	//vertex candicates would be an array of points,
	//where points is in the form of [x, y]
	let vertexCandidates = [];

	//normal case:
	//for each approach's left side, if there's any right side of approach within in its clockwise 180 degrees,
	//the point candidates would be their interscted point
	appOuterSides.forEach((curAppOuterSides, curAppIndex) => {
		//get the index list of approaches that within 180 clockwise degrees
		curAppCN180 = appCN180[curAppIndex];
		//there should be at least one approach in normal case
		if (curAppCN180.length > 0) {
			//const curRightSide = curAppOuterSides[0];  //should be {a: xx, b: xx}
			const curLeftSide = curAppOuterSides[1];  //should be {a: xx, b: xx}
			curAppCN180.forEach((neiAppIndex) => {
				const neiRightSide = appOuterSides[neiAppIndex][0];
				//const neiLeftSide = appOuterSides[neiAppIndex][1];
				const getIntersectedPointBySlopeAndIntersect = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
				const oneVertexCandidate = getIntersectedPointBySlopeAndIntersect(
												curLeftSide.a,
												curLeftSide.b,
												neiRightSide.a,
												neiRightSide.b,
												accuracy
											);
				if (oneVertexCandidate) {
					vertexCandidates.push(oneVertexCandidate);
				}
			});
		}
	});

	/*	*/
	// ********** Remove vertex that is ridiculously far from origin point *********
	const validVertexCandidates = [];
	vertexCandidates.forEach((oneVertex) => {
		if ((Math.abs(oneVertex[0]) < intSize / 2) && (Math.abs(oneVertex[1]) < intSize / 2)) {
			validVertexCandidates.push(oneVertex);
		}
	});
	vertexCandidates = validVertexCandidates;



	/*****************************************************************************
						Step 3: Vertex Candidates (special cases)
	******************************************************************************/
	let specialVertexOne, specialVertexTwo, specialVertex;

	if (specialCaseIndex !== null) {
		vertexCandidates = convexHull(vertexCandidates);
		const specialRightSide = appOuterSides[specialCaseIndex][0];  //should be {a: xx, b: xx}
		const specialLeftSide = appOuterSides[specialCaseIndex][1];  //should be {a: xx, b: xx}

		const specialNeiIndex = (specialCaseIndex + 1 >= appOuterSides.length) ? specialCaseIndex + 1 - appOuterSides.length : specialCaseIndex + 1;
		const specialNeiRightSide = appOuterSides[specialNeiIndex][0];  //should be {a: xx, b: xx}
		const specialNeiLeftSide = appOuterSides[specialNeiIndex][1];  //should be {a: xx, b: xx}

		const getIntersectedPointBySlopeAndIntersect = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
		const tellIfPointOnLine = sharedGeometryLib.testIfPointOnLineBySlopeAndIntersect;
		const distBtwTwoP = sharedGeometryLib.getDistBtwTwoPoints;

		/*********** Check if parallel neighbor ***********/
		let ifPara = false;
		if (specialLeftSide.a === specialNeiRightSide.a) {
			ifPara = true;
		}
		else if (specialLeftSide.a === null || specialNeiRightSide.a === null) {
			ifPara = false;
		}
		else if (Math.abs(specialLeftSide.a / specialNeiRightSide.a - 1) < accuracy ) {
			ifPara = true;
		}


		/*******special case one: parallel neighbor********/
		if (ifPara) {
			//find neighbor points:
			//Point One: find vertex on specialRightSide
			let i, x, y, ifOnLine, distBtwEndAndSp = intSize;
			for (i = 0; i < vertexCandidates.length; i++) {
				const xi = vertexCandidates[i][0];
				const yi = vertexCandidates[i][1];
				ifOnLine = tellIfPointOnLine(xi, yi, specialRightSide.a, specialRightSide.b, accuracy);
				if (ifOnLine) {
					const specialApp = intersection.approaches[specialCaseIndex];
					const specialAppRightEp = specialApp.appGeo.outerRightEndPoint;  //[x, y]
					const dist = distBtwTwoP(specialAppRightEp[0], specialAppRightEp[1], xi, yi);
					if (dist < distBtwEndAndSp) {
						distBtwEndAndSp = dist;
						x = xi;
						y = yi;
					}
				}

			}

			//get a line that pass the vertex on specialRightSide and perpendicular to it
			const getPerpendicularLine = sharedGeometryLib.getPerpendicularLineBySlopAndIntersect;
			const perpLineToSpecialRightSide = getPerpendicularLine(x, y, specialRightSide.a, specialRightSide.b, accuracy);
			//get the intersected point as special vertex candidate one
			specialVertexOne = getIntersectedPointBySlopeAndIntersect(
										specialLeftSide.a,
										specialLeftSide.b,
										perpLineToSpecialRightSide.a,
										perpLineToSpecialRightSide.b,
										accuracy
									);


			//Point Two: find vertex on specialNeiLeftSide
			distBtwEndAndSp = intSize;
			for (i = 0; i < vertexCandidates.length; i++) {
				const xi = vertexCandidates[i][0];
				const yi = vertexCandidates[i][1];
				ifOnLine = tellIfPointOnLine(xi, yi, specialNeiLeftSide.a, specialNeiLeftSide.b, accuracy);

				if (ifOnLine) {
					const specialNeiApp = intersection.approaches[specialNeiIndex];
					const specialNeiAppLeftEp = specialNeiApp.appGeo.outerLeftEndPoint;  //[x, y]
					const dist = distBtwTwoP(specialNeiAppLeftEp[0], specialNeiAppLeftEp[1], xi, yi);
					if (dist < distBtwEndAndSp) {
						distBtwEndAndSp = dist;
						x = xi;
						y = yi;
					}
				}

			}
			const perpLineToSpecialNeiLeftSide = getPerpendicularLine(x, y, specialNeiLeftSide.a, specialNeiLeftSide.b, accuracy);
			specialVertexTwo = getIntersectedPointBySlopeAndIntersect(
										specialNeiRightSide.a,
										specialNeiRightSide.b,
										perpLineToSpecialNeiLeftSide.a,
										perpLineToSpecialNeiLeftSide.b,
										accuracy
									);

			vertexCandidates.push(specialVertexOne);
			vertexCandidates.push(specialVertexTwo);

		}
		/*******special case two: not parallel neighbor********/
		else {
			specialVertex = getIntersectedPointBySlopeAndIntersect(
									specialLeftSide.a,
									specialLeftSide.b,
									specialNeiRightSide.a,
									specialNeiRightSide.b,
									accuracy
								);
			vertexCandidates.push(specialVertex);
		}

	}


	//console.log(vertexCandidates)


	/*****************************************************************************
			Step 4: Get the smallest convex polygon (in the form of intersection.THREE.shape)
					as the center polygon.
					For the special case in Step 1, connect special vertex
					with curves (TBD).
	******************************************************************************/
	//In normal case, the centerPolygon vertex would be simply the smallest convex
	//polygon of the candidates:
	let centerPolyVertex = convexHull(vertexCandidates);
	let centerPolyShape = new intersection.THREE.Shape();


	//In normal case:
	if (specialCaseIndex === null) {
		centerPolyShape.moveTo(centerPolyVertex[0][0], centerPolyVertex[0][1]);
			for (let i = 1; i < centerPolyVertex.length; i++) {
			centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
		}

		centerPolyShape.closePath();
	}

	/*		*/
	//In special cases, we need to connect special vertex with curves:
	else {
		let connectionCurves;
		const specialLeftSide = appOuterSides[specialCaseIndex][1];  //should be {a: xx, b: xx}
		const specialNeiIndex = (specialCaseIndex + 1 >= appOuterSides.length) ? specialCaseIndex + 1 - appOuterSides.length : specialCaseIndex + 1;
		const specialNeiRightSide = appOuterSides[specialNeiIndex][0];  //should be {a: xx, b: xx}
		const tellIfPointOnLine = sharedGeometryLib.testIfPointOnLineBySlopeAndIntersect;

		/*********** Check if parallel neighbor ***********/
		let ifPara = false;
		if (specialLeftSide.a === specialNeiRightSide.a) {
			ifPara = true;
		}
		else if (specialLeftSide.a === null || specialNeiRightSide.a === null) {
			ifPara = false;
		}
		else if (Math.abs(specialLeftSide.a / specialNeiRightSide.a - 1) < accuracy ) {
			ifPara = true;
		}

		//***********special case one: parallel neighbor********
		if (ifPara) {
			//if the second special vertex is on the special left side,
			//there would be no need to connect with a curve
			const ifOnLine = tellIfPointOnLine(
								specialVertexTwo[0],
								specialVertexTwo[1],
								specialLeftSide.a,
								specialLeftSide.b,
								accuracy
							);

			//if on line, it would be the same with the normal case
			if (ifOnLine) {
				centerPolyShape.moveTo(centerPolyVertex[0][0], centerPolyVertex[0][1]);
				for (let i = 1; i < centerPolyVertex.length; i++) {
					centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
				}

				centerPolyShape.closePath();
			}

			//only continue if it is not on line
			else {
				const specialApp = intersection.approaches[specialCaseIndex];
				const specialNeiApp = intersection.approaches[specialNeiIndex];

				//get curve radius (set the r as 1/3 of the dist between two special vertex)
				const getDistBtwTwoPoints = sharedGeometryLib.getDistBtwTwoPoints;
				const r = getDistBtwTwoPoints(
							specialVertexOne[0], specialVertexOne[1],
							specialVertexTwo[0], specialVertexTwo[1],
						) / 3;

				//get sides' endpoints
				const specialSideEp = specialApp.appGeo.outerLeftEndPoint;
				const specialNeiSideEp = specialNeiApp.appGeo.outerRightEndPoint;

				//tell which special vertex should be the 1st and 2nd control points:
				const dist1 = getDistBtwTwoPoints(
								specialSideEp[0], specialSideEp[1],
								specialVertexOne[0], specialVertexOne[1]
							);
				const dist2 = getDistBtwTwoPoints(
								specialNeiSideEp[0], specialNeiSideEp[1],
								specialVertexTwo[0], specialVertexTwo[1]
							);
				const getPointMovedDistFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
				let controlPoint1, controlPoint2, startPoint, endPoint, cp1Index, cp2Index;
				const sv1Index = centerPolyVertex.indexOf(specialVertexOne);
				const sv2ndex = centerPolyVertex.indexOf(specialVertexTwo);
				if ( sv1Index === sv2ndex - 1 ) {
					controlPoint1 = getPointMovedDistFromAtoB(
										specialSideEp[0], specialSideEp[1],
										specialVertexOne[0], specialVertexOne[1],
										dist1 + r
									);
					controlPoint2 = getPointMovedDistFromAtoB(
										specialNeiSideEp[0], specialNeiSideEp[1],
										specialVertexTwo[0], specialVertexTwo[1],
										dist2 + r
									);
					startPoint = specialVertexOne;
					endPoint = specialVertexTwo;
					cp1Index = centerPolyVertex.indexOf(specialVertexOne);
					cp2Index = centerPolyVertex.indexOf(specialVertexTwo);

				}
				else {
					controlPoint1 = getPointMovedDistFromAtoB(
										specialNeiSideEp[0], specialNeiSideEp[1],
										specialVertexTwo[0], specialVertexTwo[1],
										dist2 + r
									);
					controlPoint2 = getPointMovedDistFromAtoB(
										specialSideEp[0], specialSideEp[1],
										specialVertexOne[0], specialVertexOne[1],
										dist1 + r
									);
					startPoint = specialVertexTwo;
					endPoint = specialVertexOne;
					cp1Index = centerPolyVertex.indexOf(specialVertexTwo);
					cp2Index = centerPolyVertex.indexOf(specialVertexOne);
				}


				//get the connectionCurves
				connectionCurves = new intersection.THREE.Shape(
										[new intersection.THREE.Vector2(startPoint[0], startPoint[1])]
									);
				connectionCurves.bezierCurveTo(
					controlPoint1[0], controlPoint1[1],
					controlPoint2[0], controlPoint2[1],
					endPoint[0], endPoint[1]
				);


				//construct the centerPoly shape:
				if (cp1Index > 0) {
					centerPolyShape.moveTo(centerPolyVertex[0][0], centerPolyVertex[0][1]);
				}

				for (let i = 1; i <= cp1Index; i++) {
					centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
				}

				connectionCurves.curves.forEach((oneCurve) => {
					centerPolyShape.add(oneCurve);
				});

				//move the current point to the end of the connectionCurve:
				centerPolyShape.moveTo(
					connectionCurves.currentPoint.x,
					connectionCurves.currentPoint.y
				);


				for (let i = cp2Index; i < centerPolyVertex.length; i++) {
					centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
				}

				centerPolyShape.closePath();

			}

		}
		//***********special case two: intersect neighbor********
		else {
			const specialApp = intersection.approaches[specialCaseIndex];
			const specialNeiApp = intersection.approaches[specialNeiIndex];
			const specialSideSlope = specialApp.appGeo.outerSides[1].a;
			const specialSideIntersect = specialApp.appGeo.outerSides[1].b;
			const specialNeiSideSlope = specialNeiApp.appGeo.outerSides[0].a;
			const specialNeiSideIntersect = specialNeiApp.appGeo.outerSides[0].b;


			//get curve radius (set as the bigger curve of the two app's corner radius)
			const r1 = specialApp.corner.cornerRadius;
			const r2 = specialNeiApp.corner.cornerRadius;
			const r = (r1 > r2) ? (r1 * meterToPixel) : (r2 * meterToPixel);

			//get sides' endpoints
			const specialSideEp = specialApp.appGeo.outerLeftEndPoint;
			const specialNeiSideEp = specialNeiApp.appGeo.outerRightEndPoint;

			//get the intersected point:
			const getIntersectedPointBySlopeAndIntersect = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;
			const intersectedPoint = getIntersectedPointBySlopeAndIntersect(
										specialSideSlope, specialSideIntersect,
										specialNeiSideSlope, specialNeiSideIntersect,
										accuracy
									);

			//decide which side should be the start and end sides:
			let previousVertex, nextVertex, startSideEp, endSideEp;
			const specialVertexIndex = centerPolyVertex.indexOf(specialVertex);
			if (specialVertexIndex === 0) {
				previousVertex = centerPolyVertex[centerPolyVertex.length - 1];
				nextVertex = centerPolyVertex[1];
			}
			else if (specialVertexIndex === centerPolyVertex.length - 1) {
				previousVertex = centerPolyVertex[specialVertexIndex - 1];
				nextVertex = centerPolyVertex[0];
			}
			else {
				previousVertex = centerPolyVertex[specialVertexIndex - 1];
				nextVertex = centerPolyVertex[specialVertexIndex + 1];
			}
			const specialRightSide = specialApp.appGeo.outerSides[0]; //{a:xx, b: xx}
			const specialNeiLeftSide = specialNeiApp.appGeo.outerSides[1]; //{a:xx, b: xx}

			const ifPreviousOnRight = tellIfPointOnLine(
										previousVertex[0], previousVertex[1],
										specialRightSide.a, specialRightSide.b,
										accuracy
									);
			const ifNextOnLeft = tellIfPointOnLine(
										nextVertex[0], nextVertex[1],
										specialNeiLeftSide.a, specialNeiLeftSide.b,
										accuracy
									);

			if (ifPreviousOnRight && ifNextOnLeft) {
				startSideEp = specialSideEp;
				endSideEp = specialNeiSideEp;
			}
			else {
				startSideEp = specialNeiSideEp;
				endSideEp = specialSideEp;
			}

			//calculate the connection curves (would actually be an arc in this case)
			const connectIntersectedLinesWzArc = sharedGeometryLib.connectIntersectedLinesWzArc;
			connectionCurves = connectIntersectedLinesWzArc(
								startSideEp[0], startSideEp[1],
								endSideEp[0], endSideEp[1],
								intersectedPoint[0], intersectedPoint[1],
								r, accuracy
							);


			//construct the centerPolyShape
			const connectionCurvesStartPoint = connectionCurves.curves[0].getPoint(0);

			if (specialVertexIndex > 0) {
				centerPolyShape.moveTo(centerPolyVertex[0][0], centerPolyVertex[0][1]);
				for (let i = 1; i < specialVertexIndex; i++) {
					centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
				}
				centerPolyShape.lineTo(connectionCurvesStartPoint.x, connectionCurvesStartPoint.y);
			}
			else {
				centerPolyShape.moveTo(connectionCurvesStartPoint.x, connectionCurvesStartPoint.y);
			}

			connectionCurves.curves.forEach((oneCurve) => {
				centerPolyShape.add(oneCurve);
			});

			//move the current point to the end of the connectionCurve:
			const connectionCurvesEndPoint = connectionCurves.curves[0].getPoint(1);
			centerPolyShape.moveTo(
				connectionCurvesEndPoint.x, connectionCurvesEndPoint.y
			);

			for (let i = specialVertexIndex + 1; i < centerPolyVertex.length; i++) {
				centerPolyShape.lineTo(centerPolyVertex[i][0], centerPolyVertex[i][1]);
			}

			centerPolyShape.closePath();

			//modify centerPolyVertex
			centerPolyVertex.splice(
				specialVertexIndex, 1,
				[connectionCurvesStartPoint.x, connectionCurvesStartPoint.y],
				[connectionCurvesEndPoint.x, connectionCurvesEndPoint.y]
			);  //remove special vertex and insert the arc start and end points

			centerPolyVertex = convexHull(centerPolyVertex); //just in case the order is wrong



		}
	}

	//console.log(centerPolyVertex)

	intersection.intShape.centerPoly = centerPolyShape;
	intersection.intGeo.initCenterPoly = centerPolyVertex;
	intersection.intGeo.svgScale = 0.008 * meterToPixel;//intSize * 0.00002;

	//console.log(centerPolyShape.getPoints(10));
};




export default modelCenterPoly;

