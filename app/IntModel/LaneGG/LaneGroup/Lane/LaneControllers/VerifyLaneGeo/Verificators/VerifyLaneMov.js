

import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLaneMov = (laneMov, bound, laneIndex, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";
	let message;

	let reg = /^(\d+-\d+)$/;
	if (bound === "inbound") {
		//laneMov should be an array of appId-laneId for an inbound lane
		if (!Array.isArray(laneMov)) {
			if (language === 1) {
				message = "invalid laneMov of lane " + laneIndex + " in laneGroup" +
					laneGroupId + " in approach " + appId + ".";
			}
			else {
				message = "编号" + appId + "的道路中编号" + laneIndex + "的车道的laneMov无效。laneMov应该是一个Array。";
			}

			const oneValueError = new SingleValueError(modelOwner, message);
			throw oneValueError;
		}
		laneMov.forEach((oneMov) => {
			if (!reg.test(oneMov)) {
				if (language === 1) {
					message = "invalid laneMov format of lane " + laneIndex + " in laneGroup" +
						laneGroupId + " in approach " + appId + ". The laneMov should be an array of " +
						" movements of a format of appIndex-laneIndex.";
				}
				else {
					message = "编号" + appId + "的道路中编号" + laneIndex + "的车道的laneMov中的至少一个mov无效。" +
						"mov格式应该是'道路编号-车道编号'。";
				}

				const oneValueError = new SingleValueError(modelOwner, message);
				throw oneValueError;
			}
		});

	}
	else if (bound === "inboundSide" || bound === "outboundSide") {
		//laneMov should be an array of null for an side lane
		if (laneMov !== null) {
			if (language === 1) {
				message = "wrong laneMov in lane " + laneIndex + " in laneGroup" +
					laneGroupId + " in approach " + appId + ". It should be null since it is an side lane.";
			}
			else {
				message = "编号" + appId + "的道路中编号" + laneIndex + "的车道的laneMov无效。" +
						"辅路车道的laneMov应该是null。";
			}
			const oneValueError = new SingleValueError(modelOwner, message);
			throw oneValueError;
		}
	}
	else {
		//laneMov should be an empty array of for an outbound lane
		if (laneMov.length !== 0) {
			if (language === 1) {
				message = "wrong laneMov in lane " + laneIndex + " in laneGroup" +
					laneGroupId + " in approach " + appId + ". It should be an empty array since it is an outbound lane.";
			}
			else {
				message = "编号" + appId + "的道路中编号" + laneIndex + "的车道的laneMov无效。" +
						"出口方向车道的laneMov应该是[]。";
			}
			const oneValueError = new SingleValueError(modelOwner, message);
			throw oneValueError;
		}
	}

};


export default verifyLaneMov;