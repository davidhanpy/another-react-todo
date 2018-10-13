import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import axios from 'axios';

class App extends Component {

  state = {
    input: '',
    todos: [],
    searched: [],
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/todolist/todo/')
    .then((result) => {
      this.setState({todos: result.data});
    })
  }
  
  handleChange = (e) => {
    const input = e.target.value;
    if (input === '') {
      this.setState({ input, searched: [] });
    } else {
      axios.get('http://127.0.0.1:8000/todolist/todo/?text=' + input)
        .then((result) => {
          this.setState({ input, searched: result.data });
        });
    }
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    const data = { text: input };
    axios.post('http://127.0.0.1:8000/todolist/todo/', data)
      .then((result) => {
        if (result.status === 200) {
          this.setState({ input: '', searched: [], todos: [...todos, { id: this.id++, text: input, checked: false }] });
        }
      })
  }


  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos]; 
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    axios.put('http://127.0.0.1:8000/todolist/todo/?id='+id)
    .then((result)=> {
      this.setState({
        todos: nextTodos
      });
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    // this.setState({
    //   todos: todos.filter(todo => todo.id !== id)
    // });
    const newTodos = todos.filter((item) => item.id !== id);
    axios.delete('http://127.0.0.1:8000/todolist/todo/?id=' + id)
      .then((result) => {
        this.setState({
          input: '',
          todos: newTodos
        });
      })
  }

  render() {
    const { input, todos, searched } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          searched={searched}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
