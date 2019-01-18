import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTodoAction, deleteTodoAction, initStateAction } from '../actions'
import TodoApiService from '../services/TodoApiService'

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    TodoApiService.getTodos().then(res => {
      this.props.initState(res.data)
      console.log(res.data)
    })
  }
  handleChange(e) {
    this.setState({content: e.target.value})
  }
  async handleSubmit(e) {
    try {
      e.preventDefault()
      const response = await TodoApiService.addTodo({
        content: this.state.content
      })
      this.props.addTodo({id: response.data.id, content: this.state.content})
      this.setState({content: ''})
      console.log(this.props.todos)
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data.error)
    }
  }

  render() {

    const { deleteTodo } = this.props
    let { todos } = this.props
    let todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div className="collection-item" key={todo.id}>
            <span onClick={() => deleteTodo(todo.id)}>{todo.content}</span>
          </div>
        )
      })
    ) : (
      <p className="center">You have no todos left</p>
    )
    return (
      <div className="HomeMain">
        {todoList}
        <form onSubmit={this.handleSubmit}>
          <label>Add New Todo:</label>
          <input type="text" onChange={this.handleChange} value={this.state.content}/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch/*, ownProps*/) => {
  return {
    addTodo: (todo) => {
      dispatch(addTodoAction(todo))
    },
    deleteTodo: async (id) => {
      TodoApiService.deleteTodo({id}).then(res => {
        console.log(res)
        dispatch(deleteTodoAction(id))
      })
    },
    initState: (todos) => {
      dispatch(initStateAction(todos))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)