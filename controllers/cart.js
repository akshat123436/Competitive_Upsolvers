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
  notepad: (req, res) => {
    res.render("notepad");
    return;
  },
  profile: (req, res) => {
    const title = "profile";
    const heading = "profile";
    res.render("profile", { title, heading });
    return;
  },
  deleteFromCart: async (req, res) => {
    const id = req.body.questionId;
    const val = await User.updateOne(
      { _id: req.user._id },
      {
        $pullAll: {
          cart: [{ _id: id }],
        },
      }
    );
    console.log(val);
    res.redirect("/cart");
  },
};
