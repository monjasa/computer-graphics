import React, {useEffect, useState} from "react";
import useImage from "use-image";
import {Image, Layer, Stage} from 'react-konva';
import Konva from "konva";
import Color from "../utils/Color";
import {MDBBtn, MDBContainer} from "mdbreact";
import ReactTooltip from "react-tooltip";

interface ColorSchemeProps {
  imageSource: string,
  imgHeight: number,
  imgWidth: number
}

const ColorsCanvasComponent: React.FC<ColorSchemeProps> = (props: ColorSchemeProps) => {

  const [image] = useImage(props.imageSource);
  const [imageNode, setImageNode] = useState<Konva.Image>();
  const [pointRGBColor, setPointRGBColor] = useState<Color>(new Color(0, 0, 0));
  const [pointHSLColor, setPointHSLColor] = useState<Color>(new Color(0, 0, 0));
  const [hue, setHue] = useState<number>(0);
  const [lightness, setLightness] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);


  const convertRGBtoHSL = (r: number, g: number, b: number): [number, number, number] => {

    r = r / 255;
    g = g / 255;
    b = b / 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    let l = (min + max) / 2;

    let s = 0;
    let h = 0;

    if (l !== 0 && max !== min) {
      if (l <= 0.5)
        s = (max - min) / (max + min);
      else
        s = (max - min) / (2 - max - min);

      if (max === r && g >= b)
        h = ((g - b) / (max - min)) * 60;
      else if (max === r && g < b)
        h = ((g - b) / (max - min)) * 60 + 360;
      else if (max === g)
        h = ((b - r) / (max - min)) * 60 + 120
      else
        h = ((r - g) / (max - min)) * 60 + 240;
    }

    s *= 100;
    l *= 100;
    h = Number.parseInt(h.toFixed());
    s = Number.parseFloat(s.toFixed(2));
    l = Number.parseFloat(l.toFixed(2));

    return [h, s, l];
  }

  const convertHSLtoRGB = (h: number, s: number, l: number): [number, number, number] => {

    const findValue = (color: number): number => {
      if (6 * color < 1)
        return temp_2 + (temp_1 - temp_2) * 6 * color;
      else {
        if (2 * color < 1)
          return temp_1;
        else {
          if (3 * color < 2)
            return temp_2 + (temp_1 - temp_2) * (0.666 - color) * 6;
          else
            return temp_2;
        }
      }
    }

    s /= 100;
    l /= 100;

    if (h === 0 && s === 0) {
      const val = l * 255;
      return [val, val, val];
    }

    let temp_1: number, temp_2: number;

    if (l <= 0.5)
      temp_1 = l * (1 + s);
    else
      temp_1 = l + s - l * s;

    temp_2 = 2 * l - temp_1;

    h /= 360;

    let temp_R = h + 0.333;
    let temp_G = h;
    let temp_B = h - 0.333;

    temp_R = temp_R < 0 ? temp_R + 1 : temp_R;
    temp_G = temp_G < 0 ? temp_G + 1 : temp_G;
    temp_B = temp_B < 0 ? temp_B + 1 : temp_B;

    temp_R = temp_R > 1 ? temp_R - 1 : temp_R;
    temp_G = temp_G > 1 ? temp_G - 1 : temp_G;
    temp_B = temp_B > 1 ? temp_B - 1 : temp_B;

    let r = findValue(temp_R);
    let g = findValue(temp_G);
    let b = findValue(temp_B);

    r = Number.parseInt((r * 255).toFixed());
    g = Number.parseInt((g * 255).toFixed());
    b = Number.parseInt((b * 255).toFixed());

    return [r, g, b];
  }

  useEffect(() => {
    imageNode?.cache();
  }, [image]);

  useEffect(() => {
    imageNode?.cache();
    imageNode?.filters([Konva.Filters.HSL]);
    imageNode?.hue(hue);
    imageNode?.saturation(saturation);
    imageNode?.luminance(lightness);
    imageNode?.getLayer()?.batchDraw();
  }, [hue, saturation, lightness]);

  const handleMouseMove = () => {

    const x = imageNode?.getStage()?.getPointerPosition()?.x as number;
    const y = imageNode?.getStage()?.getPointerPosition()?.y as number;

    const context = imageNode?.getLayer()?.getCanvas()._canvas.getContext("2d") as CanvasRenderingContext2D;

    let red = context.getImageData(x, y, 1, 1).data[0];
    let green = context.getImageData(x, y, 1, 1).data[1];
    let blue = context.getImageData(x, y, 1, 1).data[2];

    setPointRGBColor(new Color(red, green, blue));

    const [h, s, l] = convertRGBtoHSL(red, green, blue)
    setPointHSLColor(new Color(h, s, l));
  }

  function downloadURI(uri, name) {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const saveImage = () => {
    let dataURL = imageNode?.getStage()?.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, 'color-scheme.png');
  }

  return (
    <MDBContainer>
      <div className="d-flex flex-column justify-content-center">
        <Stage className="my-4" width={props.imgWidth} height={props.imgHeight}>
          <Layer>
            <Image
              image={image}
              ref={node => setImageNode(node as Konva.Image)}
              width={props.imgWidth}
              height={props.imgHeight}
              onMouseMove={handleMouseMove}
            />
          </Layer>
        </Stage>
      </div>

      <MDBContainer className="ml-5">
        <div className="d-flex flex-column">
          <div className="text-left">
            <h3>Color components <i className="fas fa-question-circle fa-xs" data-tip="Pixel color data in RGB and HSL model" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="row mt-3">
            <div className="col text-left">
              <div className="form-group">
                <label>Red</label>
                <input type="number" className="form-control" value={pointRGBColor?.firstComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
            <div className="col text-left">
              <div className="form-group">
                <label>Green</label>
                <input type="number" className="form-control" value={pointRGBColor?.secondComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
            <div className="col text-left">
              <div className="form-group">
                <label>Blue</label>
                <input type="number" className="form-control" value={pointRGBColor?.thirdComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-left">
              <div className="form-group">
                <label>Hue</label>
                <input type="number" className="form-control" value={pointHSLColor?.firstComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
            <div className="col text-left">
              <div className="form-group">
                <label>Saturation</label>
                <input type="number" className="form-control" value={pointHSLColor?.secondComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
            <div className="col text-left">
              <div className="form-group">
                <label>Lightness</label>
                <input type="number" className="form-control" value={pointHSLColor?.thirdComponent} placeholder="0"
                       readOnly />
              </div>
            </div>
          </div>
          <div className="mt-4 text-left">
            <h3>Color grading <i className="fas fa-question-circle fa-xs" data-tip="Change HSL color parameters for image" /></h3>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <div className="mt-3 text-left">
            <label htmlFor="hue-range">Hue</label>
            <input type="range" min="0" max="360" step="1" id="hue-range" className={"custom-range"}
                   onChange={event => setHue(Number.parseFloat(event.target.value))} />

            <label htmlFor="saturation-range">Saturation</label>
            <input type="range" min="0" max="1" step="0.05" id="saturation-range" className={"custom-range"}
                   onChange={event => setSaturation(Number.parseFloat(event.target.value))} />

            <label htmlFor="lightness-range">Lightness</label>
            <input type="range" min="0" max="1" step="0.05" id="lightness-range" className={"custom-range"}
                   onChange={event => setLightness(Number.parseFloat(event.target.value))} />
          </div>
          <MDBBtn className="mt-4" color="elegant" block onClick={saveImage}>Save Image</MDBBtn>
        </div>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ColorsCanvasComponent;