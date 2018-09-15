import React from 'react';
import './Form.css';
import Textinput from '../atom/Textinput';
import Button from '../atom/Button';
const Form = ({value, onChange, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      <Textinput value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <Button onClick={onCreate}>
        추가
      </Button>
      </div>
  );
};

export default Form;