
import sharedErrors from "../../../../../SharedErrors/SharedErrors";
//import initSettings from "../../../../../EnvSetters/InitSettings";

const verifyCornerAppConflict = (inboundStorageLength, inboundSlipLength, cornerRadius, appId, language = 1) => {
	/*
	const CompoundConflictError = sharedErrors.CompoundConflictError;
	const sharedInitSettings = initSettings.sharedInitSettings;
	const intRadius = sharedInitSettings.intDiameter / 2; //in meters

	if (inboundStorageLength + inboundSlipLength + cornerRadius >= intRadius) {
		let message;
		if (language === 1) {
			language = "invalid cornerRadius in approach " + appId + ". The sum of its " +
					"inboundStorageLength, inboundSlipLength, and the cornerRadius should " +
					"not be too large.";
		}
		else {
			language = "道路编号" + appId + "的转角半径无效。道路的进口方向展宽长度、展宽过渡段长度、转角半径的和不能过大。";
		}
		const modelOwners = ["approach", "corner"];
		const oneCompoundConflictError = new CompoundConflictError(modelOwners, message);
		throw oneCompoundConflictError;
	}
	*/
};


export default verifyCornerAppConflict;
