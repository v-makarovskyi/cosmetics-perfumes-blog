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
app.use(express.static(path.join(__dirname, 'client', 'build')))





app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});

app.use('/test', (req, res) => {
  res.send('Hello world')
})


module.exports = app;
