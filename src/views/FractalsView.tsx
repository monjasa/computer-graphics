import React, {MutableRefObject, useRef, useState} from "react";
import {MDBBtn, MDBContainer} from "mdbreact";
import FractalCanvasComponent from "../components/FractalCanvasComponent";

const FractalsView: React.FC = () => {

  const [k, setK] = useState(3);
  const [hueValues, setHueValues] = useState([50, 270, 320, 5]);

  const changeK = (k: number) => {
    setK(k);
  }

  const changeHueValues = (hueValues: number[]) => {
    setHueValues(hueValues);
  }

  return (
    <section className="m-5">
      <h1 className="text-center">Newton Fractals</h1>

      <MDBContainer className="text-center mt-5">
        <FractalCanvasComponent  height={800} width={800} constValue={-1} orderValue={k} hueValues={hueValues} />

        <MDBContainer className="ml-3 text-center">
          <div className="d-flex flex-column">
            <div className="mt-2 text-left">
              <h3>Choose power</h3>
            </div>
            <div className="my-2 text-left">
              <div className="form-check">
                <input onClick={() => changeK(3)} className="form-check-input" type="radio" name="power"
                       id="power-cubic" value="3" defaultChecked />
                <label className="form-check-label" htmlFor="power-cubic">Cubic (k = 3)</label>
              </div>
              <div className="form-check">
                <input onClick={() => changeK(4)} className="form-check-input" type="radio" name="power"
                       id="power-quartic" value="4" />
                <label className="form-check-label" htmlFor="power-quartic">Quartic (k = 4)</label>
              </div>
            </div>

            <div className="mt-4 text-left">
              <h3 className=""><label htmlFor="colors">Choose color palette</label></h3>
            </div>
            <div className="text-left">
              <select onChange={e => changeHueValues(e.target.value
                .split(',')
                .map(n => parseInt(n, 10)))} className="custom-select" name="colors">
                <option value="50, 270, 320, 5" selected>Summer Berries</option>
                <option value="10, 120, 280, 160">Urban Gypsy</option>
                <option value="80, 310, 340, 15">Mellow Sunset</option>
              </select>
            </div>
            <div className="mt-4 text-left">
              <MDBBtn color="elegant" block>Save Image</MDBBtn>
            </div>
          </div>
        </MDBContainer>
      </MDBContainer>
    </section>
  );
}

export default FractalsView;