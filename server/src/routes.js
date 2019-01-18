const Todo = require('./controllers/Todo')

module.exports = (app) => {
  app.get('/todos', Todo.list)
  app.post('/todo', Todo.add)
  app.delete('/todo/:id', Todo.delete)
}