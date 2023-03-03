const express = require("express");
const router = express.Router();

const sql = require("mssql");
let config = require("../dbconfig");

router.get("/", async function (req, res) {
  let keyboardTyperQuery = `SELECT * from keyboardType`;
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "cannot get keyboard type" });
      res.status(404);
      return;
    }

    sql.query(keyboardTyperQuery, (err, result) => {
      if (err) {
        res.send({ status: "cannot get keyboard type" });
        res.status(404);
        return;
      }

      if (result.rowsAffected[0] !== 0) {
        res.send(result.recordset);
        res.status(200);
      }
    });
  });
});

module.exports = router;
