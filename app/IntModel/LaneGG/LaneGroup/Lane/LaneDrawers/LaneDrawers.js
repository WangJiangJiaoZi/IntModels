
import drawLaneLine from "./LaneGeoDrawers/DrawLaneLine";
import drawLaneArrow from "./LaneGeoDrawers/DrawLaneArrow";
import drawLaneArrowColor from "./LaneGeoDrawers/DrawLaneArrowColor";
import drawLaneWaitingArea from "./LaneGeoDrawers/DrawLaneWaitingArea";

import drawLaneConnectPoint from "./LaneGeoDrawers/DrawLaneConnectPoint";
import undrawLaneConnectPoint from "./LaneGeoDrawers/UndrawLaneConnectPoint";

class LaneDrawers {
	constructor(lane) {
		this.lane = lane;

		this.drawLaneConnectPoint = drawLaneConnectPoint.bind(null, lane);
		this.undrawLaneConnectPoint = undrawLaneConnectPoint.bind(null, lane);
		this.drawLaneArrowColor = drawLaneArrowColor.bind(null, lane);
	}


	/**********************************************************************
		Draw lane geometry:
			1. Draw lane line (solid and dash).
			2. Draw lane arrow.
			3. Draw lane text.
			4. Draw lane waiting area.

		Note:
			"type" refers to "int" or "roundabout"
	**********************************************************************/
	drawLaneGeo(scene, clickableObjs, type, meterToPix, bound, roadDepth, options) {
		const lane = this.lane;
		const envSetters = lane.laneGroup.laneGG.approach.intersection.intModel.envSetters;
		const roadMarkHeight = envSetters.roadMarkHeight  * meterToPix;  //in pixel
		const color = lane.laneLineColor;

		const roadMarkExtSettings = {depth: (roadMarkHeight + roadDepth), bevelEnabled: false};
		const laneLineMaterial = new lane.THREE.MeshLambertMaterial({color: color});

		const laneIndex = lane.laneIndex;
		const laneGroupIndex = lane.laneGroup.laneGroupIndex;
		let ifNeed = true;


		if (options.ifDrawLineAndDiv) {
			// ******************** Draw lane line ********************
			//only need to draw line if the lane is the inner lane:
			if (bound === "inbound" && laneGroupIndex === 0 && laneIndex === 0) {
				ifNeed = false;
			}
			else if (bound === "outbound" && laneIndex === 0) {
				ifNeed = false;
			}

			if (ifNeed) {
				drawLaneLine(lane, scene, clickableObjs, roadMarkExtSettings, laneLineMaterial, bound);
			}

			// ******************** Draw lane waiting area ********************
			const waitingLength = lane.waitingLength;  //in meters
			//only draw waiting area when it is main inbound lane and its waiting length > 0
			if (waitingLength > 0 && bound === "inbound") {
				drawLaneWaitingArea(lane, scene, clickableObjs, roadMarkExtSettings, laneLineMaterial);
			}
		}



		// ******************** Draw lane arrow ********************
		if (options.ifDrawArrow) {
			const roadHeight = envSetters.roadHeight;  //in meters
			const arrowTranslateZ = (options.ifDrawThick) ? (roadDepth - 10 * roadHeight * roadMarkHeight) : 0;
			//only need to draw lane arrow for main lanes:
			if (bound === "inbound" || bound === "outbound") {
				drawLaneArrow(lane, arrowTranslateZ, roadMarkHeight, scene, clickableObjs, roadMarkExtSettings, laneLineMaterial);
			}
		}



		// ******************** Draw lane text ********************
		//TBD ...



		laneLineMaterial.dispose();
	}
}






export default LaneDrawers;
