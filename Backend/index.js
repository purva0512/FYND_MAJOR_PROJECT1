const express = require("express");
const cors = require("cors"); 
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});        

require("dotenv").config();
const dbConfig = require("./config/dbconfig"); 
app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
