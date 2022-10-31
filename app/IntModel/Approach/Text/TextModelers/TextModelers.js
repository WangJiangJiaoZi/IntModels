

class TextModelers {
	constructor(text) {
		this.text = text;
	}

	/************************************************************
		Model Text Geometry:
			1. Would ask appName to model itself.
			2. Would ask dirName to model itself.


		Inputs:
			1. one text object
			2. intSize in pixel
	*************************************************************/
	modelText(intSize, meterToPixel, accuracy) {
		// ***************** Model appName *****************
		const appName = this.text.appName;
		appName.appNameModelers.modelAppNameGeo(intSize, meterToPixel);


		// ***************** Model dirName *****************
		const dirName = this.text.dirName;
		dirName.dirNameModelers.modelDirNameGeo(intSize, meterToPixel);
	}


}

export default TextModelers;
