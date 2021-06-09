require("dotenv").config();

const express = require("express");
const routes = require("./routes/");
const errorHandler = require("./midlewares/errorHandler");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.MONGODBPASS


const mongoose = require("mongoose");
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
  }
);

app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running at http://127.0.0.1:${port}`);
});

module.exports = app
