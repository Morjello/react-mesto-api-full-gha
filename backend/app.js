const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const routes = require("./routes/index");
const { PORT, DB_ADRESS } = require("./config");

const app = express();

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
});
mongoose.set("strictQuery", false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(errorLogger);
app.use(routes);

app.listen(PORT, () => {
  console.log(`work on ${PORT}`);
});
