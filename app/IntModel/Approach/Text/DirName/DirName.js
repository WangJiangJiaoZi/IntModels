
import DirNameControllers from "./DirNameControllers";
import DirNameDrawers from "./DirNameDrawers";
import DirNameModelers from "./DirNameModelers";

class DirName {
	constructor(text, THREE) {
		this.text = text;
		this.THREE = THREE;

		this.name = "";  //direction name
		this.bitMap = document.createElement("canvas");   //for text texture
		this.panelMesh = null;  //would be a THREE.Mesh

		this.dirNameControllers = new DirNameControllers(this);
		this.dirNameDrawers = new DirNameDrawers(this);
		this.dirNameModelers = new DirNameModelers(this);

		this.dirNameShape = null;
		/*content
			{

			}
		*/

		this.dirNameGeo = null;
		/*content
			{
				textLeftGap: xxx,  //text left gap in pixel
				panelWidth: xxx, //panel width in pixel
				panelHeight: xxx,  //panel height in pixel
				panelCp: [x, y],  //panel center point
			}
		*/
	}
}


export default DirName;
