
import sharedErrors from "../../../SharedErrors/SharedErrors";

const updateText = {
	updateTextFeature: (text, textName, featureName, featureValue, language = 1) => {
		//if textName is "appName", update appName feature:
		if (textName === "appName") {
			const appName = text.appName;
			const updateAppName = appName.appNameControllers.updateAppName;

			updateAppName(featureName, featureValue, language);
		}
		//else, dirName:
		else if (textName === "dirName") {
			const dirName = text.dirName;
			const updateDirName = dirName.dirNameControllers.updateDirName;

			updateDirName(featureName, featureValue, language);
		}
		else {
			const modelOwner = "Text";
			let message;
			if (language === 1) {
				message = "Invalid textName to update. It should be either 'appName' or 'dirName'";
			}
			else {
				message = "无效的textName可更改。textName只能是'appName'或者'dirName'。";
			}
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}
	}
};

export default updateText;
