import React from "react";
import {CanvasComponent} from "./components/CanvasComponent";
import {RadioButtons} from "./components/RadioButtons";

import "./style/App.css"

import Color from "./utils/Color";

const App: React.FC = () => {

  const defaultColors = [
    new Color(60, 75, 40),
    new Color(120, 75, 40),
    new Color(190, 75, 40),
    new Color(240, 75, 40)
  ];

  return (
    <div className={"container"}>
      <CanvasComponent height={800} width={800} constValue={-1} orderValue={4} colors={defaultColors} />

      <form>
        <RadioButtons />
      </form>
    </div>
  );
}

export default App;
