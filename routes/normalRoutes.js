const express = require("express");
const router = express.Router();
const { contestadder } = require("../controllers/home");
const { blogShow } = require("../controllers/blog");
// console.log(contestadder);
router.get("/dashboard", contestadder);
router.get("/blog", blogShow);
module.exports = router;
