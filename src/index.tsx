import React from 'react';
import ReactDOM from 'react-dom';

import {CanvasComponent} from "./components/CanvasComponent";

ReactDOM.render(
  <React.StrictMode>
    <CanvasComponent height={800} width={800} />
  </React.StrictMode>,
  document.getElementById('root')
);
