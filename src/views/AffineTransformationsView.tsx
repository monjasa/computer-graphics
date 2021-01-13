import React from "react";
import {MDBContainer} from "mdbreact";
import AffineTransformationsComponent from "../components/AffineTransformationsComponent";

const AffineTransformationsView: React.FC = () => {

  return (
    <section className="m-5">
      <h1 className="text-center">Affine Transformations</h1>
      <MDBContainer className="text-center mt-4">
        <AffineTransformationsComponent width={700} height={700} />
      </MDBContainer>
    </section>
  );
}

export default AffineTransformationsView;