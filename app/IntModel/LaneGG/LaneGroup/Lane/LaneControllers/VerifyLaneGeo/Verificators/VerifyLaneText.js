import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLaneText = (laneText, laneIndex, laneGroupId, appId, language = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";
	let message;

	if (!Array.isArray(laneText)) {
		if (language === 1) {
			message = "invalid laneText of lane " + laneIndex + " in laneGroup " +
			laneGroupId + " in approach " + appId + ". It should be an array of strings.";
		}
		else {
			message = "道路编号" + appId + "中的编号为" + laneIndex + "的车道的laneText格式有误。该数据应该是" +
				"字符串的数组。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
	else {
		laneText.forEach((oneText) => {
			if (typeof oneText !== "string") {
				if (language === 1) {
					message = "invalid laneText of lane " + laneIndex + " in laneGroup " +
						laneGroupId + " in approach " + appId + ". It should be an array of strings.";
				}
				else {
					message = "道路编号" + appId + "中的编号为" + laneIndex + "的车道的laneText中有信息错误。" +
						"laneText里的每个元素都应该是字符串。";
				}

				const oneValueError = new SingleValueError(modelOwner, message);
				throw oneValueError;
			}
		});
	}
};


export default verifyLaneText;
