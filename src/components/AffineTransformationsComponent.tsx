import React, {useState} from "react";
import {Arrow, Layer, Line, RegularPolygon, Stage, Text} from "react-konva";
import Point from "../utils/Point";
import Konva from "konva";
import {MDBBtn} from "mdbreact";

interface AffineProps {
  height: number,
  width: number
}

const AffineTransformationsComponent: React.FC<AffineProps> = (props: AffineProps) => {

  const [snapSize, setSnapSize] = useState(50);

  const gridLayerRef = React.useRef<Konva.Layer>(null);
  const hexagonRef = React.useRef<Konva.RegularPolygon>(null);

  const hexagonPoint = new Point(1, 1);

  const translatePoint = (point: Point): Point => {
    return new Point(props.width / 2 + point.x * snapSize, props.height / 2 - point.y * snapSize);
  }

  const gridLines = (): Konva.Line[] => {

    let lines = new Array<Konva.Line>();

    for (let i = 0; i < (props.width / 2) / snapSize; i++) {
      lines.push(new Konva.Line({
        id: `y-neg-${i}`,
        points: [props.width / 2 - Math.round(i * snapSize), 0, props.width / 2 - Math.round(i * snapSize), props.height],
        stroke: 'hsl(0, 0%, 80%)',
        strokeWidth: 1,
      }));

      lines.push(new Konva.Line({
        id: `y-pos-${i}`,
        points: [props.width / 2 + Math.round(i * snapSize), 0, props.width / 2 + Math.round(i * snapSize), props.height],
        stroke: 'hsl(0, 0%, 80%)',
        strokeWidth: 1,
      }));
    }

    for (let j = 0; j < (props.height / 2) / snapSize; j++) {
      lines.push(new Konva.Line({
        id: `x-pos-${j}`,
        points: [0, props.height / 2 - Math.round(j * snapSize), props.width, props.height / 2 - Math.round(j * snapSize)],
        stroke: 'hsl(0, 0%, 80%)',
        strokeWidth: 1,
      }));

      lines.push(new Konva.Line({
        id: `x-neg-${j}`,
        points: [0, props.height / 2 + Math.round(j * snapSize), props.width, props.height / 2 + Math.round(j * snapSize)],
        stroke: 'hsl(0, 0%, 80%)',
        strokeWidth: 1,
      }));
    }

    return lines;
  }

  const handleClick = () => {

    let tween = new Konva.Tween({
      node: hexagonRef.current!,
      duration: 5,
      easing: Konva.Easings.EaseInOut,
      rotation: 270,
      scaleX: 2,
      scaleY: 2
    });

    setTimeout(function () {
      tween.play();
    }, 1000);
  }

  return (
    <div>
      <div className="mt-4 text-left">
        <MDBBtn onClick={handleClick} color="elegant" block>Apply Tween</MDBBtn>
      </div>
      <Stage className="my-4" width={800} height={800}>
        <Layer ref={gridLayerRef}>
          {gridLines().map(item => (
            <Line
              key={item.id()}
              name={item.id()}
              points={item.points()}
              stroke={item.stroke()}
              strokeWidth={item.strokeWidth()} />
          ))}
        </Layer>
        <Layer>
          <Arrow
            points={[props.width / 2, props.height, props.width / 2, 0]}
            fill={'hsl(0, 0%, 15%)'}
            stroke={'hsl(0, 0%, 15%)'}
            strokeWidth={2} />
          <Arrow
            points={[0, props.height / 2, props.width, props.height / 2]}
            fill={'hsl(0, 0%, 15%)'}
            stroke={'hsl(0, 0%, 15%)'}
            strokeWidth={2} />
          <Text
            x={props.width - 20}
            y={props.height / 2 + 10}
            text={'x'}
            fontSize={16}
            fontStyle={'bold'}
            fill={'hsl(0, 0%, 15%)'} />
          <Text
            x={props.width / 2 - 20}
            y={10}
            text={'y'}
            fontSize={16}
            fontStyle={'bold'}
            fill={'hsl(0, 0%, 15%)'} />
          <Text
            x={props.width / 2 - 20}
            y={props.height / 2 + 10}
            text={'0'}
            fontSize={16}
            fontStyle={'bold'}
            fill={'hsl(0, 0%, 15%)'} />
        </Layer>
        <Layer>
          <RegularPolygon
            ref={hexagonRef}
            x={translatePoint(hexagonPoint).x}
            y={translatePoint(hexagonPoint).y}
            sides={6}
            radius={50}
            fill={'hsl(40, 90%, 50%)'} />
        </Layer>
      </Stage>
    </div>
  );
};

export default AffineTransformationsComponent;