const express = require("express");
const session = require("express-session");
const connectDB = require("./config/mongo");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
require("dotenv").config();
const nocache = require("nocache");
app.use(nocache());

connectDB
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB Connection error: ", err));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/css", express.static(path.join(__dirname, "assets/css")));
app.use("/images", express.static(path.join(__dirname, "assets/images")));
app.use("/js", express.static(path.join(__dirname, "assets/js")));
app.use("/fonts", express.static(path.join(__dirname, "assets/fonts")));

app.use("/", userRouter);
app.use("/", adminRouter);
app.listen(process.env.PORT);
