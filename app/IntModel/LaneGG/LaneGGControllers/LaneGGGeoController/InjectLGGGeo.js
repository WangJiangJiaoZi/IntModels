
import LaneGroup from "../../LaneGroup/LaneGroup";


const injectLGGGeo = (oneLGG, oneLGGGeoData) => {
	oneLGGGeoData.forEach((oneLaneGroupGeoData, index) => {
		const oneLaneGroup = new LaneGroup(oneLGG, oneLGG.THREE);
		oneLGG.laneGroups.push(oneLaneGroup);
		oneLaneGroup.laneGroupControllers.laneGroupGeoController.injectLaneGroupGeo(oneLaneGroup, oneLaneGroupGeoData, index);

		oneLGG.laneGGShape = {};

		oneLGG.laneGGGeo = {};
	});
};


export default injectLGGGeo;
