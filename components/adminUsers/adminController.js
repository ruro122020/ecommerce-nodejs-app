const express = require("express");
const jwt = require("jsonwebtoken");
const adminController = express.Router();
const { addAdminSL, loginAdminSL } = require("./adminService");
// const { verfiyToken } = require("");

/**********************REGISTRATION ROUTE****************************/
//Admin Registration Route
adminController.post("/register-admin", async (req, res) => {
  try {
    const adminRegistration = req.body;
    const results = await addAdminSL(adminRegistration);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});
/**********************LOGIN ROUTE***********************************/
// Admin Login Route
adminController.post("/login-admin", async (req, res) => {
  const adminLogin = req.body;
  const adminIsAuthenticated = await loginAdminSL(adminLogin);

  if (adminIsAuthenticated.verified) {
    //create jwt token
    const accessToken = jwt.sign(
      adminIsAuthenticated.admin,
      process.env.ACCESS_TOKEN_SECRET_ADMIN,
      { expiresIn: "7d" }
    );
    //send token to client
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(400).json({
      msg: "Username or password not found. Login failed.",
    });
  }
});

// Admin Protected Route
// adminController.post("/admin/:id/profile", verfiyToken, async (req, res) => {});
// adminController.post("/admin/:id/account", verfiyToken, async (req, res) => {});
module.exports = adminController;
