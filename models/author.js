const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

authorSchema.pre('deleteOne', { document: true, query: false }, async function(){
    const hasBook = await Book.exists({ author: this._id })
    if (hasBook) {
        throw new Error('This author still has books.')
    }
})

module.exports = mongoose.model('Author', authorSchema)