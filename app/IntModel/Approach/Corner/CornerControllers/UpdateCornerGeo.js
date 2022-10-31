
import verifyCornerType from "./VerifyCornerGeo/Verificators/VerifyCornerType";
import verifyCornerWidthConflicts from "./VerifyCornerGeo/Verificators/VerifyCornerWidthConflicts";
import verifyCornerNumber from "./VerifyCornerGeo/Verificators/VerifyCornerNumber";

const updateCornerGeo = {
	updateCornerType: (corner, nextCornerType, language = 1) => {
		verifyCornerType(nextCornerType);
		corner.cornerType = nextCornerType;
	},

	updateCornerRadius: (corner, nextCornerRadius, language = 1) => {
		verifyCornerNumber(nextCornerRadius);
		corner.cornerRadius = nextCornerRadius;
	},

	updateCornerIbWidth: (corner, nextCornerIbWidth, language = 1) => {
		verifyCornerNumber(nextCornerIbWidth);

		const cornerType = corner.cornerType;
		const channelWidth = corner.channelWidth;
		const obWidth = corner.cornerOutboundWidth;
		const appId = corner.approach.appId;
		verifyCornerWidthConflicts(
			cornerType,
			channelWidth,
			nextCornerIbWidth,
			obWidth,
			appId
		);
		corner.cornerInboundWidth = nextCornerIbWidth;
	},

	updateCornerObWidth: (corner, nextCornerObWidth, language = 1) => {
		verifyCornerNumber(nextCornerObWidth);

		const cornerType = corner.cornerType;
		const channelWidth = corner.channelWidth;
		const ibWidth = corner.cornerInboundWidth;
		const appId = corner.approach.appId;
		verifyCornerWidthConflicts(
			cornerType,
			channelWidth,
			ibWidth,
			nextCornerObWidth,
			appId
		);
		corner.cornerOutboundWidth = nextCornerObWidth;
	},

	updateCornerChannelWidth: (corner, nextCornerChannelWidth, language = 1) => {
		verifyCornerNumber(nextCornerChannelWidth);

		const cornerType = corner.cornerType;
		const ibWidth = corner.cornerInboundWidth;
		const obWidth = corner.cornerOutboundWidth;
		const appId = corner.approach.appId;
		verifyCornerWidthConflicts(
			cornerType,
			nextCornerChannelWidth,
			ibWidth,
			obWidth,
			appId
		);
		corner.channelWidth = nextCornerChannelWidth;
	},

	updateCornerCrosswalkWidth: (corner, nextCornerCrosswalkWidth, language = 1) => {
		//TBD...
	},

};


export default updateCornerGeo;
