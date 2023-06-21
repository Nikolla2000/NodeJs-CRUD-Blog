const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

router.get('/new', (req, res) => {
  res.render('./articles/new', { article: {} });
});

router.get('/:id', (req, res) => {
  // Implement the logic to fetch an article by ID
});

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    res.render('articles/new', { article: article });
  }
});

module.exports = router;