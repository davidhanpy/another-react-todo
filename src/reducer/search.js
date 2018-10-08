
const initialState = {
  input:'',
  searched:[]
};

function search(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
    console.log(action.value);
    return { ...state, input:action.value}
    default:
    return state;
  }
}

export default search;