
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLgWaitingLength = (waitingLength, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "LaneGroup";

	const reg = /^\+?\d+(\.\d+)?$/;  //positive float number
	if (!reg.test(waitingLength)) {
		let message;
		if (language === 1) {
			message = "invalid waitingLength in laneGroup " + laneGroupId +
					" geometry data in approach " + appId + ". It should be " +
					" either 0 or a positive number (float).";	
		}
		else {
			message = "道路编号" + appId + "中的车道待转区参数无效。该参数应该是0或者一个正数。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyLgWaitingLength;
