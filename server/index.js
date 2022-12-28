const express = require("express");
require("dotenv").config();
const sequelize = require("./db.js");
const models = require('./models/models');
const cors = require('cors')
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router);

//Error handling
app.use('*', errorHandler)

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    //create the table in the DB if it doesn't exist (and do nothing if it already exists)
    await sequelize.sync(); 
    console.log("Connection to db has been established successfully.");
    if(process.env.NODE_ENV !== 'test'){app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`);
    });}
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

if(process.env.NODE_ENV !== 'test')
{start();}

module.exports = {app}