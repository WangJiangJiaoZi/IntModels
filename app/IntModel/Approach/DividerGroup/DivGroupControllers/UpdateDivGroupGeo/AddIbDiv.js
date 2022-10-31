
import sharedErrors from "../../../../SharedErrors/SharedErrors";
import Divider from "../../Divider/Divider";
import verifyDivGeo from "../../Divider/DividerControllers/VerifyDivGeo/VerifyDivGeo";

const addIbDiv = (divGroup, type, color, offset, startWidth, capRadius, language = 1) => {
	//check if there is an inbound divider already:
	let ifAlreadyExists = false;
	divGroup.dividers.forEach((oneDiv) => {
		ifAlreadyExists = (oneDiv.dividerType === 1) ? true : false;
		if (ifAlreadyExists) {
			const modelOwner = "DividerGroup";
			let message;
			if (language === 1) {
				message = "Cannot add a new inbound divider "
						+ "when updating dividerGroup geometry. There has been an"
						+ " existing one.";
			}
			else {
				message = "无法添加新的进口方向隔离带，因为该隔离带已经存在了。";
			}

			const singleConflictError = new sharedErrors.SingleConflictError(modelOwner, message);
			throw singleConflictError;
		}
	});

	//create a new inbound divider:
	const ibDivGeo = {
		dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
		type: type, //1 for white dash, 2 for white solid, 3.......
		dividerId: null,  //newly created divider has no divider id
		color: color,
		offset: offset, //meters
		storageLength: 0, //meters
		storageSlipLength: 0, //meters
		storageWidth: 0, //meters
		startWidth: startWidth, //meters
		capRadius: capRadius,  //meters
	};

	//created new divider, verify geo, inject geo and push it to divGroup.dividers:
	const ibDivider = new Divider(divGroup, divGroup.THREE);
	const appId = divGroup.approach.appId;
	verifyDivGeo(ibDivGeo, appId);
	ibDivider.dividerControllers.injectDivGeo(ibDivider, ibDivGeo);

	divGroup.dividers.push(ibDivider);
};


export default addIbDiv;
