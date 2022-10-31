
import sharedErrors from "../../../../SharedErrors/SharedErrors";

import verifyLaneGeo from "../../Lane/LaneControllers/VerifyLaneGeo/VerifyLaneGeo";
import Lane from "../../Lane/Lane";

const updateLaneGroupGeo = {
	//would always add the lane as the last one in the laneGroup.lanes
	addLane: (laneGroup, nextLaneGeo, language = 1) => {
		//verify nextLaneGeo:
		const nextLaneIndex = laneGroup.lanes.length;
		const bound = laneGroup.bound;
		const appIndex = laneGroup.laneGG.approach.appId;
		const laneGroupIndex = laneGroup.laneGroupIndex;
		const ifNew = true;
		verifyLaneGeo(nextLaneGeo, nextLaneIndex, bound, appIndex, laneGroupIndex, ifNew, language);

		//create a new lane and inject geometry:
		const nextLane = new Lane(laneGroup, laneGroup.THREE);
		nextLane.laneControllers.injectLaneGeo(nextLane, nextLaneGeo, nextLaneIndex);

		//add the newly created lane to the laneGroup:
		laneGroup.lanes.push(nextLane);

	},

	//remove inbound lane by laneIndex and update remaining lanes' index
	removeLane: (laneGroup, bound, laneIndexToRemove, language = 1) => {
		//check if the laneIndexToRemove is reasonable:
		const lanesCount = laneGroup.lanes.length;
		if (laneIndexToRemove >= lanesCount || laneIndexToRemove < 0) {
			let message;
			const modelOwner = "LaneGroup";
			if (language === 1) {
				message = "Failed to remove lane of index of " + laneIndexToRemove + ". Its laneGroup" +
					" has no such lane.";
			}
			else {
				message = "无法从车道组中删除编号为" + laneIndexToRemove + "的车道。该车道组没有这个车道。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}

		//remove the lane from laneGroup.lanes:
		const lanes = laneGroup.lanes;
		lanes.splice(laneIndexToRemove, 1);

		//update remaining lanes' index:
		lanes.forEach((oneLane, oneLaneIndex) => {
			const updateLaneIndex = oneLane.laneControllers.updateLaneGeo.updateLaneIndex;
			updateLaneIndex(oneLane, oneLaneIndex, language);
		});


		//if "outbound" lane, update laneMov for all inbound lanes in all approaches:
		if (bound === "outbound") {
			const curAppIndex = laneGroup.laneGG.approach.appId;
			const laneNum = laneIndexToRemove;

			const approaches = laneGroup.laneGG.approach.intersection.approaches;
			approaches.forEach((oneApp) => {
				const ibLaneGroup = oneApp.laneGG.laneGroups.find((oneLaneGroup) => {
					return oneLaneGroup.bound === "inbound";
				});

				if (ibLaneGroup) {
					//find lanes that has mov related and process it:
					ibLaneGroup.lanes.forEach((oneLane, oneLaneIndex) => {
						const relatedMov = oneLane.laneMov.find((oneMov) => {
							return Number(oneMov.split("-")[0]) === curAppIndex;
						});

						//if related mov detected, process it:
						if (relatedMov) {
							const relatedLaneMovArray = oneLane.laneMov;
							const nextLaneMovArray = [];

							relatedLaneMovArray.forEach((oneMov) => {
								const oneMovAppIndex = Number(oneMov.split("-")[0]);
								const oneMovLaneIndex = Number(oneMov.split("-")[1]);
								//if not to the current approach, keep it:
								if (oneMovAppIndex !== curAppIndex) {
									nextLaneMovArray.push(oneMov);
								}
								//else, if the toLane is at the inner side of the current lane, keep it:
								else if (oneMovLaneIndex < laneNum) {
									nextLaneMovArray.push(oneMov);
								}
								//else, if the toLane is at the outer side of the current lane, make its
								//toLane index minus one (since current lane is going to be removed):
								else if (oneMovLaneIndex > laneNum) {
									const nextLaneNum = oneMovLaneIndex - 1;
									nextLaneMovArray.push(oneMovAppIndex + "-" + nextLaneNum);
								}
							});

							oneLane.laneControllers.updateLaneGeo.updateIbLaneMov(
								oneLane, nextLaneMovArray, language
							);
						}
					});

				}
			});
		}
	},


	updateLaneFeature: (laneGroup, laneIndex, featureName, featureValue, language = 1) => {
		//get the lane by laneIndex:
		const lanesCount = laneGroup.lanes.length;
		if (laneIndex >= lanesCount || laneIndex < 0) {
			let message;
			const modelOwner = "LaneGroup";
			if (language === 1) {
				message = "Failed to update lane of index of " + laneIndex + ". Its laneGroup" +
					" has no such lane.";
			}
			else {
				message = "无法更改编号为" + laneIndex + "的车道属性。该车道组没有这个车道。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}

		//remove the lane from laneGroup.lanes:
		const theLane = laneGroup.lanes[laneIndex];


		//decide which update method to call:
		const updateLaneGeo = theLane.laneControllers.updateLaneGeo;
		let ifError = false;
		switch (featureName) {
			case "laneMov":
				updateLaneGeo.updateIbLaneMov(theLane, featureValue, language);
				break;
			case "whiteLineLength":
				updateLaneGeo.updateLaneWhiteLinelength(theLane, featureValue, language);
				break;
			case "laneLength":
				updateLaneGeo.updateLaneLength(theLane, featureValue, language);
				break;
			case "laneWidth":
				updateLaneGeo.updateLaneWidth(theLane, featureValue, language);
				break;
			case "laneSpeedLimit":
				updateLaneGeo.updateLaneSpeedLimit(theLane, featureValue, language);
				break;
			case "laneText":
				updateLaneGeo.updateLaneText(theLane, featureValue, language);
				break;
			case "waitingLength":
				updateLaneGeo.updateLaneWaitingLength(theLane, featureValue, language);
				break;
			case "laneLineColor":
				updateLaneGeo.updateLaneLineColor(theLane, featureValue, language);
				break;
			default:
				ifError = true;
		}

		if (ifError) {
			let message;
			const modelOwner = "LaneGroup";
			if (language === 1) {
				message = "Failed to update lane feature with the featureName provided: " + featureName +
					". Lane has no such feature.";
			}
			else {
				message = "无法更改车道的属性：" + featureName + "。车道没有该属性。";
			}
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}
	}
};


export default updateLaneGroupGeo;
