
/**********************************************************************************
	Would model movement box's center point.

	Would update:
		movFeatureGeo.arrowCp = [x, y];
***********************************************************************************/

const modelMovArrowCenterP = (movement, intSize, meterToPixel, accuracy) => {
	// ********************** parameter preparation **********************
	const envSetters = movement.frLaneGG.approach.intersection.intModel.envSetters;
	const movArrowCenterOffest = envSetters.movArrowCenterOffest * meterToPixel; //dist from start line to center point
	const midLineSp = movement.movFeatureGeo.midLineSp;  //[x, y]
	const midLineEp = movement.movFeatureGeo.midLineEp;  //[x, y]
	const THREE = movement.THREE;

	// ************************* do calculation **************************
	const midLineVec = new THREE.Vector2(
						midLineEp[0] - midLineSp[0],
						midLineEp[1] - midLineSp[1]
					);
	midLineVec.setLength(movArrowCenterOffest);
	const arrowCpVec = new THREE.Vector2(midLineSp[0], midLineSp[1]);
	arrowCpVec.add(midLineVec);

	const arrowCp = [arrowCpVec.x, arrowCpVec.y];


	// ********************** update movFeatureGeo **********************
	movement.movFeatureGeo.arrowCp = arrowCp;
};


export default modelMovArrowCenterP;
