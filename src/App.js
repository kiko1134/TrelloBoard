import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PreHomepage from "./components/beforeHomepage/preHome";
import HomePage from "./components/homepage/homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PreHomepage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
