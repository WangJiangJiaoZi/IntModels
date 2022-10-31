
import verifyLaneMov from "./VerifyLaneGeo/Verificators/VerifyLaneMov";
import verifyLaneLength from "./VerifyLaneGeo/Verificators/VerifyLaneLength";
import verifyLaneConflict from "./VerifyLaneGeo/Verificators/VerifyLaneConflict";
import verifyLaneWidth from "./VerifyLaneGeo/Verificators/VerifyLaneWidth";
import verifyLaneSpeedLimit from "./VerifyLaneGeo/Verificators/VerifyLaneSpeedLimit";
import verifyLaneText from "./VerifyLaneGeo/Verificators/VerifyLaneText";
import verifyLgWaitingLength from "./VerifyLaneGeo/Verificators/VerifyLaneWaitingLength";
import verifyLgLaneLineColor from "./VerifyLaneGeo/Verificators/VerifyLaneLineColor";

import sharedErrors from "../../../../SharedErrors/SharedErrors";

const updateLaneGeo = {

	updateLaneIndex: (lane, nextLaneIndex, language = 1) => {
		//should be fine without verification since it is used within the library itself
		lane.laneIndex = nextLaneIndex;
	},


	//Update laneMov array with the arrow types provided.
	//It will force the lane waiting area length to 0.
	updateIbLaneMov: (lane, nextLaneMov, language = 1) => {
		//verify nextLaneMov:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneMov(nextLaneMov, "inbound", laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.laneMov = nextLaneMov;

		//force waiting area length to 0:
		lane.waitingLength = 0;

	},




	updateLaneWhiteLinelength: (lane, nextWihteLingLength, language = 1) => {
		//verify nextWihteLingLength:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneLength(
			nextWihteLingLength, "whiteLinelength", laneIndex, laneGroupIndex, appId, language
		);

		const laneLength = lane.laneLength;
		verifyLaneConflict(laneLength, nextWihteLingLength, laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.whiteLinelength = nextWihteLingLength;
	},

	updateLaneLength: (lane, nextLaneLength, language = 1) => {
		//verify nextLaneLength:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneLength(nextLaneLength, "laneLength", laneIndex, laneGroupIndex, appId, language);

		const whiteLineLength = lane.whiteLinelength;
		verifyLaneConflict(nextLaneLength, whiteLineLength, laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.laneLength = nextLaneLength;
	},

	updateLaneWidth: (lane, nextLaneWidth, language = 1) => {
		//verify nextLaneWidth:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneWidth(nextLaneWidth, laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.laneWidth = nextLaneWidth;
	},

	updateLaneSpeedLimit: (lane, nextLaneSpeedLimit, language = 1) => {
		//verify nextLaneSpeedLimit:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneSpeedLimit(nextLaneSpeedLimit, laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.laneSpeedLimit = nextLaneSpeedLimit;
	},

	updateLaneText: (lane, nextLaneTextArray, language = 1) => {
		//verify nextLaneTextArray:
		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLaneText(nextLaneTextArray, laneIndex, laneGroupIndex, appId, language);

		//update:
		lane.laneText = nextLaneTextArray;
	},

	updateLaneWaitingLength: (lane, nextLaneWaitingLength, language = 1) => {
		//verify nextLaneWaitingLength:
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLgWaitingLength(nextLaneWaitingLength, laneGroupIndex, appId, language);

		//update:
		lane.waitingLength = nextLaneWaitingLength;
	},

	updateLaneLineColor: (lane, nextLaneLineColor, language = 1) => {
		//verify nextLaneLineColor:
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		const appId = lane.laneGroup.laneGG.approach.appId;  //acutally it's index...
		verifyLgLaneLineColor(nextLaneLineColor, appId, laneGroupIndex, language);

		//update:
		lane.laneLineColor = nextLaneLineColor;
	},


	//would dispose lane.laneConnectP's and laneArrow's geometry and material
	//and re-set the two variables
	disposeLaneMesh: (lane) => {
		if (lane.laneConnectP) {
			lane.laneConnectP.geometry.dispose();
			lane.laneConnectP.material.dispose();
			lane.laneConnectP = null;
		}
		if (lane.laneArrow) {
			lane.laneArrow.geometry.dispose();
			lane.laneArrow.material.dispose();
			lane.laneArrow = null;
		}
	}
};


export default updateLaneGeo;
