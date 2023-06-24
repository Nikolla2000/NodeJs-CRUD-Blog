const mongoose = require('mongoose');
const {marked} = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    if(this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
    }
    next()
})
const Article = mongoose.model('Article', articleSchema)
module.exports =  Article