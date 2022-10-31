
import SharedGeometryLib from "../../../../../SharedGeometryLib";
import laneMovArrows from "../../../../../PredefinedShapes/LaneMovArrows";

const drawLaneArrowColor = (lane, colorHexCode) => {
  if (lane.laneArrow) {
    lane.laneArrow.material.color.setHex(colorHexCode);
  }
};


export default drawLaneArrowColor;
