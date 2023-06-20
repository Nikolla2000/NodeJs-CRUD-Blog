const express = require('express');
const router = express.Router()
const Article = require('../models/article.model')

router.get('/new', (req,res) => {
    res.render('./articles/new')
})

router.get('/:id', (req, res) => {

})

router.post('/', async (req,res) => {
    const article = new Article({
        title: req.body.title,
        desciption: req.body.desciption,
        markdown: req.body.markdown,
    })

    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (error) {
        res.render('articles/new', {article: article})
    }
})

module.exports = router