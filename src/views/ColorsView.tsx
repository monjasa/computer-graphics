import React, {useState} from "react";
import {MDBContainer} from "mdbreact";
import ColorsCanvasComponent from "../components/ColorsCanvasComponent";
import {Button} from "react-bootstrap";

const ColorsView: React.FC = () => {

  const [canvasKey, setCanvasKey] = useState(1);
  const [imageSrc, setImageSrc] = useState("./fire.jpg");

  const handleImageUpload = () => {
    setImageSrc('./mountains.jpg');
    setCanvasKey(canvasKey + 1);
  }

  return (
    <section className="m-5">
      <h1 className="text-center">Color Schemes</h1>
      <div className="container col-4">
      <Button className="mt-4 text-center" onClick={handleImageUpload} variant="elegant" block>Upload Image</Button>
      </div>
      <MDBContainer className="text-center mt-4">
        <ColorsCanvasComponent key={canvasKey} imageSource={imageSrc} />
      </MDBContainer>
    </section>
  );
}

export default ColorsView;