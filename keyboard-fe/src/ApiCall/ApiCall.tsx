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
    return res.data;
  } catch (err) {
    return err;
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
  console.log(id);
  try {
    let res = await axios.delete(`http://localhost:3000/switches/${id}`, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
