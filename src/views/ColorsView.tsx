import React, {useState} from "react";
import {MDBContainer} from "mdbreact";
import ColorsCanvasComponent from "../components/ColorsCanvasComponent";

const ColorsView: React.FC = () => {

  const [canvasKey, setCanvasKey] = useState(1);
  const [imageSrc, setImageSrc] = useState("./fire.jpg");
  const [imgSize, setImgSize] = useState([684, 500])

  const handleImageUpload = (e) => {

    const filePath = `./${e.target.files[0].name}`;

    const img = new Image();
    img.src = filePath;
    img.onload = () => {
      const coef = 684 / img.width;
      setImgSize(([coef * img.width, coef * img.height]));
    }
    setImageSrc(filePath);
    setCanvasKey(canvasKey + 1);
  }

  return (
    <section className="m-5">
      <h1 className="text-center">Color Schemes</h1>
      <div className="container col-4">
        <input className="mt-4 text-center form-white form-outline" type="file" onChange={handleImageUpload}/>
      </div>
      <MDBContainer className="text-center mt-4">
        <ColorsCanvasComponent key={canvasKey} imageSource={imageSrc} imgWidth={imgSize[0]} imgHeight={imgSize[1]}/>
      </MDBContainer>
    </section>
  );
}

export default ColorsView;