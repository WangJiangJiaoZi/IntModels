//import SharedGeometryLib from "../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		Width of the divider group.

	Would update:
		dividerGroup.divGroupGeo.divGroupWidth = w; //in meters
		dividerGroup.divGroupGeo.ibDivWidth = xx;  //in pixel
		dividerGroup.divGroupGeo.obDivWidth = xx;  //in pixel
		dividerGroup.divGroupGeo.centerDivStartWidth = xx;  //in pixel
		dividerGroup.divGroupGeo.centerDivEndWidth = xx;    //in pixel
**************************************************************************/

const modelDivGroupWidth = (dividerGroup, intSize, meterToPixel, accuracy) => {
	//***************** Calaculate width in pixel ******************
	let ibDivWidth = 0;  //in pixel
	let obDivWidth = 0;  //in pixel
	let centerDivStartWidth = 0;  //in pixel
	let centerDivEndWidth = 0;  //in pixel
	let divGroupWidth = 0;   //in meters

	const dividers = dividerGroup.dividers;
	dividers.forEach((oneDivider) => {
		const modelDividerGeoForApp = oneDivider.dividerModelers.modelDividerGeoForApp;
		modelDividerGeoForApp(oneDivider);
		const oneDividerWidth = oneDivider.divGeo.dividerWidth;
		divGroupWidth += oneDividerWidth;

		const dividerType = oneDivider.dividerType; //1 for "inbound" / 2 for "outbound" / 3 for "center"
		if (dividerType === 1) {
			ibDivWidth += oneDividerWidth * meterToPixel;  //in pixel
		}
		else if (dividerType === 2) {
			obDivWidth += oneDividerWidth * meterToPixel;  //in pixel
		}
		else {
			centerDivStartWidth += oneDividerWidth * meterToPixel;  //in pixel
			centerDivEndWidth += (oneDividerWidth + oneDivider.storageWidth) * meterToPixel;  //in pixel
		}

	});

	//***************** Update divGroupGeo ******************
	dividerGroup.divGroupGeo.divGroupWidth = divGroupWidth;  //in meters
	dividerGroup.divGroupGeo.ibDivWidth = ibDivWidth;  //in pixel
	dividerGroup.divGroupGeo.obDivWidth = obDivWidth;  //in pixel
	dividerGroup.divGroupGeo.centerDivStartWidth = centerDivStartWidth;  //in pixel
	dividerGroup.divGroupGeo.centerDivEndWidth = centerDivEndWidth;    //in pixel
};


export default modelDivGroupWidth;
