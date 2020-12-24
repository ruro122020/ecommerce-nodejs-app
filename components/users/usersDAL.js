//THIS SCRIPT IS THE DATA ACCESS LAYER(DAL) FOR USERS
//The data access layer interacts with the database by performing queries

//code example to model
/*
 */

// const db = require("../../dbconfig");
// const { client } = require("../../dbconfig");
// const ObjectID = require("mongodb").ObjectID;
// //variables
// const usersCollection = "users";
// const dbName = "ecommerce";
// const obj = [
//   {
//     name: "lidia",
//   },
//   {
//     job: "web developer",
//   },
// ];

// const DAL = (cbController) => {
//   db.getDB()
//     .collection(usersCollection)
//     .find({})
//     .toArray((err, documents) => {
//       if (err) {
//         console.log(err);
//         return err;
//       } else {
//         console.log("documents in DAL function", documents);
//         cbController(documents);
//       }
//     });
// };

// const postClientInfoDAL = (clientSideInfo, serviceCB) => {
//   //connect to mongodb
//   client.connect((err) => {
//     if (err) console.log("err", err);

//     //retrieve database object
//     const db = client.db(dbName);

//     //insert data to mongodb
//     db.collection(usersCollection).insertOne(
//       clientSideInfo,
//       (err, response) => {
//         try {
//           if (err)
//             console.log("there was an error adding the data to mongodb", err);

//           //passing results to service layer
//           if (response.result.ok === 1) {
//             const successful = response.result.ok;
//             console.log("successful", successful);
//             serviceCB(successful);
//           }
//         } catch (err) {
//           console.log("err in inserOne", err);
//         }
//       }
//     );
//   });
// };
// module.exports = { DAL, postClientInfoDAL };
