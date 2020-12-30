import React, {useState} from "react";
import {Arrow, Layer, Line, RegularPolygon, Stage, Text} from "react-konva";
import Point from "../utils/Point";
import Konva from "konva";
import {MDBBtn, MDBContainer} from "mdbreact";

interface AffineProps {
  height: number,
  width: number
}

const AffineTransformationsComponent: React.FC<AffineProps> = (props: AffineProps) => {

  const [snapSize, setSnapSize] = useState(50);

  const gridLayerRef = React.useRef<Konva.Layer>(null);
  const hexagonRef = React.useRef<Konva.RegularPolygon>(null);

  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [radius, setRadius] = useState(50);
  const [rotationAngle, setRotationAngle] = useState(270);
  const [scale, setScale] = useState(2);

  const hexagonPoint = new Point(x, y);

  const translatePoint = (point: Point, gridSnapSize = snapSize): Point => {
    return new Point(props.width / 2 + point.x * gridSnapSize, props.height / 2 - point.y * gridSnapSize);
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

    const tweenDuration = 5;

    const updatedSnapSize = snapSize / Math.sqrt(scale);
    const snapSizeDifference = (updatedSnapSize - snapSize) / 60 / tweenDuration;

    let tween = new Konva.Tween({
      node: hexagonRef.current!,
      duration: tweenDuration,
      easing: Konva.Easings.EaseInOut,
      onUpdate: () => setSnapSize(prevState => prevState + snapSizeDifference),
      x: translatePoint(hexagonPoint, updatedSnapSize).x,
      y: translatePoint(hexagonPoint, updatedSnapSize).y,
      rotation: rotationAngle,
      scaleX: Math.sqrt(scale),
      scaleY: Math.sqrt(scale)
    });

    setTimeout(() => tween.play(), 1000);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const hexagon = hexagonRef.current!;

    switch (event.target.value) {
      case "o": {
        hexagon.offsetX(0);
        hexagon.offsetY(0);
        break;
      }
      case "a": {
        hexagon.offsetX(0);
        hexagon.offsetY(-radius);
        hexagonPoint.y = -1;
        break;
      }
      case "b": {
        hexagon.offsetX(radius * Math.sqrt(3) / 2);
        hexagon.offsetY(-radius / 2);
        break;
      }
      case "c": {
        hexagon.offsetX(radius * Math.sqrt(3) / 2);
        hexagon.offsetY(radius / 2);
        break;
      }
      case "d": {
        hexagon.offsetX(0);
        hexagon.offsetY(radius);
        break;
      }
      case "e": {
        hexagon.offsetX(-radius * Math.sqrt(3) / 2);
        hexagon.offsetY(radius / 2);
        break;
      }
      case "f": {
        hexagon.offsetX(-radius * Math.sqrt(3) / 2);
        hexagon.offsetY(-radius / 2);
        break;
      }
    }
  };

  const RotationOrigins = {
    center: {
      id: RotationOrigin.Center,
      name: `O(${x}, ${y})`
    },
    a: {
      id: RotationOrigin.A,
      name: `A(${x}, ${(y + radius / snapSize).toFixed(2)})`
    },
    b: {
      id: RotationOrigin.B,
      name: `B(${(x + radius / snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y + radius / snapSize / 2).toFixed(2)})`
    },
    c: {
      id: RotationOrigin.C,
      name: `C(${(x + radius / snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y - radius / snapSize / 2).toFixed(2)})`
    },
    d: {
      id: RotationOrigin.D,
      name: `D(${x}, ${y - radius})`
    },
    e: {
      id: RotationOrigin.E,
      name: `E(${(x - radius /snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y - radius / snapSize/ 2).toFixed(2)})`
    },
    f: {
      id: RotationOrigin.F,
      name: `F(${(x - radius / snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y + radius / snapSize / 2).toFixed(2)})`
    }
  };


  return (
    <div>
      <MDBContainer className="text-center mt-5">
        <div>
          <Stage className="my-4" width={800} height={800}>
            <Layer ref={gridLayerRef}>
              {gridLines().map(item => (
                <Line
                  key={item.id()}
                  name={item.id()}
                  points={item.points()}
                  stroke={item.stroke()}
                  strokeWidth={item.strokeWidth()}/>
              ))}
            </Layer>
            <Layer>
              <Arrow
                points={[props.width / 2, props.height, props.width / 2, 0]}
                fill={'hsl(0, 0%, 15%)'}
                stroke={'hsl(0, 0%, 15%)'}
                strokeWidth={2}/>
              <Arrow
                points={[0, props.height / 2, props.width, props.height / 2]}
                fill={'hsl(0, 0%, 15%)'}
                stroke={'hsl(0, 0%, 15%)'}
                strokeWidth={2}/>
              <Line
                points={[props.width / 2 + snapSize, props.height / 2 + 5, props.width / 2 + snapSize, props.height / 2 - 5]}
                fill={'hsl(0, 0%, 15%)'}
                stroke={'hsl(0, 0%, 15%)'}
                strokeWidth={2}/>
              <Line
                points={[props.width / 2 - 5, props.height / 2 - snapSize, props.width / 2 + 5, props.height / 2 - snapSize]}
                fill={'hsl(0, 0%, 15%)'}
                stroke={'hsl(0, 0%, 15%)'}
                strokeWidth={2}/>
              <Text
                x={props.width - 20}
                y={props.height / 2 + 10}
                text={'x'}
                fontSize={16}
                fontStyle={'bold'}
                fill={'hsl(0, 0%, 15%)'}/>
              <Text
                x={props.width / 2 - 20}
                y={10}
                text={'y'}
                fontSize={16}
                fontStyle={'bold'}
                fill={'hsl(0, 0%, 15%)'}/>
              <Text
                x={props.width / 2 - 20}
                y={props.height / 2 + 10}
                text={'0'}
                fontSize={16}
                fontStyle={'bold'}
                fill={'hsl(0, 0%, 15%)'}/>
              <Text
                x={props.width / 2 + snapSize - 20}
                y={props.height / 2 + 20}
                text={'1.0'}
                fontSize={16}
                fontStyle={'bold'}
                fill={'hsl(0, 0%, 15%)'}/>
              <Text
                x={props.width / 2 - 40}
                y={props.height / 2 - snapSize}
                text={'1.0'}
                fontSize={16}
                fontStyle={'bold'}
                fill={'hsl(0, 0%, 15%)'}/>
            </Layer>
            <Layer>
              <RegularPolygon
                ref={hexagonRef}
                x={translatePoint(hexagonPoint).x}
                y={translatePoint(hexagonPoint).y}
                sides={6}
                radius={radius}
                fill={'hsl(40, 90%, 50%)'}/>
            </Layer>
          </Stage>
        </div>

        <MDBContainer className="ml-3 text-center">
          <div className="d-flex flex-column">

            <div className="mt-2 text-center">
              <h3>Origin position</h3>
            </div>
            <div className="row">
              <div className="col text-left">
                <div className="form-group">
                  <label>x</label>
                  <input type="number" className="form-control" defaultValue={x}
                         onChange={(e) => setX(parseInt(e.target.value))}/>
                </div>
              </div>
              <div className="col text-left">
                <div className="form-group">
                  <label>y</label>
                  <input type="number" className="form-control" defaultValue={y}
                         onChange={(e) => setY(parseInt(e.target.value))}/>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <h3>Hexagon radius</h3>
            </div>
            <div className="row">
              <div className="col text-left">
                <div className="form-group">
                  <input type="number" className="form-control" defaultValue={radius}
                         onChange={(e) => setRadius(parseInt(e.target.value))}/>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <h3>Rotation origin</h3>
            </div>
            <div className="row">
              <div className="col text-left">
                <div className="form-group">
                  <select className="custom-select" onChange={handleChange} name="rotation-origin">
                    {Object.keys(RotationOrigins).map(key => (
                      <option key={key} value={key}>
                        {RotationOrigins[key].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <h3>Rotation angle</h3>
            </div>
            <div className="row">
              <div className="col text-left">
                <div className="form-group">
                  <input type="number" className="form-control" defaultValue={rotationAngle}
                         onChange={(e) => setRotationAngle(parseInt(e.target.value))}/>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <h3>Scale</h3>
            </div>
            <div className="row">
              <div className="col text-left">
                <div className="form-group">
                  <input type="number" className="form-control" placeholder="2" defaultValue={scale}
                         onChange={(e) => setScale(parseInt(e.target.value))}/>
                </div>
              </div>
            </div>

            <div className="mt-4 text-left">
              <MDBBtn color="elegant" block onClick={handleClick}>Transform</MDBBtn>
            </div>

          </div>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
};

enum RotationOrigin {
  Center,
  A,
  B,
  C,
  D,
  E,
  F
}

export default AffineTransformationsComponent;