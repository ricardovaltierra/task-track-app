import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE
} from '../helpers/actions';

export const initialState = {
  loading: false,
  errors: "",
  user: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGN:
      return {
        ...state,
        loading: true
      }
    case SIGN_SUCCESS:
      return {
        loading: false,
        errors: "",
        user: action.payload
      }
    case SIGN_FAILURE:
      return {
        loading: false,
        errors: action.errors,
        user: {}
      }
    default:
      return state;
  }
};

export default user;
