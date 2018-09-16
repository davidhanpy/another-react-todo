import React from 'react';
import './Form.css';
import AutoComplete from '../atom/AutoComplete';
import Button from '../atom/Button';
const Form = ({value, searched, onChange, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      <AutoComplete value={value} searched={searched} onChange={onChange} onKeyPress={onKeyPress}/>
      <Button onClick={onCreate}>
        검색
      </Button>
      </div>
  );
};

export default Form;