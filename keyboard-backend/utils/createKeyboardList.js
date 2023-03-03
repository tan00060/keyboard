let list = require("./keyboardList.json");

export const createKeyboardList = (list) => {
  let keyboardList = list.keyboards;

  keyboardList.map((item) =>
    sql.query(`INSERT INTO keyboard (keyboard_name) VALUES ('${item.name}')`)
  );
};

module.exports = {
  createKeyboardList: createKeyboardList,
};
