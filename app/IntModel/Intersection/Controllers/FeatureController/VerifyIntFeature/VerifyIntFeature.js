

class VerifyIntFeature {
	constructor(intersection) {
		this.intersection = intersection;
		this.modelOwner = "Intersection";
	}


	verifyIntControlType(controlTypeToVerify) {
		if (!["signal", "stop", "roundabout", "none"].includes(controlTypeToVerify)) {
			const message = this.intersection.modelErrorHints.verifyIntControlType;
			const oneValueError = this.intersection.handleGeneralError(message);
			throw oneValueError;
		}
	}


	verifyIntLOS(LOSToVerify) {
		if (!["A", "B", "C", "D", "E", "F"].includes(LOSToVerify)) {
			const message = this.intersection.modelErrorHints.verifyIntLOS;
			const oneValueError = this.intersection.handleGeneralError(message);
			throw oneValueError;
		}
	}
}

export default VerifyIntFeature;
