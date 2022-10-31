

const northArrowModeler = {
	/**********************************************************************************
		Would model:
			The center point of the north arrow. The north arrow would locate at the
			top left corner of the canvas.

		Would update:
			northArrow.northArrowGeo.centerP = [x, y]
	***********************************************************************************/
	modelNorthArrowGeo: (northArrow, intSize, meterToPixel) => {
		// ***************** Prepare parameters *****************
		const envSetters = northArrow.intersection.intModel.envSetters;
		const boundarySize = intSize * envSetters.boundaryScale;  //in pixel

		// ***************** Decide center point ****************
		const centerX = -intSize / 2 - boundarySize / 2;
		const centerY = -centerX;

		// ***************** Update northArrowGeo ***************
		northArrow.northArrowGeo.centerP = [centerX, centerY];
	}
};


export default northArrowModeler;
