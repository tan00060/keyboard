export const createKeyboardTable = () => {
  let tableSQL = `CREATE TABLE keyboard (
        keyboard_id INT PRIMARY KEY IDENTITY,
        keyboard_name varchar(100)
    )`;

  sql.query(tableSQL, function (err, result) {
    if (err) {
      res.send({ status: "Failed create table" });
      return res.status(400);
    }
    res.send({ status: "Created Keyboard Table" });
    return res.status(201);
  });
};
