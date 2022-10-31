

const exportDivGroupGeoToJSON = (divGroup) => {
	const divGroupGeoData = [];

	//**************** Ask each divider to collect divider level data *****************
	const dividers = divGroup.dividers;
	dividers.forEach((oneDiv) => {
		const oneDivGeoData = oneDiv.dividerControllers.exportDivGeoToJSON(oneDiv);
		divGroupGeoData.push(oneDivGeoData);
	});

	//****************************** Return the result ********************************
	return divGroupGeoData;
};


export default exportDivGroupGeoToJSON;
