
import SharedGeometryLib from "../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		1. laneGroup.laneGroupGeo.sp = [x, y],
			(Start point. For inbound lane group, it is the left side start point.
			For outbound lane group, it is the right side start point.)
		2. laneGroup.laneGroupGeo.ep = [x, y],
			(End point. For inbound lane group, it is the left side end point.
			For outbound lane group, it is the right side end point.)

	Note:
		"type" refers to "int" or "roundabout"
**************************************************************************/

const modelIntLaneGroupPoints = (laneGroup, intSize, meterToPixel, accuracy) => {

	const sharedGeometryLib = new SharedGeometryLib(laneGroup.THREE);

	//************************ Prepare parameters ************************
	const laneGroupIndex = laneGroup.laneGroupIndex;
	const bound = laneGroup.bound;  //"inbound" / "outbound" / "inboundSide" / "outboundSide"

	const laneGG = laneGroup.laneGG;
	const stopOuterSp = laneGG.laneGGGeo.stopOuterSp;  //[x, y]
	const stopOuterFinalP = laneGG.laneGGGeo.outerFinalP;  //[x, y]
	const mainIbLaneGroups = laneGG.laneGGGeo.mainIbLaneGroups;  //[0, 1, ...]
	const sidIbLaneGroups = laneGG.laneGGGeo.sideIbLaneGroups;  //[0, 1, ...]
	const mainObLaneGroups = laneGG.laneGGGeo.mainObLaneGroups;  //[0, 1, ...]
	const sideObLaneGroups = laneGG.laneGGGeo.sideObLaneGroups;  //[0, 1, ...]

	const app = laneGG.approach;
	const appRightOsSp = app.appGeo.outerRightSp;  //[x, y]
	const appRightOsEp = app.appGeo.outerRightEndPoint;  //[x, y]
	const appLeftOsSp = app.appGeo.outerLeftSp;  //[x, y]
	const appLeftOsEp = app.appGeo.outerLeftEndPoint;  //[x, y]

	const laneGroups = laneGG.laneGroups;  //[ laneGroup ]

	const ibDivWidth = app.dividerGroup.divGroupGeo.ibDivWidth;  //inbound divider width in pixel
	const obDivWidth = app.dividerGroup.divGroupGeo.obDivWidth;  //outbound divider width in pixel

	// *********************** Side roads width ***********************
	let ibSideWidth = 0;  //in pixel
	let obSideWidth = 0;  //in pixel

	for (let i = 0; i < sidIbLaneGroups.length; i++) {
		const oneIbSideLaneGroup = laneGroups[sidIbLaneGroups[i]];
		const oneIbSlgWidth = oneIbSideLaneGroup.laneGroupGeo.laneGroupWidth * meterToPixel;
		ibSideWidth += oneIbSlgWidth;
	}

	for (let i = 0; i < sideObLaneGroups.length; i++) {
		const oneObSideLaneGroup = laneGroups[sideObLaneGroups[i]];
		const oneObSlgWidth = oneObSideLaneGroup.laneGroupGeo.laneGroupWidth * meterToPixel;
		obSideWidth += oneObSlgWidth;
	}

	// *********************** Vectors, lines, functions to use ***********************
	let initPointVec;
	let endPointVec;
	const appRightOsSpVec = new laneGroup.THREE.Vector2(appRightOsSp[0], appRightOsSp[1]);
	const appRightOsEpVec = new laneGroup.THREE.Vector2(appRightOsEp[0], appRightOsEp[1]);

	const appLeftOsSpVec = new laneGroup.THREE.Vector2(appLeftOsSp[0], appLeftOsSp[1]);
	const appLeftOsEpVec = new laneGroup.THREE.Vector2(appLeftOsEp[0], appLeftOsEp[1]);

	const appOsEpsVec = new laneGroup.THREE.Vector2(
							appLeftOsEp[0] - appRightOsEp[0],
							appLeftOsEp[1] - appRightOsEp[1]
						);
	const appOsEpsMinuseVec = new laneGroup.THREE.Vector2(
							-appLeftOsEp[0] + appRightOsEp[0],
							-appLeftOsEp[1] + appRightOsEp[1]
						);

	const getInterPointOfLines = sharedGeometryLib.getIntersectedPointByPoints;

	let startPoint, endPoint, initPoint;


	// ********************* Decide inbound (main or side) points ***************
	if (bound === "inbound" || bound === "inboundSide") {
		//decide distance from approach right side:
		let distFromAppSide = 0; //in pixel
		if (bound === "inbound") {
			distFromAppSide += ibSideWidth + ibDivWidth;
			let index = mainIbLaneGroups.length - 1;

			while (index >= laneGroupIndex) {
				const oneLaneGroupWidth = laneGroups[mainIbLaneGroups[index]].laneGroupGeo.laneGroupWidth * meterToPixel;
				distFromAppSide += oneLaneGroupWidth;
				index--;
			}
		}
		else {
			distFromAppSide = ibSideWidth;
		}

		//decide initial point:
		initPointVec = appOsEpsVec.clone();
		initPointVec.setLength(distFromAppSide);
		initPointVec.add(appRightOsSpVec);
		initPoint = [initPointVec.x, initPointVec.y];

		//decide end point:
		endPointVec = appOsEpsVec.clone();
		endPointVec.setLength(distFromAppSide);
		endPointVec.add(appRightOsEpVec);

		endPoint = [endPointVec.x, endPointVec.y];

	}
	// ********************* Decide outbound (main or side) points ***************
	else {
		//decide distance from approach left side:
		let distFromAppSide = 0; //in pixel
		if (bound === "outbound") {
			distFromAppSide += obDivWidth + obSideWidth;

			//there should be only one outbound (main) laneGroup:
			const obMainLgWidth = laneGroups[mainObLaneGroups[0]].laneGroupGeo.laneGroupWidth * meterToPixel;
			distFromAppSide += obMainLgWidth;
		}
		else {
			distFromAppSide = obSideWidth;
		}

		//decide initial point:
		initPointVec = appOsEpsMinuseVec.clone();
		initPointVec.setLength(distFromAppSide);
		initPointVec.add(appLeftOsSpVec);
		initPoint = [initPointVec.x, initPointVec.y];

		//decide end point:
		endPointVec = appOsEpsMinuseVec.clone();
		endPointVec.setLength(distFromAppSide);
		endPointVec.add(appLeftOsEpVec);
		endPoint = [endPointVec.x, endPointVec.y];
	}


	// ******************* Decide start point *******************
	startPoint = getInterPointOfLines(
					initPoint[0], initPoint[1],
					endPoint[0], endPoint[1],
					stopOuterSp[0], stopOuterSp[1],
					stopOuterFinalP[0], stopOuterFinalP[1],
					accuracy
				);

	//*********************** Update laneGroup geometry *******************
	laneGroup.laneGroupGeo.sp = startPoint;
	laneGroup.laneGroupGeo.ep = endPoint;


};


export default modelIntLaneGroupPoints;
