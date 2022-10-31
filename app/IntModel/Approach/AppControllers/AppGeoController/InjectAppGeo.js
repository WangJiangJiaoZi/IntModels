import Corner from "../../Corner/Corner";
import Crosswalk from "../../Crosswalk/Crosswalk";
import DividerGroup from "../../DividerGroup/DividerGroup";
import LaneGG from "../../../LaneGG/LaneGG";
import Text from "../../Text/Text";

const injectAppGeo = (oneApp, oneAppGeoData) => {
	//basic approach geo data:

	//format appAngle to 5 degree:
	if (oneAppGeoData.appAngle > 357.5) {
		oneApp.appAngle = 359;
	}
	else if (oneAppGeoData.appAngle < 2.5) {
		oneApp.appAngle = 0;
	}
	else {
		let i, floor, ceil;
		for (i = 1; i < 72; i++) {
			floor = i * 5 - 2.5;
			ceil = i * 5 + 2.5;
			if (oneAppGeoData.appAngle > floor && oneAppGeoData.appAngle < ceil) {
				oneApp.appAngle = i * 5;
				i = 72;
			}
		}
	}

	oneApp.appRealId = oneAppGeoData.appId;
	oneApp.inboundStorageLength = oneAppGeoData.inboundStorageLength;
	oneApp.inboundSlipLength = oneAppGeoData.inboundSlipLength;
	oneApp.inboundStorageWidth = oneAppGeoData.inboundStorageWidth;
	oneApp.outboundStorageLength = oneAppGeoData.outboundStorageLength;
	oneApp.outboundSlipLength = oneAppGeoData.outboundSlipLength;
	oneApp.outboundStorageWidth = oneAppGeoData.outboundStorageWidth;
	//oneApp.appName = oneAppGeoData.appName;
	oneApp.appSpeedLimit = oneAppGeoData.appSpeedLimit;
	oneApp.appRoadClass = oneAppGeoData.appRoadClass;
	oneApp.slope = oneAppGeoData.slope;


	oneApp.appShape = {};  //would contain calculated THREE.js shape
	oneApp.appGeo = {}; //would contain calculated vertex information

	oneApp.corner = null;
	oneApp.crosswalk = null;
	oneApp.dividerGroup = null;
	oneApp.laneGG = null;
	oneApp.text = null;

	//corner geo data:
	oneApp.corner = new Corner(oneApp, oneApp.THREE);
	const cornerGeoData = oneAppGeoData.corner;
	oneApp.corner.cornerControllers.injectCornerGeo(oneApp.corner, cornerGeoData);

	//crosswalk geo data:
	oneApp.crosswalk = new Crosswalk(oneApp, oneApp.THREE);
	const crosswalkGeoData = oneAppGeoData.crosswalk;
	oneApp.crosswalk.crosswalkControllers.injectCrosswalkGeo(oneApp.crosswalk, crosswalkGeoData);

	//dividerGroup geo data:
	oneApp.dividerGroup = new DividerGroup(oneApp, oneApp.THREE);
	const dividerGroupGeoData = oneAppGeoData.dividerGroup;
	oneApp.dividerGroup.divGroupControllers.injectDivGroupGeo(oneApp.dividerGroup, dividerGroupGeoData);

	//laneGG geo data (laneGG stands for group of laneGroup, laneGG itself is an object not an array);
	oneApp.laneGG = new LaneGG(oneApp, oneApp.THREE, oneApp.errorHints);
	const laneGGGeoData = oneAppGeoData.laneGG;
	oneApp.laneGG.laneGGControllers.laneGGGeoController.injectLGGGeo(oneApp.laneGG, laneGGGeoData);

	//text data:
	oneApp.text = new Text(oneApp, oneApp.THREE);
	const textData = {
		appName: oneAppGeoData.appName,
		dirName: oneApp.appId
	};
	oneApp.text.textControllers.injectTextGeo(oneApp.text, textData);

};

export default injectAppGeo;







