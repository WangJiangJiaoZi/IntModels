
import verifyDivType from "../VerifyDivGeo/Verificators/VerifyDivType";
import verifyDivColor from "../VerifyDivGeo/Verificators/VerifyDivColor";
import verifyDivOffset from "../VerifyDivGeo/Verificators/VerifyDivOffset";
import verifyDivSize from "../VerifyDivGeo/Verificators/VerifyDivSize";
import verifyDivConflict from "../VerifyDivGeo/Verificators/VerifyDivConflict";

import sharedErrors from "../../../../../SharedErrors/SharedErrors";

const updateDivGeo = {
	updateDivType: (divider, nextType, language) => {
		//null: none
		//1: dash line
		//2: single line
		//3: double line
		//4: left line and right dash line
		//5: left dash line and right line
		//6: wall (usually for median or hov)
		//7: sticks
		//8: grass
		//9: shadow
		const appId = divider.divGroup.approach.appId;
		verifyDivType(nextType, appId, language);
		divider.type = nextType;
	},

	updateDivColor: (divider, nextColor, language) => {
		const appId = divider.divGroup.approach.appId;
		verifyDivColor(nextColor, appId, language);
		divider.color = nextColor;
	},

	updateDivOffset: (divider, nextOffset, language) => {
		const appId = divider.divGroup.approach.appId;
		verifyDivOffset(nextOffset, appId, language);
		divider.offset = nextOffset;
	},

	updateDivStartWidth: (divider, nextStartWidth, language) => {
		const appId = divider.divGroup.approach.appId;
		const valueName = (language === 1) ? "startWidth" : "起始宽度";
		verifyDivSize(nextStartWidth, valueName, appId, language);
		divider.startWidth = nextStartWidth;
	},

	updateDivCapRadius: (divider, nextRadius, language) => {
		const appId = divider.divGroup.approach.appId;
		const valueName = (language === 1) ? "capRadius" : "拐角半径";
		verifyDivSize(nextRadius, valueName, appId, language);
		divider.capRadius = nextRadius;
	},

	updateDivStorageLen: (divider, nextStorageLen, language) => {
		const appId = divider.divGroup.approach.appId;
		//check if dividerType is center (3):
		if (divider.dividerType !== 3) {
			const modelOwner = "Divider";
			let message;
			if (language === 1) {
				message = "Cannot update storage length for the selected divider in approach " + appId +
					". Only center divider has such feature.";
			}
			else {
				message = "无法更新道路编号" + appId + "中的当前选中的隔离带参数'展宽长度'。只有中央隔离带有该参数。";
			}
			const singleConflictError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleConflictError;
		}

		//verify value and update:
		const valueName = (language === 1) ? "storageLength" : "展宽长度";
		verifyDivSize(nextStorageLen, valueName, appId, language);
		verifyDivConflict(
			divider.dividerType,
			nextStorageLen,
			divider.storageSlipLength,
			appId,
			language
		);
		divider.storageLength = nextStorageLen;
	},

	updateDivStorageWidth: (divider, nextStorageWidth, language) => {
		const appId = divider.divGroup.approach.appId;
		//check if dividerType is center (3):
		if (divider.dividerType !== 3) {
			const modelOwner = "Divider";
			let message;
			if (language === 1) {
				message = "Cannot update storage width for the selected divider in approach " + appId +
					". Only center divider has such feature.";
			}
			else {
				message = "无法更新道路编号" + appId + "中的当前选中的隔离带参数'展宽宽度'。只有中央隔离带有该参数。";
			}
			const singleConflictError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleConflictError;
		}

		//verify value and update:
		const valueName = (language === 1) ? "storageWidth" : "展宽宽度";
		verifyDivSize(nextStorageWidth, valueName, appId, language);
		divider.storageWidth = nextStorageWidth;
	},

	updateDivStorageSlipLen: (divider, nextStorageSlipLen, language) => {
		const appId = divider.divGroup.approach.appId;
		//check if dividerType is center (3):
		if (divider.dividerType !== 3) {
			const modelOwner = "Divider";
			let message;
			if (language === 1) {
				message = "Cannot update storage taper length for the selected divider in approach " + appId +
					". Only center divider has such feature.";
			}
			else {
				message = "无法更新道路编号" + appId + "中的当前选中的隔离带参数'展宽过渡段宽度'。只有中央隔离带有该参数。";
			}
			const singleConflictError = new sharedErrors.SingleValueError(modelOwner, message);
			throw singleConflictError;
		}

		//verify value and update:
		const valueName = (language === 1) ? "storageSlipLength" : "展宽宽度";
		verifyDivSize(nextStorageSlipLen, valueName, appId, language);
		verifyDivConflict(
			divider.dividerType,
			divider.storageLength,
			nextStorageSlipLen,
			appId,
			language
		);
		divider.storageSlipLength = nextStorageSlipLen;
	},

	//would dispose divider.divConnectP's goemetry and material
	//and re-set the variable
	disposeDivMesh: (divider) => {
		if (divider.divConnectP) {
			divider.divConnectP.geometry.dispose();
			divider.divConnectP.material.dispose();
			divider.divConnectP = null;
		}
	}
};


export default updateDivGeo;
