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
  "username": "ivyquinn"
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
const addUserSL = async (userInfo) => {
  try {
    const userObj = {
      _id: ObjectID(),
      name: userInfo.name,
      username: userInfo.username,
      email: userInfo.email,
      DOB: userInfo.DOB,
      addresses: userInfo.addresses,
      paymentMethods: userInfo.paymentMethods,
      contact: userInfo.contact,
      date: new Date(),
    };
    const user = await addUserDAL(userObj);
    if (user === 1) {
      return { msg: "user was added", code: 1 };
    } else if (user === 2) {
      return { msg: "user already exist", code: 2 };
    } else {
      return { msg: "something went wrong", code: 3 };
    }
  } catch (err) {
    console.log("err in usersService.js", err);
  }
};

module.exports = { getUsersSL, addUserSL };
