import axios from "axios";

export const getKeyboards = async () => {
  try {
    let res = await axios.get("http://localhost:3000/keyboards", {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getKeyboardById = async (id?: string) => {
  try {
    let res = await axios.get(`http://localhost:3000/keyboard/${id}`, {});
    if (res) {
      return res.data;
    }
  } catch (err) {
    throw new Error("error");
  }
};

export const deleteKeyboardById = async (id?: string) => {
  try {
    let res = await axios.delete(`http://localhost:3000/keyboard/${id}`, {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getSwitches = async () => {
  try {
    let res = await axios.get("http://localhost:3000/switches", {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const createKeyboard = async (body: object) => {
  try {
    let res = await axios.post("http://localhost:3000/keyboard", body);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getKeyboardType = async () => {
  try {
    let res = await axios.get("http://localhost:3000/type", {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const createKeyboardSwitch = async (body: object) => {
  try {
    let res = await axios.post("http://localhost:3000/switches", body);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getKeyboardSwitches = async () => {
  try {
    let res = await axios.get("http://localhost:3000/switches", {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteSwitchById = async (id?: string) => {
  try {
    let res = await axios.delete(`http://localhost:3000/switches/${id}`, {});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const editKeyboardsById = async (value: any) => {
  let newKeyboardData = {
    keyboard_name: value.keyboard_name,
    keyboard_type_id: value.keyboard_type_id,
    keyboard_switches: value.keyboard_switches,
  };

  try {
    let res = await axios.put(
      `http://localhost:3000/keyboard/${value.keyboard_id}`,
      newKeyboardData
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
