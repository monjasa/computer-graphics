import React, { useState } from "react";
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

    const[k, setK] = useState(3);
    const[colors, setColors] = useState([
        new Color(60, 75, 40),
        new Color(120, 75, 40),
        new Color(190, 75, 40),
        new Color(240, 75, 40)
    ]);

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

        let kLabel = p5.createElement('p', 'Choose k');
        kLabel.position(20, 20);
        let kRadio = p5.createRadio();
        kRadio.position(20, 40);
        createOption(kRadio, '3');
        createOption(kRadio, '4');

        // @ts-ignore
        kRadio.selected('3');
        kRadio.mouseClicked(() => {
            setK(parseInt(kRadio.value().toString()));
            p5.clear();
            p5.redraw();
        });

        let cLabel = p5.createElement('p', 'Choose color');
        cLabel.position(20, 100);
        let cRadio = p5.createRadio();
        cRadio.position(20, 120);

        createOption(cRadio, 'colors 1');
        createOption(cRadio, 'colors 2');
        createOption(cRadio, 'colors 3');

        cRadio.mouseClicked(() => {
            if (cRadio.value() === 'colors 1') {
                setColors([
                    new Color(240, 75, 40),
                    new Color(190, 75, 40),
                    new Color(120, 75, 40),
                    new Color(60, 75, 40)
                ]);
            } else if (cRadio.value() === 'colors 2') {
                setColors([
                    new Color(51, 88, 40),
                    new Color(182, 78, 40),
                    new Color(319, 98, 40),
                    new Color(88, 98, 40)
                ]);
            } else if (cRadio.value() === 'colors 3') {
                setColors([
                    new Color(107, 98, 40),
                    new Color(241, 100, 40),
                    new Color(340, 98, 40),
                    new Color(21, 93, 40)
                ]);
            }

            p5.clear();
            p5.redraw();
        });
    };

    const mouseClicked = (p5: p5Types) => {
        /*console.log(p5.mouseX);
        console.log(p5.mouseY);*/
    }

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

                if (k === 3) {
                    if (Math.abs(currentPoint.x - 1) < epsilon) {
                        pointColor = colors[0];
                    } else {
                        pointColor = currentPoint.y > 0
                            ? colors[1]
                            : colors[2];
                    }
                } else if (k === 4) {
                    if (Math.abs(currentPoint.x - 1) < epsilon)
                        pointColor = colors[0];
                    else if (Math.abs(currentPoint.x + 1) < epsilon)
                        pointColor = colors[1];
                    else if (Math.abs(currentPoint.y - 1) < epsilon)
                        pointColor = colors[2];
                    else if (Math.abs(currentPoint.y + 1) < epsilon)
                        pointColor = colors[3];
                }

                let alpha = (iteration / 20) + 0.5;
                let color = p5.color(pointColor.hue, pointColor.saturation, pointColor.lightness, alpha);

                writeColor(p5, img, color, x, y);
            }
        }

        img.updatePixels();
        p5.image(img, 0, 0);
    };

    const createOption = (el: p5Types.Element, value: string): void => {
        // @ts-ignore
        el.option(value);
    }

    const computeFunction = (point: Point): Point => {
        return k === 3
            ? point.multiply(point).multiply(point).add(new Point(props.constValue, 0.0))
            : point.multiply(point).multiply(point).multiply(point).add(new Point(props.constValue, 0.0));
    }

    const computeFunctionDerivative = (point: Point): Point => {
        return k === 3
            ? new Point(3, 0).multiply(point).multiply(point)
            : new Point(4, 0).multiply(point).multiply(point).multiply(point);
    }

    const getNextIteration = (point: Point): Point => {
        return point.subtract(computeFunction(point).divide(computeFunctionDerivative(point)));
    }

    return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked}/>;
};

