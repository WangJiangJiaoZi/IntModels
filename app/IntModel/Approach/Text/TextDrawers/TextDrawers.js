

class TextDrawers {
	constructor(text) {
		this.text = text;
	}

	drawText(scene, clickableObjs) {
		this.drawTextRoadName(scene, clickableObjs);
		this.drawTextDirName(scene, clickableObjs);
	}

	drawTextRoadName(scene, clickableObjs) {
		const envSetters = this.text.approach.intersection.intModel.envSetters;

		const textFont = envSetters.textFont;  //"Arial"
		const intersection = this.text.approach.intersection;
		const textColor = intersection.textColor;
		//if intersection.backgroundColor is available, use it. If not, use initial setting:
		const backgroundColor = (intersection.backgroundColor) ? intersection.backgroundColor : envSetters.backgroundColor;

		// ******************** Draw appName ********************
		const appName = this.text.appName;

		appName.appNameDrawers.drawAppName(
			scene,
			clickableObjs,
			textFont,
			textColor,
			backgroundColor
		);
	}

	drawTextDirName(scene, clickableObjs) {
		const envSetters = this.text.approach.intersection.intModel.envSetters;

		const textFont = envSetters.textFont;  //"Arial"
		const intersection = this.text.approach.intersection;
		const textColor = intersection.textColor;
		//if intersection.backgroundColor is available, use it. If not, use initial setting:
		const backgroundColor = (intersection.backgroundColor) ? intersection.backgroundColor : envSetters.backgroundColor;

		// ******************** Draw dirName ********************
		/*
		const dirName =  this.text.dirName;
		dirName.dirNameDrawers.drawDirName(
			scene,
			clickableObjs,
			textFont,
			textColor,
			backgroundColor
		);
		*/
	}

	undrawTextRdName(scene, clickableObjs) {
		const appName = this.text.appName;
		appName.appNameDrawers.undrawAppName(scene, clickableObjs);
	}

	undrawTextDirName(scene, clickableObjs) {
		const dirName =  this.text.dirName;
		dirName.dirNameDrawers.undrawDirName(scene, clickableObjs);
	}
}

export default TextDrawers;
