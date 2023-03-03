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
