//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { addUserDAL, checkIfUserExistDAL, getUserDAL } = require("./usersDAL");
const {
  encryptPassword,
  assignID,
  confirmPassword,
} = require("../../container/security/security");
const UserModel = require("./usersModel");
const User = new UserModel();

const addUserSL = async (user) => {
  try {
    await assignID(user);
    await encryptPassword(user);
    const userDataPrepared = User.prepareUserData(user);
    const userExist = await checkIfUserExistDAL(userDataPrepared);

    if (userExist) {
      return "a user by this username already exist";
    } else {
      await addUserDAL(userDataPrepared);
      return "user has been added";
    }
  } catch (err) {
    console.log("err in usersService.js", err);
  }
};

const loginUserSL = async (user) => {
  //prepare user data
  const userDataPrepared = User.prepareUserData(user);
  //get user from mongodb
  const userDB = await getUserDAL(userDataPrepared);
  if (userDB) {
    //password authentication
    const passwordConfirmed = await confirmPassword(userDataPrepared, userDB);
    if (passwordConfirmed) {
      return { verified: true, user: userDB };
    }
  } else {
    return { verified: false, user: null };
  }
};

const prepareUserProfileSL = (user) => {
  console.log("user in SL", user);
  const userProfile = { info: User.prepareProfileData(user), prepared: true };
  return userProfile;
};

module.exports = { addUserSL, loginUserSL, prepareUserProfileSL };
