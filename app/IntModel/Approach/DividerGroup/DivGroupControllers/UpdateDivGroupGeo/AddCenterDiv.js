
import sharedErrors from "../../../../SharedErrors/SharedErrors";
import Divider from "../../Divider/Divider";
import verifyDivGeo from "../../Divider/DividerControllers/VerifyDivGeo/VerifyDivGeo";


const addCenterDiv = (divGroup, type, color, offset, storageLength, storageSlipLength, storageWidth, startWidth, capRadius, language = 1) => {
	//check if there is an center divider already:
	let ifAlreadyExists = false;
	divGroup.dividers.forEach((oneDiv) => {
		ifAlreadyExists = (oneDiv.dividerType === 3) ? true : false;
		if (ifAlreadyExists) {
			const modelOwner = "DividerGroup";
			let message;
			if (language === 1) {
				message = "Cannot add a new center divider "
						+ "when updating dividerGroup geometry. There has been an"
						+ " existing one.";
			}
			else {
				message = "无法添加新的中央隔离带，因为该隔离带已经存在了。";
			}

			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}
	});

	//check if the approach is one-way:
	const laneGG = divGroup.approach.laneGG;
	const mainIbLaneGroups = laneGG.laneGGGeo.mainIbLaneGroups;  //inbound main lane groups' index array
	const sideIbLaneGroups = laneGG.laneGGGeo.sideIbLaneGroups; //inbound side lane groups' index array
	const mainObLaneGroups = laneGG.laneGGGeo.mainObLaneGroups; //outbound main lane groups' index array
	const sideObLaneGroups = laneGG.laneGGGeo.sideObLaneGroups;  //outbound side lane groups' index array

	if (mainIbLaneGroups.length + sideIbLaneGroups.length === 0 || mainObLaneGroups.length + sideObLaneGroups.length === 0) {
		const modelOwner = "DividerGroup";
		let message;
		if (language === 1) {
			message = "Cannot add a new center divider "
					+ "when updating dividerGroup geometry. The road is one way.";
		}
		else {
			message = "无法添加新的中央隔离带，因为该条道路是单行线。";
		}

		const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
		throw singleConflictError;
	}

	//create a new inbound divider:
	const centerDivGeo = {
		dividerType: 3, //1 for "inbound" / 2 for "outbound" / 3 for "center"
		type: type, //1 for white dash, 2 for white solid, 3.......
		dividerId: null,  //newly created divider has no divider id
		color: color,
		offset: offset, //meters
		storageLength: storageLength, //meters
		storageSlipLength: storageSlipLength, //meters
		storageWidth: storageWidth, //meters
		startWidth: startWidth, //meters
		capRadius: capRadius,  //meters
	};

	//created new divider, verify geo, inject geo and push it to divGroup.dividers:
	const centerDivider = new Divider(divGroup, divGroup.THREE);
	const appId = divGroup.approach.appId;
	verifyDivGeo(centerDivGeo, appId);
	centerDivider.dividerControllers.injectDivGeo(centerDivider, centerDivGeo);

	divGroup.dividers.push(centerDivider);
};


export default addCenterDiv;
