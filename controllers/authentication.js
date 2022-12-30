const { Collection } = require("../models/collection");
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
      const dsa450 = await Collection.findById("63abd1bcf163adaa2782778f");
      const user = new User({
        username,
        collections: [dsa450],
      });
      //   res.send(user);
      const registereduser = await User.register(user, password);
      req.login(registereduser, (err) => {
        if (err) return next(err);
        req.flash("success", "Registered successfully");
        res.redirect("/");
      });
    } catch (e) {
      res.send(e);
    }
  },
  loginrender: (req, res) => {
    const title = "login";
    const heading = "LOGIN";

    res.render("./forms/login", { title, heading });
  },
  loginuser: (req, res) => {
    req.flash("success", "Logged in successfully");
    const redirecturl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirecturl);
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged out successfully");

      res.redirect("/");
    });
  },
};
