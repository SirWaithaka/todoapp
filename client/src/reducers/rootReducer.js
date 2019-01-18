const initState = {
  todos: []
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INIT_STATE':
      return {
        ...state,
        todos: action.todos
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: action.id, content: action.content}]
      }
    case 'DELETE_TODO':
      const todos = state.todos.filter(todo => (
        todo.id !== action.id
      ))
      return {
        ...state,
        todos: todos
      }
    default:
      return state
  }
}

export default rootReducer