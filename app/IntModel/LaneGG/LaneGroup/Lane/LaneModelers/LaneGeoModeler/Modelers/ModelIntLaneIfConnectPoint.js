

import SharedGeometryLib from "../../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		1. lane.laneGeo.ifConnectPoint: true / false,  //

	Note:
		For main lane,
		if the dist from lane's middle line to the approach curb
		is smaller than the sum of bound's side lane width, divider's width,
		and storage width, there would be no connect point.

		For inbound main lane, there's one more condition.
		If the dist from the lane's middle line to the center divider
		is smaller than the center storage width, there would be no connect
		point.
**************************************************************************/

const modelIntLaneIfConnectPoint = (lane, meterToPixel) => {
	let bound = lane.laneGroup.bound;
	let ifConnectPoint = true;
	const approach = lane.laneGroup.laneGG.approach;
	const sharedGeoLib = new SharedGeometryLib(lane.THREE);
	const getDistBtwPs = sharedGeoLib.getDistBtwTwoPoints;

	//only main lane needs to worry about ifConnectPoint:
	if (bound === "inbound" || bound === "outbound") {
		bound = (bound === "inbound") ? 1 : 2;

		// ***** get the sum widths of divider, side lane, and storage *****
		//get divider's width:
		const dividers = approach.dividerGroup.dividers;
		const boundDiv = dividers.find((oneDiv) => {
			return oneDiv.dividerType === bound;
		});

		const divWidth = (boundDiv) ? (boundDiv.divGeo.dividerWidth * meterToPixel) : 0; //in pixel

		//get side lane's width if any:
		const laneGG = lane.laneGroup.laneGG;
		const sideLgIndexArray = (bound === 1) ? laneGG.laneGGGeo.sideIbLaneGroups : laneGG.laneGGGeo.sideObLaneGroups;
		let sideLaneWidth = 0;  //pixel
		sideLgIndexArray.forEach((oneLgIndex) => {
			const lanes = laneGG.laneGroups[oneLgIndex].lanes;
			lanes.forEach((oneLane) => {
				sideLaneWidth += oneLane.laneWidth * meterToPixel;
			});
		});

		//get side's storage width if any:
		const storageWidth = (bound === 1) ?
							(approach.inboundStorageWidth * meterToPixel) :
							(approach.outboundStorageWidth * meterToPixel);

		// ***** get the dist from lane's middle line to the approach's side *****
		const midLineEp = lane.laneGeo.midLineEp;  //[x, y]
		const appOuterEp = (bound === 1) ? approach.appGeo.outerRightEndPoint : approach.appGeo.outerLeftEndPoint; //[x, y]

		const distToCurb = getDistBtwPs(
							midLineEp[0], midLineEp[1],
							appOuterEp[0], appOuterEp[1]
						);

		ifConnectPoint = (distToCurb > (divWidth + sideLaneWidth + storageWidth)) ? true : false;
	}

	if (lane.laneGroup.bound === "inbound" && ifConnectPoint) {
		const dividers = approach.dividerGroup.dividers;
		const boundDiv = dividers.find((oneDiv) => {
			return oneDiv.dividerType === 3;
		});
		if (boundDiv) {
			const centerIbEp = (boundDiv.type === 8) ? boundDiv.divGeo.centerIbEp : boundDiv.divGeo.centerMidEp;  //center divider inbound side's end point
			const appOuterRightEp = approach.appGeo.outerRightEndPoint; //[x, y]
			const laneMidEp = lane.laneGeo.midLineEp;  //[x, y]

			const divToSideDist = getDistBtwPs(
									centerIbEp[0], centerIbEp[1],
									appOuterRightEp[0], appOuterRightEp[1]
								);
			const laneMidToSideDist = getDistBtwPs(
									laneMidEp[0], laneMidEp[1],
									appOuterRightEp[0], appOuterRightEp[1]
								);

			ifConnectPoint = (laneMidToSideDist < divToSideDist) ? true : false;
		}
	}

	lane.laneGeo.ifConnectPoint = ifConnectPoint;
};

export default modelIntLaneIfConnectPoint;
