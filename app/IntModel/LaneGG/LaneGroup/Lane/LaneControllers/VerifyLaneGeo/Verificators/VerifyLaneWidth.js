import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLaneWidth = (laneWidth, laneIndex, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";

	const reg = /^(\d+(\.\d+)?)$/;  //a positive number
	if (!reg.test(laneWidth) || laneWidth === 0) {
		let message;
		if (language === 1) {
			message = "invalid laneWidth of lane " + laneIndex + " in laneGroup " +
				laneGroupId + " in approach " + appId + ". It should be non 0 positive number.";
		}
		else {
			message = "编号" + appId + "的道路中编号" + laneIndex + "的车道的宽度无效。车道宽应该是一个正数。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyLaneWidth;
