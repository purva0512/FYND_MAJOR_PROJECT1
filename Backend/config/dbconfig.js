const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongodb connected");
});

connection.on("error", (error) => {
  console.log("mongodb error", error);
});

module.exports = mongoose;
