

class UpdateTextLevelGeo {
	constructor(intModel, modelGeo, drawGeo, getGeo) {
		this.intModel = intModel;

		this.modelGeo = modelGeo;
		this.drawGeo = drawGeo;
		this.getGeo = getGeo;
	}

	getCurTextByAppIndex(curAppIndex, language) {
		const curApp = this.getGeo.getAppLevelGeo.getApproachByAppIndex(curAppIndex, language);
		const curText = curApp.text;

		return curText;
	}

	updateTextFeature(curAppIndex, textName, featureName, featureValue, ifReDraw, language = 1) {
		//get curText:
		const curText = this.getCurTextByAppIndex(curAppIndex, language);

		const updateTextFeature = curText.textControllers.updateText.updateTextFeature;
		updateTextFeature(curText, textName, featureName, featureValue, language);

		const canvasSize = this.intModel.canvasSize;
		this.modelGeo.modelIntGeo(canvasSize);
		if (ifReDraw) {
			this.drawGeo.redrawIntGeo();
		}
	}
}

export default UpdateTextLevelGeo;
