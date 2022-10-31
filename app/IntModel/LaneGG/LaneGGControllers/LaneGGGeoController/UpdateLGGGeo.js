

import sharedErrors from "../../../SharedErrors/SharedErrors";

import LaneGroup from "../../LaneGroup/LaneGroup";

const updateLGGGeo = {

	updateLaneFeature: (laneGG, bound, laneIndex, featureName, featureValue, language = 1) => {
		//Try to get laneGroup by bound:
		const laneGroups = laneGG.laneGroups;
		const curLaneGroup = laneGroups.find((oneLaneGroup) => {
			return oneLaneGroup.bound === bound;
		});

		//if curLaneGroup found:
		if (curLaneGroup) {
			curLaneGroup.laneGroupControllers.laneGroupGeoController.updateLaneGroupGeo.updateLaneFeature(
				curLaneGroup, laneIndex, featureName, featureValue, language
			);
		}
		//else would raise an error if no laneGroup found.
		else {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Failed to update feature for lane of bound of " + bound +
					". Current laneGG has no such bound.";
			}
			else {
				message = "无法更改车道属性。当前的laneGG没有方向为" + bound + "的车道组。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}
	},


	addLaneGroup: (laneGG, bound, laneGroupGeoToAdd, language = 1) => {
		const newLaneGroup = new LaneGroup(laneGG, laneGG.THREE);
		const newLaneGroupIndex = laneGG.laneGroups.length;

		newLaneGroup.laneGroupControllers.laneGroupGeoController.injectLaneGroupGeo(
			newLaneGroup, laneGroupGeoToAdd, newLaneGroupIndex
		);

		laneGG.laneGroups.push(newLaneGroup);

		//sort the laneGroups from "inbound" to "outboundSide":
		const sortDict = {
			"inbound": 1,
			"inboundSide": 2,
			"outbound": 3,
			"outboundSide": 4
		};

		laneGG.laneGroups.sort((oneLaneGroup, nextLaneGroup) => {
			const firstBound = oneLaneGroup.bound;
			const secondBound = nextLaneGroup.bound;
			const firstDigit = sortDict[firstBound];
			const secondDigit = sortDict[secondBound];
			return (firstDigit < secondDigit) ? -1 : 1;
		});

		//reset laneGroups index accordingly:
		laneGG.laneGroups.forEach((oneLaneGroup, index) => {
			oneLaneGroup.laneGroupIndex = index;
		});
	},



	removeLaneGroup: (laneGG, bound, language = 1) => {
		//****************try to get laneGroupIndex by bound****************:
		const laneGroups = laneGG.laneGroups;
		const curLaneGroupIndex = laneGroups.findIndex((oneLaneGroup) => {
			return oneLaneGroup.bound === bound;
		});

		//if not found, raise error
		if (curLaneGroupIndex === undefined) {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Failed to remove laneGroup of " + bound +
					". Current laneGG (approach) has no such laneGroup bound.";
			}
			else {
				message = "无法删除方向为" + bound + "的车道组。当前道路没有该方向的车道组。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}


		//****************check if the laneGroup to remove is the last one in the whole laneGG.****************
		//if it is, stop removing and raise error:
		let laneGGLaneGroupsCount = 0;
		laneGroups.forEach((oneLaneGroup) => {
			laneGGLaneGroupsCount++;
		});

		if (laneGGLaneGroupsCount <= 1) {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Failed to remove laneGroup of " + bound +
					". It is the lase laneGroup in the current LaneGG. The removing would cause the approach invalid." +
					"If you would like to delete the approach, please go to the initialization panel.";
			}
			else {
				message = "无法删除方向为" + bound + "的车道。该车道组是" +
					"该方向最后一个车道组，它的删除会造成该条道路无效。如果需要删除整条道路，请选择路口初始化模板。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}

		//****************remove curLaneGroup from laneGG****************:
		laneGG.laneGroups.splice(curLaneGroupIndex, 1);

	},

	addLane: (laneGG, bound, laneGeoToAdd, language = 1) => {
		//try to get laneGroup by bound:
		const laneGroups = laneGG.laneGroups;
		const curLaneGroup = laneGroups.find((oneLaneGroup) => {
			return oneLaneGroup.bound === bound;
		});

		//if not found, create a new laneGroup of the bound provided and inject geometry info:
		if (!curLaneGroup) {
			const laneGroupGeoToAdd = {
				bound: bound,
				lanes: [laneGeoToAdd]
			};
			updateLGGGeo.addLaneGroup(laneGG, bound, laneGroupGeoToAdd, language);
		}
		//else, ask the laneGroup to add lane:
		else {
			const updateLaneGroupGeo = curLaneGroup.laneGroupControllers.laneGroupGeoController.updateLaneGroupGeo;
			updateLaneGroupGeo.addLane(curLaneGroup, laneGeoToAdd, language);
		}



	},

	removeLane: (laneGG, bound, laneIndex, language = 1) => {
		//****************try to get laneGroup by bound****************:
		const laneGroups = laneGG.laneGroups;
		const curLaneGroup = laneGroups.find((oneLaneGroup) => {
			return oneLaneGroup.bound === bound;
		});

		//if not found, raise error
		if (!curLaneGroup) {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Failed to remove lane of " + bound + " of index of " + laneIndex +
					". Current laneGG (approach) has no such laneGroup bound.";
			}
			else {
				message = "无法从方向为" + bound + "的车道组中删除编号为" + laneIndex + "的车道。当前道路没有" +
					"该方向的车道组。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}

		//****************check if the lane to remove is the last lane in the whole laneGG.****************
		//if it is, stop removing and raise error:
		let laneGGLanesCount = 0;
		laneGroups.forEach((oneLaneGroup) => {
			oneLaneGroup.lanes.forEach((oneLane) => {
				laneGGLanesCount++;
			});
		});

		if (laneGGLanesCount <= 1) {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Failed to remove lane of " + bound + " of index of " + laneIndex +
					". It is the lase lane in the current LaneGG. The removing would cause the approach invalid." +
					"If you would like to delete the approach, please go to the initialization panel.";
			}
			else {
				message = "无法从方向为" + bound + "的车道组中删除编号为" + laneIndex + "的车道。该车道是" +
					"该方向最后一个车道，它的删除会造成该条道路无效。如果需要删除整条道路，请选择路口初始化模板。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}


		//****************ask curLaneGroup to remove lane by bound and laneIndex****************:
		const updateLaneGroupGeo = curLaneGroup.laneGroupControllers.laneGroupGeoController.updateLaneGroupGeo;
		updateLaneGroupGeo.removeLane(curLaneGroup, bound, laneIndex, language);


		//****************if curLaneGroup has 0 lanes, remove it as well****************:
		const curLaneGroupLanesCount = curLaneGroup.lanes.length;
		if (curLaneGroupLanesCount === 0) {
			updateLGGGeo.removeLaneGroup(laneGG, bound, language);
		}
	},


};


export default updateLGGGeo;
