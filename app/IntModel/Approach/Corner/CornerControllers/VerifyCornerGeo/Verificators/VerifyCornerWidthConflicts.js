
import sharedErrors from "../../../../../SharedErrors/SharedErrors";

const verifyCornerWidthConflicts = (cornerType, channelWidth, cornerInboundWidth, cornerOutboundWidth, appId, language = 1) => {
	const SingleConflictError = sharedErrors.SingleValueError;
	const modelOwner = "Corner";
	let message;

	if (cornerType === 3) {
		//verify cornerType and channelWidth:
		if (channelWidth <= 0) {
			if (language === 1) {
				message = "conflicts in approach " + appId +
						" corner data: channelWidth can't be 0 when cornerType is 3 (island).";
			}
			else {
				message = "道路编号" + appId + "转角几何数据有冲突：当转角类型是3（渠化）时，渠化道宽度不能是0。";
			}
			const oneSingleConflictError = new SingleConflictError(modelOwner, message);
			throw oneSingleConflictError;
		}

		//verify channelWidth vs cornerInboundWdith and cornerOutboundWidth:
		if (channelWidth < cornerInboundWidth || channelWidth < cornerOutboundWidth) {
			if (language === 1) {
				message = "conflicts in approach " + appId +
						" corner data: channelWidth must be no less than" +
						" cornerInboundWidth or cornerOutboundWidth";
			}
			else {
				message = "道路编号" + appId + "转角几何数据有冲突：渠化道宽度必须大于渠化入口宽度、渠化出口宽度。";
			}

			const oneSingleConflictError = new SingleConflictError(modelOwner, message);
			throw oneSingleConflictError;
		}
	}
};


export default verifyCornerWidthConflicts;
