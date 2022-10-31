
import AppNameControllers from "./AppNameControllers";
import AppNameDrawers from "./AppNameDrawers";
import AppNameModelers from "./AppNameModelers";

class AppName {
	constructor(text, THREE) {
		this.text = text;
		this.THREE = THREE;

		this.name = "";  //name of the approach
		this.bitMap = document.createElement("canvas");   //for text texture
		this.panelMesh = null;  //would be a THREE.Mesh

		this.appNameControllers = new AppNameControllers(this);
		this.appNameDrawers = new AppNameDrawers(this);
		this.appNameModelers = new AppNameModelers(this);

		this.appNameShape = null;
		/*contents
			{
			}
		*/

		this.appNameGeo = null;
		/*contents
			{
				textLeftGap: xx,  //text left gap in pixel
				textTopGap: xx,  //text top gap in pixel
				textAngle: xx,  //text angle in radians
				panelWidth: xx, //panel width in pixel
				panelHeight: xx,  //panel height in pixel
				panelCp: [x, y],  //panel center point
			}
		*/
	}
}


export default AppName;
