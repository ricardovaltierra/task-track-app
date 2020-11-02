import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE,
  GET_STATUS
} from '../helpers/actions';

export const initialState = {
  loading: false,
  errors: "",
  user: {},
  logged_in: false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case SIGN:
      return {
        ...state,
        loading: true
      }
    case SIGN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged_in: action.logged_in
      }
    case SIGN_FAILURE:
      return {
        ...state,
        errors: action.errors,
      }
    case GET_STATUS:
      console.log('logged in', action.logged_in);
      console.log('user', action.user);
      return {
        ...state,
        loading: false,
        logged_in: action.logged_in,
        user: action.user,
      };
    default:
      return state;
  }
};

export default account;
