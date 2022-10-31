
/***************************************************************************
	Would draw lane's start point.
	Inputs:
		1. lane: an instance of Lane.
		2. modelScene: an intance of THREE.Scene or THREE.Group
		3. clickableObjects: a Set
		4. translate: [x, y, z] in pixel

	Would update:
		lane.laneConnectP = a THREE.Mesh;
		clickableObjects
****************************************************************************/

const drawLaneConnectPoint = (lane, modelScene, clickableObjects, translate, roadThick) => {
	/*	*/
	if (lane.laneConnectP) {
		const pointMesh = lane.laneConnectP;
		modelScene.add(pointMesh);
		clickableObjects.add(pointMesh);
	}
	else if (lane.laneGeo.ifConnectPoint) {
		const THREE = lane.THREE;
		const intersection = lane.laneGroup.laneGG.approach.intersection;
		const pointsGeo = new THREE.BufferGeometry();
		const vertexRgbColor = intersection.intModel.envSetters.vertexRgbColor;
		const bound = lane.laneGroup.bound;

		// ************ get points ************
		const centerP = lane.laneGeo.midLineEp.slice(0);  //[x, y]
		centerP[2] = intersection.intGeo.height; //in pixel
		const leftP = (bound === "inbound" || bound === "inboundSide") ? lane.laneGeo.lsEp.slice(0) : lane.laneGeo.rsEp.slice(0);
		const rightP = (bound === "inbound" || bound === "inboundSide") ? lane.laneGeo.rsEp.slice(0) : lane.laneGeo.lsEp.slice(0);
		leftP[2] = intersection.intGeo.height; //[x, y, z]
		rightP[2] = intersection.intGeo.height; //[x, y, z]
		const controlP = lane.laneGeo.midLineCp.slice(0); //[x, y]
		controlP[2] = intersection.intGeo.height;  //[x, y, z]

		const color = [vertexRgbColor.r, vertexRgbColor.g, vertexRgbColor.b];
		const surfaceColor = new THREE.Color(intersection.roadColor);
		const size = [intersection.intModel.envSetters.vertexSize];
		const ifStart = (bound === "inbound" || bound === "inboundSide") ? 1 : 0;

		// ************ translate points ************
		const pToTranslate = [centerP, leftP, rightP, controlP];
		pToTranslate.forEach((onePoint) => {
			onePoint[0] += translate[0];
			onePoint[1] += translate[1];
			onePoint[2] += translate[2];
		});

		pointsGeo.addAttribute(
			"position",
			new THREE.Float32BufferAttribute(centerP, 3)
		);
		pointsGeo.addAttribute(
			"myColor",
			new THREE.Float32BufferAttribute(color, 3)
		);
		pointsGeo.addAttribute(
			"surfaceColor",
			new THREE.Float32BufferAttribute([surfaceColor.r, surfaceColor.g, surfaceColor.b], 3)
		);
		pointsGeo.addAttribute(
			"size",
			new THREE.Float32BufferAttribute(size, 1)
		);
		pointsGeo.addAttribute(
			"leftPoint",
			new THREE.Float32BufferAttribute(leftP, 3)
		);
		pointsGeo.addAttribute(
			"rightPoint",
			new THREE.Float32BufferAttribute(rightP, 3)
		);
		pointsGeo.addAttribute(
			"controlPoint",
			new THREE.Float32BufferAttribute(controlP, 3)
		);
		pointsGeo.addAttribute(
			"ifLink",
			new THREE.Float32BufferAttribute([0], 1)
		);
		pointsGeo.addAttribute(
			"ifStart",
			new THREE.Float32BufferAttribute([ifStart], 1)
		);

		pointsGeo.addAttribute(
			"height",
			new THREE.Float32BufferAttribute([roadThick], 1)
		);
		pointsGeo.name = lane.laneId;  //use "name" to hold id


		const texturePngUrl = intersection.intModel.envSetters.pointTexturePngUrl;
		const pointMaterial = new THREE.ShaderMaterial({
			uniforms: {
				color: {value: new THREE.Color(0xFF8C00)},
				texture: {
					value: new THREE.TextureLoader().load(
						texturePngUrl
					)
				}
			},
			vertexShader: intersection.intModel.envSetters.vertexShaderText,
			fragmentShader: intersection.intModel.envSetters.fragmentShaderText,
			alphaTest: 0.9
		});



		const pointMesh = new THREE.Points(pointsGeo, pointMaterial);
		const layerId = lane.laneGroup.laneGG.layerId;
		pointMesh.layers.set(layerId);
		pointMesh.name = "laneConnectPoint";


		modelScene.add(pointMesh);
		clickableObjects.add(pointMesh);

		lane.laneConnectP = pointMesh;
	}

};


export default drawLaneConnectPoint;
