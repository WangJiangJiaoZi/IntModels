
import GetLaneLevelGeo from "./GetLaneLevelGeo";

import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetLaneGroupLevelGeo{
	constructor(intModel, getIntLevelGeo, getAppLevelGeo) {
		this.intModel = intModel;
		this.getIntLevelGeo = getIntLevelGeo;
		this.getAppLevelGeo = getAppLevelGeo;

		const getLaneLevelGeo = new GetLaneLevelGeo(intModel, getAppLevelGeo);
		this.getLaneLevelGeo = getLaneLevelGeo;

		this.getLaneGroupArrowTypes = this.getLaneGroupArrowTypes.bind(this);
	}

	getLaneByLaneIndex(laneGroup, laneIndex, language = 1) {
		//check if laneIndex is reasonable:
		if (laneIndex >= laneGroup.lanes.length || laneIndex < 0) {
			const modelOwner = "LaneGroup";
			let message;
			if (language === 1) {
				message = "Failed to get lane by the laneIndex provided. LaneIndex must be a number no less than 0 " +
					"and smaller than the count of the lanes in the laneGroup.";
			}
			else {
				message = "无法根据提供的车道编号获取车道。车道编号必须大于等于0，并且小于所属车道组的车道数量。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}

		//get lane by laneIndex:
		const curLane = laneGroup.lanes[laneIndex];
		return curLane;
	}

	getLaneGroupLaneCounts(laneGroup, language = 1) {
		const lanes = laneGroup.lanes;
		const lanesCount = lanes.length;

		return lanesCount;
	}

	getLaneGroupArrowTypes(laneGroup, language = 1) {
		const lanesArrowTypes = [];

		const lanes = laneGroup.lanes;
		const getLaneArrowType = this.getLaneLevelGeo.getLaneArrowType;
		lanes.forEach((oneLane) => {
			const oneLaneArrowType = getLaneArrowType(oneLane, language);
			lanesArrowTypes.push(oneLaneArrowType);
		});

		return lanesArrowTypes;
	}


}


export default GetLaneGroupLevelGeo;
