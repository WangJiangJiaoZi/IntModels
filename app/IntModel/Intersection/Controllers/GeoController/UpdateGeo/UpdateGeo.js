

import verifyIntId from "../VerifyGeo/Verificators/VerifyIntId";
import verifyLocation from "../VerifyGeo/Verificators/VerifyLocation";
import verifyIntClass from "../VerifyGeo/Verificators/VerifyIntClass";
import verifyColor from "../VerifyGeo/Verificators/VerifyColor";

import sharedErrors from "../../../../SharedErrors/SharedErrors";

const updateGeo =  {

	updateIntId: (intersection, nextIntId) => {
		verifyIntId(nextIntId);
		intersection.intId = nextIntId;
	},

	updateIntLocation: (intersection, nextIntLocation) => {
		verifyLocation(nextIntLocation);
		intersection.location = nextIntLocation;
	},

	updateIntClass: (intersection, nextIntClass) => {
		verifyIntClass(nextIntClass);
		intersection.class = nextIntClass;
	},

	updateIntRoadColor: (intersection, nextRoadColor) => {
		verifyColor(nextRoadColor);
		intersection.roadColor = nextRoadColor;
	},

	updateIntCornerIslandColor: (intersection, nextCornerIslandColor) => {
		verifyColor(nextCornerIslandColor);
		intersection.cornerIslandColor = nextCornerIslandColor;
	},

	updateIntCrosswalkColor: (intersection, nextCrosswalkColor) => {
		verifyColor(nextCrosswalkColor);
		intersection.crossWalkColor = nextCrosswalkColor;
	},

	updateIntTextColor: (intersection, nextTextColor) => {
		verifyColor(nextTextColor);
		intersection.textColor = nextTextColor;
	},

	updateIntBackgroundColor: (intersection, nextBgColor) => {
		verifyColor(nextBgColor);
		intersection.backgroundColor = nextBgColor;
	},

	disposeGeoAndMaterial: (intersection, clickableObjects, ifDisposePoint = true) => {
		//dispose geometry geo and materials:
		if (intersection.intGroup) {
			let intGroup = intersection.intGroup;
			intGroup.children.forEach((oneMesh) => {
				oneMesh.geometry.dispose();
				oneMesh.material.dispose();
				if (oneMesh.material.map) {
					oneMesh.material.map.dispose();
				}
				clickableObjects.delete(oneMesh);  //delete it no matter what
			});
		}
		intersection.intGroup = null;

		//dispose start and end points of lanes and dividers since they may or may
		//not in the intGroup
		if (ifDisposePoint) {
			intersection.approaches.forEach((oneApp) => {
				oneApp.dividerGroup.dividers.forEach((oneDiv) => {
					oneDiv.dividerControllers.updateDivGeo.disposeDivMesh(oneDiv);
				});

				oneApp.laneGG.laneGroups.forEach((oneLaneGroup) => {
					oneLaneGroup.lanes.forEach((oneLane) => {
						oneLane.laneControllers.updateLaneGeo.disposeLaneMesh(oneLane);
					});
				});
			});
		}


		//dispose feature geo and materials (since features would make no sense without geometry)
		const intFeatureController = intersection.controllers.intFeatureController;
		intFeatureController.updateIntFeature.disposeGeoAndMaterial(clickableObjects);
	},


	updateIntLayerMaterialValues: (intersection, layerId,  materialValuesObj, language = 1) => {
		const intGroup = intersection.intGroup;

		try {
			intGroup.children.forEach((oneMesh) => {
				if (oneMesh.layers.mask === Math.pow(2, layerId)) {
					oneMesh.material.setValues({transparent: true, opacity: 0.5});
				}
			});
		}
		catch (error) {
			const modelOwner = "Intersection";
			let message;
			if (language === 1) {
				message = "Failed to update material values for intersection layer " + layerId +
					". Please check the layerId and the materialValuesObj you provided. Error details: " +
					error.message;
			}
			else {
				message = "无法为路口模型中编号为" + layerId + "的图层更改属性。请检查layerId和materialValuesObj。" +
					"错误详细信息：" + error.message;
			}

			const oneValueError = new sharedErrors.SingleValueError(modelOwner, message);
			throw oneValueError;
		}
	}

};

export default updateGeo;
