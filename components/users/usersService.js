//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

//code example to model
/*
const MongooseService = require("./usersDAL"); // Data Access Layer
const PostModel = require("../models/post"); // Database Model

class PostService {
  /*************************************************
   * @description Create an instance of PostService
   *************************************************
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(PostModel);
  }

  /*******************************************************************************
   * @description Attempt to create a post with the provided object
   * @param postToCreate {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   *******************************************************************************
  async create(postToCreate) {
    try {
      const result = await this.MongooseServiceInstance.create(postToCreate);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = PostService;
 */

const ObjectID = require("mongodb").ObjectId;
const { postClientInfoDAL, DAL } = require("./usersDAL");

const getUsersSL = async () => {
  try {
    const data = await getUsersDAL();
    return data;
  } catch (err) {
    return err;
  }
};

// const handleClientRequestSL = (clientObj, controllerCB) => {
//   const clientSideInfo = {
//     _id: ObjectID(),
//     name: clientObj.name,
//     age: clientObj.age,
//     fav: clientObj.fav,
//     data: new Date(),
//   };
//   const serviceCB = (successful) => {
//     //pass to controller
//     if (successful === 1) {
//       controllerCB(successful);
//     }
//   };
//   postClientInfoDAL(clientSideInfo, serviceCB);
// };

module.exports = { getUsersSL };
