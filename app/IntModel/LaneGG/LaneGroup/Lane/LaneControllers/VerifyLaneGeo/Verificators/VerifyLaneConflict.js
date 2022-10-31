
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";


const verifyLaneConflict = (laneLength, whiteLinelength, laneIndex, laneGroupId, appId, language = 1) => {
	const SingleConflictError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";

	if (laneLength !== -1) {
		if (whiteLinelength > laneLength || whiteLinelength === -1) {
			let message;
			if (language === 1) {
				message = "invalid whiteLinelength and laneLength of lane " + laneIndex + " in laneGroup " +
				laneGroupId + " in approach " + appId + ". WhiteLineLength should be smaller than laneLength.";
			}
			else {
				message = "道路编号" + appId + "中的编号为" + laneIndex + "的车道的白实线长度和车道长度有冲突。" +
					"白实线长度应该小于车道长度。";
			}

			const oneSingleConflict = new SingleConflictError(modelOwner, message);
			throw oneSingleConflict;
		}
	}
};

export default verifyLaneConflict;
