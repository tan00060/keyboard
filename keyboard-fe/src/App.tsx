import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import KeyboardInformation from "./Component/KeyboardInformation/KeyboardInformation";
import CreateKeyboard from "./Component/CreateKeyboard/CreateKeyboard";
import Header from "./Component/Header/Header";
import CreateSwitch from "./Component/CreateSwitch/CreateSwitch";
import ViewSwitches from "./Component/ViewSwitches/ViewSwitches";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/keyboard-information/:id"
          element={<KeyboardInformation />}
        />
        <Route path="/create-keyboard" element={<CreateKeyboard />} />
        <Route path="/create-switch" element={<CreateSwitch />} />
        <Route path="/switches" element={<ViewSwitches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
