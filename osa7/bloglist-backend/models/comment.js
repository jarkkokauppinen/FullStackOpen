const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: String,
  id: String
})

module.exports = mongoose.model('Comment', commentSchema)