
/***************************************************************************
	Would draw lane's start point.
	Inputs:
		1. divider: an instance of Divider.
		2. modelScene: an intance of THREE.Scene or THREE.Group
		3. clickableObjs: a Set
		4. translate: [x, y, z] in pixel

	Would update:
		divider.divConnectP = a THREE.Mesh;
		clickableObjs
****************************************************************************/

const drawIntDivConnectPoint = (divider, modelScene, clickableObjs, translate, meterToPix, roadThick) => {
	if (divider.divConnectP) {
		const pointMesh = divider.divConnectP;
		modelScene.add(pointMesh);
		clickableObjs.add(pointMesh);
	}
	else {
		const THREE = divider.THREE;
		const intersection = divider.divGroup.approach.intersection;
		const pointsGeo = new THREE.BufferGeometry();
		const envSetters = intersection.intModel.envSetters;
		const vertexRgbColor = envSetters.vertexRgbColor;
		//center divider would count "inbound"
		const bound = (divider.dividerType === 2) ? "outbound" : "inbound";

		// ************ get points ************
		let divHeight = (divider.type === 8) ? (envSetters.sideDivHeight * meterToPix) : envSetters.roadMarkHeight * meterToPix;
		divHeight += roadThick;
		const centerP = divider.divGeo.midLineEp.slice(0);  //[x, y]
		centerP[2] = intersection.intGeo.height; //in pixel
		const leftP = (bound === "inbound") ? divider.divGeo.lsEp.slice(0) : divider.divGeo.rsEp.slice(0);
		const rightP = (bound === "inbound") ? divider.divGeo.rsEp.slice(0) : divider.divGeo.lsEp.slice(0);
		leftP[2] = intersection.intGeo.height; //[x, y, z]
		rightP[2] = intersection.intGeo.height; //[x, y, z]
		const controlP = divider.divGeo.midLineCp.slice(0); //[x, y]
		controlP[2] = intersection.intGeo.height;  //[x, y, z]

		const color = [vertexRgbColor.r, vertexRgbColor.g, vertexRgbColor.b];

		//decide divider connector surface color:
		let surfaceColor;
		//if it is a dual-line divider, set it to the road color..
		if (divider.type === 3) {
			surfaceColor = new THREE.Color(intersection.roadColor);
		}
		//else, set it to the divider color
		else {
			surfaceColor = new THREE.Color(divider.color);
		}

		const size = [intersection.intModel.envSetters.vertexSize];
		const ifStart = (bound === "inbound") ? 1 : 0;

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
			new THREE.Float32BufferAttribute([divHeight], 1)
		);
		pointsGeo.name = divider.divGeo.dividerId;  //use "name" to hold id


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
		const layerId = divider.layerId;
		pointMesh.layers.set(layerId);
		pointMesh.name = "dividerConnectPoint";


		modelScene.add(pointMesh);
		clickableObjs.add(pointMesh);

		divider.divConnectP = pointMesh;
	}
};


export default drawIntDivConnectPoint;
