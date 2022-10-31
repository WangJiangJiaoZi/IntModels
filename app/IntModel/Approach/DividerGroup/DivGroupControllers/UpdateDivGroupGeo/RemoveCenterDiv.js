
import sharedErrors from "../../../../SharedErrors/SharedErrors";


const removeCenterDiv = (divGroup, language = 1) => {
	//check if there is an center divider to remove:
	let indexOfDivToRemove = -1;
	divGroup.dividers.forEach((oneDiv, index) => {
		const oneDivDividerType = oneDiv.dividerType;   //1 for "inbound" / 2 for "outbound" / 3 for "center"
		if (oneDivDividerType === 3) {
			indexOfDivToRemove = index;
		}
	});

	if (indexOfDivToRemove < 0) {
		//if not exists
		const modelOwner = "DividerGroup";
		let message;
		if (language === 1) {
			message = "Cannot remove center divider "
					+ "when updating dividerGroup geometry. There is no an center divider "
					+ " to remove.";
		}
		else {
			message = "无法移除中央隔离带，因为不存在此隔离带。";
		}

		const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
		throw singleConflictError;
	}

	//update divGroupGeo to remove the inbound divider geometry:
	divGroup.dividers.splice(indexOfDivToRemove, 1);
};


export default removeCenterDiv;
