import React, { PureComponent } from 'react';
import './Form.css';
import AutoComplete from './AutoComplete';
import Button from '../atom/Button';

class Form extends PureComponent {
  render() {
    const { onChange, onCreate, onKeyPress } = this.props;
    return (
      <div className="form">
        <AutoComplete onChange={onChange} onKeyPress={onKeyPress} />
        <Button onClick={onCreate}>추가</Button>
      </div>
    );
  }
}
export default Form;
