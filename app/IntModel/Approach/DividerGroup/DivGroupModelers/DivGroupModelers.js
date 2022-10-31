import modelDivGroupWidth from "./Modelers/ModelDivGroupWidth";


class DivGroupModelers {
	constructor(divGroup) {
		this.divGroup = divGroup;
	}


	modelDivGroupGeo(dividerGroup, intSize, type, meterToPixel, accuracy) {

		//*********** Model dividers geometry ***********
		const dividers = dividerGroup.dividers; //an array of dividers

		dividers.forEach((oneDiv) => {
			oneDiv.dividerModelers.modelDividerGeo(
				oneDiv, intSize, type, meterToPixel, accuracy
			);
		});
	}

	modelDivGroupGeoForApp(dividerGroup, intSize, meterToPixel, accuracy) {
		//would model divider group width in meters
		modelDivGroupWidth(dividerGroup, intSize, meterToPixel, accuracy);
	}
}


export default DivGroupModelers;
