const express = require("express");
const router = express.Router();

//sql server
const sql = require("mssql");
let config = require("../dbconfig");

router.get("/", async function (req, res) {
  let pool = await sql.connect(config);
  const result = await sql.query`select * from keyboard`;
  res.send(result.recordsets[0]);
});

module.exports = router;
