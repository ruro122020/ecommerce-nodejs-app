class AdminModel {
  prepareAdminData(adminInfo) {
    const admin = {
      _id: adminInfo.id,
      name: adminInfo.name,
      username: adminInfo.username,
      email: adminInfo.email,
      password: adminInfo.password,
      DOB: adminInfo.DOB,
      addresses: adminInfo.addresses,
      paymentMethods: adminInfo.paymentMethods,
      contact: adminInfo.contact,
      date: new Date(),
    };
    return admin;
  }
}

module.exports = AdminModel;
