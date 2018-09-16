import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import axios from 'axios';

class App extends Component {

  id = 0 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    original: [],
    todos: [],
    searched: [],
  }

  componentDidMount() {
    // axios.get('http://127.0.0.1:8000/todolist/todo/')
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((result) => {
      // this.setState({todos:JSON.parse(result.data)});
      this.setState({original: result.data, todos: result.data});
    })
  }
  
  handleChange = (e) => {
    const { original } = this.state;
    if (e.target.value.length > 0) {
      const searched = original.filter((item) => (
        item.title.includes(e.target.value)
      ));
      this.setState({
        searched,
        input: e.target.value // input 의 다음 바뀔 값
      });
    } else {
      this.setState({
        searched: [],
        input: e.target.value // input 의 다음 바뀔 값
      });
    }
  }

  handleCreate = () => {
    const { input, original } = this.state;
    // axios.post('http://127.0.0.1:8000/todolist/todo/', {text:input})
    // .then((result) => {
    // this.setState({
    //   input:'',
    //   todos: result.data
    // });
    // })
    const filtered = original.filter((item) => (
      item.title.includes(input)
    ));
    this.setState({ todos: filtered });
}
    // this.setState({
    //   input: '', // 인풋 비우고
    //   // concat 을 사용하여 배열에 추가
    //   todos: todos.concat({
    //     id: this.id++,
    //     text: input,
    //     checked: false
    //   })
    // });
   
  
  

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
    axios.post('').then( () => {
      this.setState({
        todos: nextTodos
      });
    })
    
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    // this.setState({
    //   todos: todos.filter(todo => todo.id !== id)
    // });
    axios.delete('http://127.0.0.1:8000/todolist/todo/', {id:id})
    .then((result) => {
    this.setState({
      input:'',
      todos: result.data});
  })}

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
