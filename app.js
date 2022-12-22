const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("*", (req, res) => {
  res.send("No default link encountered");
});

app.listen(3000, () => {
  console.log("on port 3000");
});
