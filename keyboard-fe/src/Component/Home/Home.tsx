import React, { useState, useEffect, MouseEvent } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { getKeyboards } from "../../ApiCall/ApiCall";
import { useNavigate } from "react-router";
import "./Home.scss";

const Home: React.FC = () => {
  let naviagate = useNavigate();

  const [apiData, setApiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  type apiDataProp = {
    keyboard_id: number;
    keyboard_keycaps: string;
    keyboard_name: string;
    keyboard_switches: string;
    keyboard_type: string;
  };

  const getKeyboardData = async () => {
    let data = await getKeyboards();
    if (data) {
      setApiData(data);
      console.log(data);
    }

    if (data.code === "ERR_NETWORK") {
      setErrorMessage(true);
    }
  };

  const keyboardHandler = (value: number) => {
    naviagate(`/keyboard-information/${value}`);
  };

  useEffect(() => {
    getKeyboardData();
  }, []);

  return (
    <div>
      {errorMessage ? (
        <div>No Data</div>
      ) : (
        <div className="keyboardContainer">
          {apiData.map((apiData: apiDataProp) => (
            <button onClick={() => keyboardHandler(apiData.keyboard_id)}>
              {apiData.keyboard_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
