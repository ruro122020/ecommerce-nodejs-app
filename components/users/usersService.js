//THIS SCRIPT IS THE SERVICE LAYER FOR USERS
//Use a service layer for you business logic.

const ObjectID = require("mongodb").ObjectId;
const { addUserDAL, getUsersDAL } = require("./usersDAL");

const getUsersSL = async () => {
  try {
    const users = await getUsersDAL();
    return users;
  } catch (err) {
    return err;
  }
};
/*
DATA STRUCTURE 
const dataStructure = {
  "name": {
        "first": "Lidia",
        "middle": "ivy",
        "last": "quinn"
      },
  "DOB": "01/01/01",
  "email": "lidia@email.com",
  "password": "somehashedpassword",
  "addresses": [
        {
          "label":"home",
          "street":"123 main street ",
          "city": "Boston",
          "zip":"22222",
          "country": "US"
      },
      {
          "label":"mom",
          "street":"456 first street ",
          "city": "orlando",
          "zip":"55555",
          "country": "US"
      }

    ],
  "paymentMethods": [
      {
        "method": "credit card"
      },
      {
        "method": "paypal"
      }
    ],
  "contact":[
    {
      "label": "cell",
      "phone1": "123-456-7890"
    },
    {
      "label": "husbands cell",
      "phone": "123-456-7890"
    }
  ]
}  

*/
const addUserSL = async (user) => {
  try {
    const userInfo = {
      _id: ObjectID(),
      name: user.name,
      DOB: user.DOB,
      addresses: user.addresses,
      paymentMethods: user.paymentMethods,
      contact: user.contact,
      date: new Date(),
    };

    const addToListOfUsers = await addUserDAL(userInfo);
    return addToListOfUsers;
  } catch (err) {
    console.log("err in usersService.js", err);
  }
};

module.exports = { getUsersSL, addUserSL };
