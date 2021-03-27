const {
  encryptPassword,
  assignID,
  confirmPassword,
} = require("../../container/security/security");
const {
  checkIfAdminExistDAL,
  addAdminDAL,
  getAdminDAL,
} = require("./adminDAL");
const AdminModel = require("./adminModel");
const Admin = new AdminModel();

const addAdminSL = async (admin) => {
  try {
    await assignID(admin);
    await encryptPassword(admin);
    const adminDataPrepared = Admin.prepareAdminData(admin);
    const adminExist = await checkIfAdminExistDAL(adminDataPrepared);

    if (adminExist) {
      return "an admin by this username already exist";
    } else {
      await addAdminDAL(adminDataPrepared);
      return "Admin user has been added";
    }
  } catch (err) {
    console.log("err in adminService.js", err);
  }
};

const loginAdminSL = async (admin) => {
  //prepare admin data
  const adminDataPrepared = Admin.prepareAdminData(admin);
  //get admin user from mongoDB
  const adminDB = await getAdminDAL(adminDataPrepared);
  if (adminDB) {
    // password authentication
    const passwordConfirmed = await confirmPassword(adminDataPrepared, adminDB);
    if (passwordConfirmed) {
      return { verified: true, admin: adminDB };
    }
  } else {
    return { verified: false, admin: null };
  }
};

module.exports = { addAdminSL, loginAdminSL };
