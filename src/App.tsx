import React, {useState} from "react";
import {CanvasComponent} from "./components/CanvasComponent";

import "./style/App.css"

import Color from "./utils/Color";

const App: React.FC = () => {

  const defaultColors = [
    new Color(60, 75, 40),
    new Color(120, 75, 40),
    new Color(190, 75, 40),
    new Color(240, 75, 40)
  ];

  const [k] = useState(3);

  return (
    <div className={"container"}>
      <CanvasComponent height={800} width={800} constValue={-1} orderValue={k} colors={defaultColors} />
    </div>
  );
}

export default App;
