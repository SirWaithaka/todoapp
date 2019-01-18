const mongoose = require('mongoose')
const Todo = require('../models/Todo')

module.exports = {
  async add (req, res) {
    try {
      const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        content: req.body.content
      })
      todo.save().then(result => res.status(201).send({id: result._id, content: result.content})).catch(err => {throw err})
    } catch (err) {
        return res.status(500).send({error: 'Something wrong happened'})
    }
  },
  async delete (req, res) {
    try {
      console.log(req.params)
      Todo.remove({_id: req.params.id})
        .exec().then(result => res.status(204).send(result)).catch(err => {throw err})
    } catch (err) {
      return res.status(500).send({error: 'Something wrong happened'})
    }
  },
  async list (req, res) {
    try {
      Todo.find()
        .exec()
        .then(data => {
          const todos = data.map(todo => {return {id: todo._id, content: todo.content} })
          res.status(200).send(todos)
        }).catch(err => {throw err})
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}