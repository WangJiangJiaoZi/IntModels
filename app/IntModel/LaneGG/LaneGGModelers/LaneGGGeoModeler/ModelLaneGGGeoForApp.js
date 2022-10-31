
import modelLaneGGWidth from "./Modelers/ModelLaneGGWidth";

const modelLaneGGGeoForApp = (laneGG) => {

	//update width in meters of the current laneGG (sum width of all its laneGroups)
	modelLaneGGWidth(laneGG);
};



export default modelLaneGGGeoForApp;
