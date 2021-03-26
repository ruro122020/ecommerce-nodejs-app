const {
  encryptPassword,
  assignID,
} = require("../../container/security/security");
// const { addUserDAL, checkIfUserExistDAL, getUserDAL } = require("./usersDAL");
// const UserModel = require("./usersModel");
// const User = new UserModel();

const addAdminSL = async (adminRegistration) => {
  try {
    await assignID(adminRegistration);
    await encryptPassword(adminRegistration);

    const adminDataPrepared = Admin.prepareAdminData(adminRegistration);
    const adminExist = await checkIfAdminExistDAL(adminDataPrepared);
  }
};

module.exports = { addAdminSL };
