import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface CanvasComponentProps {
  width: number,
  height: number,
  constValue: number,
  orderValue: number,
  hueValues: number[]
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

    p5.colorMode(p5.HSL, 360, 100, 100, 1);
    p5.createCanvas(props.width, props.height).parent(canvasParentRef);

    let img = p5.createImage(props.width, props.height);
    img.loadPixels();

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {

        let initialPoint = new Point((x / img.width) * 2 - 1, (y / img.height) * 2 - 2);

        let previousPoint = getNextIteration(initialPoint);
        let currentPoint = getNextIteration(previousPoint);

        let iteration = 0;

        while (Math.abs(currentPoint.x - previousPoint.x) > epsilon * epsilon) {
          previousPoint = currentPoint;
          currentPoint = getNextIteration(currentPoint);
          iteration++;
        }

        let pointColor = p5.color(0, 0, 0, 1);
        let alpha = (iteration / 20) + 0.5;

        if (Math.abs(currentPoint.x - 1) < epsilon) {
          pointColor = p5.color(props.hueValues[0], 80, 40, alpha);
        } else {
          pointColor = currentPoint.y > 0
            ? p5.color(props.hueValues[1], 80, 40, alpha)
            : p5.color(props.hueValues[2], 80, 40, alpha);
        }

        writeColor(p5, img, pointColor, x, y);
      }
    }

    img.updatePixels();
    p5.image(img, 0, 0);
  };

  const draw = (p5: p5Types) => {

  }

  const mouseClicked = (p5: p5Types) => {
    p5.saveCanvas("out.png");
  };

  const computeFunction = (point: Point): Point => {
    return props.orderValue === 3
      ? point.multiply(point).multiply(point).add(new Point(props.constValue, 0.0))
      : point;
  }

  const computeFunctionDerivative = (point: Point): Point => {
    return props.orderValue === 3
      ? new Point(3, 0).multiply(point).multiply(point)
      : point;
  }

  const getNextIteration = (point: Point): Point => {
    return point.subtract(computeFunction(point).divide(computeFunctionDerivative(point)));
  }

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};

class Point {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  multiply(point: Point): Point {
    return new Point(
      this.x * point.x - this.y * point.y,
      this.y * point.x + this.x * point.y
    );
  }

  divide(point: Point): Point {
    const denominator = point.x * point.x + point.y * point.y;
    return new Point(
      (this.x * point.x + this.y * point.y) / denominator,
      (this.y * point.x - this.x * point.y) / denominator
    );
  }
}

