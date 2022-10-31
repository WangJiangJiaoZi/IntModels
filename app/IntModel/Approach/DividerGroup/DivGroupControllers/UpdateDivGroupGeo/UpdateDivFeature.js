
import sharedErrors from "../../../../SharedErrors/SharedErrors";


const updateDivFeature = (divGroup, dividerType, featureName, featureValue, language = 1) => {
	//find divider by dividerType (1, 2, or 3):
	let divIndex = -1;
	divGroup.dividers.forEach((oneDiv, index) => {
		const oneDivDividerType = oneDiv.dividerType;   //1 for "inbound" / 2 for "outbound" / 3 for "center"
		if (oneDivDividerType === dividerType) {
			divIndex = index;
		}
	});
	const modelOwner = "DividerGroup";


	//if no divider found, throw an error:
	if (divIndex < 0) {
		let message;
		if (language === 1) {
			const bound = (dividerType === 1) ? "inbound" : ((dividerType === 2) ? "outbound" : "center");
			message = "Cannot update " + bound + " divider "
				+ "when updating dividerGroup geometry. There is no an inbound divider.";
		}
		else {
			const bound = (dividerType === 1) ? "进口方向" : ((dividerType === 2) ? "出口方向" : "中央");
			message = "无法更改" + bound + "的隔离带，因为不存在此隔离带。";
		}
		const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
		throw singleConflictError;
	}

	//get the divider to update:
	const dividerToUpdate = divGroup.dividers[divIndex];
	const updateDivGeo = dividerToUpdate.dividerControllers.updateDivGeo;

	//ask divider to update its feature:
	switch (featureName) {
		case "type":
			updateDivGeo.updateDivType(dividerToUpdate, featureValue, language);
			break;
		case "color":
			updateDivGeo.updateDivColor(dividerToUpdate, featureValue, language);
			break;
		case "offset":
			updateDivGeo.updateDivOffset(dividerToUpdate, featureValue, language);
			break;
		case "startWidth":
			updateDivGeo.updateDivStartWidth(dividerToUpdate, featureValue, language);
			break;
		case "capRadius":
			updateDivGeo.updateDivCapRadius(dividerToUpdate, featureValue, language);
			break;
		case "storageLen":
			updateDivGeo.updateDivStorageLen(dividerToUpdate, featureValue, language);
			break;
		case "storageWidth":
			updateDivGeo.updateDivStorageWidth(dividerToUpdate, featureValue, language);
			break;
		case "storageSlipLen":
			updateDivGeo.updateDivStorageSlipLen(dividerToUpdate, featureValue, language);
			break;
		default:
			if (language === 1) {
				const message = "Cannot update divider feature: " + featureName +
					". No such feature exists.";
				const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
				throw singleValueError;
			}
			else {
				const message = "无法更新隔离带参数: " + featureName +
					". 因为隔离带没有这个参数.";
				const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
				throw singleValueError;
			}

	}
};


export default updateDivFeature;
