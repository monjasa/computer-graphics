import React from "react";

import "./style/App.css"

import {MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";

const App: React.FC = () => {

  return (
    <div>
      <MDBNavbar color="elegant-color" dark expand="sm">
        <MDBNavbarBrand>
          <MDBNavLink to="/">
            <strong className="white-text">Computer Graphics</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/fractals">Fractals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/colors">Colors</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/affine-transformations">Affine Transformations</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/reference">Reference</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
  );
}

export default App;