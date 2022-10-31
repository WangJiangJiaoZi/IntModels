
import SharedGeometryLib from "../../../SharedGeometryLib";
import appMovArrows from "../../../PredefinedShapes/AppMovArrows";

class MovDrawers {
	constructor(movement) {
		this.movement = movement;
		this.sharedGeoLib = new SharedGeometryLib(movement.THREE);

		this.ifArrowDrawn = false;
	}

	/**********************************************************************
		Draw movement arrow.
		Would update:
			movement.arrowMesh = an instance of THREE.Mesh
	***********************************************************************/
	drawMovementArrow(scene, clickableObjs, movArrowMaterial, extSettings, movArrowScale) {
		//undraw arrow if any:
		this.undrawMovementArrow(scene, clickableObjs);

		const arrowType = this.movement.movFeatureGeo.arrowType;  //an int number
		const arrowAngle = this.movement.movFeatureGeo.arrowAngle;  //clockwise angle in radians
		const arrowSvgStr = appMovArrows[arrowType];
		const arrowCenter = this.movement.movFeatureGeo.arrowCp;  //[x, y]


		const shapesArray = this.sharedGeoLib.svgStrToShapesArray(arrowSvgStr);
		const THREE = this.movement.THREE;
		const mergedGeometry = new THREE.BufferGeometry();  //arrow could be a combination of several shapes
		const scale = movArrowScale;

		shapesArray.forEach((shapes) => {

			shapes.forEach((oneShape) => {
				const oneGeometry = new THREE.ExtrudeGeometry(
										oneShape,
										extSettings
									);
				oneGeometry.rotateY(Math.PI);
				oneGeometry.rotateZ(-arrowAngle);

				oneGeometry.scale(scale, scale, 1);

				const oneMesh = new THREE.Mesh(oneGeometry, movArrowMaterial);

				mergedGeometry.merge(oneMesh.geometry, oneMesh.matrix);

				oneGeometry.dispose();
				movArrowMaterial.dispose();
			});

		});
		mergedGeometry.center();

		const mergedMesh = new THREE.Mesh(mergedGeometry, movArrowMaterial);
		mergedMesh.translateX(arrowCenter[0]);
		mergedMesh.translateY(arrowCenter[1]);
		mergedMesh.translateZ(0);
		//mergedMesh.translateZ(roadMarkHeight);

		mergedMesh.layers.set(this.movement.layerId);
		//mergedMesh.name = appId + " " + laneIndex;

		//mergedMesh.rotation.x = Math.PI;
		//mergedMesh.translateX(-100);
		scene.add(mergedMesh);

		this.ifArrowDrawn = true;
		this.movement.arrowMesh = mergedMesh;
	}


	/**************************************************************************************
		Draw movement arrow.
		Would update:
			this.typeDrawn = a type string; ("volume", "delay", "stop", "queue", or "overflow")
			movement.panelMesh = an instance of THREE.Mesh
	***************************************************************************************/
	drawMovementFeature(type, scene, clickableObjs, textFont, textColor, backgroundColor) {
		//undraw previous feature if any:
		this.undrawMovementFeature(scene, clickableObjs);

		//if this "type" has been injected data
		if (this.movement[type] !== null) {
			const THREE = this.movement.THREE;
			const bitmap = this.movement.bitMap;//document.createElement("canvas");
			const g = bitmap.getContext("2d");
			bitmap.width = this.movement.movFeatureGeo[type].panelWidth * 10;
			bitmap.height = this.movement.frLaneGG.approach.intersection.intFeatureGeo.movTextPanelHeight * 10;
			const fontHeight = Math.floor(bitmap.height * 0.8);
			g.font = "Bold " + fontHeight + "px " + textFont;

			const unitKey = type + "Unit";
			const text = this.movement[type] + this.movement[unitKey];
			const leftGap = this.movement.frLaneGG.approach.intersection.intFeatureGeo.movTextLeftGap;  //in pixel


			g.fillStyle = backgroundColor;
			g.fillRect(0, 0, bitmap.width, bitmap.height);


			g.fillStyle = textColor;
			//g.textAlign = "right";
			g.fillText(text, leftGap * 10, bitmap.height * 0.8);
			//g.strokeStyle = "black";

			let textAngle;
			const appAngle = this.movement.frLaneGG.approach.appAngle;
			if (appAngle >= 0 && appAngle < 180) {
				textAngle = 0;
			}
			else {
				textAngle = Math.PI;
			}

			// canvas contents will be used for a texture
			const texture = new THREE.Texture(bitmap);
			texture.needsUpdate = true;

			const panelMaterial = new THREE.MeshLambertMaterial({map: texture});

			const panelGeo = new THREE.BoxGeometry(
				this.movement.movFeatureGeo[type].panelWidth,
				this.movement.frLaneGG.approach.intersection.intFeatureGeo.movTextPanelHeight,
				0.01
			);

			panelGeo.rotateZ(Math.PI / 2 - this.movement.frLaneGG.approach.appAngle * Math.PI / 180);
			panelGeo.rotateZ(textAngle);
			const panelCp = this.movement.movFeatureGeo[type].panelCp;  //[x, y]
			panelGeo.translate(
				panelCp[0],
				panelCp[1],
				0
			);


			const panelMesh = new THREE.Mesh(panelGeo, panelMaterial);

			//panelMesh.name = "Approach " + app.appId + " name";

			const layerId = this.movement.layerId;
			panelMesh.layers.set(layerId);

			scene.add(panelMesh);

			this.typeDrawn = type;
			this.movement.panelMesh = panelMesh;
		}
	}


	/***********************************************************************************
		Would remove and dispose movement arrow from scene.
		Would update:
			movement.arrowMesh = null;
	************************************************************************************/
	undrawMovementArrow(scene, clickableObjs) {
		const arrowMesh = this.movement.arrowMesh;
		if (arrowMesh) {
			scene.remove(arrowMesh);
			arrowMesh.geometry.dispose();
			arrowMesh.material.dispose();
			if (arrowMesh.material.map) {
				arrowMesh.material.map.dispose();
			}
			clickableObjs.delete(arrowMesh);  //delete it no matter what

		}

		this.movement.arrowMesh = null;
	}


	/***********************************************************************************
		Would update:
			movement.panelMesh = null;
			this.typeDrawn = null;
	************************************************************************************/
	undrawMovementFeature(scene, clickableObjs) {
		const panelMesh = this.movement.panelMesh;
		if (panelMesh) {
			scene.remove(panelMesh);
			panelMesh.geometry.dispose();
			panelMesh.material.dispose();
			if (panelMesh.material.map) {
				panelMesh.material.map.dispose();
			}
			clickableObjs.delete(panelMesh);  //delete it no matter what

		}

		this.movement.panelMesh = null;
		this.typeDrawn = null;
	}
}


export default MovDrawers;
