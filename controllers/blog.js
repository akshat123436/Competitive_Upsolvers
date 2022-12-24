module.exports = {
  blogShow: (req, res, next) => {
    const title = "blogs";
    res.render("blogs", { title });
  },
};
