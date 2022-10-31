
//import modelAppOuterStartPoints from "./Modelers/ModelAppOuterStartPoints";
import modelAppInnerEndPoints from "./Modelers/ModelAppInnerEndPoints";
import modelAppInnerSides from "./Modelers/ModelAppInnerSides";
import modelAppCurves from "./Modelers/ModelAppCurves";

/************************************************************
	Model Approach Geometry:
		1. Would model approach itself.
		2. Would ask crosswalk to model itself.
		3. Would ask laneGG to model itself.
		4. Would ask dividerGroup to model itself.
		5. Would ask text to model itself.

	Inputs:
		1. one approach object
		2. intSize in pixel
		3. type: "int" or "roundabout"
*************************************************************/
const modelAppGeo = (approach, intSize, type, meterToPixel, accuracy) => {

	//**************** Model approach itself (the order is critical) *******************
	//model approach inner sides end points
	modelAppInnerEndPoints(approach, intSize, meterToPixel);

	//model approach inner sides (a and b)
	modelAppInnerSides(approach, meterToPixel);

	//model approach curves (the shape of the approach)
	modelAppCurves(approach, intSize, type, meterToPixel, accuracy);


	//******************************* Model crosswalk ***********************************
	const crosswalk = approach.crosswalk;
	crosswalk.crosswalkModelers.crosswalkGeoModeler.modelCrosswalkGeo(
		crosswalk, intSize, type, meterToPixel, accuracy
	);

	/*	*/
	//******************************* Model laneGG ***********************************
	const laneGG = approach.laneGG;
	laneGG.laneGGModelers.laneGGGeoModeler.modelLaneGGGeo(
		laneGG, intSize, type, meterToPixel, accuracy
	);


	//******************************* Model divider group ***********************************
	const divGroup = approach.dividerGroup;
	divGroup.divGroupModelers.modelDivGroupGeo(divGroup, intSize, type, meterToPixel, accuracy);


	//******************************* Model text ***********************************
	const text = approach.text;
	text.textModelers.modelText(intSize, meterToPixel, accuracy);


	// ************************** Model lanes' connect point **************************
	//Got to model lane's connect point at approach level since telling if a connect point
	//exists would require divider's geometry points
	laneGG.laneGroups.forEach((oneLaneGroup) => {
		const lanes = oneLaneGroup.lanes;
		lanes.forEach((oneLane) => {
			oneLane.laneModelers.laneGeoModeler.modelLaneIfConnectPointGeo(oneLane, meterToPixel);
		});
	});



};


export default modelAppGeo;
