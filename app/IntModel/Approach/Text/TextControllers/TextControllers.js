
import injectTextGeo from "./InjectTextGeo";
import updateText from "./UpdateText";
import exportTextGeoToJSON from "./ExportTextGeoToJSON";

class TextControllers {
	constructor(text) {
		this.text = text;

		this.injectTextGeo = injectTextGeo;
		this.updateText = updateText;
		this.exportTextGeoToJSON = exportTextGeoToJSON;
	}
}


export default TextControllers;
