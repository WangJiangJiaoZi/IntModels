
import verifyAppAngle from "./VerifyAppGeo/Verificators/VerifyAppAngle";
import verifyAppAngleConflicts from "./VerifyAppGeo/Verificators/VerifyAppAngleConflicts";
import verifyAppFloat from "./VerifyAppGeo/Verificators/VerifyAppFloat";
import verifyAppStorageConflict from "./VerifyAppGeo/Verificators/VerifyAppStorageConflict";
import verifyAppInteger from "./VerifyAppGeo/Verificators/VerifyAppInteger";

const updateAppGeo = {
	updateAppAngle: (approach, nextAngle) => {
		verifyAppAngle(nextAngle);
		const approaches = approach.intersection.approaches;
		const curAppIndex = approach.appId;  //appId is index
		const allAngles = [];
		approaches.forEach((oneApp, index) => {
			if (curAppIndex !== index) {
				allAngles.push(oneApp.appAngle);
			}
			else {
				allAngles.push(nextAngle);
			}
		});
		verifyAppAngleConflicts(allAngles);
		approach.appAngle = nextAngle;
	},

	updateAppIbStLen: (approach, nextIbStLen) => {
		verifyAppFloat(nextIbStLen);
		const ibSlipLen = approach.inboundSlipLength;
		const appId = approach.appId;
		verifyAppStorageConflict(nextIbStLen, ibSlipLen, appId);
		approach.inboundStorageLength = nextIbStLen;
	},

	updateAppIbSlipLen: (approach, nextIbSlipLen) => {
		verifyAppFloat(nextIbSlipLen);
		const appId = approach.appId;
		const ibStLen = approach.inboundStorageLength;
		verifyAppStorageConflict(ibStLen, nextIbSlipLen, appId);
		approach.inboundSlipLength = nextIbSlipLen;
	},

	updateAppIbStWidth: (approach, nextIbStWidth) => {
		verifyAppFloat(nextIbStWidth);
		approach.inboundStorageWidth = nextIbStWidth;
	},

	updateAppObStLen: (approach, nextObStLen) => {
		verifyAppFloat(nextObStLen);
		const obSlipLen = approach.outboundSlipLength;
		const appId = approach.appId;
		verifyAppStorageConflict(nextObStLen, obSlipLen, appId);
		approach.outboundStorageLength = nextObStLen;
	},

	updateAppObSlipLen: (approach, nextObSlipLen) => {
		verifyAppFloat(nextObSlipLen);
		const obStLen = approach.outboundStorageLength;
		const appId = approach.appId;
		verifyAppStorageConflict(obStLen, nextObSlipLen, appId);
		approach.outboundSlipLength = nextObSlipLen;
	},

	updateAppObStWidth: (approach, nextObStWidth) => {
		verifyAppFloat(nextObStWidth);
		approach.outboundStorageWidth = nextObStWidth;
	},

	updateAppSpeedLimit: (approach, nextSpeedLimit) => {
		verifyAppInteger(nextSpeedLimit);
		approach.appSpeedLimit = nextSpeedLimit;
	},

	updateAppRoadClass: (approach, nextRoadClass) => {
		verifyAppInteger(nextRoadClass);
		approach.appRoadClass = nextRoadClass;
	},

	updateAppSlope: (approach, nextSlope) => {
		verifyAppInteger(nextSlope);
		approach.slope = nextSlope;
	}

};


export default updateAppGeo;
