import React, { Component } from 'react';
import Home from './components/Home'

class App extends Component {

  render() {
    return (
      <div className="container todo-app">
        <h1 className="center blue-text">Todos</h1>
        <Home />
      </div>
    );
  }
}

export default App;
