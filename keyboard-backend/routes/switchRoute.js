const express = require("express");
const { route } = require("./keyboardRoute");
const router = express.Router();

//sql server
const sql = require("mssql");
let config = require("../dbconfig");

router.get("/", async function (req, res) {
  let pool = await sql.connect(config);
  const result = await sql.query`select * from switches`;
  res.send(result.recordsets[0]);
});

router.post("/", async function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "failed to connect to database" });
      res.status(404);
      return;
    }
    if (req.body) {
      const keyboardData = `INSERT INTO switches (switch_name, switch_type) VALUES ('${req.body.switch_name}', '${req.body.switch_type}')`;
      sql.query(keyboardData, function (err, result) {
        if (err) {
          res.send({ status: "Failed to upload switch" });
          return res.status(400);
        }
        res.send({ status: "Created switch" });
        return res.status(201);
      });
    } else {
      res.send({ status: "JSON is incorrect" });
      return res.status(204);
    }
  });
});

router.put("/:id", async function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "failed to connect to database" });
      res.status(404);
      return;
    }

    if (req.body.name || req.body.keyboardTypeID) {
      const keyboardData = `UPDATE switches SET switch_name = '${req.body.name}', switch_type ='${req.body.switchType}' WHERE switch_id = ${req.params.id}`;
      sql.query(keyboardData, function (err, result) {
        if (err) {
          res.send({ status: "Failed to upload switch" });
          return res.status(400);
        }
        res.send({ status: `Updated switch ${req.params.id}` });
        return res.status(201);
      });
    } else {
      res.send({ status: `Failed to update switch ${req.params.id}` });
      return res.status(204);
    }
  });
});

module.exports = router;
