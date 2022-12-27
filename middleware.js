module.exports = {
  isLoggedin: (req, res, next) => {
    console.log("IS logged in called");
    if (!req.user) {
      req.flash("error", "Please login");
      return res.redirect("/login");
    }
    next();
  },
};
