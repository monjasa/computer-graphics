import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'

import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from "react-router-dom";

import App from "./App";

import FractalsView from "./views/FractalsView";
import ColorsView from "./views/ColorsView";
import MainView from "./views/MainView";
import AffineTransformationsView from "./views/AffineTransformationsView";
import ReferenceView from "./views/ReferenceView";

ReactDOM.render((
  <BrowserRouter>
    <App />
    <Switch>
      <Route exact path="/" component={MainView} />
      <Route path='/fractals' component={FractalsView} />
      <Route path='/colors' component={ColorsView} />
      <Route path='/affine-transformations' component={AffineTransformationsView} />
      <Route path='/reference' component={ReferenceView} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
