
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyLgSigalGroupId = (signalGroupId, bound, appId, laneGroupId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "LaneGroup";

	if (bound === "inbound" || bound === "inboundSide") {
		const reg = /^\d+$/;  //positive integer number
		if (!reg.test(signalGroupId)) {
			const message = "invalid signalGroupId in laneGroup " + laneGroupId +
				" geometry data in approach " + appId + ". It should be " +
				" an integer number.";
			const oneValueError = new SingleValueError(modelOwner, message);
			throw oneValueError;
		}
	}
};


export default verifyLgSigalGroupId;
