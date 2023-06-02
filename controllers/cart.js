const { Question } = require("../models/question");
const { User } = require("../models/user");
module.exports = {
  loader: async (req, res) => {
    const heading = "Question Cart";
    const title = "Question Cart";
    const userr = await User.findById(req.user._id).populate("cart");
    const cartItems = userr.cart;
    res.render("cart", { heading, title, cartItems });
  },
  addToCart: async (req, res) => {
    const id = req.body.questionId;
    console.log(req.body);
    const questionToAdd = await Question.findById(id);
    const userrr = await User.findByIdAndUpdate(req.user._id, {
      $push: {
        cart: questionToAdd,
      },
    });
    await userrr.save();
    req.flash("success", "Question was added to cart successfully!");
    res.redirect("/cart");
  },
};
