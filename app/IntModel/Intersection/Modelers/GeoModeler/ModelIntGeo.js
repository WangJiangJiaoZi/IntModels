
import modelCenterPoly from "./Modelers/ModelCenterPoly";
import modelHeight from "./Modelers/ModelHeight";



/************************************************************
	Model Intersection Geometry:
		1. Would model intersection center polygon.
		2. Would model intersection north arrow
		3. Would ask approach.corner to model themselves.
		4. Would ask approaches to model themselves.
		5. Would ask lanes to model their waiting areas.
*************************************************************/
const modelIntGeo = (intersection, intSize, meterToPixel, accuracy) => {

	//******************************************************************
					//Model intersection center polygon
	//******************************************************************
	//ask approaches to prepare parameters for int center polygon:
	intersection.approaches.forEach((oneApp) => {
		//model App OuterSides And EndPoints
		const modelGeoForInt = oneApp.appModelers.appGeoModeler.modelGeoForInt;
		modelGeoForInt(oneApp, intSize, meterToPixel, accuracy);
	});

	//would update:
	//	intersection.intShape.centerPoly
	//	intersection.intGeo.initCenterPoly
	modelCenterPoly(intersection, intSize, meterToPixel, accuracy);
	//would update:
	//	intersection.intGeo.height
	modelHeight(intersection, meterToPixel, accuracy);

	//******************************************************************
							//Model north arrow
	//******************************************************************
	//ask northArrow to model itself (actually just its center point)
	const northArrow = intersection.northArrow;
	northArrow.northArrowModeler.modelNorthArrowGeo(northArrow, intSize, meterToPixel);


	//******************************************************************
							//Model corners
	//******************************************************************
	//ask approaches to prepare parameters for corners:
	intersection.approaches.forEach((oneApp) => {
		oneApp.appModelers.appGeoModeler.modelGeoForCorner(oneApp, intSize, "int", meterToPixel, accuracy);
	});

	//Got to model corners at intersection level since every corner is cross-approaches
	intersection.approaches.forEach((oneApp) => {
		const corner = oneApp.corner;
		corner.cornerModelers.modelIntCornerGeo(oneApp, corner, intSize, meterToPixel, accuracy);
	});


	//******************************************************************
							//Model approaches
	//******************************************************************
	//ask approaches to model themselves:
	intersection.approaches.forEach((oneApp) => {
		oneApp.appModelers.appGeoModeler.modelAppGeo(oneApp, intSize, "int", meterToPixel, accuracy);
	});


	//******************************************************************
							//Model lanes' waiting area
	//******************************************************************
	//Got to model waiting area at intersection level since every waiting area
	//is cross-approaches. (Has to be modeled after approaches have been modeled.)
	intersection.approaches.forEach((oneApp) => {
		//find "inbound" laneGroup if any:
		const oneIbLaneGroup = oneApp.laneGG.laneGroups.find((oneLaneGroup) => {
			return (oneLaneGroup.bound === "inbound");
		});

		//********** Model lane waiting area if any ************
		if (oneIbLaneGroup) {
			oneIbLaneGroup.lanes.forEach((oneLane) => {
				if (oneLane.waitingLength > 0) {
					oneLane.laneModelers.laneGeoModeler.modelLaneWaitingAreaGeo(
						oneLane, intSize, "int", meterToPixel, accuracy
					);
				}
			});
		}

	});

};


export default modelIntGeo;
