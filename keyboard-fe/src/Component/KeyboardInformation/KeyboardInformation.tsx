import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteKeyboardById, getKeyboardById } from "../../ApiCall/ApiCall";
import { useNavigate } from "react-router";

type keyboardProps = {
  keyboard_id: number;
  keyboard_name: string;
  keyboard_type_name: string;
  switch_name: string;
  switch_type: string;
};

const KeyboardInformation = () => {
  let naviagate = useNavigate();

  let { id } = useParams();

  const [singleKeyboardInformation, setSingleKeyboardInformation] =
    useState<keyboardProps | null>(null);

  //   type singleKeyboardProp = {};

  const getKeyboardData = async () => {
    let data = await getKeyboardById(id);
    if (data) {
      setSingleKeyboardInformation(data);
    }
  };

  const deleteHandler = async (id: string | undefined) => {
    let deleteResult = await deleteKeyboardById(id);
    if (deleteResult.status.includes("has been deleted")) {
      naviagate(`/`);
    }
  };

  useEffect(() => {
    getKeyboardData();
  }, []);

  const backHandler = () => {
    naviagate(`/`);
  };

  return (
    <div>
      <div>
        <p>{singleKeyboardInformation?.keyboard_id}</p>
        <p>{singleKeyboardInformation?.keyboard_name}</p>
        <p>{singleKeyboardInformation?.keyboard_type_name}</p>
        <p>{singleKeyboardInformation?.switch_name}</p>
        <p>{singleKeyboardInformation?.switch_type}</p>
      </div>

      <div>
        <button
          onClick={() =>
            deleteHandler(singleKeyboardInformation?.keyboard_id.toString())
          }
        >
          delete keyboard
        </button>
      </div>

      <div>
        <button onClick={() => backHandler()}>back</button>
      </div>
    </div>
  );
};

export default KeyboardInformation;
