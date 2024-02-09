require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/UserModel");

const userRouter = express.Router();

userRouter.post("/api/register", async (req, res) => {
  const { avatar, username, email, password } = req.body;

  try {
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "use another mail this is already there!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new userModel({
          username,
          email,
          // avatar,
          password: hash,
        });

        await user.save();

        res
          .status(201)
          .json({ msg: "you are now registerd!", user, sucess: true });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await userModel.findOne({ email });
    bcrypt.compare(password, existinguser.password, (error, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existinguser._id },
          process.env.secretkey
        );
        res
          .status(200)
          .json({ mag: "Login Sucess!", token: token, existinguser });
      } else {
        res.status(401).json({ error: error });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

module.exports = {
  userRouter,
};
