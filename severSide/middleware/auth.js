// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   console.log(token)

//   try {
//     jwt.verify(token, process.env.secretkey, function (err, decoded) {
//       if (decoded) {
//         {
//           req.user_id = decoded.user_id;
//         }
//         console.log(req.user_id, "authmid");
//         next();
//       } else {
//         res.send({ err: "something wrong login again" });
//       }
//     });
//   } catch (error) {
//     res.send({ err: "something wrong login again" });
//   }
// };

const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token, "auth");
  try {
    jwt.verify(token, process.env.secretkey, function (err, decoded) {
      console.log(decoded);
      if (decoded) {
        req.user_Id = decoded.userId;
        next();
        console.log(req.user_Id,"midd");
      } else {
        return res.status(400).json({ message: "Unauthorized" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Unauthorized" });
  }
};
module.exports = auth;

module.exports = {
  auth,
};
