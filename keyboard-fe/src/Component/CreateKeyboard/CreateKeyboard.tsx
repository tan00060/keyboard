import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  createKeyboard,
  getKeyboardType,
  getSwitches,
} from "../../ApiCall/ApiCall";
import "./CreateKeyboard.scss";

type switchProp = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

type keyboardTypeProp = {
  keyboard_type_id: number;
  keyboard_type_name: string;
};

const CreateKeyboard = () => {
  let naviagate = useNavigate();

  const [keyboardName, setKeyboardName] = useState("");
  const [keyboardType, setKeyboardType] = useState("");
  const [keyboardSwitches, setKeyboardSwitches] = useState("");
  const [apiSwitches, setApiSwitches] = useState([]);
  const [apiType, setApiType] = useState([]);
  const [requireName, setRequireName] = useState(false);

  const keyboardNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyboardName(e.target.value);
  };

  const keyboardSwitchHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setKeyboardSwitches(e.target.value);
  };

  const keyboardTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setKeyboardType(e.target.value);
  };

  const createKeyboardHandler = async () => {
    let keyboardObj = {
      keyboard_name: keyboardName.trim(),
      keyboard_type:
        keyboardType.trim() === "" ? null : parseInt(keyboardType.trim()),
      keyboard_switch:
        keyboardSwitches.trim() === ""
          ? null
          : parseInt(keyboardSwitches.trim()),
    };
    if (keyboardObj.keyboard_name.trim() === "") {
      setRequireName(true);
      return;
    }
    setRequireName(false);
    let createItem = await createKeyboard(keyboardObj);
    if (createItem.status.includes("Created Keyboard")) {
      naviagate("/");
    }
  };

  const clearButtonHandler = () => {
    setKeyboardName("");
    setKeyboardType("");
    setKeyboardSwitches("");
  };

  const getSwitchFromAPI = async () => {
    let switchesFromAPI = await getSwitches();
    if (switchesFromAPI) {
      setApiSwitches(switchesFromAPI);
    }
  };

  const getKeyboardTypeApi = async () => {
    let typeApi = await getKeyboardType();
    if (typeApi) {
      setApiType(typeApi);
    }
  };

  useEffect(() => {
    getSwitchFromAPI();
    getKeyboardTypeApi();
  }, []);

  return (
    <div className={"createKeyboardContainer"}>
      <div className="create-inputContainer">
        <label>
          <input
            value={keyboardName}
            placeholder="name"
            onChange={(e) => keyboardNameHandler(e)}
          ></input>

          {requireName ? " required *" : ""}
        </label>

        {/* keyboard type */}
        <label>
          <select value={keyboardType} onChange={(e) => keyboardTypeHandler(e)}>
            <option value="">Choose here</option>

            {apiType.map((item: keyboardTypeProp) => (
              <option value={item.keyboard_type_id}>
                {item.keyboard_type_name}
              </option>
            ))}
          </select>
        </label>

        {/* keyboard switches */}
        <label>
          <select
            value={keyboardSwitches}
            onChange={(e) => keyboardSwitchHandler(e)}
          >
            <option value="">Choose here</option>

            {apiSwitches.map((item: switchProp) => (
              <option value={item.switch_id}>{item.switch_name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="create-buttonContainer">
        <button className={"btnStyle"} onClick={() => clearButtonHandler()}>
          clear
        </button>
        <button className={"btnStyle"} onClick={() => createKeyboardHandler()}>
          create
        </button>
      </div>
    </div>
  );
};

export default CreateKeyboard;
