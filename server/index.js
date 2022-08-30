const express = require("express");
const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("hello howoo");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
