/**********************************************************************
	Would undraw dividers's connect point by removing it from modelScene
	and clickableObjects.

	Would update:
		divider.divConnectP = null;

		clickableObjects;
***********************************************************************/

const undrawIntDivConnectPoint = (divider, modelScene, clickableObjects) => {
	const pointMesh = divider.divConnectP;
	if (pointMesh) {
		modelScene.remove(pointMesh);
		clickableObjects.delete(pointMesh);
	}
};


export default undrawIntDivConnectPoint;
