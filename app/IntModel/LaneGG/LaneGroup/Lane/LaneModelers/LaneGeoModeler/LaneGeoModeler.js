
import modelLaneGeo from "./ModelLaneGeo";
import modelSideLaneGeo from "./ModelSideLaneGeo";
import modelLaneWaitingAreaGeo from "./ModelLaneWaitingAreaGeo";
import modelLaneIfConnectPointGeo from "./ModelLaneIfConnectPointGeo";

class LaneGeoModeler {
	constructor(lane) {
		this.lane = lane;

		this.modelLaneGeo = modelLaneGeo;
		this.modelSideLaneGeo = modelSideLaneGeo;
		this.modelLaneWaitingAreaGeo = modelLaneWaitingAreaGeo;
		this.modelLaneIfConnectPointGeo = modelLaneIfConnectPointGeo;
	}
}


export default LaneGeoModeler;
