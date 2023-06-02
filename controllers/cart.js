module.exports = {
  loader: async (req, res) => {
    const heading = "Question Cart";
    const title = "Question Cart";
    res.render("cart", { heading, title });
  },
};
