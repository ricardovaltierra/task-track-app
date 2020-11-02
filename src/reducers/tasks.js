import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE
} from '../helpers/actions';

const initialState = {
  loading: false,
  errors: '',
  items: []
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        loading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        items: action.payload,
        loading: false,
        errors: ''
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.errors
      }
    default:
      return state;
  }
}

export default tasks;