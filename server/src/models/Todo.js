const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String
})

module.exports = mongoose.model('Todo', TodoSchema)