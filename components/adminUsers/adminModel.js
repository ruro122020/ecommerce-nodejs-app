class AdminModel {
  prepareAdminData(adminInfo) {
    const admin = {
      _id: adminInfo.id,
      firstName: adminInfo.firstName,
      lastName: adminInfo.lastName,
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
