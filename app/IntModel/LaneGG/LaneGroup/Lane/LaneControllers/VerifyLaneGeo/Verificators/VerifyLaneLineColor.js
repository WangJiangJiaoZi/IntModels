
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyLgLaneLineColor = (laneLineColor, appId, laneGroupId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "LaneGroup";

	const reg = /^#([0-9a-f]{3}|[0-9a-fA-F]{6})$/i;   //hex color
	if (!reg.test(laneLineColor)) {
		let message;
		if (language === 1) {
			message = "invalid laneLineColor in laneGroup " + laneGroupId +
					" geometry data in approach " + appId + ". It should be " +
					" a hex code color.";
		}
		else {
			message = "道路编号" + appId + "中的车道待转区颜色信息无效。该参数应该是一个hex code color。";
		}
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyLgLaneLineColor;
