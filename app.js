require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const Article = require('./models/article.model')

//connectDB
const connectDB = require("./db/connect");

//Port
const port = process.env.PORT || 5000;

//Main Router
app.get('/', async (req,res) => {
  const articles = await Article.find().sort({
    createDate: 'desc'
  })
  res.render('./articles/index', { articles: articles})
})

//routers
const articlesRouter = require('./routes/articlesRoute')

app.set('view engine', 'ejs')
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
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
