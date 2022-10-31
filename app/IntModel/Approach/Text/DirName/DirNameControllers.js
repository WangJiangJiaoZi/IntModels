
import sharedErrors from "../../../SharedErrors/SharedErrors";


class DirNameControllers {
	constructor(dirName) {
		this.dirName = dirName;

		this.injectDirName = this.injectDirName.bind(this);
		this.updateDirName = this.updateDirName.bind(this);
		this.exportDirName = this.exportDirName.bind(this);
	}

	injectDirName(oneDirNameData) {
		this.dirName.name = oneDirNameData;  //it is simply an int already...

		this.dirName.dirNameShape = {};
		this.dirName.dirNameGeo = {};
	}

	updateDirName(featureName, featureValue, language = 1) {
		let message;
		const modelOwner = "DirName";

		//for now, the featureName is useless. Only dirName.name is updatable....
		switch (featureName) {
			case "name":
				this.dirName.name = featureValue;
				break;
			case "color":
				console.log("updating dirName color is not available for now...");
				break;
			case "size":
				console.log("updating dirName size is not available for now...");
				break;
			default:
				if (language === 1) {
					message = "Invalid featueName for dirName to update.";
				}
				else {
					message = "无效的featureName，无法更改dirName的该属性。";
				}
		}

		if (message) {
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}
	}

	exportDirName() {

	}
}


export default DirNameControllers;
