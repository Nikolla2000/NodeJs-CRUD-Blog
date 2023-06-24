const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');
const saveArticleAndRedirect = require('../middleware/articleController') 


router.get('/new', (req, res) => {
  res.render('./articles/new', { article: new Article() });
});


router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req,res, next) => {
  const {id} = req.params
  req.article = await Article.findById(id)
  next()
}, saveArticleAndRedirect('edit'))

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

router.get('/edit/:id', async (req, res) => {
  const {id} = req.params
  const article = await Article.findById(id)
  res.render('articles/edit', {article: article})
})

router.get('/:slug', async(req, res) => {
    const article = await Article.findOne({ slug: req.params.slug})
    if(article == null) {
        res.redirect('/')
    }
  res.render('./articles/show', {article: article})
});


module.exports = router;