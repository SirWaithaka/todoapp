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

export const initStateAction = (todos) => {
  return {
    type: 'INIT_STATE',
    todos
  }
}