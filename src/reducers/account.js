import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE,
  GET_STATUS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from '../helpers/actions';

export const initialState = {
  loading: true,
  errors: {},
  user: {},
  logged_in: false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case SIGN:
      return state;
    case SIGN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        logged_in: action.payload.logged_in,
        loading: false,
      }
    case SIGN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case GET_STATUS:
      return {
        ...state,
        user: action.user,
        logged_in: action.logged_in,
        loading: false
      };
    case DELETE_USER_SUCCESS:
      
      return {
        ...state,
        user: {},
        logged_in: false,
        loading: false
      }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        user: {},
        logged_in: false,
        loading: false,
        errors: action.errors
      }
    default:
      return state;
  }
};

export default account;
