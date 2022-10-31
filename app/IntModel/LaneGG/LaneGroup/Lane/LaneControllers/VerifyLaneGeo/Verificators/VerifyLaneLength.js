import sharedErrors from "../../../../../../SharedErrors/SharedErrors";
//import initSettings from "../../../../../../EnvSetters/InitSettings";

const verifyLaneLength = (lengthValue, lengthName, laneIndex, laneGroupId, appId, langugage = 1) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";

	const reg = /^(\d+(\.\d+)?)|(-1)$/;  //a positive number or -1
	//const intRadius = initSettings.sharedInitSettings.intDiameter / 2; //in meters

	if (!reg.test(lengthValue)) { //|| lengthValue >= intRadius) {
		let message;
		if (langugage === 1) {
			message = "invalid " + lengthName + " of lane " + laneIndex + " in laneGroup " +
					laneGroupId + " in approach " + appId + ". It should be either a " +
					"positive number no greater than the intRadius or -1 for unlimited length.";
		}
		else {
			message = "道路编号" + appId + "中的编号为" + laneIndex + "的车道的" + lengthName + "值无效" +
				"该值应该是小于intRadius的正数或者-1（代表无限长的车道）。";
		}

		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}
};


export default verifyLaneLength;
