const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { postRoute } = require("./routes/post.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(postRoute);
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connect now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
