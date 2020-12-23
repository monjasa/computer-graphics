import React, {useState} from "react";

import useImage from "use-image";

import {Image, Layer, Stage} from 'react-konva';

import Konva from "konva";
import Color from "../utils/Color";

interface ColorSchemeProps {
  imageSource: string
}

const ColorsCanvasComponent: React.FC<ColorSchemeProps> = (props: ColorSchemeProps) => {

  const [image] = useImage(props.imageSource);
  const [imageNode, setImageNode] = useState<Konva.Image>();
  const [pointColor, setPointColor] = useState<Color>();

  const handleMouseMove = () => {


    const x = imageNode?.getStage()?.getPointerPosition()?.x as number;
    const y = imageNode?.getStage()?.getPointerPosition()?.y as number;

    const context = imageNode?.getLayer()?.getCanvas()._canvas.getContext("2d") as CanvasRenderingContext2D;

    let red = context.getImageData(x, y, 1, 1).data[0];
    let green = context.getImageData(x, y, 1, 1).data[1];
    let blue = context.getImageData(x, y, 1, 1).data[2];

    setPointColor(new Color(red, green, blue));
  }

  return (
    <div>
      <Stage width={684} height={500}>
        <Layer>
          <Image
            image={image}
            ref={node => setImageNode(node as Konva.Image)}
            onMouseMove={handleMouseMove}
          />
        </Layer>
      </Stage>
      <div className="row mt-3">
        <div className="col text-left">
          <div className="form-group">
            <label>Red</label>
            <input type="number" className="form-control" value={pointColor?.firstComponent} placeholder="0" readOnly />
          </div>
        </div>
        <div className="col text-left">
          <div className="form-group">
            <label>Green</label>
            <input type="number" className="form-control" value={pointColor?.secondComponent} placeholder="0" readOnly />
          </div>
        </div>
        <div className="col text-left">
          <div className="form-group">
            <label>Blue</label>
            <input type="number" className="form-control" value={pointColor?.thirdComponent} placeholder="0" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsCanvasComponent;