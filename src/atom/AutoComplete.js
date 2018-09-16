import React, { Component } from 'react';

import TextInput from './Textinput';

import './AutoComplete.css';

class AutoComplete extends Component {
  render() {
    const {
      searched,
      value,
      onChange,
      onKeyPress,
    } = this.props;
    const searchedItems = searched.map((item) => {
      return <li key={item.text}>{item.text}</li>
    });
    return (
      <div className='auto-complete'>
        <TextInput value={value} onChange={onChange} onKeyPress={onKeyPress}/>
        {
          searched.length > 0 ?
          <ul>
            {searchedItems}
          </ul>
          :
          value.length > 0 ?
          <ul>
            <li>검색 결과가 없습니다.</li>
          </ul> : 
          null
        }
      </div>
    )
  }
}

export default AutoComplete;
