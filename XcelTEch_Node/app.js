const express = require('express');
const Router = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
// require("dotenv").config();

const app = express();

const whitelist = ['http://localhost:4200/']

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.use(cors(['http://localhost:4200/']));

app.use(bodyParser.json());
app.use("/", Router);

mongoose.connect('mongodb://localhost:27017/mydb', () => {
    console.log("Connected to DB")
});

app.listen(3000, () => {
    console.log("Server is running....");
})