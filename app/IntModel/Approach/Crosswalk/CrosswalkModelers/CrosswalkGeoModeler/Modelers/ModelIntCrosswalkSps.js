
import SharedGeometryLib from "../../../../../SharedGeometryLib";
/**************************************************************************
	Would model:
		Start points of the crosswalk (for intersection only, not roundabout).

	Would update:
		1. crosswalk.crosswalkGeo.startPoints = [[x1, y1], [x2, y2]];
		 	([x1, y1] would be the inner start point while [x2, y2] is the outer one.)
		2. crosswalk.crosswalkGeo.ifIslandStart = true / false;
			(If the crosswalk starts from approach island or not.)

	Note:
		None.
**************************************************************************/
const modelIntCrosswalkSps = (crosswalk, intSize, meterToPixel) => {

	const sharedGeometryLib = new SharedGeometryLib(crosswalk.THREE);

	//************************ Prepare parameters ************************
	//const accuracy = initSettings.sharedInitSettings.accuracy * intBoxSize;  //in pixel


	const curApp = crosswalk.approach;
	const cornerType = crosswalk.approach.corner.cornerType;
	const curCorner = crosswalk.approach.corner;
	const cwWidth = crosswalk.crossswalkWidth * meterToPixel;  //in pixel
	let cwOffset = crosswalk.crosswalkOffset * meterToPixel;  //in pixel
	let curAppIslandLength = 0;

	//************** Decide if crosswalk starts from app outer side ***************
	let ifOuterStart;

	//if cornerType is polyline or curve only, crosswalk would start from outer side
	if (cornerType < 3) {
		ifOuterStart =  true;
	}
	else {
		curAppIslandLength = curCorner.cornerGeo.intCornerGeo.curAppIslandLength;  //in pixel

		if (curAppIslandLength > 0) {
			//if the crosswalk width is more than 1.0 of the island,
			//the crosswalk should start from app outer side
			ifOuterStart = (cwWidth * 1.0 > curAppIslandLength) ? true : false;
		}
		else {
			ifOuterStart = true;
		}


	}


	//************************ Calculate start points ************************
	let innerSp, outerSp;
	const getPointMovedFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;


	//if starts from outer side:
	if (ifOuterStart) {
		const curAppOuterRightSp = curApp.appGeo.outerRightSp;
		const curAppOuterRightEp = curApp.appGeo.outerRightEndPoint;
		//const curAppOs = curApp.appGeo.outerSides[0];  //in the form of {a: xx, b: xx}

		//when there is island and its length is greater than crosswalk width,
		//crosswalk buffer should be island length + initial buffer
		cwOffset = (curAppIslandLength > cwOffset) ? (curAppIslandLength + cwOffset) : cwOffset;
		innerSp = getPointMovedFromAtoB(
					curAppOuterRightSp[0], curAppOuterRightSp[1],
					curAppOuterRightEp[0], curAppOuterRightEp[1],
					cwOffset
				);

		outerSp = getPointMovedFromAtoB(
					curAppOuterRightSp[0], curAppOuterRightSp[1],
					curAppOuterRightEp[0], curAppOuterRightEp[1],
					cwOffset + cwWidth
				);


		crosswalk.crosswalkGeo.startPoints = [innerSp, outerSp];
		crosswalk.crosswalkGeo.ifIslandStart = false;

	}
	//else, starts from island
	else {
		const islandTip = curCorner.cornerGeo.intCornerGeo.islandTip;
		const islandArcSp = curCorner.cornerGeo.intCornerGeo.innerArcPoints[0];
		const curAppIslandMidPoint = curCorner.cornerGeo.intCornerGeo.curAppIslandMidPoint;

		innerSp = getPointMovedFromAtoB(
					curAppIslandMidPoint[0], curAppIslandMidPoint[1],
					islandTip[0], islandTip[1],
					cwWidth * 0.88
				);

		outerSp = getPointMovedFromAtoB(
					curAppIslandMidPoint[0], curAppIslandMidPoint[1],
					islandArcSp[0], islandArcSp[1],
					cwWidth * 0.12
				);

		crosswalk.crosswalkGeo.startPoints = [innerSp, outerSp];
		crosswalk.crosswalkGeo.ifIslandStart = true;
	}






};

export default modelIntCrosswalkSps;
