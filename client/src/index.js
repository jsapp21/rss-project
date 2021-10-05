import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import '@fontsource/roboto';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/">
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById('root'),
);
