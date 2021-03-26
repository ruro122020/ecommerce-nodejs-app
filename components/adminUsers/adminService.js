const {
  encryptPassword,
  assignID,
} = require("../../container/security/security");
const { checkIfAdminExistDAL, addAdminDAL } = require("./adminDAL");
const AdminModel = require("./adminModel");
const Admin = new AdminModel();

const addAdminSL = async (adminRegistration) => {
  try {
    await assignID(adminRegistration);
    await encryptPassword(adminRegistration);
    const adminDataPrepared = Admin.prepareAdminData(adminRegistration);
    const adminExist = await checkIfAdminExistDAL(adminDataPrepared);

    if (adminExist) {
      return { msg: "an admin by this username already exist" };
    } else {
      await addAdminDAL(adminDataPrepared);
    }
  } catch (err) {
    console.log("err in adminService.js", err);
  }
};

module.exports = { addAdminSL };
