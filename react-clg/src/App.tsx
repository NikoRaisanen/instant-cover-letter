import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/result" element={<Result/>} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
