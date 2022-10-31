


import SharedGeometryLib from "../../../../../../SharedGeometryLib";

/**************************************************************************
	Would model:
		1. lane.laneGeo.arrowType: would be an arrow type number,
			1 for straight,
			2 for sharp left
			3 for left
			4 for slight left
			5 for slight right
			6 for right
			7 for sharp right
			8 for uTurn

		2. lane.laneGeo.arrowAngle: an radian angle determines clockwise
			rotation of the angle

		3. lane.laneGeo.arrowInitType: would be an arrow type array of single arrow
			type number

	Note:
		Type number could be an combination of the 8 numbers above.
**************************************************************************/

const modelIntLaneArrowType = (lane, intSize, meterToPixel) => {

	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);
	const laneMov = lane.laneMov; //an array of movements
	const app = lane.laneGroup.laneGG.approach;
	const appAngle = app.appAngle * Math.PI / 180;   //in radians
	const approaches = app.intersection.approaches;
	const bound = lane.laneGroup.bound;  //"inbound" / "outbound" / "inboundSide" / "outboundSide"
	let arrowType, arrowAngle, initialTypes;

	// ************* Decide arrow type and angle for outbound lane ****************
	if (bound === "outbound") {
		// ************* Certain lane may have no mov (e.g. bike lane) ****************
		if (laneMov === null) {
			arrowType = null;
			arrowAngle = null;
			initialTypes = null;
		}
		// ************** The lane has mov ***************
		else {
			arrowType = 1;
			arrowAngle = Math.PI - appAngle;
			initialTypes = [1];
		}
	}
	// ************* Decide arrow type and angle for inbound lane ****************
	else if (bound === "inbound") {
		// ************* Certain lane may have no mov (e.g. bike lane) ****************
		if (laneMov === null || laneMov.length === 0) {
			arrowType = null;
			arrowAngle = null;
			initialTypes = null;
		}
		// ************** The lane has mov ***************
		else {
			initialTypes = [];
			const singleTypes = [1, 2, 3, 4, 5, 6, 7, 8];

			laneMov.forEach((oneMov) => {
				const toAppInex = oneMov.split("-")[0];
				const toApp = approaches[toAppInex];
				const curAppCenterEp = app.appGeo.centerEndPoint; //[x, y]
				const toAppCenterEp = toApp.appGeo.centerEndPoint;  //[x, y]

				// ***** Decide angle between current approach and destination approach *****
				const curAppVec = new lane.THREE.Vector3(
									curAppCenterEp[0], curAppCenterEp[1], 0
								);
				const toAppVec = new lane.THREE.Vector3(
									toAppCenterEp[0], toAppCenterEp[1], 0
								);

				const getCcwAngleBtwVec = sharedGeometryLib.getCcwAngleBtwTwoVectors;

				const btwAngle = getCcwAngleBtwVec(curAppVec, toAppVec);  //in radians

				// ***** Decide initial arrow type *****
				let initialType = 0;
				let angle = Math.PI / 8;

				if (btwAngle > 0 && btwAngle < Math.PI * 0.375) {
					initialType = 7;
				}
				else if (btwAngle >= Math.PI * 0.375 && btwAngle < Math.PI * 0.625) {
					initialType = 6;
				}
				else if (btwAngle >= Math.PI * 0.625 && btwAngle < Math.PI * 0.875) {
					initialType = 5;
				}
				else if (btwAngle >= Math.PI * 0.875 && btwAngle < Math.PI * 1.125) {
					initialType = 1;
				}
				else if (btwAngle >= Math.PI * 1.125 && btwAngle < Math.PI * 1.375) {
					initialType = 4;
				}
				else if (btwAngle >= Math.PI * 1.375 && btwAngle < Math.PI * 1.625) {
					initialType = 3;
				}
				else if (btwAngle >= Math.PI * 1.625 && btwAngle < Math.PI * 1.875) {
					initialType = 2;
				}
				else {
					initialType = 8;
				}

				initialTypes.push(initialType);
			});

			//unique-fy initialTypes:
			initialTypes = initialTypes.filter((oneType, oneTypeIndex, typesArray) => {
				return typesArray.indexOf(oneType) === oneTypeIndex;
			});

			// ************ Decide arrow type *************
			if (initialTypes.length === 1) {
				arrowType = initialTypes[0];
			}
			else if (initialTypes.length === 2) {
				initialTypes.sort();
				arrowType = initialTypes.join("");
				arrowType = parseInt(arrowType, 10);

				if (arrowType === 27) {
					arrowType = 36;
				}
				else if (arrowType === 28) {
					arrowType = 38;
				}
				else if (arrowType === 78) {
					arrowType = 68;
				}
			}
			else if (initialTypes.length === 3) {
				if (initialTypes.includes(1) && initialTypes.includes(3) && initialTypes.includes(6)) {
					arrowType = 136;
				}
				else {
					let intialTypesTrans = [];
					if (initialTypes.includes(1)) {
						intialTypesTrans.push(1);
					}
					if (initialTypes.includes(2) || initialTypes.includes(3) || initialTypes.includes(4)) {
						intialTypesTrans.push(3);
					}
					if (initialTypes.includes(5) || initialTypes.includes(6) || initialTypes.includes(7)) {
						intialTypesTrans.push(6);
					}
					intialTypesTrans.sort();

					arrowType = intialTypesTrans.join("");
					arrowType = parseInt(arrowType, 10);
				}
			}
			else {
				arrowType = 136;
			}

			// ************ Decide arrow angle *************
			arrowAngle = -appAngle;
		}
	}



	// ************ Update laneGeo *************
	lane.laneGeo.arrowType = arrowType;
	lane.laneGeo.arrowAngle = arrowAngle;
	lane.laneGeo.arrowInitType = initialTypes;

	//console.log(arrowType, arrowAngle * 180 / Math.PI, initialTypes);

};


export default modelIntLaneArrowType;
