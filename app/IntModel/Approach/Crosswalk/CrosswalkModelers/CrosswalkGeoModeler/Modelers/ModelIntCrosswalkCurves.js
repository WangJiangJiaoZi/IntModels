import SharedGeometryLib from "../../../../../SharedGeometryLib";
/**************************************************************************
	Would model:
		Curves of the crosswalk (for intersection only, not roundabout).

	Would update:
		1. crosswalk.crosswalkShape.rectCurves = [ an instance of THREE.Shape ];


	Note:
		None.
**************************************************************************/

const modelIntCrosswalkCurves = (crosswalk, intSize, meterToPixel) => {

	const sharedGeometryLib = new SharedGeometryLib(crosswalk.THREE);

	//************************ Prepare parameters ************************
	//const accuracy = initSettings.sharedInitSettings.accuracy * intBoxSize;  //in pixel

	const innerSp = crosswalk.crosswalkGeo.startPoints[0];
	const outerSp = crosswalk.crosswalkGeo.startPoints[1];
	const innerEp = crosswalk.crosswalkGeo.endPoints[0];
	const cwGap = crosswalk.crosswalkGap * meterToPixel;  //in pixel
	const cwHeight = crosswalk.crosswalkHeight * meterToPixel;  //in pixel
	//const cwWidth = crosswalk.crossswalkWidth * meterToPixel;  //in pixel


	//************************ Get number of rectangle to draw ************************
	//const getAbFromTwoPoints = sharedGeometryLib.getAbFromTwoPoints;
	const getPointMovedFromAtoB = sharedGeometryLib.getPointMovedDistFromAtoB;
	const getDistBtwPoints = sharedGeometryLib.getDistBtwTwoPoints;
	const getCcwAngleBtwTwoVectors = sharedGeometryLib.getCcwAngleBtwTwoVectors;

	const cwVector = new crosswalk.THREE.Vector3(innerEp[0] - innerSp[0], innerEp[1] - innerSp[1], 0);
	const curAppVector = new crosswalk.THREE.Vector3(innerSp[0] - outerSp[0], innerSp[1] - outerSp[1], 0);

	const angle = getCcwAngleBtwTwoVectors(
					curAppVector, cwVector
				);

	const gapShadow = Math.abs(cwGap / Math.sin(angle));
	const heightShadow = Math.abs(cwHeight / Math.sin(angle));
	const cwLength = getDistBtwPoints(
						innerSp[0], innerSp[1],
						innerEp[0], innerEp[1],
					);
	//number of rect to draw:
	const count = Math.floor(cwLength / (gapShadow + heightShadow));


	//************************ Build vectors ************************
	const initSp = getPointMovedFromAtoB(
					innerSp[0], innerSp[1],
					innerEp[0], innerEp[1],
					gapShadow
				);

	const initShadowEp = getPointMovedFromAtoB(
					innerSp[0], innerSp[1],
					innerEp[0], innerEp[1],
					gapShadow + heightShadow
				);

	const addVector = new crosswalk.THREE.Vector2(initShadowEp[0] - innerSp[0], initShadowEp[1] - innerSp[1]);
	const widthVector = new crosswalk.THREE.Vector2(outerSp[0] - innerSp[0], outerSp[1] - innerSp[1]);

	const heightP = getPointMovedFromAtoB(
					outerSp[0], outerSp[1],
					innerSp[0], innerSp[1],
					cwHeight
				);

	const heightVector3 = new crosswalk.THREE.Vector3(heightP[0] - outerSp[0], heightP[1] - outerSp[1], 0);
	const zAxis = new crosswalk.THREE.Vector3(0, 0, 1);
	heightVector3.applyAxisAngle(zAxis, Math.PI / 2);
	const heightVector = new crosswalk.THREE.Vector2(heightVector3.x, heightVector3.y);

	let initVector = new crosswalk.THREE.Vector2(initSp[0], initSp[1]);


	//************************ Build curves array ************************
	const rectCurves = [];
	const buildQuad = sharedGeometryLib.buildQuadrilateralFromVectors;

	for (let i = 0; i < count; i++) {
		const oneRect = buildQuad(
							initVector, widthVector, heightVector
						);  //in the form of THREE.Shape
		initVector = initVector.add(addVector);
		rectCurves.push(oneRect);
	}

	crosswalk.crosswalkShape.rectCurves = rectCurves;

};


export default modelIntCrosswalkCurves;
