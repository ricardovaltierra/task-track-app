import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE,
  GET_STATUS
} from '../helpers/actions';
import axios from "axios";

const signUser = () => ({ type: SIGN});

const signUserSuccess = user => ({
  type: SIGN_SUCCESS,
  payload: user
});

const signUserFailure = errors => ({
  type: SIGN_FAILURE,
  errors: errors
});

const getStatus = (status) => ({
  type: GET_STATUS,
  logged_in: status.logged_in,
  user: status.user
});

function fetchUser(action = 'sign_in', user = {}) {
  
  return dispatch => {
    
    dispatch(signUser());

    switch (action) {
      case 'sign_in':
        return axios.post('https://steptracking-api.herokuapp.com/sessions', {
          user: {
            email: user.email,
            password: user.password,
          }
        },
        { withCredentials: true })
        .then(response => {
          console.log('login response', response);
          if (response.data.logged_in){
            dispatch(signUserSuccess(response.data))
          }
          else dispatch(signUserFailure(response))
        })
        .catch(error => {
          console.log('login error', error);
          dispatch (signUserFailure(error))
        });
      case 'sign_out':
        return axios.delete('https://steptracking-api.herokuapp.com/logout', { withCredentials: true })
          .then((response) => {
            console.log('logout response', response);
            if (response.data.logged_out)
              dispatch(signUserSuccess(response.data))
            else dispatch(signUserFailure(response))
          })
          .catch(error => {
            console.log('logout error', error);
            dispatch (signUserFailure(error))
          });
      case 'sign_up':
        return axios.post('https://steptracking-api.herokuapp.com/registrations', {
          user: {
          email: user.email,
          password: user.password, 
          password_confirmation: user.password_confirmation
          }
        }, { withCredentials: true })
          .then(response => {
            console.log('sign up response', response);
            if (response.data.status === 'created')
              dispatch(signUserSuccess(response.data))
            else dispatch(signUserFailure(response))
          })
          .catch(error => {
            console.log('sign up error', error);
            dispatch (signUserFailure(error))
          });
      case 'sign_status':
        return axios.get('https://steptracking-api.herokuapp.com/logged_in', { withCredentials: true })
          .then((response) => {
            dispatch(getStatus(response.data))
          })
          .catch((error) => console.log('login? error: ', error));
      default:
        console.log('Request error');
        return dispatch (signUserFailure('Request error'));
    }
  }
}

export { signUser, signUserSuccess, signUserFailure, fetchUser };
