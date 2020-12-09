import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

import Color from "../utils/Color";
import Point from "../utils/Point";

interface CanvasComponentProps {
  width: number,
  height: number,
  constValue: number,
  orderValue: number,
  colors: Color[]
}

export const CanvasComponent: React.FC<CanvasComponentProps> = (props: CanvasComponentProps) => {

  const epsilon = 0.001;

  function writeColor(p5: p5Types, img: p5Types.Image, color: p5Types.Color, x: number, y: number) {
    const index = (x + y * img.width) * 4;
    img.pixels[index] = p5.red(color);
    img.pixels[index + 1] = p5.green(color);
    img.pixels[index + 2] = p5.blue(color);
    img.pixels[index + 3] = 255 * p5.alpha(color);
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {

    p5.noLoop();

    p5.colorMode(p5.HSL, 360, 100, 100, 1);
    p5.createCanvas(props.width, props.height).parent(canvasParentRef);

  };

  const draw = (p5: p5Types) => {
    let img = p5.createImage(props.width, props.height);
    img.loadPixels();

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {

        let initialPoint = new Point((x / img.width) * 4 - 2, (y / img.height) * 4 - 2);

        let previousPoint = getNextIteration(initialPoint);
        let currentPoint = getNextIteration(previousPoint);

        let iteration = 0;

        while (currentPoint.subtract(previousPoint).getAbsoluteValue() > epsilon && iteration <= 500) {
          previousPoint = currentPoint;
          currentPoint = getNextIteration(currentPoint);
          iteration++;
        }

        let pointColor = new Color(0, 0, 0);

        if (props.orderValue === 3) {
          if (Math.abs(currentPoint.x - 1) < epsilon) {
            pointColor = props.colors[0];
          } else {
            pointColor = currentPoint.y > 0
                ? props.colors[1]
                : props.colors[2];
          }
        } else if (props.orderValue === 4) {
          if (Math.abs(currentPoint.x - 1) < epsilon)
            pointColor = props.colors[0];
          else if (Math.abs(currentPoint.x + 1) < epsilon)
            pointColor = props.colors[1];
          else if (Math.abs(currentPoint.y - 1) < epsilon)
            pointColor = props.colors[2];
          else if (Math.abs(currentPoint.y + 1) < epsilon)
            pointColor = props.colors[3];
        }

        let alpha = (iteration / 20) + 0.5;
        let color = p5.color(pointColor.hue, pointColor.saturation, pointColor.lightness, alpha);

        writeColor(p5, img, color, x, y);
      }
    }

    img.updatePixels();
    p5.image(img, 0, 0);
  };

  const mouseClicked = (p5: p5Types) => {
    p5.clear();
    p5.redraw();
  };

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

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};

