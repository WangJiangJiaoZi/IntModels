
import sharedErrors from "../../../../../../SharedErrors/SharedErrors";

const verifyDivConflict = (divBound, storageLength, storageSlipLength, appId, language = 1) => {
	/*
	const SingleConflictError = sharedErrors.SingleValueError;
	const modelOwner = "Divider";

	const intRadius = initSettings.sharedInitSettings.intDiameter / 2;
	if (divBound === 3) {
		if (storageLength + storageSlipLength >= intRadius) {
			let message;
			if (language === 1) {
				message = "invalid center divider storageLength and storageSlipLength in approach " +
					appId + ". Their sum should not be bigger than int radius.";
			}
			else {
				message = "道路编号" + appId + "中的隔离带参数'storageLength'和'storageSlipLength'无效。" +
					"这两个参数的和不能大于路口的半径。";
			}

			const oneSingleConflictError = new SingleConflictError(modelOwner, message);
			throw oneSingleConflictError;
		}
	}
	*/
};


export default verifyDivConflict;
