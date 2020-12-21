import React, {useState} from "react";

import "./style/App.css"

import FractalCanvasComponent from "./components/FractalCanvasComponent";

import {MDBContainer} from "mdbreact";

const App: React.FC = () => {

  const [k, setK] = useState(3);
  const [hueValues, setHueValues] = useState([10, 120, 280, 160]);

  const changeK = (k: number) => {
    setK(k);
  }

  const changeHueValues = (hueValues: number[]) => {
    setHueValues(hueValues);
  }

  return (
    <div>
      <h2 className="text-center mt-5">Newton Fractals</h2>

      <MDBContainer className="text-center my-5">
        <FractalCanvasComponent height={800} width={800} constValue={-1} orderValue={k} hueValues={hueValues} />

        <MDBContainer className="ml-3 text-center">
          <div className="d-flex flex-column">
            <div className="p-2 text-left"><h3>Choose power</h3></div>
            <div className="p-2 text-left">
              <div className="form-check">
                <input onClick={() => changeK(3)} className="form-check-input" type="radio" name="power"
                       id="power-cubic" value="3" checked />
                <label className="form-check-label" htmlFor="power-cubic">Cubic (k = 3)</label>
              </div>
              <div className="form-check">
                <input onClick={() => changeK(4)} className="form-check-input" type="radio" name="power"
                       id="power-quartic" value="4" />
                <label className="form-check-label" htmlFor="power-quartic">Quartic (k = 4)</label>
              </div>
            </div>
            <div className="p-2 text-left"><h3><label htmlFor="colors">Choose color palette</label></h3></div>
            <div className="p-2 text-left">
              <select onChange={e => changeHueValues(e.target.value
                .split(',')
                .map(n => parseInt(n, 10)))} className="custom-select" name="colors">
                <option value="10, 120, 280, 160" selected>Urban Gypsy</option>
                <option value="50, 270, 320, 5">Summer Berry</option>
                <option value="80, 310, 340, 15">Mellow Rain</option>
              </select>
            </div>
          </div>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}

export default App;