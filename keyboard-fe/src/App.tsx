import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import KeyboardInformation from "./Component/KeyboardInformation/KeyboardInformation";
import CreateKeyboard from "./Component/CreateKeyboard/CreateKeyboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/keyboard-information/:id"
          element={<KeyboardInformation />}
        />
        <Route path="/create-keyboard" element={<CreateKeyboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
