const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const normalRoutes = require("./routes/normalRoutes");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);

app.use("/", normalRoutes);

// app.get("*", (req, res) => {
//   res.send("No default link encountered");
// });

app.listen(3000, () => {
  console.log("on port 3000");
});
