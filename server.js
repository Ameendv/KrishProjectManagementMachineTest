require("rootpath")();
const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");

// const getErrorCode = require('./_helpers/getErrorCode')

var http = require("http");

dotenv.config();
app.use(
  bodyParser.urlencoded({
    limit: "999mb",
    extended: true,
    parameterLimit: 10000000,
  })
);
app.use(bodyParser.json({ limit: "999mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "999mb" }));
app.enable("trust proxy");

app.use(cookieParser());
// api routes

app.use(require("./controllers/movies.controller"));
app.use(require("./controllers/user.controller"));

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8001;
var httpServer = http.createServer(app);
const server = httpServer.listen(8000, () => {
  console.log("Server is running on port 3000");
});
module.exports = server;

