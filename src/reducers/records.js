import {
  GET_TASK_RECORDS,
  GET_TASK_RECORDS_SUCCESS,
  GET_TASK_RECORDS_FAILURE,
} from "../helpers/actions";

const initialState = {
  loading: true,
  errors: "",
  items: [],
};

const records = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_RECORDS:
      return state;
    case GET_TASK_RECORDS_SUCCESS:
      return {
        items: action.payload,
        loading: false,
        errors: "",
      };
    case GET_TASK_RECORDS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default records;
