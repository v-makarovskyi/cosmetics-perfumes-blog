require("dotenv").config();
const path = require("path");
var express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))





app.get("/", (req, res) => {
  res.send("Приложение успешно запущено и работает! Вы молодец:)");
});

module.exports = app;
