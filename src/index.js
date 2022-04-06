import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from "./elements/navbar/navbar.js";
import "./css/index.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
      <Navbar />
  </React.StrictMode>,
  document.getElementById('navbar')
);