import Divider from "../../Divider/Divider";


const injectDivGroupGeo = (oneDivGroup, oneDivGroupGeoData) => {
	oneDivGroup.dividers = [];
	oneDivGroup.divGroupGeo = {};

	oneDivGroupGeoData.forEach((oneDivGeoData) => {
		const oneDivider = new Divider(oneDivGroup, oneDivGroup.THREE);
		oneDivider.dividerControllers.injectDivGeo(oneDivider, oneDivGeoData);
		oneDivGroup.dividers.push(oneDivider);
	});
};

export default injectDivGroupGeo;
