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
  handleSubmit(e) {
    e.preventDefault()
    this.props.addTodo(this.state.content)
    this.setState({content: ''})
  }

  render() {

    const { deleteTodo } = this.props
    let { todos } = this.props
    let todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div class="col s12 m5">
            <div class="card-panel light-blue darken-4" key={todo.id}>
              <div class="row">
                <div class="col s4 offset-s7">
                  <a class="waves-effect waves-teal teal white-text btn-flat" onClick={() => deleteTodo(todo.id)}>Remove</a>
                </div>
              </div>
              <div class="divider"></div>
              <div class="row">
                <div class="col s12">
                  <span class="white-text">
                    {todo.content}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })
    ) : (
      <p className="center">You have no todos left</p>
    )
    return (
      <div className="HomeMain">
        <form onSubmit={this.handleSubmit}>
          <label>Add New Todo:</label>
          <input type="text" onChange={this.handleChange} value={this.state.content}/>
        </form>
        <div class="row">
          {todoList}
        </div>
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
    addTodo: (content) => {
      TodoApiService.addTodo({content}).then(res => {
        console.log(res.data)
        dispatch(addTodoAction({id: res.data.id, content: res.data.content}))
      })
    },
    deleteTodo: async (id) => {
      TodoApiService.deleteTodo(id).then(res => {
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