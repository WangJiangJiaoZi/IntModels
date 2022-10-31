

/********************************************************************************
	Would draw intersection level feature by provided type ("LOS", "controlType", "id", ...)

	Input:
		-intersection
		-scene (a THREE.Group)
		-extSettings
		-type ("LOS", "controlType", "id", ...)
*********************************************************************************/

const drawIntFeature = (intersection, scene, panelExtHeight, panelDiameter, type, clickableObjs) => {
	const centerPanelGeo = new intersection.THREE.PlaneBufferGeometry(panelDiameter, panelDiameter);
	centerPanelGeo.rotateZ(Math.PI / 4);

	const THREE = intersection.THREE;
	const envSetters = intersection.intModel.envSetters;

	if (type === "controlType") {
		const controlTextureUrl = (intersection.controlType === "signal") ? envSetters.signalTexturePngUrl :
								((intersection.controlType === "stop") ? envSetters.stopTexturePngUrl : undefined);
		if (controlTextureUrl) {
			new THREE.ImageLoader().load(
				controlTextureUrl,
				(image) => {
					const canvas = document.createElement("canvas");
					const context = canvas.getContext("2d");
					context.fillStyle = "white";
					canvas.width = panelDiameter * 20;
					canvas.height = panelDiameter * 20;
					context.drawImage(image, 0, 0, panelDiameter * 20, panelDiameter * 20);
					const texture = new THREE.CanvasTexture(canvas);
					const material = new THREE.MeshBasicMaterial({
										color: envSetters.intCenterPanelColor,
										map: texture
									});

					const centerPanelMesh = new THREE.Mesh(centerPanelGeo, material);

					centerPanelMesh.layers.set(3);
					centerPanelMesh.translateZ(panelExtHeight);

					centerPanelMesh.name = "centerPanelMesh";
					scene.add(centerPanelMesh);

					intersection.centerPanelMesh = centerPanelMesh;
				}
			);
		}
	}
	else if (type === "LOS") {
		let losTextureUrl;
		switch (intersection.LOS) {
			case "B":
				losTextureUrl = envSetters.losBPngUrl;
				break;
			case "C":
				losTextureUrl = envSetters.losCPngUrl;
				break;
			case "D":
				losTextureUrl = envSetters.losDPngUrl;
				break;
			case "E":
				losTextureUrl = envSetters.losEPngUrl;
				break;
			case "F":
				losTextureUrl = envSetters.losFPngUrl;
				break;
			default:
				losTextureUrl = envSetters.losAPngUrl;
		}
		new THREE.ImageLoader().load(
			losTextureUrl,
			(image) => {
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");
				context.fillStyle = "white";
				canvas.width = panelDiameter * 20;
				canvas.height = panelDiameter * 20;
				context.drawImage(image, 0, 0, panelDiameter * 20, panelDiameter * 20);
				const texture = new THREE.CanvasTexture(canvas);
				const material = new THREE.MeshBasicMaterial({
									color: envSetters.intCenterPanelColor,
									map: texture
								});

				const centerPanelMesh = new THREE.Mesh(centerPanelGeo, material);

				centerPanelMesh.layers.set(3);
				centerPanelMesh.translateZ(panelExtHeight);

				centerPanelMesh.name = "centerPanelMesh";
				scene.add(centerPanelMesh);

				intersection.centerPanelMesh = centerPanelMesh;
			}
		);
	}



};

export default drawIntFeature;
