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
/******************************HELPER FUNCTIONS***************************************************/

const encryptPassword = async (userRegistration) => {
  const hashPassword = await bcrypt.hash(userRegistration.password, 10);
  userRegistration.password = hashPassword;
  return userRegistration;
};

const assignID = async (userRegistration) => {
  const id = ObjectID();
  userRegistration.id = id;
  return userRegistration;
};

const confirmPassword = async (user, userDB) => {
  if (userDB.length === 0) return;
  return bcrypt.compare(user.password, userDB[0].password);
};
/*********************************************************************************/
const addUserSL = async (userRegistration) => {
  try {
    await assignID(userRegistration);
    await encryptPassword(userRegistration);
    const userDataPrepared = User.prepareUserData(userRegistration);
    const userExist = await checkIfUserExistDAL(userDataPrepared);

    if (!userExist) {
      const results = await addUserDAL(userDataPrepared);
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

const loginUserSL = async (userLogin) => {
  const userDataPrepared = User.prepareUserData(userLogin);
  const userDB = await getUserDAL(userDataPrepared);
  const passwordConfirmed = await confirmPassword(userDataPrepared, userDB);
  if (passwordConfirmed) {
    return { verified: true, user: userDB[0] };
  } else {
    return { verified: false, user: "password does not match" };
  }
};

const getUserProfile = (user) => {
  console.log("user in SL", user);
  const userProfile = { info: User.prepareProfileData(user), send: true };
  return userProfile;
};

module.exports = { addUserSL, loginUserSL, getUserProfile };
