import React, { useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import useEditorStore from '../store/useEditorStore';

const CELL_SIZE = 10;

export default function EditorCanvas() {
  const { width, height, pixels, paintPixel } = useEditorStore();

  const handleClick = useCallback(
    (e: any) => {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      if (!point) return;
      const x = Math.floor(point.x / CELL_SIZE);
      const y = Math.floor(point.y / CELL_SIZE);
      paintPixel(x, y);
    },
    [paintPixel]
  );

  return (
    <Stage
      width={width * CELL_SIZE}
      height={height * CELL_SIZE}
      onClick={handleClick}
      style={{ border: '1px solid #ccc' }}
    >
      <Layer>
        {/* Grid background */}
        {Array.from({ length: width }).map((_, i) =>
          Array.from({ length: height }).map((_, j) => (
            <Rect
              key={`${i},${j}`}
              x={i * CELL_SIZE}
              y={j * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              stroke="#eee"
            />
          ))
        )}
        {/* Painted pixels */}
        {Object.entries(pixels).map(([key, color]) => {
          const [i, j] = key.split(',').map(Number);
          return (
            <Rect
              key={key}
              x={i * CELL_SIZE}
              y={j * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={color}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}