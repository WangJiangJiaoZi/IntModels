
import SharedGeometryLib from "../../../../SharedGeometryLib";
import sharedErrors from "../../../../SharedErrors/SharedErrors";


class GetLaneLevelGeo {
	constructor (intModel, getAppLevelGeo) {
		this.intModel = intModel;
		this.getAppLevelGeo = getAppLevelGeo;

		this.getLaneArrowLaneOptions = this.getLaneArrowLaneOptions.bind(this);
	}

	//get a lane feature except laneMov
	getLaneFeature(lane, featureName, language = 1) {
		let ifError = false;
		let featureValue;
		switch (featureName) {
			case "laneIndex":
				featureValue = lane.laneIndex;
				break;
			case "laneId":
				featureValue = lane.laneId;
				break;
			case "whiteLinelength":
				featureValue = lane.whiteLinelength;
				break;
			case "laneLength":
				featureValue = lane.laneLength;
				break;
			case "laneWidth":
				featureValue = lane.laneWidth;
				break;
			case "laneSpeedLimit":
				featureValue = lane.laneSpeedLimit;
				break;
			case "laneText":
				featureValue = lane.laneText;
				break;
			case "waitingLength":
				featureValue = lane.waitingLength;
				break;
			case "laneLineColor":
				featureValue = lane.laneLineColor;
				break;
			default:
				ifError = true;
		}

		if (ifError) {
			let message;
			const modelOwner = "Lane";
			if (language === 1) {
				message = "Cannot get feature '" + featureName + "' of the lane. The featureName provided is invalid.";
			}
			else {
				message = "无法获取车道属性‘" + featureName + "’。 车道没有该属性。";
			}
			const singleValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleValueError;
		}

		return featureValue;
	}



	getLaneArrowType(lane, language = 1) {
		const arrowType = (lane.laneGeo.arrowType) ? lane.laneGeo.arrowType : null;
		return arrowType;
	}


	getLaneMovArray(lane, language = 1) {
		const movArray = lane.laneMov;
		return movArray;
	}

	/*************************************************************************
		Would get arrow-toLane options for the current lane. Variable to return
		would be an array of objects of the following kind:
			{
				singleArrowType: Number (indicating an single arrow type option),
				curTypeCount: Number (indicating the counts of the current single arrow type seen already)
				ifSelected: Boolean,
				toAppIndex: Number,
				toLanesArray: Array of toLane index,
				selectedToLane: Number
			}

		Return:
			An array of the object of the kind above.
	**************************************************************************/
	getLaneArrowLaneOptions(lane, language = 1) {
		const curLaneGG = lane.laneGroup.laneGG;
		const curApp = curLaneGG.approach;
		const curAppCenterEp = curApp.appGeo.centerEndPoint; //[x, y],
		const approaches = curLaneGG.approach.intersection.approaches;

		const curLaneMov = lane.laneMov;

		let options = [];
		let prevType = null;
		let curTypeCount = 0;

		//traverse approaches and get all types:
		approaches.forEach((oneApp) => {
			//Decide oneToAppId:
			const oneToAppIndex = oneApp.appId;  //acutally an index

			//Decide if necessary to process current oneApp:
			const oneToLaneGG = oneApp.laneGG;
			const oneToObLaneGroup = oneToLaneGG.laneGroups.find((oneLaneGroup) => {
				return oneLaneGroup.bound === "outbound";
			});

			let oneAppToLanesCount = 0;
			if (oneToObLaneGroup) {
				oneAppToLanesCount = (oneToObLaneGroup.lanes) ? (oneToObLaneGroup.lanes.length) : 0;
			}



			//one way approach with no output lanes needs to precessing:
			if (oneAppToLanesCount > 0) {
				const oneAppCenterEp = oneApp.appGeo.centerEndPoint; //[x, y],

				const curAppVec = new lane.THREE.Vector3(
									curAppCenterEp[0], curAppCenterEp[1], 0
								);
				const toAppVec = new lane.THREE.Vector3(
									oneAppCenterEp[0], oneAppCenterEp[1], 0
								);

				const getCcwAngleBtwVec = new SharedGeometryLib(lane.THREE).getCcwAngleBtwTwoVectors;

				const btwAngle = getCcwAngleBtwVec(curAppVec, toAppVec);  //in radians

				//Decide oneType (initial arrow type):
				let oneType = 0;

				if (btwAngle >= Math.PI * 0.125 && btwAngle < Math.PI * 0.375) {
					oneType = 7;
				}
				else if (btwAngle >= Math.PI * 0.375 && btwAngle < Math.PI * 0.625) {
					oneType = 6;
				}
				else if (btwAngle >= Math.PI * 0.625 && btwAngle < Math.PI * 0.875) {
					oneType = 5;
				}
				else if (btwAngle >= Math.PI * 0.875 && btwAngle < Math.PI * 1.125) {
					oneType = 1;
				}
				else if (btwAngle >= Math.PI * 1.125 && btwAngle < Math.PI * 1.375) {
					oneType = 4;
				}
				else if (btwAngle >= Math.PI * 1.375 && btwAngle < Math.PI * 1.625) {
					oneType = 3;
				}
				else if (btwAngle >= Math.PI * 1.625 && btwAngle < Math.PI * 1.875) {
					oneType = 2;
				}
				else {
					oneType = 8;
				}

				//Decide curTypeCount:
				curTypeCount = (prevType === oneType) ? (curTypeCount + 1) : 1;
				prevType = oneType;

				//Decide toLanesArray:
				const oneToLanesArray = [];
				for (let i = 0; i < oneAppToLanesCount; i++) {
					oneToLanesArray.push(i);
				}

				//Decide selectedToLane:
				let oneSelectedToLane = null;
				oneToLanesArray.forEach((oneToLane) => {
					if (curLaneMov.indexOf(oneToAppIndex + "-" + oneToLane) > -1) {
						oneSelectedToLane = oneToLane;
					}
				});

				//Decide ifSelected:
				const ifSelected = (oneSelectedToLane !== null) ? true : false;

				//Decide on option:
				const oneOption = {
					singleArrowType: oneType,
					ifSelected: ifSelected,
					curTypeCount: curTypeCount,
					toAppIndex: oneToAppIndex,
					toLanesArray: oneToLanesArray,
					selectedToLane: oneSelectedToLane
				};
				options.push(oneOption);
			}


		});


		/*
		//only get unique values:
		typesOptions = typesOptions.filter((oneType, oneTypeIndex, typesArray) => {
			return typesArray.indexOf(oneType) === oneTypeIndex;
		});
		*/

		//sort from low to high:
		options.sort((curOption, nextOption) => {
			return (curOption.singleArrowType - nextOption.singleArrowType);
		});


		return options;
	}


}


export default GetLaneLevelGeo;
