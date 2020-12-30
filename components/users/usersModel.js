//Use Database modeling for noSQL databases Object Datasource Mapping (ODM)

//DATA STRUCTURE
class UserModel {
  prepareUserData(userInfo, id) {
    const user = {
      id: id,
      name: userInfo.name,
      username:
        userInfo.username === "undefined"
          ? userInfo.username
          : userInfo.username.toUpperCase(),
      email:
        userInfo.email === "undefined"
          ? userInfo.email
          : userInfo.email.toUpperCase(),
      password: userInfo.password,
      DOB: userInfo.DOB,
      addresses: userInfo.addresses,
      paymentMethods: userInfo.paymentMethods,
      contact: userInfo.contact,
      date: new Date(),
    };
    return user;
  }
}
module.exports = UserModel;

//EXAMPLE OBJ
// const dataStructure = {
//   name: {
//     first: "Lidia",
//     middle: "ivy",
//     last: "quinn",
//   },
//   username: "ivyquinn",
//   DOB: "01/01/01",
//   email: "lidia@email.com",
//   password: "somehashedpassword",
//   addresses: [
//     {
//       label: "home",
//       street: "123 main street ",
//       city: "Boston",
//       zip: "22222",
//       country: "US",
//     },
//     {
//       label: "mom",
//       street: "456 first street ",
//       city: "orlando",
//       zip: "55555",
//       country: "US",
//     },
//   ],
//   paymentMethods: [
//     {
//       method: "credit card",
//     },
//     {
//       method: "paypal",
//     },
//   ],
//   contact: [
//     {
//       label: "cell",
//       phone1: "123-456-7890",
//     },
//     {
//       label: "husbands cell",
//       phone: "123-456-7890",
//     },
//   ],
// };
