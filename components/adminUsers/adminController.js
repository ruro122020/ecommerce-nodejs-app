const express = require("express");
const jwt = require("jsonwebtoken");
const adminController = express.Router();
const { addAdminSL } = require("./adminService");
// const { verfiyToken } = require("");

//Admin Registration Route
adminController.post("/register-admin", async (req, res) => {
  try {
    const adminRegistration = req.body;
    console.log(adminRegistration);
    const results = await addAdminSL(adminRegistration);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

// Admin Login Route
// adminController.post("/login-admin", async (req, res) => {});

// Admin Protected Route
// adminController.post("/admin/:id/profile", verfiyToken, async (req, res) => {});
// adminController.post("/admin/:id/account", verfiyToken, async (req, res) => {});
module.exports = adminController;
