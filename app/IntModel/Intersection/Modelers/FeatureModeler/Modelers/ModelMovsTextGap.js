

/******************************************************************************
	Would model movements' text left and top gaps between the text and the panel.

	Would update:
		intFeatureGeo.movTextLeftGap = xxx; //gap in pixel between text and panel left side
		intFeatureGeo.movTextTopGap = xxx;  //gap in pixel between text and panel top side
		intFeatureGeo.movTextPanelHeight = xxx; //text panel height in pixel
*******************************************************************************/

const modelMovsTextGap = (intersection, intSize, meterToPixel, accuracy) => {
	// **************** parameter preparation *******************
	const envSetters = intersection.intModel.envSetters;
	const panelHeight = envSetters.movTextPanelHeight * meterToPixel; //in pixel

	// ********************* do calculation *********************
	const movTextTopGap = panelHeight * 0.2 / 2;
	const movTextLeftGap = movTextTopGap;


	// ****************** update intFeatureGeo ******************
	intersection.intFeatureGeo.movTextTopGap = movTextTopGap;
	intersection.intFeatureGeo.movTextLeftGap = movTextLeftGap;
	intersection.intFeatureGeo.movTextPanelHeight = panelHeight;
};


export default modelMovsTextGap;