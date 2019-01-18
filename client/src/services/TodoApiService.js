import Api from './Api'

export default {
  addTodo (content) {
    return Api().post('todo', content)
  },
  deleteTodo (id) {
    return Api().delete('todo', id)
  },
  getTodos () {
    return Api().get('todos')
  }
}