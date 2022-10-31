import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyLaneId = (laneId, laneIndex, laneGroupId, appId) => {
	const SingleValueError = sharedErrors.SingleValueError;
	const modelOwner = "Lane";

	if (!laneId) {
		//laneId can't be null/undefined/0/false/""/NaN......
		const message = "invalid laneId of lane " + laneIndex + " in laneGroup " +
				laneGroupId + " in approach " + appId + ".";
		const oneValueError = new SingleValueError(modelOwner, message);
		throw oneValueError;
	}

};


export default verifyLaneId;
