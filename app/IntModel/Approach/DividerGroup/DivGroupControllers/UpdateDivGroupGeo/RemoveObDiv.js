
import sharedErrors from "../../../../SharedErrors/SharedErrors";


const removeObDiv = (divGroup, language = 1) => {
	//check if there is an inbound divider to remove:
	let indexOfDivToRemove = -1;
	divGroup.dividers.forEach((oneDiv, index) => {
		const oneDivDividerType = oneDiv.dividerType;   //1 for "inbound" / 2 for "outbound" / 3 for "center"
		if (oneDivDividerType === 2) {
			indexOfDivToRemove = index;
		}
	});

	if (indexOfDivToRemove < 0) {
		//if not exists
		const modelOwner = "DividerGroup";
		let message;
		if (language === 1) {
			message = "Cannot remove outbound divider "
				+ "when updating dividerGroup geometry. There is no an inbound divider "
				+ " to remove.";
		}
		else {
			message = "无法移除出口方向的隔离带，因为不存在此隔离带。";
		}
		const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
		throw singleConflictError;
	}


	//update divGroupGeo to remove the inbound divider geometry:
	divGroup.dividers.splice(indexOfDivToRemove, 1);

};


export default removeObDiv;
