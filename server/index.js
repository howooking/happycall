//global environment variables
require("dotenv").config();

//epress app
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//cors
const cors = require("cors");
app.use(cors({ origin: "*" }));

//routes
const animalRoute = require("./routes/animal");
const happycallRoute = require("./routes/happycall");

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Animal Routes
app.use("/animal", animalRoute);

// Happycall Routes
app.use("/happycall", happycallRoute);

//mogoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening for requests
    app.listen(port, () => {
      console.log(`connected to DB and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
