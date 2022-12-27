module.exports = {
  isLoggedin: (req, res, next) => {
    if (!req.user) {
      req.flash("error", "Please login");
      return res.redirect("/login");
    }
    next();
  },
};
