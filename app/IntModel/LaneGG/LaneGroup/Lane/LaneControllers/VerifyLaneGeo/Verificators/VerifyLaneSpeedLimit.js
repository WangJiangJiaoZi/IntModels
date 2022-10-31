import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLaneSpeedLimit = (laneSpeedLimit, laneIndex, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";

	const reg = /^\d+$/;  //a positive integer number
	if (!reg.test(laneSpeedLimit)) {
		let message;

		if (language === 1) {
			message = "invalid laneSpeedLimit of lane " + laneIndex + " in laneGroup " +
					laneGroupId + " in approach " + appId + ". It should be non 0 positive number.";
		}
		else {
			message = "道路编号" + appId + "中的编号为" + laneIndex + "的车道的限速信息无效。该值应该是一个正数。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyLaneSpeedLimit;
