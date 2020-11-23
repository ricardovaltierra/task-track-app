import {
  signUser,
  signUserSuccess,
  signUserFailure,
  getStatus,
  deleteUserSuccess,
  deleteUserFailure,
} from '../../actions/account';
import {
  SIGN,
  SIGN_SUCCESS,
  SIGN_FAILURE,
  GET_STATUS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../../helpers/actions';

describe('account actions', () => {
  it('should set sign status', () => {
    const signUserTest = { type: SIGN };
    expect(signUser()).toEqual(signUserTest);
  });

  it('should return a user logged in', () => {
    const user = {
      logged_in: true,
      status: 'created',
      user: {
        created_at: '2020-11-08T14:12:19.711Z',
        email: 'a@mail.com',
        id: 53,
        password_digest: '$2a$12$yx2xn25',
        updated_at: '2020-11-08T14:12:19.711Z',
      },
    };

    const signSuccessTest = {
      type: SIGN_SUCCESS,
      payload: user,
    };

    expect(signUserSuccess(user)).toEqual(signSuccessTest);
  });

  it('should return a sign in/up error', () => {
    const errors = {
      login:
      ['Authentication failed. Please check your credentials.'],
    };

    const signFailureTest = {
      type: SIGN_FAILURE,
      errors,
    };

    expect(signUserFailure(errors)).toEqual(signFailureTest);
  });

  it('should return user api status and data', () => {
    const status = {
      logged_in: true,
      status: 'created',
      user: {
        created_at: '2020-11-08T14:12:19.711Z',
        email: 'a@mail.com',
        id: 53,
        password_digest: '$2a$12$yx2xn25',
        updated_at: '2020-11-08T14:12:19.711Z',
      },
    };

    const getStatusTest = {
      type: GET_STATUS,
      loggedIn: status.logged_in,
      user: status.user,
    };

    expect(getStatus(status)).toEqual(getStatusTest);
  });

  it('should return empty user object on delete', () => {
    const getDeleteUserTest = {
      type: DELETE_USER_SUCCESS,
      loggedIn: false,
      user: {},
    };

    expect(deleteUserSuccess()).toEqual(getDeleteUserTest);
  });

  it('should return delete user error', () => {
    const error = {
      'delete user':
      ['Somthing went wrong. Please try again.'],
    };

    const getDeleteFailureTest = {
      type: DELETE_USER_FAILURE,
      loggedIn: true,
      error,
    };

    expect(deleteUserFailure(error)).toEqual(getDeleteFailureTest);
  });
});
