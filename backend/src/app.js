const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "CampusGPT Backend Running",
  });
});

module.exports = app;