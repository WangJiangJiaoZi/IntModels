
import AppName from "../AppName/AppName";
import DirName from "../DirName/DirName";

const injectTextGeo = (text, oneTextData) => {
	//appName:
	text.appName = new AppName(text, text.THREE);
	const appNameData = oneTextData.appName;  //string...
	text.appName.appNameControllers.injectAppName(appNameData);

	//dirName:
	text.dirName = new DirName(text, text.THREE);
	const dirNameData = oneTextData.dirName;  //int...
	text.dirName.dirNameControllers.injectDirName(dirNameData);

};

export default injectTextGeo;
