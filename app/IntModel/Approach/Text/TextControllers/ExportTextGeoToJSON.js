

const exportTextGeoToJSON = (text) => {

	//**************** Ask AppName to collect data ****************
	const appName = text.appName;
	const appNameGeoData = appName.appNameControllers.exportAppName();

	//**************** Ask DirName to collect data ****************
	//TBD... might be...


	//**************** Return the result ****************
	return appNameGeoData;
};


export default exportTextGeoToJSON;
