
import SharedGeometryLib from "../../../../SharedGeometryLib";


/*************************************************************************
	Would model movements' order and arrow types in current laneGG.

	Would update each movement:
		movement.movFeatureGeo.order = x;  //order starts from 0
		movement.movFeatureGeo.arrowType = x;  //type of the movement arrow
		movement.movFeatureGeo.arrowAngle = xxx; //clockwise rotation angle of the arrow
**************************************************************************/

const modelMovsOrderAndArrowTypes = (laneGG, accuracy) => {
	// ******************** parameters preparation ********************
	const frApp = laneGG.approach;
	const frAppOuterRightSp = frApp.appGeo.outerRightSp;  //[x, y]
	const frAppOuterRightEp = frApp.appGeo.outerRightEndPoint;  //[x, y]

	const THREE = laneGG.THREE;
	const sharedGeoLib = new SharedGeometryLib(THREE);
	const getCcwAngle = sharedGeoLib.getCcwAngleBtwTwoVectors;

	// ******** traverse movements to get their angles to toLaneGG ********
	const movements = laneGG.movements;
	const angles = movements.map((oneMov) => {
		let angle;
		if (oneMov.frLaneGG === oneMov.toLaneGG) {
			angle = Math.PI * 2;
		}
		else {
			const toApp = oneMov.toLaneGG.approach;
			const toAppOuterLeftEp = toApp.appGeo.outerLeftEndPoint;  //[x, y]
			const toAppOuterLeftSp = toApp.appGeo.outerLeftSp;  //[x, y]

			angle = getCcwAngle(
						new THREE.Vector3(
							frAppOuterRightEp[0] - frAppOuterRightSp[0],
							frAppOuterRightEp[1] - frAppOuterRightSp[1],
							0
						),
						new THREE.Vector3(
							toAppOuterLeftEp[0] - toAppOuterLeftSp[0],
							toAppOuterLeftEp[1] - toAppOuterLeftSp[1],
							0
						)
					);
		}

		// ************************ decide arrow type ************************
		let arrowType;
		if (angle < Math.PI * 3 / 8) {
			arrowType = 7;
		}
		else if (angle < Math.PI * 5 / 8) {
			arrowType = 6;
		}
		else if (angle < Math.PI * 7 / 8) {
			arrowType = 5;
		}
		else if (angle < Math.PI * 9 / 8) {
			arrowType = 1;
		}
		else if (angle < Math.PI * 11 / 8) {
			arrowType = 4;
		}
		else if (angle < Math.PI * 13 / 8) {
			arrowType = 3;
		}
		else if (angle < Math.PI * 15 / 8) {
			arrowType = 2;
		}
		else {
			arrowType = 8;
		}

		oneMov.movFeatureGeo.arrowType = arrowType;

		return angle;
	});


	// ********************* decide order and arrowAngle *********************
	//clone angles:
	const sortedAngles = angles.slice();
	sortedAngles.sort((a, b) => {
		return (b - a);
	});

	//get orders:
	const orders = angles.map((oneAngle) => {
		const oneOrder = sortedAngles.indexOf(oneAngle);
		return oneOrder;
	});

	//get arrow angle (which is the approach angle in radians):
	const arrowAngle = frApp.appAngle * Math.PI / 180;

	// update movements' order and arrowAngle:
	movements.forEach((oneMov, index) => {
		oneMov.movFeatureGeo.order = orders[index];
		oneMov.movFeatureGeo.arrowAngle = arrowAngle;
	});

};


export default modelMovsOrderAndArrowTypes;
