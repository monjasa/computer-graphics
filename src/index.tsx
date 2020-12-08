import React from 'react';
import ReactDOM from 'react-dom';

import {CanvasComponent} from "./components/CanvasComponent";

ReactDOM.render(
  <CanvasComponent height={800} width={800} constValue={-1} orderValue={3} hueValues={[10, 120, 280]} />,
  document.getElementById('root')
);
