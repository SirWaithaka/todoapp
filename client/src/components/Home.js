import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTodoAction, deleteTodoAction } from '../actions'

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({content: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.todos.length +1
    this.props.addTodo({id, content: this.state.content})
    this.setState({content: ''})
    console.log(this.props.todos)
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
    addTodo: (todo) => dispatch(addTodoAction(todo)),
    deleteTodo: (id) => dispatch(deleteTodoAction(id)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)