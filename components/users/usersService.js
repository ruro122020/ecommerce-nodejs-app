//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { addUserDAL, getUsersDAL } = require("./usersDAL");
const UserModel = require("./usersModel");
const User = new UserModel();

const getUsersSL = async () => {
  try {
    const users = await getUsersDAL();
    return users;
  } catch (err) {
    return err;
  }
};

const addUserSL = async (userInfo) => {
  try {
    //hash password
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const id = ObjectID();
    userInfo.password = hashedPassword;
    const user = User.prepareUserData(userInfo, id);
    const results = await addUserDAL(user);

    if (results === 1) {
      return { msg: "user has been added", code: 1 };
    } else if (results === 2) {
      return { msg: "user already exist", code: 2 };
    } else {
      return { msg: "something went wrong", code: 3 };
    }
  } catch (err) {
    console.log("err in usersService.js", err);
  }
};

module.exports = { getUsersSL, addUserSL };
