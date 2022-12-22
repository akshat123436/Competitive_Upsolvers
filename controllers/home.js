const axios = require("axios");
const { response } = require("express");
module.exports = {
  contestadder: async (req, res) => {
    // fetch("https://codeforces.com/api/contest.list").then((response) =>
    //   response.json()
    // );
    // res.send(response);
    await axios
      .get("https://codeforces.com/api/contest.list")
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send("error");
      });
    // res.send("hii");
  },
};
