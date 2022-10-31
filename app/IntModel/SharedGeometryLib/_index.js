import getIntersectedPointBySlopeAndIntersect from "./GetIntersectedPointBySlopeAndIntersect";
import getIntersectedPointByPoints from "./GetIntersectedPointByPoints";
import getIntersectPointOfSegmentAndLineByAB from "./getIntersectPointOfSegmentAndLineByAB";
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
import testIfPointOnLineByTwoPoints from "./testIfPointOnLineByTwoPoints";
import testIfPointBtwTwoPoints from "./TestIfPointBtwTwoPoints";

import connectParaLinesWzCurves from "./ConnectParaLinesWzCurves";
import connectIntersectedLinesWzArc from "./ConnectIntersectedLinesWzArc";
import capParaLinesWzCwArc from "./capParaLinesWzCwArc";

import buildQuadrilateralFromVectors from "./BuildQuadrilateralFromVectors";

import shiftConnectedParaLines from "./ShiftConnectedParaLines";
import svgStrToShapesArray from "./SvgStrToShapesArray";

import rotateVectorCcw from "./RotateVectorCcw";


/**/
const sharedGeometryLib = {
	getIntersectedPointBySlopeAndIntersect: getIntersectedPointBySlopeAndIntersect,

	getIntersectedPointByPoints: getIntersectedPointByPoints,

	getIntersectPointOfSegmentAndLineByAB: getIntersectPointOfSegmentAndLineByAB,

	getIntersectPointOfSegmentAndCircle: getIntersectPointOfSegmentAndCircle,

	getIntersectPointOnTwoSegments: getIntersectPointOnTwoSegments,

	getPerpendicularLineBySlopAndIntersect: getPerpendicularLineBySlopAndIntersect,

	getPerpendicularLineByTwoPoints: getPerpendicularLineByTwoPoints,

	getPointOnCircleBySlopAndIntersect: getPointOnCircleBySlopAndIntersect,

	getDistBtwTwoPoints: getDistBtwTwoPoints,

	getDistFromPointToLine: getDistFromPointToLine,

	getPointMovedDistFromAtoB: getPointMovedDistFromAtoB,

	getTangentPointsOf3pAndRadius: getTangentPointsOf3pAndRadius,

	getTangentCenterPoint: getTangentCenterPoint,

	getCcwAngleBtwTwoLine: getCcwAngleBtwTwoLine,

	getCcwAngleBtwTwoVectors: getCcwAngleBtwTwoVectors,

	getArc: getArc,

	getAbFromTwoPoints: getAbFromTwoPoints,

	getDashShapesAlongCurves: getDashShapesAlongCurves,

	getVectorsOnBzConnectParaLines: getVectorsOnBzConnectParaLines,

	testIfPointOnLineBySlopeAndIntersect: testIfPointOnLineBySlopeAndIntersect,

	testIfPointOnLineByTwoPoints: testIfPointOnLineByTwoPoints,

	testIfPointBtwTwoPoints: testIfPointBtwTwoPoints,

	connectParaLinesWzCurves: connectParaLinesWzCurves,

	connectIntersectedLinesWzArc: connectIntersectedLinesWzArc,

	capParaLinesWzCwArc: capParaLinesWzCwArc,

	buildQuadrilateralFromVectors: buildQuadrilateralFromVectors,

	shiftConnectedParaLines: shiftConnectedParaLines,

	svgStrToShapesArray: svgStrToShapesArray,

	rotateVectorCcw: rotateVectorCcw,

};


export default sharedGeometryLib;

