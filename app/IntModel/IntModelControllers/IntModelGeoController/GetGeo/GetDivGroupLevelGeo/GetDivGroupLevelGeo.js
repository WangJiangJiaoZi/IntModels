
import sharedErrors from "../../../../SharedErrors/SharedErrors";
import GetDividerLevelGeo from "./GetDividerLevelGeo";

class GetDivGroupLevelGeo {
	constructor (intModel, getAppLevelGeo) {
		this.intModel = intModel;
		this.getAppLevelGeo = getAppLevelGeo;

		this.getDividerLevelGeo = new GetDividerLevelGeo();
	}


	getDivGroupByAppIndex(appIndex, language = 1) {
		try {
			const curApp = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);
			const divGroupToGet = curApp.dividerGroup;
			return divGroupToGet;
		}
		catch (error) {
			throw error;
		}
	}


	/*
		Would get divider by appIndex and divBound (1, 2, or 3).
		If no divider meets the requirement, return null.
	*/
	getDivByAppIndexAndDivBound(appIndex, divBound, language = 1) {
		try {
			const curApp = this.getAppLevelGeo.getApproachByAppIndex(appIndex, language);

			const reg = /^(1|2|3)$/;  //can only be 1, 2, or 3
			if (!reg.test(divBound)) {
				const modelOwner = "Divider";
				let message;
				if (language === 1) {
					message = "Can't get divider with the divBound provided. DivBound can only " +
						"be 1, 2, or 3.";
				}
				else {
					message = "无法依据提供的divBound找到divider。DivBound只能是数字1，2，或3。";
				}
				const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
				throw singleConflictError;
			}

			const divGroup = curApp.dividerGroup;
			let divToGet = null;
			divGroup.dividers.forEach((oneDiv) => {
				if (oneDiv.dividerType === divBound) {
					divToGet = oneDiv;
				}
			});
			return divToGet;
		}
		catch (error) {
			throw error;
		}
	}
}


export default GetDivGroupLevelGeo;
