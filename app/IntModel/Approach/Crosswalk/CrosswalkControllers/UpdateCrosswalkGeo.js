
import verifyCwIfCrosswalk from "./VerifyCrosswalkGeo/Verificators/VerifyCwIfCrosswalk";
import verifyCwAngle from "./VerifyCrosswalkGeo/Verificators/VerifyCwAngle";
import verifyCwOffset from "./VerifyCrosswalkGeo/Verificators/VerifyCwOffset";
import verifyCwSize from "./VerifyCrosswalkGeo/Verificators/VerifyCwSize";

const updateCrosswlakGeo = {

	updateIfCrosswalk: (crosswalk, nextIf, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		verifyCwIfCrosswalk(nextIf, appIndex, language);

		crosswalk.ifCrosswalk = nextIf;
	},

	updateCrosswalkAngle: (crosswalk, nextAngle, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		verifyCwAngle(nextAngle, appIndex, language);

		crosswalk.crosswalkAngle = nextAngle;
	},

	//offset refers to distance between crosswalk and center polygon
	updateCrosswalkOffset: (crosswalk, nextOffset, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		verifyCwOffset(nextOffset, appIndex, language);

		crosswalk.crosswalkOffset = nextOffset;
	},

	//buffer refers to distance between crosswalk and stop bar
	updateCrosswalkBuffer: (crosswalk, nextBuffer, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		const sizeName = "crosswalkBuffer";
		verifyCwSize(nextBuffer, sizeName, appIndex, language);

		crosswalk.crosswalkBuffer = nextBuffer;
	},

	updateCrosswalkWidth: (crosswalk, nextWidth, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		const sizeName = "crosswalkWidth";
		verifyCwSize(nextWidth, sizeName, appIndex, language);

		crosswalk.crossswalkWidth = nextWidth;
	},

	updateCrosswalkHeight: (crosswalk, nextHeight, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		const sizeName = "crosswalkHeight";
		verifyCwSize(nextHeight, sizeName, appIndex, language);

		crosswalk.crosswalkHeight = nextHeight;
	},

	updateCrosswalkGap: (crosswalk, nextGap, language = 1) => {
		const appIndex = crosswalk.approach.appId;  //actually an index
		const sizeName = "crosswalkGap";
		verifyCwSize(nextGap, sizeName, appIndex, language);

		crosswalk.crosswalkGap = nextGap;
	}
};


export default updateCrosswlakGeo;
