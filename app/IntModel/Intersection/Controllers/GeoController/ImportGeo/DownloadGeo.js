

//import localGeoData from "../../../../LocalStorage/LocalGeoData_1";
//import localGeoData1 from "../../../../LocalStorage/LocalDemoGeoData_1";
//import localGeoData2 from "../../../../LocalStorage/LocalDemoGeoData_2";
//import localGeoData3 from "../../../../LocalStorage/LocalDemoGeoData_3";



/******************************************************************
	Download geometry data of the nextGeoVersionId from server.
*******************************************************************/
const downloadGeo = (intModel, nextGeoVersionId, url) => {

	const downloadGeoPromise = new Promise((resolve, reject) => {
		//mock download geoData by geoVersionId:
		let geoDataToVerify;
		try {
			/*
			setTimeout(() => {
				let localGeoData = localGeoData1;

				geoDataToVerify = localGeoData;

				resolve(geoDataToVerify);

			}, 500);
			*/

			fetch(url).then((response) => {
				response.json().then((data) => {
					console.log(data.data);
					geoDataToVerify = data.data;
					resolve(geoDataToVerify);
				});
			});

		}
		catch (error) {
			reject(
				new Error("Download geometry data failed: " + error.message)
			);
		}

	});

	return downloadGeoPromise;
};


export default downloadGeo;
