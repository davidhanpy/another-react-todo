import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

import Reducers from './reducer';
import axios from 'axios';

const store = createStore(Reducers);

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
    console.log('App Mount');
  }
  componentDidUpdate() {
    console.log('App Update')
  }
  
  handleChange = (e) => {
    const input = e.target.value;
    if ( input === '' ) {
      this.setState({input, searched:[]});
    } else {
      axios.get('http://127.0.0.1:8000/todolist/todo/?text='+ input)
        .then((result) => {
          this.setState({input, searched:result.data});
        });
    }
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    const data = {text:input};
    axios.post('http://127.0.0.1:8000/todolist/todo/',data)
    .then((result) => {
      if (result.status === 200) {
        this.setState({input: '', searched:[], todos:[...todos, {id: this.id++, text: input, checked: false}]});
      }
    })
  }
  

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    
    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
    // axios.post('').then( () => {
      
    // })
    
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    // this.setState({
    //   todos: todos.filter(todo => todo.id !== id)
    // });
    const newTodos = todos.filter((item) => item.id !== id);
    axios.delete('http://127.0.0.1:8000/todolist/todo/?id='+id)
    .then((result) => {
      this.setState({
        input:'',
        todos: newTodos
      });
  })}

  render() {
    const {
      handleKeyPress,
      handleChange,
      handleCreate,
      handleRemove,
      handleToggle,
    } = this;
    return (
      <Provider store={store}>
        <TodoListTemplate form={(
          <Form />
        )}>
          {/* <TodoItemList onToggle={handleToggle} onRemove={handleRemove}/> */}
        </TodoListTemplate>
      </Provider>
    )
  }
}

export default App;
