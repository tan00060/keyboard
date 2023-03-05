import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  createKeyboard,
  getKeyboardType,
  getSwitches,
} from "../../ApiCall/ApiCall";
import "./CreateKeyboard.scss";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
  let queryClient = useQueryClient();

  const [keyboardName, setKeyboardName] = useState("");
  const [keyboardType, setKeyboardType] = useState("");
  const [keyboardSwitches, setKeyboardSwitches] = useState("");
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

  const createKeyboardApiCall = useMutation({
    mutationFn: createKeyboard,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["keyboards"]);
      if (data.status.includes("Created Keyboard")) {
        naviagate(`/`);
      }
    },
  });

  const createKeyboardHandler = () => {
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
    createKeyboardApiCall.mutate(keyboardObj);
  };

  const clearButtonHandler = () => {
    setKeyboardName("");
    setKeyboardType("");
    setKeyboardSwitches("");
  };

  const getSwitchFromAPI = useQuery({
    queryKey: ["switches"],
    queryFn: async () => {
      const data = await getSwitches();
      return data;
    },
  });

  const getTypeFromApi = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const data = await getKeyboardType();
      return data;
    },
  });

  if (getSwitchFromAPI.isLoading) return <h1>loading</h1>;
  if (getSwitchFromAPI.isError) return <h1> error</h1>;
  if (getTypeFromApi.isLoading) return <h1>loading</h1>;
  if (getTypeFromApi.isError) return <h1> error</h1>;

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

            {getTypeFromApi.data.map((item: keyboardTypeProp) => (
              <option key={item.keyboard_type_id} value={item.keyboard_type_id}>
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

            {getSwitchFromAPI.data.map((item: switchProp) => (
              <option key={item.switch_id} value={item.switch_id}>
                {item.switch_name}
              </option>
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
