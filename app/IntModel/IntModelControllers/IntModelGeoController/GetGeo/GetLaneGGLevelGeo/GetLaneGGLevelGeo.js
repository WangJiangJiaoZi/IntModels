
import sharedErrors from "../../../../SharedErrors/SharedErrors";


import GetLaneGroupLevelGeo from "./GetLaneGroupLevelGeo";

class GetLaneGGLevelGeo {
	constructor (intModel, getIntLevelGeo, getAppLevelGeo) {
		this.intModel = intModel;
		this.getIntLevelGeo = getIntLevelGeo;
		this.getAppLevelGeo = getAppLevelGeo;

		const getLaneGroupLevelGeo = new GetLaneGroupLevelGeo(intModel, getIntLevelGeo, getAppLevelGeo);
		this.getLaneGroupLevelGeo = getLaneGroupLevelGeo;
	}

	getLaneGGByAppIndex(appIndex, language) {
		const app = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);
		const curLaneGG = app.laneGG;

		return curLaneGG;
	}

	getLaneGroupByAppIndexAndBound(appIndex, bound, language = 1, getLgErrorDisplay = true) {
		//verify bound:
		const reg = /^(inbound|outbound|inboundSide|outboundSide)$/;
		if (!reg.test(bound)) {
			let message;
			const modelOwner = "LaneGroup";
			if (language === 1) {
				message = "invalid 'bound' in when getting lane counts. It should be " +
					" inbound/outbound/intboundSide/outboundSide.";
			}
			else {
				message = "车道组方向(bound)信息无效。" +
					"该值应该是inbound/outbound/intboundSide/outboundSide中的一个。";
			}
			const oneValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw oneValueError;
		}

		//get laneGG:
		const curLaneGG = this.getLaneGGByAppIndex(appIndex, language);

		//get the laneGroup:
		const laneGroups = curLaneGG.laneGroups;
		let laneGroupToGet = null;

		for (let i = 0; i < laneGroups.length; i++) {
			const curBound = laneGroups[i].bound;
			if (curBound === bound) {
				laneGroupToGet = laneGroups[i];
				i = laneGroups.length;
			}
		}

		//if laneGroup not found and needs to display it as an error:
		if (!laneGroupToGet && getLgErrorDisplay) {
			const modelOwner = "LaneGG";
			let message;
			if (language === 1) {
				message = "Fail to get laneGroup by the bound provided. Approach " + appIndex +
					" has no laneGroup of " + bound;
			}
			else {
				message = "获取laneGroup失败。编号" + appIndex + "的道路没有方向为" + bound + "的车道组。";
			}
			const oneConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw oneConflictError;
		}

		return laneGroupToGet;
	}


	//only "inbound" and "inboundSide" needs to get its arrow types in each lane.
	//arrow types in "outbound" are the same: "straight".
	//side roads have no arrows (at least for now...)
	getLaneGGInboundArrowTypes(appIndex, bound, language = 1) {
		//get laneGroup by bound:
		const curLaneGroup = this.getLaneGroupByAppIndexAndBound(appIndex, bound, language, false);

		let arrowTypes;
		//if inbound laneGroup exists, get its arrow types array for its lanes:
		if (curLaneGroup) {
			const getLaneGroupArrowTypes = this.getLaneGroupLevelGeo.getLaneGroupArrowTypes;
			arrowTypes = getLaneGroupArrowTypes(curLaneGroup, language);
		}
		//else, it would be an empty array
		else {
			arrowTypes = [];
		}

		return arrowTypes;
	}

	/**************************************************************************
							Get laneGroup geo
	**************************************************************************/
	getLaneGroupLaneCountsByAppIndexAndBound(appIndex, bound, language = 1) {
		//get laneGroup by bound:
		const curLaneGroup = this.getLaneGroupByAppIndexAndBound(appIndex, bound, language, false);

		let laneCounts;
		//if curLaneGroup exists, get its laneCounts:
		if (curLaneGroup) {
			const getLaneGroupLaneCounts = this.getLaneGroupLevelGeo.getLaneGroupLaneCounts;
			laneCounts = getLaneGroupLaneCounts(curLaneGroup, language);
		}
		//else, make it 0
		else {
			laneCounts = 0;
		}

		return laneCounts;
	}


	/**************************************************************************
							Get lane geo
	**************************************************************************/

	getIbLaneArrowLaneOptions(appIndex, laneIndex, language = 1) {
		//get laneGroup by bound:
		const curLaneGroup = this.getLaneGroupByAppIndexAndBound(appIndex, "inbound", language, false);
		let laneArrowLaneOptions = [];

		//there might be no inbound laneGroup in current laneGG...
		if (curLaneGroup) {
			//get lane by laneIndex
			const getLaneByLaneIndex = this.getLaneGroupLevelGeo.getLaneByLaneIndex;
			const curLane = getLaneByLaneIndex(curLaneGroup, laneIndex, language);

			const getLaneArrowLaneOptions = this.getLaneGroupLevelGeo.getLaneLevelGeo.getLaneArrowLaneOptions;
			laneArrowLaneOptions = getLaneArrowLaneOptions(curLane, language);
		}

		return laneArrowLaneOptions;

	}

	//get one feature except laneMov for the lane defined by appIndex, bound, and laneIndex
	getLaneFeature(appIndex, bound, laneIndex, featureName, language = 1) {
		//get laneGroup by bound:
		const curLaneGroup = this.getLaneGroupByAppIndexAndBound(appIndex, bound, language, true);

		//get lane by laneIndex:
		const getLaneByLaneIndex = this.getLaneGroupLevelGeo.getLaneByLaneIndex;
		const curLane = getLaneByLaneIndex(curLaneGroup, laneIndex, language);

		const getLaneFeature = this.getLaneGroupLevelGeo.getLaneLevelGeo.getLaneFeature;
		const featureValue = getLaneFeature(curLane, featureName, language);

		return featureValue;
	}
}


export default GetLaneGGLevelGeo;
