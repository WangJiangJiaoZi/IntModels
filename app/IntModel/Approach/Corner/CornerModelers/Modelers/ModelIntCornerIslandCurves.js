
import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		corner island curves of the int corner

	Would update:
		1. corner.cornerGeo.intCornerGeo.innerArcPoints = an array of [x, y];
			(Refers to points on the inner arc. The array would start from the point within the
			curApp and end with the point within the neiApp. In normal case, there would be only two points.
			In special case, there would be four points.)
		2. corner.cornerGeo.intCornerGeo.islandTip = [x, y];
			(The tip point of the island.)
		3. corner.cornerGeo.intCornerGeo.curAppIslandLength = d1;
			(The island width in meters on the current approach side.)
		4. corner.cornerGeo.intCornerGeo.neiAppIslandLength = d2;
			(The island width in meters on the neighbor approach side.)
		5. corner.cornerGeo.intCornerGeo.curAppIslandMidPoint = [x1, y1];
			(The middle point on the current approach side.)
		6. corner.cornerGeo.intCornerGeo.neiAppIslandMidPoint = [x2, y2];
			(The middle point on the neighbor approach side.)
		7. corner.cornerGeo.intCornerGeo.islandArcMidPoint = [x, y];
			(The middle point of the island arc)
		8. corner.cornerShape.intCornerShape.islandCurves = an instance of THREE.js Shape.
**************************************************************************/
const modelIntCornerIslandCurves = (curApp, corner, intSize, meterToPixel, accuracy) => {
	const sharedGeometryLib = new SharedGeometryLib(corner.THREE);
	//************************ Prepare necessary parameters **********************
	//current approach parameters:
	const curAppRightSp = curApp.appGeo.outerRightSp;  //current approach right outer side start point [x, y]
	const curAppRightEp = curApp.appGeo.outerRightEndPoint; //right outer side end point
	const curAppLeftEp = curApp.appGeo.outerLeftEndPoint; //left outer side end point
	const curAppRightOs = curApp.appGeo.outerSides[0]; //current approach right outer side {a:xx, b:xx}
	const curAppAngle = curApp.appAngle;  //current approach angle
	const appCount = curApp.intersection.approaches.length; //number of approaches of the intersection

	//neighbor approach refers to the counter clockwise neighbor approach:
	const curAppIndex = curApp.appId;
	const neiAppIndex = (curAppIndex > 0) ? (curAppIndex - 1) : (appCount - 1);
	const neiApp = curApp.intersection.approaches[neiAppIndex];

	const neiAppLeftSp = neiApp.appGeo.outerLeftSp;  //neighbor approach left outer side start point
	const neiAppLeftEp = neiApp.appGeo.outerLeftEndPoint; //neighbor approach left outer side end point
	const neiAppRightEp = neiApp.appGeo.outerRightEndPoint; //neighbor approach right outer side end point
	const neiAppLeftOs = neiApp.appGeo.outerSides[1];  //neighbor approach left outer side {a:xx, b:xx}
	const neiAppAngle = neiApp.appAngle;  //neighbor approach angle

	//island channel parameters:
	const entranceWidth = corner.cornerInboundWidth * meterToPixel;  //in pixel
	const exitWidth = corner.cornerOutboundWidth * meterToPixel;  //in pixel
	const channelWidth = corner.channelWidth * meterToPixel;  //in pixel
	const cornerR = corner.cornerRadius * meterToPixel;   //in pixel

	//************* Check counter clockwise angle btw the two approaches *************
	//If the angle is greater than 180 degrees, no need to draw an island
	//(Actually, no corner curve at all. The curve would belong to the center polygon instead.)
	const getPointOfTwoLine = sharedGeometryLib.getIntersectedPointBySlopeAndIntersect;

	const curNeiAppInterPoint = getPointOfTwoLine(
									curAppRightOs.a, curAppRightOs.b,
									neiAppLeftOs.a, neiAppLeftOs.b
								);


	//Need to add island only if curApp and neiApp are not parallel:
	if (curNeiAppInterPoint !== null) {
		const getCcwAngleBtwTwoLine = sharedGeometryLib.getCcwAngleBtwTwoLine;
		const ccwAngle = getCcwAngleBtwTwoLine(
							curAppRightEp[0], curAppRightEp[1],
							neiAppLeftEp[0], neiAppLeftEp[1],
							curNeiAppInterPoint[0], curNeiAppInterPoint[1],
							accuracy
						);

		//it is an error if null
		if (ccwAngle === null) {
			const error = new Error("Two approaches shared the same end point. Model went wrong...");
			throw error;
		}
		else if (ccwAngle > Math.PI * 0.75) {
			console.log("The approach is not suitable for an channel island.");
			corner.cornerType = 2;
			corner.cornerGeo.intCornerGeo.innerArcPoints = null;
			corner.cornerGeo.intCornerGeo.islandTip = null;
			corner.cornerShape.intCornerShape.islandCurves = null;

		}
		//only need to add corner if angle is less than 180 degrees
		else {
			//************************ Prepare island parameters **********************
			const getPointMovedDistFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
			const connectLinesWzArc = sharedGeometryLib.connectIntersectedLinesWzArc;
			const getPerpLineByAB = sharedGeometryLib.getPerpendicularLineBySlopAndIntersect;
			const getDistBtwPs = sharedGeometryLib.getDistBtwTwoPoints;
			const getLinePointsOnCircle = sharedGeometryLib.getPointOnCircleBySlopAndIntersect;
			const getArc = sharedGeometryLib.getArc;
			const getAbFromTwoPoints = sharedGeometryLib.getAbFromTwoPoints;


			//island inbound line end point:
			const inboundEp = getPointMovedDistFromAtoB(
								curAppRightEp[0], curAppRightEp[1],
								curAppLeftEp[0], curAppLeftEp[1],
								entranceWidth
							);

			//island outbound line end point:
			const outboundEp = getPointMovedDistFromAtoB(
								neiAppLeftEp[0], neiAppLeftEp[1],
								neiAppRightEp[0], neiAppRightEp[1],
								exitWidth
							);

			//inbound line:
			const inboundB = (curAppRightOs.a === null) ? inboundEp[0] : (inboundEp[1] - curAppRightOs.a * inboundEp[0]);
			const inboundLine = {a: curAppRightOs.a , b: inboundB};

			//outbound line:
			const outboundB = (neiAppLeftOs.a === null) ? outboundEp[0] : (outboundEp[1] - neiAppLeftOs.a * outboundEp[0]);
			const outboundLine = {a: neiAppLeftOs.a, b: outboundB};

			//island tip point:
			const islandTipPoint = getPointOfTwoLine(
									inboundLine.a, inboundLine.b,
									outboundLine.a, outboundLine.b
								);

			//corner inner arc (island arc) radius:
			const islandR = channelWidth + cornerR;

			//tell if the island is normal or special:
			//(normal case would have one pair of start and end points)
			const cornerOuterArc = corner.cornerGeo.intCornerGeo.outerArcPoints;
			const ifNormal = (cornerOuterArc.length === 2) ? true : false;


			//************************ Calculate island for normal case **********************
			if (ifNormal) {

				const outerArcSp = cornerOuterArc[0];
				const outerArcEp = cornerOuterArc[1];

				const perpLineAtSp = getPerpLineByAB(
										outerArcSp[0], outerArcSp[1],
										curAppRightOs.a, curAppRightOs.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}
				const perpLineAtEp = getPerpLineByAB(
										outerArcEp[0], outerArcEp[1],
										neiAppLeftOs.a, neiAppLeftOs.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}

				const centerPoint = getPointOfTwoLine(
										perpLineAtSp.a, perpLineAtSp.b,
										perpLineAtEp.a, perpLineAtEp.b,
										accuracy
									);

				//check the dist from tip pint to center point:
				const distTpAndCp = getDistBtwPs(
										centerPoint[0], centerPoint[1],
										islandTipPoint[0], islandTipPoint[1]
									);
				//if the distance is less than islandR, no island exists:
				const ifIsland = (distTpAndCp > islandR) ? true : false;

				if (ifIsland) {
					//island arc start points candidates:
					const islandSpCand = getLinePointsOnCircle(
											centerPoint[0], centerPoint[1],
											islandR, inboundLine.a, inboundLine.b,
											accuracy
										);
					//island arc end points candidates:
					const islandEpCand = getLinePointsOnCircle(
											centerPoint[0], centerPoint[1],
											islandR, outboundLine.a, outboundLine.b,
											accuracy
										);

					if (!islandSpCand || !islandEpCand) {
						const error = new Error("Corner island calculation failed.");
						throw error;
					}

					//decide arc start and end points:
					//decide arc start point:
					const arcSp1 = islandSpCand[0];
					const arcSp2 = islandSpCand[1];
					const tipToSp1 = getDistBtwPs(
									arcSp1[0], arcSp1[1],
									islandTipPoint[0], islandTipPoint[1]
								);
					const tipToSp2 = getDistBtwPs(
									arcSp2[0], arcSp2[1],
									islandTipPoint[0], islandTipPoint[1]
								);
					const tipToSp = (tipToSp1 < tipToSp2) ? tipToSp1 : tipToSp2;
					const arcSp = (tipToSp1 < tipToSp2) ? arcSp1 : arcSp2;

					//decide arc end point:
					const arcEp1 = islandEpCand[0];
					const arcEp2 = islandEpCand[1];
					const tipToEp1 = getDistBtwPs(
									arcEp1[0], arcEp1[1],
									islandTipPoint[0], islandTipPoint[1]
								);
					const tipToEp2 = getDistBtwPs(
									arcEp2[0], arcEp2[1],
									islandTipPoint[0], islandTipPoint[1]
								);
					const tipToEp = (tipToEp1 < tipToEp2) ? tipToEp1 : tipToEp2;
					const arcEp = (tipToEp1 < tipToEp2) ? arcEp1 : arcEp2;


					//Check the dist btw arcSp and tip point and dist btw arcEp and tip.
					//If any one of the two is greater than 1/4 of the intSize,
					//the island would be too big to be reasonable.
					if (tipToSp > 0.25 * intSize || tipToEp > 0.25 * intSize) {
						corner.cornerGeo.intCornerGeo.innerArcPoints = null;
						corner.cornerGeo.intCornerGeo.islandTip = null;
						corner.cornerShape.intCornerShape.islandCurves = null;
						corner.cornerType = 2;
						console.log("Current approach corner not suitable for channel island.");
					}
					else {
						//get arc:
						const islandArc = getArc(
											centerPoint[0], centerPoint[1],
											arcSp[0], arcSp[1],
											arcEp[0], arcEp[1],
											islandR
										);

						const islandCurves = new corner.THREE.Shape();
						islandCurves.moveTo(islandTipPoint[0], islandTipPoint[1]);
						islandCurves.lineTo(arcSp[0], arcSp[1]);
						islandCurves.add(islandArc);
						islandCurves.moveTo(arcEp[0], arcEp[1]);
						islandCurves.closePath();

						//calculate island length and middle points:
						const curAppIslandLength = getDistBtwPs(
													arcSp[0], arcSp[1],
													islandTipPoint[0], islandTipPoint[1]
												);
						const neiAppIslandLength = getDistBtwPs(
													arcEp[0], arcEp[1],
													islandTipPoint[0], islandTipPoint[1]
												);
						const curAppIslandMidPoint = [(arcSp[0] + islandTipPoint[0]) / 2, (arcSp[1] + islandTipPoint[1]) / 2];
						const neiAppIslandMidPoint = [(arcEp[0] + islandTipPoint[0]) / 2, (arcEp[1] + islandTipPoint[1]) / 2];
						const islandArcMidPoint = [islandArc.getPoint(0.5).x, islandArc.getPoint(0.5).y];


						//update geo and shape:
						corner.cornerGeo.intCornerGeo.innerArcPoints = [arcSp, arcEp];
						corner.cornerGeo.intCornerGeo.islandTip = islandTipPoint;
						corner.cornerGeo.intCornerGeo.curAppIslandLength = curAppIslandLength;
						corner.cornerGeo.intCornerGeo.neiAppIslandLength = neiAppIslandLength;
						corner.cornerGeo.intCornerGeo.curAppIslandMidPoint = curAppIslandMidPoint;
						corner.cornerGeo.intCornerGeo.neiAppIslandMidPoint = neiAppIslandMidPoint;
						corner.cornerGeo.intCornerGeo.islandArcMidPoint = islandArcMidPoint;

						corner.cornerShape.intCornerShape.islandCurves = islandCurves;
					}


				}


			}
			//************************ Calculate island for special case **********************
			else {
				corner.cornerGeo.intCornerGeo.innerArcPoints = null;
				corner.cornerGeo.intCornerGeo.islandTip = null;
				corner.cornerShape.intCornerShape.islandCurves = null;
				corner.cornerType = 2;
				console.log("Current approach corner not suitable for channel island.");

				/* Deprecated
				Reason: No need to have corner island in special case. The island would
						probably grow into the intersection too much and won't make any sense.
				//************* Get center points of the two outer arcs *************
				const outerArc1Sp = cornerOuterArc[0];
				const outerArc1Ep = cornerOuterArc[1];
				const outerArc2Sp = cornerOuterArc[2];
				const outerArc2Ep = cornerOuterArc[3];

				const curAppNeiAppSpLine = getAbFromTwoPoints(
											curAppRightSp[0], curAppRightSp[1],
											neiAppLeftSp[0], neiAppLeftSp[1],
											accuracy
										); //in the form of {a: perpA, b: perpB}

				//for outer arc 1:
				const perpLineAtArc1Sp = getPerpLineByAB(
										outerArc1Sp[0], outerArc1Sp[1],
										curAppRightOs.a, curAppRightOs.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}

				const perpLineAtArc1Ep = getPerpLineByAB(
										outerArc1Ep[0], outerArc1Ep[1],
										curAppNeiAppSpLine.a, curAppNeiAppSpLine.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}

				const centerPoint1 = getPointOfTwoLine(
										perpLineAtArc1Sp.a, perpLineAtArc1Sp.b,
										perpLineAtArc1Ep.a, perpLineAtArc1Ep.b,
										accuracy
									);

				//for outer arc 2:
				const perpLineAtArc2Sp = getPerpLineByAB(
										outerArc2Sp[0], outerArc2Sp[1],
										neiAppLeftOs.a, neiAppLeftOs.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}

				const perpLineAtArc2Ep = getPerpLineByAB(
										outerArc2Ep[0], outerArc2Ep[1],
										curAppNeiAppSpLine.a, curAppNeiAppSpLine.b,
										accuracy
									);  //in the form of {a: perpA, b: perpB}

				const centerPoint2 = getPointOfTwoLine(
										perpLineAtArc2Sp.a, perpLineAtArc2Sp.b,
										perpLineAtArc2Ep.a, perpLineAtArc2Ep.b,
										accuracy
									);


				//************************ Check if island needed ************************
				const checkArcSp1 = getPointMovedDistFromAtoB(
								centerPoint1[0], centerPoint1[1],
								outerArc1Sp[0], outerArc1Sp[1],
								islandR
							);
				const checkArcEp1 = getPointMovedDistFromAtoB(
								centerPoint1[0], centerPoint1[1],
								outerArc1Ep[0], outerArc1Ep[1],
								islandR
							);
				const checkArcSp2 = getPointMovedDistFromAtoB(
								centerPoint2[0], centerPoint2[1],
								outerArc2Ep[0], outerArc2Ep[1],
								islandR
							);
				const checkArcEp2 = getPointMovedDistFromAtoB(
								centerPoint2[0], centerPoint2[1],
								outerArc2Sp[0], outerArc2Sp[1],
								islandR
							);


				*/
			}




		}
	}
};


export default modelIntCornerIslandCurves;
