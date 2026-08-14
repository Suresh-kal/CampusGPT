const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");
const { getCurrentUser } = require("../controllers/user.controller");


const { authorize } = require("../middleware/role.middleware");

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);
router.get("/me", authenticate, getCurrentUser);


module.exports = router;