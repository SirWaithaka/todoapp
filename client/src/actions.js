export const addTodoAction = (todo) => {
  return {
    type: 'ADD_TODO',
    id: todo.id,
    content: todo.content
  }
}

export const deleteTodoAction = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}