import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface CanvasComponentProps {
  width: number,
  height: number
}

export const CanvasComponent: React.FC<CanvasComponentProps> = (props: CanvasComponentProps) => {

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(props.width, props.height).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {

  };

  return <Sketch setup={setup} draw={draw} />;
};

