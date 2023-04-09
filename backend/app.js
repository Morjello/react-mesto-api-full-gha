const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { requestLogger } = require("./middlewares/logger");

const routes = require("./routes/index");
const { PORT, DB_ADDRESS } = require("./config");

const allowedCors = [
  "https://morjello.mesto.nomoredomains.monster",
  "http://morjello.mesto.nomoredomains.monster",
  "http://localhost:3000",
];

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});
mongoose.set("strictQuery", false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  next();
  return null;
});

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`work on ${PORT}`);
});
