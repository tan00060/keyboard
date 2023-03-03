import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import KeyboardInformation from "./Component/KeyboardInformation/KeyboardInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/keyboard-information/:id"
          element={<KeyboardInformation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
