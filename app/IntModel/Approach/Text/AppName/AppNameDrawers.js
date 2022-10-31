


class AppNameDrawers {
	constructor(appName) {
		this.appName = appName;
	}

	/***************************************************************************
		Would update:
			appName.panelMesh = a THREE.Mesh instance;
	****************************************************************************/
	drawAppName(scene, clickableObjs, textFont, textColor, backgroundColor) {
		//undraw previous app name if any:
		this.undrawAppName(scene, clickableObjs);

		//create image
		const bitmap = this.appName.bitMap;//document.createElement("canvas");
		const g = bitmap.getContext("2d");
		bitmap.width = this.appName.appNameGeo.panelWidth * 10;
		bitmap.height = this.appName.appNameGeo.panelHeight * 10;
		const fontHeight = Math.floor(bitmap.height * 0.8);
		g.font = "Bold " + fontHeight + "px Arial";
		//g.font = "Bold 10px " + textFont;

		//const name = appName.name;
		const name = this.appName.name;
		const leftGap = this.appName.appNameGeo.textLeftGap;  //in pixel
		//const topGap = appName.appNameGeo.textTopGap;  //in pixel

		g.fillStyle = backgroundColor;
		g.fillRect(0, 0, bitmap.width, bitmap.height);


		g.fillStyle = "black";
		//g.textAlign = "right";
		g.fillText(name, leftGap * 10, bitmap.height * 0.8);
		//g.strokeStyle = "black";

		let textAngle;
		const appAngle = this.appName.text.approach.appAngle;
		if (appAngle >= 0 && appAngle < 180) {
			textAngle = 0;
		}
		else {
			textAngle = Math.PI;
		}

		// canvas contents will be used for a texture
		const texture = new this.appName.THREE.Texture(bitmap);
		texture.needsUpdate = true;

		const panelMaterial = new this.appName.THREE.MeshLambertMaterial({map: texture});

		const panelGeo = new this.appName.THREE.BoxGeometry(
			this.appName.appNameGeo.panelWidth,
			this.appName.appNameGeo.panelHeight,
			0.01
		);

		panelGeo.rotateZ(Math.PI / 2 - this.appName.text.approach.appAngle * Math.PI / 180);
		panelGeo.rotateZ(textAngle);
		const panelCp = this.appName.appNameGeo.panelCp;  //[x, y]
		panelGeo.translate(
			panelCp[0],
			panelCp[1],
			0
		);


		const panelMesh = new this.appName.THREE.Mesh(panelGeo, panelMaterial);


		const app = this.appName.text.approach;
		panelMesh.name = "Approach " + app.appId + " name";

		const layerId = this.appName.text.layerId;
		panelMesh.layers.set(layerId);

		scene.add(panelMesh);
		this.appName.panelMesh = panelMesh;

	}


	/****************************************************************************************
		Would update:
	*****************************************************************************************/
	undrawAppName(scene, clickableObjs) {
		const panelMesh = this.appName.panelMesh;
		if (panelMesh) {
			scene.remove(panelMesh);
			panelMesh.geometry.dispose();
			panelMesh.material.dispose();
			if (panelMesh.material.map) {
				panelMesh.material.map.dispose();
			}
			clickableObjs.delete(panelMesh);  //delete it no matter what
		}

		this.appName.panelMesh = null;
	}

}


export default AppNameDrawers;
