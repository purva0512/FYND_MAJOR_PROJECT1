const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config();
const dbConfig = require("./config/dbconfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
