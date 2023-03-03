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

router.post("/", async function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "failed to connect to database" });
      res.status(404);
      return;
    }
    console.log(req.body);

    if (req.body) {
      const keyboardData = `INSERT INTO keyboard (keyboard_name, keyboard_type, keyboard_switches) VALUES ('${req.body.keyboard_name}',${req.body.keyboard_type},${req.body.keyboard_switch})`;
      sql.query(keyboardData, function (err, result) {
        if (err) {
          res.send({ status: "Failed to upload keyboard" });
          return res.status(400);
        }
        res.send({ status: "Created Keyboard" });
        return res.status(201);
      });
    } else {
      console.log(req);
      res.send({ status: "JSON is incorrect" });
      return res.status(204);
    }
  });
});

router.get("/:id", async function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "Failed to connect to the database" });
      res.status(404);
      return;
    }

    if (req.params.id) {
      const getKeyboardById = `
      SELECT keyboard.keyboard_id ,keyboard.keyboard_name, switches.switch_name, switches.switch_type, keyboardType.keyboard_type_name

      FROM keyboard

      LEFT JOIN switches ON switches.switch_id = keyboard.keyboard_switches
      LEFT JOIN keyboardType ON keyboard_type_id = keyboard.keyboard_type

      WHERE keyboard.keyboard_id = ${req.params.id}
      `;
      sql.query(getKeyboardById, function (err, result) {
        if (err) {
          console.log(err);
          res.send({
            status: `Can not find keyboard with the ID of ${req.params.id}`,
          });
          res.status(400);
        }

        if (result.rowsAffected[0] === 0) {
          res.send({
            status: `There is no keyboard with the ID of ${req.params.id}`,
          });
          return 204;
        }

        res.send(result?.recordset[0]);
        res.status(200);
        return;
      });
    } else {
      res.send({
        status: `There is no keyboard with the ID of ${req.params.id}`,
      });
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
      const keyboardData = `UPDATE keyboard SET keyboard_name = '${req.body.name}', keyboard_type ='${req.body.keyboardTypeID}' WHERE keyboard_id = ${req.params.id}`;
      sql.query(keyboardData, function (err, result) {
        if (err) {
          res.send({ status: "Failed to upload keyboard" });
          return res.status(400);
        }
        res.send({ status: `Updated Keyboard ${req.params.id}` });
        return res.status(201);
      });
    } else {
      res.send({ status: `Failed to update keyboard ${req.params.id}` });
      return res.status(204);
    }
  });
});

router.delete("/:id", async function (req, res) {
  sql.connect(config, function (err) {
    if (err) {
      res.send({ status: "failed to connect to the database" });
      res.status(404);
      return;
    }

    if (req.params.id) {
      const deleteKeyboardById = `DELETE FROM keyboard where keyboard_id = ${req.params.id}`;
      sql.query(deleteKeyboardById, function (err, result) {
        if (err) {
          res.send({ status: `Failed to delete keyboard ${req.params.id}` });
          res.status(400);
          return;
        }

        if (result.rowsAffected[0] === 0) {
          res.send({
            status: `There is no keyboard with id ${req.params.id} in the database`,
          });
          res.status(204);
          return;
        }

        res.send({ status: `Keyboard ${req.params.id} has been deleted` });
        res.status(200);
        return;
      });
    } else {
      res.send({ status: `Failed to update keyboard ${req.params.id}` });
      return res.status(204);
    }
  });
});

module.exports = router;
