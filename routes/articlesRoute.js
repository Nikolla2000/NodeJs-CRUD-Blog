const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

router.get('/new', (req, res) => {
  res.render('./articles/new', { article: new Article() });
});

router.get('/:slug', async(req, res) => {
    const article = await Article.findOne({ slug: req.params.slug})
    if(article == null) {
        res.redirect('/')
    }
  res.render('./articles/show', {article: article})
});

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    console.log(error);
    res.render('articles/new', { article: article });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const articleToDelete = await Article.findByIdAndDelete(id);
    if (!articleToDelete) {
      res.status(404).json({ message: 'Article not found' });
    }
    
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;