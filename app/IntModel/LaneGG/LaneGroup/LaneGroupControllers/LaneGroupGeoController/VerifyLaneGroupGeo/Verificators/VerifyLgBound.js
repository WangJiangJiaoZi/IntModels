
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyLgBound = (bound, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "LaneGroup";

	const reg = /^(inbound|outbound|inboundSide|outboundSide)$/;
	if (!reg.test(bound)) {
		let message;
		if (language === 1) {
			message = "invalid bound in laneGroup " + laneGroupId +
				" geometry data in approach " + appId + ". It should be " +
				" inbound/outbound/intboundSide/outboundSide.";
		}
		else {
			message = "道路编号" + appId + "中的编号为" + laneGroupId + "的车道组方向(bound)信息无效。" +
				"该值应该是inbound/outbound/intboundSide/outboundSide中的一个。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};

export default verifyLgBound;
