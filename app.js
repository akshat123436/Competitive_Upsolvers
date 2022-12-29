const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const normalRoutes = require("./routes/normalRoutes");
const expressError = require("./utils/errorclass");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localstrategy = require("passport-local");
const { User } = require("./models/user");
const flash = require("connect-flash");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/projectwebsite");
}
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connection open");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
app.use(flash());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentuser = req.user;
  next();
});

app.use("/", normalRoutes);

// app.get("*", (req, res) => {
//   res.send("No default link encountered");
// });

app.all("*", (req, res, next) => {
  console.log("----invalid link");
  next(new expressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  if (!err.message) {
    err.message = "Something Went wrong";
  }
  const { status = 500 } = err;
  const title = "Error";
  res.status(status).render("error", { err, title });
});

app.listen(3000, () => {
  console.log("on port 3000");
});
