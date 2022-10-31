


class GetTextLevelGeo {
	constructor(intModel, getAppLevelGeo) {
		this.intModel = intModel;
		this.getAppLevelGeo = getAppLevelGeo;
	}

	getAppNameByAppIndex(curAppIndex, language) {
		const curApp = this.getAppLevelGeo.getApproachByAppIndex(curAppIndex, language);
		const appName = curApp.text.appName;

		return appName;
	}

	getDirNameByAppIndex(curAppIndex, language) {
		const curApp = this.getAppLevelGeo.getApproachByAppIndex(curAppIndex, language);
		const dirName = curApp.text.dirName;

		return dirName;
	}


	getRoadNameByAppIndex(curAppIndex, language = 1) {
		const appName = this.getAppNameByAppIndex(curAppIndex, language);
		const roadName = appName.name;

		return roadName;
	}

	getRoadDirNameByAppIndex(curAppIndex, language = 1) {
		const dirName = this.getDirNameByAppIndex(curAppIndex, language);
		const roadDirName = dirName.name;

		return roadDirName;
	}
}

export default GetTextLevelGeo;
