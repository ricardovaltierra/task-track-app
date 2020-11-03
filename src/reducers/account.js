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
        logged_in: action.payload.logged_in,
        loading: false
      }
    case SIGN_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false
      }
    case GET_STATUS:
      console.log('GET_STATUS account reducer', action.user)
      return {
        ...state,
        user: action.user,
        logged_in: action.logged_in,
        loading: false
      };
    default:
      return state;
  }
};

export default account;
