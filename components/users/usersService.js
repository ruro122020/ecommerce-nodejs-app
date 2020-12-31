//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { addUserDAL, checkIfUserExistDAL, getUserDAL } = require("./usersDAL");
const UserModel = require("./usersModel");
const User = new UserModel();

// const getUsersSL = async () => {
//   try {
//     const users = await getUsersDAL();
//     return users;
//   } catch (err) {
//     return err;
//   }
// };

const addUserSL = async (userRegistration) => {
  try {
    //hash password
    const hashPassword = await bcrypt.hash(userRegistration.password, 10);
    const id = ObjectID();
    userRegistration.id = id;
    userRegistration.password = hashPassword;
    const user = User.prepareUserData(userRegistration);
    const userExist = await checkIfUserExistDAL(user);

    if (!userExist) {
      const results = await addUserDAL(user);
      if (results === 1) {
        return { msg: "user has been added", code: 1 };
      }
    } else {
      return { msg: "user already exist", code: 2 };
    }
  } catch (err) {
    console.log("err in usersService.js", err);
  }
};

const authenticateUserSL = async (userLogin) => {
  //retrieve user from database
  const user = User.prepareUserData(userLogin);
  const userDB = await getUserDAL(user);
  if (userDB.length === 0) {
    return { verified: false, user: "user not found" };
  } else {
    //compare password
    const confirmUserPassword = await bcrypt.compare(
      user.password,
      userDB[0].password
    );
    if (confirmUserPassword) {
      //return true ifnpassword match
      return { verified: true, user: userDB[0] };
    } else {
      return { verified: false, user: "password does not match" };
    }
  }
};

module.exports = { addUserSL, authenticateUserSL };
