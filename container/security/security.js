const ObjectID = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

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

module.exports = { encryptPassword, assignID, confirmPassword };
