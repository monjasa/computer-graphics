import React, {useState} from "react";
import {MDBBtn, MDBContainer} from "mdbreact";
import FractalCanvasComponent from "../components/FractalCanvasComponent";
import ReactTooltip from "react-tooltip";

const FractalsView: React.FC = () => {

  const [k, setK] = useState(3);
  const [hueValues, setHueValues] = useState([50, 270, 320, 5]);

  const changeK = (k: number) => {
    setK(k);
  }

  const changeHueValues = (hueValues: number[]) => {
    setHueValues(hueValues);
  }

  const [saveIndicator, doSave] = useState(0);

  return (
    <section className="m-5">
      <h1 className="text-center">Newton Fractals</h1>
      <h3 className="text-center">F(z)=z<sup>k</sup>+c</h3>
      <MDBContainer className="text-center mt-5">
        <FractalCanvasComponent height={700} width={700} constValue={-1} orderValue={k} hueValues={hueValues}
                                saveImageIndicator={saveIndicator} />
        <MDBContainer className="text-center">
          <div className="d-flex flex-column">
            <div className="mt-2 text-left">
              <h3>Polynomial degree <i className="fas fa-question-circle fa-xs" data-tip="Choose power k for polynomial" /></h3>
              <ReactTooltip place="right" effect="solid" />
            </div>
            <div className="my-2 text-left">
              <div className="form-check">
                <input onClick={() => changeK(3)} className="form-check-input" type="radio" name="power"
                       id="power-cubic" value="3" defaultChecked />
                <label className="form-check-label" htmlFor="power-cubic">Cubic &ndash; 3<sup>rd</sup> power</label>
              </div>
              <div className="form-check">
                <input onClick={() => changeK(4)} className="form-check-input" type="radio" name="power"
                       id="power-quartic" value="4" />
                <label className="form-check-label" htmlFor="power-quartic">Quartic &ndash; 4<sup>th</sup> power</label>
              </div>
            </div>

            <div className="mt-4 text-left">
              <h3>Color palette <i className="fas fa-question-circle fa-xs" data-tip="Choose color palette for fractal display" /></h3>
              <ReactTooltip place="right" effect="solid" />
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
            <div className="mt-3 text-left">
              <MDBBtn color="elegant" block onClick={() => doSave(prev => prev + 1)}>Save Image</MDBBtn>
            </div>
          </div>
        </MDBContainer>
      </MDBContainer>
    </section>
  );
}

export default FractalsView;