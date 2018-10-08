import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextInput from '../atom/Textinput';

import { changeInput } from '../action/search';

import './AutoComplete.css';

class AutoComplete extends Component {
  componentDidUpdate() {
    const { value } = this.props;
    if (value === '')  {
      this.input.value = '';
    }
  }
  render() {
    const {
      searched,
      value,
      onChange,
      onKeyPress,
    } = this.props;
    const searchedItems = searched.map((item) => {
      return <li key={item.id}>{item.text}</li>
    });
    return (
      <div className='auto-complete'>
        <TextInput ref={(comp) => this.input = comp} onChange={this.props.handleChange} onKeyPress={onKeyPress}/>
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

function mapStateToProps(store) {
  return {
    value: store.search.input,
    searched: store.search.searched,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (evt) => dispatch(changeInput(evt.target.value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
