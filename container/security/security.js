const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const encryptPassword = async (adminRegistration) => {
  const hashPassword = await bcrypt.hash(adminRegistration.password, 10);
  adminRegistration.password = hashPassword;
  return adminRegistration;
};

const assignID = async (adminRegistration) => {
  const id = ObjectID();
  adminRegistration.id = id;
  return adminRegistration;
};

const confirmPassword = async (admin, adminDB) => {
  return bcrypt.compare(admin.password, adminDB.password);
};

module.exports = { encryptPassword, assignID, confirmPassword };
