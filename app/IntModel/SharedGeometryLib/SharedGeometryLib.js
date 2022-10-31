
import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";
import getIntersectedPointByPoints from "./GetIntersectedPointByPoints";
import getIntersectPointOfSegmentAndLineByAB from "./GetIntersectPointOfSegmentAndLineByAB";
import getIntersectPointOfSegmentAndCircle from "./GetIntersectPointOfSegmentAndCircle";
import getIntersectPointOnTwoSegments from "./GetIntersectPointOnTwoSegments";
import getPerpendicularLineBySlopAndIntersect from "./GetPerpendicularLineBySlopAndIntersect";
import getPerpendicularLineByTwoPoints from "./GetPerpendicularLineByTwoPoints";
import getPointOnCircleBySlopAndIntersect from "./GetPointOnCircleBySlopAndIntersect.js";
import getDistBtwTwoPoints from "./GetDistBtwTwoPoints";
import getDistFromPointToLine from "./GetDistFromPointToLine";
import getPointMovedDistFromAtoB from "./GetPointMovedDistFromAtoB";
import getTangentPointsOf3pAndRadius from "./GetTangentPointsOf3pAndRadius";
import getTangentCenterPoint from "./GetTangentCenterPoint";
import getCcwAngleBtwTwoLine from "./GetCcwAngleBtwTwoLine";
import getCcwAngleBtwTwoVectors from "./GetCcwAngleBtwTwoVectors";
import getArc from "./GetArc";
import getAbFromTwoPoints from "./GetAbFromTwoPoints";
import getDashShapesAlongCurves from "./GetDashShapesAlongCurves";
import getVectorsOnBzConnectParaLines from "./GetVectorsOnBzConnectParaLines";


import testIfPointOnLineBySlopeAndIntersect from "./TestIfPointOnLineBySlopeAndIntersect";
import testIfPointOnLineByTwoPoints from "./TestIfPointOnLineByTwoPoints";
import testIfPointBtwTwoPoints from "./TestIfPointBtwTwoPoints";
import testIfPointOnRay from "./TestIfPointOnRay";

import connectParaLinesWzCurves from "./ConnectParaLinesWzCurves";
import connectIntersectedLinesWzArc from "./ConnectIntersectedLinesWzArc";
import capParaLinesWzCwArc from "./CapParaLinesWzCwArc";
import connectTwoSectionsWzArcAndLine from "./ConnectTwoSectionsWzArcAndLine";

import buildQuadrilateralFromVectors from "./BuildQuadrilateralFromVectors";

import shiftConnectedParaLines from "./ShiftConnectedParaLines";
import svgStrToShapesArray from "./SvgStrToShapesArray";

import rotateVectorCcw from "./RotateVectorCcw";




class SharedGeometryLib {
	constructor(THREE) {
		this.THREE = THREE;


		this.getIntersectedPointBySlopeAndIntersect = getIntersectedPointBySlopeAndIntersect;

		this.getIntersectedPointByPoints = getIntersectedPointByPoints;

		this.getIntersectPointOfSegmentAndLineByAB = getIntersectPointOfSegmentAndLineByAB;

		this.getIntersectPointOfSegmentAndCircle = getIntersectPointOfSegmentAndCircle;

		this.getIntersectPointOnTwoSegments = getIntersectPointOnTwoSegments;

		this.getPerpendicularLineBySlopAndIntersect = getPerpendicularLineBySlopAndIntersect;

		this.getPerpendicularLineByTwoPoints = getPerpendicularLineByTwoPoints;

		this.getPointOnCircleBySlopAndIntersect = getPointOnCircleBySlopAndIntersect;

		this.getDistBtwTwoPoints = getDistBtwTwoPoints;

		this.getDistFromPointToLine = getDistFromPointToLine.bind(null, THREE);

		this.getPointMovedDistFromAtoB = getPointMovedDistFromAtoB.bind(null, THREE);

		this.getTangentPointsOf3pAndRadius = getTangentPointsOf3pAndRadius;

		this.getTangentCenterPoint = getTangentCenterPoint;

		this.getCcwAngleBtwTwoLine = getCcwAngleBtwTwoLine.bind(null, THREE);

		this.getCcwAngleBtwTwoVectors = getCcwAngleBtwTwoVectors;

		this.getArc = getArc.bind(null, THREE);

		this.getAbFromTwoPoints = getAbFromTwoPoints;

		this.getDashShapesAlongCurves = getDashShapesAlongCurves.bind(null, THREE);

		this.getVectorsOnBzConnectParaLines = getVectorsOnBzConnectParaLines.bind(null, THREE);

		this.testIfPointOnLineBySlopeAndIntersect = testIfPointOnLineBySlopeAndIntersect;

		this.testIfPointOnLineByTwoPoints = testIfPointOnLineByTwoPoints;

		this.testIfPointBtwTwoPoints = testIfPointBtwTwoPoints;

		this.testIfPointOnRay = testIfPointOnRay;

		this.connectParaLinesWzCurves = connectParaLinesWzCurves.bind(null, THREE);

		this.connectIntersectedLinesWzArc = connectIntersectedLinesWzArc.bind(null, THREE);

		this.capParaLinesWzCwArc = capParaLinesWzCwArc.bind(null, THREE);

		this.connectTwoSectionsWzArcAndLine = connectTwoSectionsWzArcAndLine.bind(null, THREE);

		this.buildQuadrilateralFromVectors = buildQuadrilateralFromVectors.bind(null, THREE);

		this.shiftConnectedParaLines = shiftConnectedParaLines.bind(null, THREE);

		this.svgStrToShapesArray = svgStrToShapesArray.bind(null, THREE);

		this.rotateVectorCcw = rotateVectorCcw.bind(null, THREE);
	}
}



export default SharedGeometryLib;
