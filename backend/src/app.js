const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const documentRoutes = require("./routes/document.routes");
const notificationRoutes = require("./routes/notification.routes");
const departmentRoutes = require("./routes/department.routes");
const chatRoutes = require("./routes/chat.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const bulkRegistrationRoutes = require("./routes/bulkRegistration.routes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", bulkRegistrationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "CampusGPT Backend Running",
  });
});

module.exports = app;
