const express = require("express");
const router = express.Router();
const { contestadder } = require("../controllers/home");
// console.log(contestadder);
router.get("/home", contestadder);
module.exports = router;
