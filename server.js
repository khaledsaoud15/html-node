const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("./controllers/routes/auth");
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB IS RUNNING"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/register.html"));
});

app.use("/api/", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
});
