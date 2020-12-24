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
/*
 */

const PostService = require("../users/usersService");
const PostServiceInstance = new PostService();

/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function createCord(req, res) {
  const reqBodyObj = req.body;
  try {
    // We only pass the body object, never the req object
    const createdCord = await PostServiceInstance.create(reqBodyObj);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = { createCord };

// const express = require("express");
// const usersController = express.Router();

// const { handleClientRequestSL } = require("./usersService");

// const { DAL } = require("./usersDAL");

// usersController.get("/users", (req, res) => {
//   const cbController = (data) => {
//     console.log("data is in usersController", data);
//     res.json(data);
//   };
//   DAL(cbController);
// });

// usersController.post("/users", (req, res) => {
//   const clientObj = req.body;
//   handleClientRequestSL(clientObj);
// });

// module.exports = usersController;
