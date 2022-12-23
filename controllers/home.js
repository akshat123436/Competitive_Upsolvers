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
        var upcoming_contest = [];

        for (let i = 0; i <= 10; i++) {
          if (response.data.result[i].relativeTimeSeconds < 0)
            upcoming_contest.push([
              response.data.result[i].name,
              -response.data.result[i].relativeTimeSeconds,
            ]);
        }
        upcoming_contest.reverse();
        const title = "home";
        res.render("home", { upcoming_contest, title });
      })
      .catch((err) => {
        console.log(err);
        res.send("error");
      });
  },
};
