//create express server
const express = require("express");
const app = express();
const port = 3000;

//sql server
const sql = require("mssql");
let config = require("./dbconfig");

//cors
const cors = require("cors");

//body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//keyboard route
const keyboardRoute = require("./routes/keyboardRoute");
//all keyboard route
const allKeyboardsRoute = require("./routes/allKeyboardsRoute");
//all keyboard type
const keyboardTypeRoute = require("./routes/buildTypeRoute");
//all switch type
const switchRouter = require("./routes/switchRoute");

//routes
app.use("/keyboards", allKeyboardsRoute);
app.use("/keyboard", keyboardRoute);
app.use("/type", keyboardTypeRoute);
app.use("/switches", switchRouter);

// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

app.listen(port, () => {
  console.log("server up");
});
