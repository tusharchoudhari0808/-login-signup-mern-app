const mongoose = require("mongoose");
const Mongo_URl = process.env.Mongo_Conn;

mongoose
  .connect(Mongo_URl)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
