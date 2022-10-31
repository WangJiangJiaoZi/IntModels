
import SharedGeometryLib from "../../../../../SharedGeometryLib";
import laneMovArrows from "../../../../../PredefinedShapes/LaneMovArrows";

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'

const drawLaneArrow = (lane, arrowTranslateZ, roadMarkHeight, scene, clickableObjs, roadMarkExtSettings, laneLineMaterial) => {

	const sharedGeometryLib = new SharedGeometryLib(lane.THREE);
	const arrowType = lane.laneGeo.arrowType;  //an int number

	if (arrowType) {

		const arrowAngle = lane.laneGeo.arrowAngle;  //clockwise angle in radians
		const arrowSvgStr = laneMovArrows[arrowType];
		const arrowCenter = lane.laneGeo.arrowCp;  //[x, y]

		const laneIndex = lane.laneIndex;
		const layerId = lane.laneGroup.laneGG.layerId;
		const appId = lane.laneGroup.laneGG.approach.appId;

		const svgStrToShapesArray = sharedGeometryLib.svgStrToShapesArray;
		const shapesArray = svgStrToShapesArray(arrowSvgStr);

		const scale = lane.laneGroup.laneGG.approach.intersection.intGeo.svgScale;
		const geometryList = [];

		shapesArray.forEach((shapes) => {
			shapes.forEach((oneShape) => {
				const oneGeometry = new lane.THREE.ExtrudeBufferGeometry(oneShape, roadMarkExtSettings);
				geometryList.push(oneGeometry)
				oneGeometry.dispose();
			});
		});
		const arrowGeometry = BufferGeometryUtils.mergeBufferGeometries(geometryList)

		arrowGeometry.rotateY(Math.PI);
		arrowGeometry.rotateZ(arrowAngle);
		arrowGeometry.scale(scale, scale, 1);
		arrowGeometry.center();
		const mergedMesh = new lane.THREE.Mesh(arrowGeometry, laneLineMaterial.clone());

		mergedMesh.translateX(arrowCenter[0]);
		mergedMesh.translateY(arrowCenter[1]);
		mergedMesh.translateZ(arrowTranslateZ);

		mergedMesh.layers.set(layerId);
		mergedMesh.name = appId + " " + laneIndex;
		lane.laneArrow = mergedMesh;

		scene.add(mergedMesh);
	}


};


export default drawLaneArrow;
