require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//Port
const port = process.env.PORT || 5000;

//Main Router
app.get('/', (req,res) => {
  const articles = [{
    title: 'test article',
    createDate: Date.now(),
    description: 'test descrition'
  }]
  res.render('index', { articles: articles})
})

//routers
const articlesRouter = require('./routes/articlesRoute')

app.set('view engine', 'ejs')
app.use(express.static("./public"));
app.use(express.json());
app.use('/articles', articlesRouter)

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
