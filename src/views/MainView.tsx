import React from "react";

import fractalsCardImage from '../assets/images/fractals-card-image.jpg';
import colorsCardImage from '../assets/images/colors-card-image.jpg';

import {MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBLink} from "mdbreact";

const MainView: React.FC = () => {
  return (
    <section className="m-5">
      <h1 className="text-center">Computer Graphics</h1>

      <MDBCardGroup className="mt-5 col-8 offset-2">
        <MDBCard className="mx-4" style={{ width: "25rem" }}>
          <MDBCardImage className="img-fluid" src={fractalsCardImage} waves />
          <MDBCardBody>
            <MDBCardTitle>Newton Fractals</MDBCardTitle>
            <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in massa ex.
              Pellentesque luctus nisi sed dui gravida varius.
            </MDBCardText>
            <MDBLink to="/fractals">
              <MDBBtn color="elegant" block>Go</MDBBtn>
            </MDBLink>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mx-4" style={{ width: "25rem" }}>
          <MDBCardImage className="img-fluid" src={colorsCardImage} waves />
          <MDBCardBody>
            <MDBCardTitle>Colors Schemes</MDBCardTitle>
            <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum semper metus non leo porta, non rutrum libero ultrices.
            </MDBCardText>
            <MDBLink to="/colors">
              <MDBBtn color="elegant" block>Go</MDBBtn>
            </MDBLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </section>
  );
}

export default MainView;