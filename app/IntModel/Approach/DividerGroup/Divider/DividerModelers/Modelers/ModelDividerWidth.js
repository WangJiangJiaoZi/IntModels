

//update divider witdth (in meters)

const modelDividerWidth = (divider) => {
	let dividerWidth;

	//if "center" divider
	if (divider.dividerType === 3) {
		dividerWidth = divider.startWidth;
	}
	else {
		//dividerWidth = divider.startWidth + divider.gap;
		dividerWidth = divider.startWidth;
	}


	divider.divGeo.dividerWidth = dividerWidth;
};


export default modelDividerWidth;
