


class DirNameDrawers {
	constructor(dirName) {
		this.dirName = dirName;
	}

	drawDirName(scene, clickableObjs, textFont, textColor, backgroundColor) {
		//undraw previous dirName if any:
		this.undrawDirName(scene, clickableObjs);

		//create image
		let bitmap = this.dirName.bitMap;
		const g = bitmap.getContext("2d");
		bitmap.width = this.dirName.dirNameGeo.panelWidth * 10;
		bitmap.height = this.dirName.dirNameGeo.panelHeight * 10;
		const fontHeight = Math.floor(bitmap.height * 0.8);
		g.font = "Bold " + fontHeight + "px Arial";
		//g.font = "Bold 10px " + textFont;

		//const name = appName.name;
		const dirIndex = this.dirName.name + 1;
		const language = this.dirName.text.approach.intersection.intModel.language;
		const name = (language === 1) ? ("bd. " + dirIndex) : ("方向 " + dirIndex);
		//const leftGap = dirName.dirNameGeo.textLeftGap;  //in pixel
		//const topGap = appName.appNameGeo.textTopGap;  //in pixel

		g.fillStyle = backgroundColor;
		g.fillRect(0, 0, bitmap.width, bitmap.height);


		g.fillStyle = "black";
		//g.textAlign = "right";
		g.fillText(name, 0, bitmap.height * 0.8);
		//g.strokeStyle = "black";

		let textAngle;
		const appAngle = this.dirName.text.approach.appAngle;
		if (appAngle >= 0 && appAngle < 180) {
			textAngle = 0;
		}
		else {
			textAngle = 0;
		}

		// canvas contents will be used for a texture
		var texture = new this.dirName.THREE.Texture(bitmap);
		texture.needsUpdate = true;

		const panelMaterial = new this.dirName.THREE.MeshLambertMaterial({map: texture});

		const panelGeo = new this.dirName.THREE.BoxGeometry(
			this.dirName.dirNameGeo.panelWidth,
			this.dirName.dirNameGeo.panelHeight,
			0.01
		);

		panelGeo.rotateZ(-this.dirName.text.approach.appAngle * Math.PI / 180);
		panelGeo.rotateZ(textAngle);
		const panelCp = this.dirName.dirNameGeo.panelCp;  //[x, y]
		panelGeo.translate(
			panelCp[0],
			panelCp[1],
			0
		);


		const panelMesh = new this.dirName.THREE.Mesh(panelGeo, panelMaterial);


		const app = this.dirName.text.approach;
		panelMesh.name = "Approach " + app.appId + " direction";

		const layerId = this.dirName.text.layerId;
		panelMesh.layers.set(layerId);

		scene.add(panelMesh);
		texture.dispose();
		bitmap = null;
	}

	undrawDirName(scene, clickableObjs) {
		const panelMesh = this.dirName.panelMesh;
		if (panelMesh) {
			scene.remove(panelMesh);
			panelMesh.geometry.dispose();
			panelMesh.material.dispose();
			if (panelMesh.material.map) {
				panelMesh.material.map.dispose();
			}
			clickableObjs.delete(panelMesh);  //delete it no matter what
		}

		this.dirName.panelMesh = null;
	}
}


export default DirNameDrawers;
