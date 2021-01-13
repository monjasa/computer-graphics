import React, {useState} from "react";
import {Arrow, Layer, Line, RegularPolygon, Stage, Text} from "react-konva";
import Point from "../utils/Point";
import Konva from "konva";
import {MDBBtn, MDBContainer} from "mdbreact";
import ReactTooltip from "react-tooltip";

interface AffineProps {
  height: number,
  width: number
}

const AffineTransformationsComponent: React.FC<AffineProps> = (props: AffineProps) => {

  const [snapSize, setSnapSize] = useState(50);

  const gridLayerRef = React.useRef<Konva.Layer>(null);
  const hexagonRef = React.useRef<Konva.RegularPolygon>(null);

  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [radius, setRadius] = useState(50);
  const [displayedRadius, setDisplayedRadius] = useState(1)
  const [rotationAngle, setRotationAngle] = useState(270);
  const [scale, setScale] = useState(2);

  const hexagonPoint = new Point(x, y);

  const changeRadius = (r: number) => {
    setRadius(r * snapSize);
    setDisplayedRadius(r);
  }

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
      name: `D(${x}, ${(y - radius / snapSize).toFixed(2)})`
    },
    e: {
      id: RotationOrigin.E,
      name: `E(${(x - radius / snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y - radius / snapSize / 2).toFixed(2)})`
    },
    f: {
      id: RotationOrigin.F,
      name: `F(${(x - radius / snapSize * Math.sqrt(3) / 2).toFixed(2)}, ${(y + radius / snapSize / 2).toFixed(2)})`
    }
  };


  return (
    <MDBContainer className="text-center">
      <div>
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
              fill={'#2e2e2e'}
              stroke={'#2e2e2e'}
              strokeWidth={1} />
            <Arrow
              points={[0, props.height / 2, props.width, props.height / 2]}
              fill={'#2e2e2e'}
              stroke={'#2e2e2e'}
              strokeWidth={1} />
            <Line
              points={[props.width / 2 + snapSize, props.height / 2 + 5, props.width / 2 + snapSize, props.height / 2 - 5]}
              fill={'#2e2e2e'}
              stroke={'#2e2e2e'}
              strokeWidth={1} />
            <Line
              points={[props.width / 2 - 5, props.height / 2 - snapSize, props.width / 2 + 5, props.height / 2 - snapSize]}
              fill={'#2e2e2e'}
              stroke={'#2e2e2e'}
              strokeWidth={1} />
            <Text
              x={props.width - 20}
              y={props.height / 2 + 15}
              text={'x'}
              fontSize={14}
              fontStyle={'bold'}
              fill={'#2e2e2e'} />
            <Text
              x={props.width / 2 - 20}
              y={10}
              text={'y'}
              fontSize={14}
              fontStyle={'bold'}
              fill={'#2e2e2e'} />
            <Text
              x={props.width / 2 - 20}
              y={props.height / 2 + 15}
              text={'0'}
              fontSize={14}
              fontStyle={'bold'}
              fill={'#2e2e2e'} />
            <Text
              x={props.width / 2 + snapSize - 10}
              y={props.height / 2 + 15}
              text={'1.0'}
              fontSize={14}
              fontStyle={'bold'}
              fill={'#2e2e2e'} />
            <Text
              x={props.width / 2 - 33}
              y={props.height / 2 - snapSize - 5}
              text={'1.0'}
              fontSize={14}
              fontStyle={'bold'}
              fill={'#2e2e2e'} />
          </Layer>
          <Layer>
            <RegularPolygon
              ref={hexagonRef}
              x={translatePoint(hexagonPoint).x}
              y={translatePoint(hexagonPoint).y}
              sides={6}
              radius={radius}
              fill={'hsl(40, 90%, 50%)'} />
          </Layer>
        </Stage>
      </div>

      <MDBContainer className="text-center">
        <div className="d-flex flex-column">
          <div className="mt-2 text-left">
            <h3>Origin position <i className="fas fa-question-circle fa-xs" data-tip="Tooltip text" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="row">
            <div className="col text-left">
              <div className="form-group">
                <label>x</label>
                <input type="number" className="form-control" defaultValue={x}
                       onChange={(e) => setX(parseInt(e.target.value))} />
              </div>
            </div>
            <div className="col text-left">
              <div className="form-group">
                <label>y</label>
                <input type="number" className="form-control" defaultValue={y}
                       onChange={(e) => setY(parseInt(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="mt-2 text-left">
            <h3>Hexagon radius <i className="fas fa-question-circle fa-xs" data-tip="Tooltip text" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="row">
            <div className="col text-left">
              <div className="form-group">
                <input type="number" className="form-control" defaultValue={displayedRadius}
                       onChange={(e) => changeRadius(parseInt(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="mt-2 text-left">
            <h3>Rotation origin <i className="fas fa-question-circle fa-xs" data-tip="Tooltip text" /></h3>
            <ReactTooltip place="right" effect="solid" />
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

          <div className="mt-2 text-left">
            <h3>Rotation angle <i className="fas fa-question-circle fa-xs" data-tip="Tooltip text" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="row">
            <div className="col text-left">
              <div className="form-group">
                <input type="number" className="form-control" defaultValue={rotationAngle}
                       onChange={(e) => setRotationAngle(parseInt(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="mt-2 text-left">
            <h3>Hexagon scale <i className="fas fa-question-circle fa-xs" data-tip="Tooltip text" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="row">
            <div className="col text-left">
              <div className="form-group">
                <input type="number" className="form-control" placeholder="2" defaultValue={scale}
                       onChange={(e) => setScale(parseInt(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="mt-2 text-left">
            <MDBBtn color="elegant" block onClick={handleClick}>Transform</MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </MDBContainer>
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