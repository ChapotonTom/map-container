import React, { useState, useRef } from "react";
import { Stage, Layer, Group } from "react-konva";
import SrcImage from "./components/SrcImage";

import Map from "./assets/map.png";
import Marker from "./assets/marker.png";
import Reset from "./assets/reset.png";

export const App = () => {
  const [markers, setMarkers] = useState([]);
  const width = 1024;
  const height = 768;

  const groupRef = useRef(null);

  const handleDrag = (pos) => {
    let posLimit = pos;
    if (pos.x > 890) posLimit.x = 890;
    if (pos.x < -1140) posLimit.x = -1140;
    if (pos.y > 590) posLimit.y = 590;
    if (pos.y < -930) posLimit.y = -930;
    return posLimit;
  };

  const handleMapRightClick = (e) => {
    e.evt.preventDefault();
    const pointerPositions = groupRef.current.getRelativePointerPosition();
    const markerPositionX = pointerPositions.x - 45;
    const markerPositionY = pointerPositions.y - 130;
    setMarkers([...markers, { x: markerPositionX, y: markerPositionY }]);
  };

  const handleMouseStyle = (e, cursorType) => {
    const container = e.target.getStage().container();
    container.style.cursor = cursorType;
  };

  return (
    <div style={{ width, height, margin: "auto", marginTop: "10vh" }}>
      <Stage width={width} height={height}>
        <Layer>
          <Group
            ref={groupRef}
            draggable={true}
            onMouseEnter={(e) => handleMouseStyle(e, "grab")}
            dragBoundFunc={handleDrag}
            onContextMenu={handleMapRightClick}
          >
            <SrcImage
              src={Map}
              width={width}
              height={height}
              x={-900}
              y={-600}
              scaleX={3}
              scaleY={3}
            />
            {markers.map((marker, index) => (
              <SrcImage key={index} src={Marker} x={marker.x} y={marker.y} />
            ))}
          </Group>
          <SrcImage
            src={Reset}
            x={960}
            y={10}
            onClick={() => setMarkers([])}
            onMouseEnter={(e) => handleMouseStyle(e, "pointer")}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
