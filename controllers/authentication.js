const { User } = require("../models/user");

module.exports = {
  register: (req, res) => {
    const title = "REGISTERATION";
    const heading = "REGISTER USER";
    res.render("./forms/register", { title, heading });
  },
  registeruser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username });
      //   res.send(user);
      const registereduser = await User.register(user, password);
      req.flash("success", "Registered successfully");
      res.redirect("/blog");
    } catch (e) {
      res.send(e);
    }
  },
  loginrender: (req, res) => {
    const title = "LOgIN";
    const heading = "LOGIN";
    res.render("./forms/login", { title, heading });
  },
  loginuser: (req, res) => {
    req.flash("success", "Logged in successfully");
    res.redirect("/blog");
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged out successfully");

      res.redirect("/blog");
    });
  },
};
