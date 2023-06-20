const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, 'You must provide a title']
    },
    description: {
        type: String,
        required: false
    },
    markdown: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', articleSchema)
module.exports =  Article