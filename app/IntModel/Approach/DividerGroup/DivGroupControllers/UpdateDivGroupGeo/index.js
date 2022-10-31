


import addIbDiv from "./AddIbDiv";
import removeIbDiv from "./RemoveIbDiv";
import addObDiv from "./AddObDiv";
import removeObDiv from "./RemoveObDiv";
import addCenterDiv from "./AddCenterDiv";
import removeCenterDiv from "./RemoveCenterDiv";
import updateDivFeature from "./UpdateDivFeature";

const updateDivGroupGeo = {

	addIbDiv: addIbDiv,

	removeIbDiv: removeIbDiv,

	addObDiv: addObDiv,

	removeObDiv: removeObDiv,

	addCenterDiv: addCenterDiv,

	removeCenterDiv: removeCenterDiv,

	updateDivGeo: (divGroup, dividerType, featureName, featureValue, language = 1) => {
		updateDivFeature(divGroup, dividerType, featureName, featureValue, language);
	},

};


/*
	dividerType: 1, //1 for "inbound" / 2 for "outbound" / 3 for "center"
	type: 2, //1 for white dash, 2 for white solid, 3.......
	color: "#FFFFFF",
	offset: 0, //meters
	storageLength: 0, //meters
	storageSlipLength: 0, //meters
	storageWidth: 0, //meters
	startWidth: 0.3, //meters
	capRadius: null,  //meters


*/

export default updateDivGroupGeo;
