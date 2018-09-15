import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }
  
  render() {
    const { todos, onToggle, onRemove } = this.props;
    
    const todoList = todos.map(
      ({id, title, completed}) => (
        <TodoItem
          id={id}
          text={title}
          checked={completed}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;