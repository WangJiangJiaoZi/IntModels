
//import SharedGeometryLib from "../../../../../SharedGeometryLib/SharedGeometryLib";


/******************************************************************************************
	Would model:
		Intersection divider points for connector use.

	Would update:
		1. divider.divGeo.midLineEp = [x, y];   //center end point
		2. divider.divGeo.midLineCp = [x, y];   //center control point that is 10 meters away from center end point
		3. divider.divGeo.rsEp = [x, y];	//relative to inbound direction left side end point
		4. divider.divGeo.lsEp = [x, y];  //relative to inbound direction left side end point
		5. divider.divGeo.height = x;   //height in pixel
******************************************************************************************/


const modelIntDivConnectorPoints = (divider, meterToPixel, accuracy) => {
	const THREE = divider.THREE;
	const app = divider.divGroup.approach;
	let midLineEp, midLineCp, rsEp, lsEp;
	let height = app.intersection.intModel.envSetters.roadMarkHeight * meterToPixel;

	const appOuterRightEp = app.appGeo.outerRightEndPoint;  //[x, y]
	const appOuterRightSp = app.appGeo.outerRightSp;  //[x, y]
	const appOuterLeftEp = app.appGeo.outerLeftEndPoint;  //[x, y]

	// ****************** get points and height by divider bound ******************
	const bound = divider.dividerType;
	// if inbound:
	if (bound === 1) {
		rsEp = divider.divGeo.ibOuterEp;  //[x, y]
		lsEp = divider.divGeo.ibInnerEp;  //[x, y]
	}
	//else if outbound:
	else if (bound === 2) {
		rsEp = divider.divGeo.obInnerEp;  //[x, y]
		lsEp = divider.divGeo.obOuterEp;  //[x, y]
	}
	//else if center and grass:
	else if (bound === 3 && divider.type === 8) {
		rsEp = divider.divGeo.centerIbEp;  //[x, y]
		lsEp = divider.divGeo.centerObEp;  //[x, y]

		height = app.intersection.intModel.envSetters.sideDivHeight * meterToPixel;
	}
	//else, center linear divider:
	else {
		const divHalfWidth = divider.startWidth * meterToPixel / 2;
		const shiftRightVec2 = new THREE.Vector2(
								appOuterRightEp[0] - appOuterLeftEp[0],
								appOuterRightEp[1] - appOuterLeftEp[1]
							);
		shiftRightVec2.setLength(divHalfWidth);

		const shiftLeftVec2 = new THREE.Vector2(
								-appOuterRightEp[0] + appOuterLeftEp[0],
								-appOuterRightEp[1] + appOuterLeftEp[1]
							);
		shiftLeftVec2.setLength(divHalfWidth);

		const midEpVec2 = new THREE.Vector2(
							divider.divGeo.centerMidEp[0],
							divider.divGeo.centerMidEp[1]
						);

		const rsEpVec2 = midEpVec2.clone().add(shiftRightVec2);
		const lsEpVec2 = midEpVec2.clone().add(shiftLeftVec2);

		rsEp = [rsEpVec2.x, rsEpVec2.y];
		lsEp = [lsEpVec2.x, lsEpVec2.y];
	}

	// ****************** decide midLine end point ******************
	midLineEp = [
					(rsEp[0] + lsEp[0]) / 2,
					(rsEp[1] + lsEp[1]) / 2
				];

	// ****************** decide midLine control point ******************
	const appEndtoStartVec2 = new THREE.Vector2(
								appOuterRightSp[0] - appOuterRightEp[0],
								appOuterRightSp[1] - appOuterRightEp[1]
							);
	const connectControlDist = app.intersection.intModel.envSetters.connectorCpDist * meterToPixel;
	appEndtoStartVec2.setLength(connectControlDist);

	const midLineEpVec2 = new THREE.Vector2(midLineEp[0], midLineEp[1]);
	const midLineCpVec2 = midLineEpVec2.add(appEndtoStartVec2);

	midLineCp = [midLineCpVec2.x, midLineCpVec2.y];

	// ************************** update divGeo **************************
	divider.divGeo.midLineEp = midLineEp;   //center end point
	divider.divGeo.midLineCp = midLineCp;   //center control point that is 10 meters away from center end point
	divider.divGeo.rsEp = rsEp;	//relative to inbound direction left side end point
	divider.divGeo.lsEp = lsEp;  //relative to inbound direction left side end point
	divider.divGeo.height = height;   //height in pixel


};


export default modelIntDivConnectorPoints;
