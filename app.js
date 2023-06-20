require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//Port
const port = process.env.PORT || 5000;

//routers( example : const someRouter = require("./routes/some.router"))
app.get('/', (req,res) => {
  res.render('index')
})

app.set('view engine', 'ejs')
app.use(express.static("./public"));
app.use(express.json());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
