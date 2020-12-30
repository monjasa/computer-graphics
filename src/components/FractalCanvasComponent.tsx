import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import Point from "../utils/Point";

interface CanvasProps {
  width: number,
  height: number,
  constValue: number,
  orderValue: number,
  hueValues: number[]
  saveImageIndicator: number
}

const FractalCanvasComponent: React.FC<CanvasProps> = (props: CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null) as MutableRefObject<HTMLCanvasElement>;
  const contextRef = useRef<CanvasRenderingContext2D>(null) as MutableRefObject<CanvasRenderingContext2D>;

  const [abs, setAbs] = useState(8);
  const [xOffset, setXOffset] = useState(4);
  const [yOffset, setYOffset] = useState(4);

  const epsilon = 0.001;

  useEffect(() => {
    if (props.saveImageIndicator)
    saveImage();
  }, [props.saveImageIndicator]);

  const downloadURI = (uri, name) => {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const saveImage = () => {
    let dataURL = canvasRef.current.toDataURL();
    downloadURI(dataURL, 'fractal.png');
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = props.width;
    canvas.height = props.height;

    contextRef.current = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.addEventListener("click", zoom);
  }, []);

  useEffect(() => {
    setAbs(8);
    setXOffset(4);
    setYOffset(4);
  }, [props.orderValue])

  useEffect(() => {
    const context = contextRef.current;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (let x = 0; x < props.width; x++) {
      for (let y = 0; y < props.height; y++) {

        let initialPoint = new Point((x / props.width) * abs - xOffset, (y / props.height) * abs - yOffset);

        let previousPoint = getNextIteration(initialPoint);
        let currentPoint = getNextIteration(previousPoint);

        let iteration = 0;

        while (currentPoint.subtract(previousPoint).getAbsoluteValue() > epsilon && iteration <= 500) {
          previousPoint = currentPoint;
          currentPoint = getNextIteration(currentPoint);
          iteration++;
        }

        let alpha = ((iteration / 20) + 0.5);

        if (props.orderValue === 3) {
          if (Math.abs(currentPoint.x - 1) < epsilon) {
            context.fillStyle = 'hsla(' + props.hueValues[0] + ',100%,50%,' + alpha + ')';
          } else {
            context.fillStyle = currentPoint.y > 0
              ? 'hsla(' + props.hueValues[1] + ', 100%, 50%, ' + alpha + ')'
              : 'hsla(' + props.hueValues[2] + ', 100%, 50%, ' + alpha + ')';
          }
        } else if (props.orderValue === 4) {
          if (Math.abs(currentPoint.x - 1) < epsilon)
            context.fillStyle = 'hsla(' + props.hueValues[0] + ', 100%, 50%, ' + alpha + ')';
          else if (Math.abs(currentPoint.x + 1) < epsilon)
            context.fillStyle = 'hsla(' + props.hueValues[1] + ', 100%, 50%, ' + alpha + ')';
          else if (Math.abs(currentPoint.y - 1) < epsilon)
            context.fillStyle = 'hsla(' + props.hueValues[2] + ', 100%, 50%, ' + alpha + ')';
          else if (Math.abs(currentPoint.y + 1) < epsilon)
            context.fillStyle = 'hsla(' + props.hueValues[3] + ', 100%, 50%, ' + alpha + ')';
        }
        context.fillRect(x, y, 1, 1);
      }
    }
  }, [props.orderValue, props.hueValues, abs]);

  const zoom = (e: MouseEvent) => {
    let cRect = canvasRef.current.getBoundingClientRect();
    let canvasX = Math.round(e.clientX - cRect.left);
    let canvasY = Math.round(e.clientY - cRect.top);
    console.log(canvasX + " " + canvasY);
    setAbs(prev => prev / 2);
    setXOffset(abs * (1 - canvasX / props.width));
    setYOffset(abs * (1 - canvasY / props.height));
  }

  const computeFunction = (point: Point): Point => {
    return props.orderValue === 3
      ? point.multiply(point).multiply(point).add(new Point(props.constValue, 0.0))
      : point.multiply(point).multiply(point).multiply(point).add(new Point(props.constValue, 0.0));
  }

  const computeFunctionDerivative = (point: Point): Point => {
    return props.orderValue === 3
      ? new Point(3, 0).multiply(point).multiply(point)
      : new Point(4, 0).multiply(point).multiply(point).multiply(point);
  }

  const getNextIteration = (point: Point): Point => {
    return point.subtract(computeFunction(point).divide(computeFunctionDerivative(point)));
  }

  return (<canvas ref={canvasRef}/>);
}

export default FractalCanvasComponent;