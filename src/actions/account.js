import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE,
  GET_STATUS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../helpers/actions';

const signUser = () => ({ type: SIGN });

const signUserSuccess = user => ({
  type: SIGN_SUCCESS,
  payload: user,
});

const signUserFailure = errors => ({
  type: SIGN_FAILURE,
  errors,
});

const getStatus = status => ({
  type: GET_STATUS,
  loggedIn: status.logged_in,
  user: status.user,
});

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
  loggedIn: false,
  user: {},
});

const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  loggedIn: true,
  error,
});



export {
  signUser, signUserSuccess, signUserFailure, getStatus, deleteUserSuccess, deleteUserFailure,
};
