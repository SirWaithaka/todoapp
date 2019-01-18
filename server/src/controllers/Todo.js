const mongoose = require('mongoose')
const Todo = require('../models/Todo')

module.exports = {
  async add (req, res) {
    try {
      const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        content: req.body.content
      })
      todo.save().then(result => res.status(201).send(result)).catch(err => {throw err})
    } catch (err) {
        return res.status(500).send({error: 'Something wrong happened'})
    }
  },
  async delete (req, res) {
    try {
      Todo.remove({_id: req.body.id})
        .exec().then(result => res.status(200).send(result)).catch(err => {throw err})
    } catch (err) {
      return res.status(500).send({error: 'Something wrong happened'})
    }
  },
  async list (req, res) {
    try {
      Todo.find()
        .exec()
        .then(todos => res.status(200).send(todos)).catch(err => {throw err})
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}