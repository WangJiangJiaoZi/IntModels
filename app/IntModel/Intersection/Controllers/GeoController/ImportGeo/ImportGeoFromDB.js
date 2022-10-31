

import downloadGeo from "./DownloadGeo";
import verifyGeo from "../VerifyGeo/VerifyGeo";
import injectGeo from "./InjectGeo";
import sharedErrors from "../../../../SharedErrors/SharedErrors";

const importGeoFromDB = (intModel, nextGeoVersionId, url) => {

	const downloadGeoDataPromise = new Promise((resolve, reject) => {

		//download data only if geoVersionId changed
		if (intModel.geoVersionId !== nextGeoVersionId) {

			downloadGeo(intModel, nextGeoVersionId, url).then((geoDataToVerify) => {
				// ********************* Verify geometry data *********************
				try {
					/*
					//verify geo data:
					const language = intModel.language;
					verifyGeo(geoDataToVerify, language);
					//if verified:
					intModel.geoVersionId = nextGeoVersionId;
					const geoData = geoDataToVerify;
					//inject the verified geo data:
					injectGeo(intModel, geoData);
					*/

					//const geoDataToVerify = JSON.parse(geoDataToVerify);
					//verify geo data:
					const language = intModel.language;
					verifyGeo(geoDataToVerify, language);
					//if verified:
					//intModel.geoVersionId = nextGeoVersionId;
					const geoData = geoDataToVerify;
					//inject the verified geo data:
					injectGeo(intModel, geoData);



					resolve();
				}
				catch (error) {
					const BaseError = sharedErrors.BaseError;

					if (error instanceof BaseError) {
						reject(
							new Error("The geometry data downloaded is invalid. " + error.toString())
						);
					}
					else {
						reject(
							error
							//new Error("Unkonwn error happened after geometry data downloaded. " + error)
						);
					}

				}
			}, (error) => {
				//download data error:
				reject(error);
			});


		}
		else {
			//no need to download data
			resolve();
		}

	});

	return downloadGeoDataPromise;
};

export default importGeoFromDB;
