const express = require("express");
require("dotenv").config();
const app = express();

const sequelize = require("./db.js");

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    //create the table in the DB if it doesn't exist (and do nothing if it already exists)
    await sequelize.sync(); 
    console.log("Connection to db has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();

