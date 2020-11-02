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
        user: action.payload.user,
        logged_in: action.payload.logged_in
      }
    case SIGN_FAILURE:
      return {
        ...state,
        errors: action.errors,
      }
    case GET_STATUS:
      return {
        ...state,
        user: action.user,
        logged_in: action.logged_in,
      };
    default:
      return state;
  }
};

export default account;
