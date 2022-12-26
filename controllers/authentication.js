module.exports = {
  register: (req, res) => {
    const title = "REGISTERATION";
    const heading = "REGISTER USER";
    res.render("./forms/register", { title, heading });
  },
};
