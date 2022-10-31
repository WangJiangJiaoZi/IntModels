
import SharedGeometryLib from "../../SharedGeometryLib";
import northArrowSvgStr from "../../PredefinedShapes/NorthArrow";

const northArrowDrawer = {
	drawNorthArrow: (northArrow, scene, clickableObjs, intBoxSize, meterToPix) => {

		const envSetters = northArrow.intersection.intModel.envSetters;
		const northArrowHeight = envSetters.roadMarkHeight;  //in meters
		const northArrowExtSettings = {
			depth: northArrowHeight * meterToPix,
			bevelEnabled: false
		};

		const sharedGeometryLib = new SharedGeometryLib(northArrow.THREE);

		const northArrowMaterial = new northArrow.THREE.MeshLambertMaterial({color: "#000000"});
		const northArrowCenterP = northArrow.northArrowGeo.centerP;  //[x, y]

		const svgStrToShapesArray = sharedGeometryLib.svgStrToShapesArray;
		const shapesArray = svgStrToShapesArray(northArrowSvgStr);

		// debugger
		const mergedGeometry = new northArrow.THREE.BufferGeometry();  //arrow could be a combination of several shapes
		const scale = 0.0001 * intBoxSize;
		const layerId = northArrow.layerId;

		shapesArray.forEach((shapes) => {

			shapes.forEach((oneShape, index) => {
				const oneGeometry = new northArrow.THREE.ExtrudeGeometry(
										oneShape,
										northArrowExtSettings
									);

				oneGeometry.scale(scale, scale, 1);

				const oneMesh = new northArrow.THREE.Mesh(oneGeometry, northArrowMaterial);

				mergedGeometry.merge(oneMesh.geometry, oneMesh.matrix);
			});

		});
		mergedGeometry.center();
		mergedGeometry.rotateZ(Math.PI);

		const mergedMesh = new northArrow.THREE.Mesh(mergedGeometry, northArrowMaterial);

		mergedMesh.translateX(northArrowCenterP[0]);
		mergedMesh.translateY(northArrowCenterP[1]);
		//mergedMesh.translateZ(roadHeight - 18 * roadMarkHeight);
		//mergedMesh.translateZ(roadMarkHeight);

		mergedMesh.layers.set(layerId);
		mergedMesh.name = "the northArrow";

		//mergedMesh.rotation.x = Math.PI;
		//mergedMesh.translateX(-100);
		scene.add(mergedMesh);
	}
};

export default northArrowDrawer;
