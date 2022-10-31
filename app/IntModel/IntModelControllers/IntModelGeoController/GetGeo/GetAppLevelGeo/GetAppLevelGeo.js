
import sharedErrors from "../../../../SharedErrors/SharedErrors";
//import GetDivGroupLevelGeo from "./GetDivGroupLevelGeo/GetDivGroupLevelGeo";

class GetAppLevelGeo {
	constructor(intModel, getIntLevelGeo) {
		this.intModel = intModel;
		this.getIntLevelGeo = getIntLevelGeo;

		this.getApproachByAppIndex = this.getApproachByAppIndex.bind(this);
	}

	getApproachByAppIndex(appIndex, language = 1) {
		const approaches = this.intModel.intersection.approaches;
		try {
			const appToGet = approaches[appIndex];
			return appToGet;
		}
		catch (error) {
			const modelOwner = "Intersection";
			let message;
			if (language === 1) {
				message = "Cannot get approach by the appIndex provided. Either the model has not " +
					"received any geometry info yet or the index is out of range.";
			}
			else {
				message = "无法根据提供的appIndex取得approach. 原因可能是模型尚未初始化路口几何信息或者appIndex超过了" +
					"路口的道路数量。";
			}
			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}
	}

	getAppGeo(appIndex, featureName, language = 1) {
		const curApp = this.getApproachByAppIndex(appIndex, language);

		const curAppGeo = curApp.appGeo;
		if (featureName in curAppGeo) {
			const geoFeature = curAppGeo[featureName];

			return geoFeature;
		}
		else {
			let message;
			const modelOwner = "Approach";
			if (language === 1) {
				message = "Invalid featureName when getting app geometry info. Valid keys are " +
					"outerSides, outerLeftEndPoint, outerRightEndPoint, centerEndPoint, outerRightSp, " +
					"outerLeftSp, innerRightEp, innerLeftEp, innerSides, rightSideCps, leftSideCps.";
			}
			else {
				message = "获取道路几何信息的featureName无效。featureName应是如下值之一：" +
					"outerSides, outerLeftEndPoint, outerRightEndPoint, centerEndPoint, outerRightSp, " +
					"outerLeftSp, innerRightEp, innerLeftEp, innerSides, rightSideCps, leftSideCps。";
			}
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}
	}

	getAppAngle(appIndex, language = 1) {
		const curApp = this.getApproachByAppIndex(appIndex, language);
		const oneAppAngle = curApp.appAngle;

		return oneAppAngle;
	}

	getAllAppAngles(language = 1) {
		try {
			const approaches = this.intModel.intersection.approaches;
			const allAngles = [];
			approaches.forEach((oneApp) => {
				allAngles.push(oneApp.appAngle);
			});

			return allAngles;
		}
		catch (error) {
			throw error;
		}
	}

	getAppAngleRangeByAppIndex (appIndex, language = 1) {
		try {
			const appCounts = this.intModel.intersection.approaches.length;

			//verify appCounts:
			let message;
			const modelOwner = "Intersection";
			if (appCounts < 3) {
				if (language === 1) {
					message = "Invalid approaches counts. The intersection must have at least three approaches (legs)";
				}
				else {
					message = "道路数量有误。路口必须至少有三条道路。";
				}
				const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
				throw singleConflictError;
			}

			//get index of current approach's left and right neighbor approaches:
			let leftIndex, rightIndex;
			if (appIndex === 0) {
				rightIndex = appCounts - 1;
				leftIndex = appIndex + 1;
			}
			else if (appIndex === appCounts - 1) {
				leftIndex = 0;
				rightIndex = appIndex - 1;
			}
			else {
				rightIndex = appIndex - 1;
				leftIndex = appIndex + 1;
			}

			//get left and right neighbor angles:
			const leftApp = this.getApproachByAppIndex(leftIndex, language);
			const rightApp = this.getApproachByAppIndex(rightIndex, language);

			const leftAngle = leftApp.appAngle;
			const rightAngle = rightApp.appAngle;

			//decide the range (round to 5):
			let leftThreshold, rightThreshold;
			if (leftAngle > rightAngle) {
				leftThreshold = leftAngle - 30;
				rightThreshold = rightAngle + 30;
			}
			else {
				if (appIndex === 0) {
					leftThreshold = leftAngle - 30;
					rightThreshold = (rightAngle + 30 >= 360) ? (rightAngle - 330) : 0;
				}
				else {
					rightThreshold = rightAngle + 30;
					leftThreshold = (leftAngle - 30 <= 0) ? (leftAngle + 330) : 355;
				}
			}


			if (leftThreshold < rightThreshold) {
				//swap the two variables' value:
				leftThreshold = [rightThreshold, rightThreshold = leftThreshold][0];
			}


			leftThreshold = (leftThreshold % 5 === 0) ? leftThreshold : ((Math.floor(leftThreshold / 5) + 1) * 5);
			rightThreshold = (rightThreshold % 5 === 0) ? rightThreshold : (Math.floor(rightThreshold / 5) * 5);

			const appAngleRange = {
				startAngle: rightThreshold,
				endAngle: leftThreshold
			};

			return appAngleRange;
		}
		catch (error) {
			throw error;
		}

	}

}

export default GetAppLevelGeo;
