
import sharedErrors from "../../../SharedErrors/SharedErrors";

class AppNameControllers {
	constructor(appName) {
		this.appName = appName;

		this.injectAppName = this.injectAppName.bind(this);
		this.updateAppName = this.updateAppName.bind(this);
		this.exportAppName = this.exportAppName.bind(this);
	}

	injectAppName(oneAppNameData) {
		this.appName.name = oneAppNameData;  //it is simply a string already...

		this.appName.appNameShape = {};
		this.appName.appNameGeo = {};
	}

	updateAppName(featureName, featureValue, language = 1) {
		let message;
		const modelOwner = "AppName";
		//for now, the featureName is useless. Only appName.name is updatable....
		switch (featureName) {
			case "name":
				this.appName.name = featureValue;
				break;
			case "color":
				console.log("updating appName color is not available for now...");
				break;
			case "size":
				console.log("updating appName size is not available for now...");
				break;
			default:
				if (language === 1) {
					message = "Invalid featueName for appName to update.";
				}
				else {
					message = "无效的featureName，无法更改appName的该属性。";
				}
		}

		if (message) {
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}
	}

	exportAppName() {
		return this.appName.name;
	}
}


export default AppNameControllers;
