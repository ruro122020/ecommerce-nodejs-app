//THIS SCRIPT IS THE CONTROLLER LAYER FOR USERS
//Controllers receive incoming client requests, and they leverage services

//PROCESS
/*
step 1: controller receive incoming client requests and leverages services
step 2: controller send request to service layer
step 3: serive layer make calls to the data access layer(DAL)
step 4: data access layer(DAL) performs queries and interact with database
step 5: data acces layer send results back up to service layer
step 6: service layer recieves results from DAL and then hand everything back to controller
step 7: controller responds to the client
 */

//code example to model

const express = require("express");
const usersController = express.Router();

const { getUsersSL, addUserSL } = require("./usersService");

usersController.get("/users", async (req, res) => {
  const users = await getUsersSL();
  res.json(users);
});

usersController.post("/users", async (req, res) => {
  try {
    const clientObj = req.body;
    const response = await addUserSL(clientObj);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      msg: err,
    });
  }
});

module.exports = usersController;
