/**********************************************************************
	Would undraw lane's connect point by removing it from modelScene
	and clickableObjects.

	Would update:
		lane.laneConnectP = null;

		clickableObjects;
***********************************************************************/

const undrawLaneConnectPoint = (lane, modelScene, clickableObjects) => {
	const pointMesh = lane.laneConnectP;
	if (pointMesh) {
		modelScene.remove(pointMesh);
		clickableObjects.delete(pointMesh);
	}
};


export default undrawLaneConnectPoint;
