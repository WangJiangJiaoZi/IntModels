
import SharedGeometryLib from "../../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		1. lane.laneGeo.lsSp = [x, y],  //start point of the lane left side
		2. lane.laneGeo.lsEp = [x, y],  //end point of the lane left side
		3. lane.laneGeo.rsSp = [x, y],  //start point of the lane right side
		4. lane.laneGeo.rsEp = [x, y],  //end point of the lane right side

		5. lane.laneGeo.rsCps = [[x1, y1], [x2, y2]],  //control points for side lane
		6. lane.laneGeo.lsCps = [[x1, y1], [x2, y2]]   //control points for side lane

	Note:
		1. Assuming that only one side lane at most in one side laneGroup.
		2. Only a side lane has rsCps and lsCps. For inboundSide, rsCps is on
		the approach curb. For outboundSide, lsCps is on approach's curb. In
		other words, the "left" and "right" are relative to the approach's
		inbound direction.
**************************************************************************/

const modelIntSideLaneSidesPoints = (lane, intSize, meterToPixel) => {
	const bound = lane.laneGroup.bound;
	const sideLaneWidth = lane.laneWidth * meterToPixel; //in pixel
	const laneGG = lane.laneGroup.laneGG;
	const approach = laneGG.approach;
	const THREE = lane.THREE;
	const accuracy = approach.intersection.intModel.envSetters.accuracy;
	let lsSp, lsEp, rsSp, rsEp, rsCps, lsCps;

	const sharedGeoLib = new SharedGeometryLib(THREE);
	const getInterPointsByPoints = sharedGeoLib.getIntersectedPointByPoints;

	//for inbound side lane:
	if (bound === "inboundSide") {
		rsCps = approach.appGeo.rightSideCps;  //[[x1, y1], [x2, y2]]
		rsEp = approach.appGeo.innerRightEp;  //[x, y]
		const outerToInnerVec2 = new THREE.Vector2(
									approach.appGeo.innerLeftEp[0] - rsEp[0],
									approach.appGeo.innerLeftEp[1] - rsEp[1]
								);
		outerToInnerVec2.setLength(sideLaneWidth);

		//calculate lsEp:
		const rsEpVec2 = new THREE.Vector2(rsEp[0], rsEp[1]);
		const lsEpVec2 = rsEpVec2.add(outerToInnerVec2);
		lsEp = [lsEpVec2.x, lsEpVec2.y];

		//calculate lsCps:
		const lsCp1Vec2 = new THREE.Vector2(
							rsCps[0][0], rsCps[0][1]
						);
		const lsCp2Vec2 = new THREE.Vector2(
							rsCps[1][0], rsCps[1][1]
						);
		lsCp1Vec2.add(outerToInnerVec2);
		lsCp2Vec2.add(outerToInnerVec2);
		lsCps = [
			[lsCp1Vec2.x, lsCp1Vec2.y],
			[lsCp2Vec2.x, lsCp2Vec2.y]
		];

		//calculate rsSp:
		const stopBarOuterFinalP = laneGG.laneGGGeo.outerFinalP;  //[x, y]
		const stopBarOuterSp = laneGG.laneGGGeo.stopOuterSp;  //[x, y]
		const appRightSp = approach.appGeo.outerRightSp;  //[x, y]
		const appRightEp = approach.appGeo.outerRightEndPoint;  //[x, y]

		rsSp = getInterPointsByPoints(
				stopBarOuterFinalP[0], stopBarOuterFinalP[1],
				stopBarOuterSp[0], stopBarOuterSp[1],
				appRightSp[0], appRightSp[1],
				appRightEp[0], appRightEp[1],
				accuracy
			); //[x, y]

		//calculate lsSp:
		const sideLaneInnerP1Vec2 = new THREE.Vector2(rsSp[0], rsSp[1]);
		sideLaneInnerP1Vec2.add(outerToInnerVec2);

		const sideLaneInnerP2Vec2 = new THREE.Vector2(appRightEp[0],appRightEp[1]);
		sideLaneInnerP2Vec2.add(outerToInnerVec2);
		lsSp = getInterPointsByPoints(
				stopBarOuterFinalP[0], stopBarOuterFinalP[1],
				stopBarOuterSp[0], stopBarOuterSp[1],
				sideLaneInnerP1Vec2.x, sideLaneInnerP1Vec2.y,
				sideLaneInnerP2Vec2.x, sideLaneInnerP2Vec2.y,
				accuracy
			); //[x, y]
	}
	//else, for outbound side lane:
	else {
		lsEp = approach.appGeo.innerLeftEp;  //[x, y]
		lsCps = approach.appGeo.leftSideCps;  //[[x1, y1], [x2, y2]]
		const outerToInnerVec2 = new THREE.Vector2(
									approach.appGeo.innerRightEp[0] - lsEp[0],
									approach.appGeo.innerRightEp[1] - lsEp[1]
								);
		outerToInnerVec2.setLength(sideLaneWidth);

		//calculate rsCps:
		const rsCps1Vec2 = new THREE.Vector2(lsCps[0][0], lsCps[0][1]);
		rsCps1Vec2.add(outerToInnerVec2);
		const rsCp2Vec2 = new THREE.Vector2(lsCps[1][0], lsCps[1][1]);
		rsCp2Vec2.add(outerToInnerVec2);
		rsCps = [
			[rsCps1Vec2.x, rsCps1Vec2.y],
			[rsCp2Vec2.x, rsCp2Vec2.y]
		];
		//calculate rsEp:
		const rsEpVec2 = new THREE.Vector2(lsEp[0], lsEp[1]);
		rsEpVec2.add(outerToInnerVec2);
		rsEp = [rsEpVec2.x, rsEpVec2.y];

		//calculate lsSp:
		lsSp = laneGG.laneGGGeo.outerFinalP;  //[x, y]

		//calcualte rsSp:
		const stopBarOuterSp = laneGG.laneGGGeo.stopOuterSp;  //[x, y]
		const sideLaneInnerP1Vec2 = new THREE.Vector2(
										stopBarOuterSp[0], stopBarOuterSp[1]
									);
		sideLaneInnerP1Vec2.add(outerToInnerVec2);

		const appLeftEp = approach.appGeo.outerLeftEndPoint;  //[x, y]
		const sideLaneInnerP2Vec2 = new THREE.Vector2(
										appLeftEp[0], appLeftEp[1]
									);
		sideLaneInnerP2Vec2.add(outerToInnerVec2);
		rsSp = getInterPointsByPoints(
				lsSp[0], lsSp[1],
				stopBarOuterSp[0], stopBarOuterSp[1],
				sideLaneInnerP1Vec2.x, sideLaneInnerP1Vec2.y,
				sideLaneInnerP2Vec2.x, sideLaneInnerP2Vec2.y,
				accuracy
			);
	}

	lane.laneGeo.lsSp = lsSp;
	lane.laneGeo.lsEp = lsEp;
	lane.laneGeo.rsSp = rsSp;
	lane.laneGeo.rsEp = rsEp;

	lane.laneGeo.rsCps = rsCps;
	lane.laneGeo.lsCps = lsCps;
};


export default modelIntSideLaneSidesPoints;

