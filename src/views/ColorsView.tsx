import React from "react";
import {MDBBtn, MDBContainer} from "mdbreact";
import {ColorSchemeComponent} from "../components/ColorSchemeComponent";

const ColorsView: React.FC = () => {
  return (
    <section className="m-5">
        <h1 className="text-center">Color Schemes</h1>

        <MDBContainer className="text-center mt-5">
            <ColorSchemeComponent height={500} width={500}/>
        </MDBContainer>
    </section>
  );
}

export default ColorsView;