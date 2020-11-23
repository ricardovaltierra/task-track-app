import axios from 'axios';
import {
  signUser,
  signUserSuccess,
  signUserFailure,
  getStatus,
  deleteUserSuccess,
  deleteUserFailure,
} from './account';
import {
  getTasks,
  getTasksSuccess,
  getTasksFailure,
} from './task';
import {
  getRecords,
  getTRecordsSuccess,
  getTRecordsFailure,
} from './record';

function fetchUser(
  action = 'sign_in',
  user = {},
  routerHistory,
) {
  return dispatch => {
    dispatch(signUser());

    switch (action) {
      case 'sign_in':
        return axios
          .post(
            'https://steptracking-api.herokuapp.com/sessions',
            {
              user: {
                email: user.email,
                password: user.password,
              },
            },
            { withCredentials: true },
          )
          .then(response => {
            if (response.data.logged_in) {
              dispatch(signUserSuccess(response.data));
              routerHistory.push('/dashboard');
            } else {
              dispatch(signUserFailure(response));
            }
          })
          .catch(error => {
            const formatErrors = JSON.stringify({
              login: [`${error.response.data.errors}`],
            });
            dispatch(signUserFailure(formatErrors));
          });
      case 'sign_out':
        return axios
          .delete('https://steptracking-api.herokuapp.com/logout', {
            withCredentials: true,
          })
          .then(response => {
            if (response.data.logged_out) {
              dispatch(signUserSuccess(response.data));
              routerHistory.push('/');
            } else dispatch(signUserFailure(response));
          })
          .catch(error => {
            const formatErrors = JSON.stringify(error.response.data.errors);
            dispatch(signUserFailure(formatErrors));
          });
      case 'sign_up':
        return axios
          .post(
            'https://steptracking-api.herokuapp.com/registrations',
            {
              user: {
                email: user.email,
                password: user.password,
                password_confirmation: user.passwordConfirmation,
              },
            },
            { withCredentials: true },
          )
          .then(response => {
            if (response.data.status === 'created') {
              dispatch(signUserSuccess(response.data));
              routerHistory.push('/dashboard');
            } else {
              dispatch(signUserFailure(response));
            }
          })
          .catch(error => {
            const formatErrors = JSON.stringify(error.response.data.errors);
            dispatch(signUserFailure(formatErrors));
          });
      case 'sign_status':
        return axios
          .get('https://steptracking-api.herokuapp.com/logged_in', {
            withCredentials: true,
          })
          .then(response => {
            dispatch(getStatus(response.data));
          })
          .catch(error => console.log('login? error: ', error)); // eslint-disable-line no-console
      case 'delete_user':
        return axios
          .delete(
            `https://steptracking-api.herokuapp.com/registrations/${user.id}`,
            { withCredentials: true },
          )
          .then(response => {
            dispatch(deleteUserSuccess(response.data));
          })
          .catch(error => {
            dispatch(deleteUserFailure(error));
          });
      default:
        return dispatch(signUserFailure('Request error'));
    }
  };
}

function fetchTasks(
  action = 'load',
  task = {},
  routerHistory = '',
) {
  return dispatch => {
    dispatch(getTasks());
    if (action === 'load') {
      return axios
        .get('https://steptracking-api.herokuapp.com/tasks', {
          withCredentials: true,
        })
        .then(response => {
          dispatch(getTasksSuccess(response.data.tasks));
        })
        .catch(errors => dispatch(getTasksFailure(errors)));
    }

    if (action === 'save') {
      return axios
        .post(
          'https://steptracking-api.herokuapp.com/tasks',
          {
            task: {
              name: task.name,
              description: task.description,
              completion: task.completion,
              user_id: task.userId,
            },
          },
          { withCredentials: true },
        )
        .then(() => {
          routerHistory.push('/dashboard/tasks');
        })
        .catch(errors => dispatch(getTasksFailure(errors)));
    }

    if (action === 'reset') {
      return axios
        .delete('https://steptracking-api.herokuapp.com/reset', {
          withCredentials: true,
        })
        .then(() => {
          dispatch(getTasksSuccess([]));
          dispatch(getTRecordsSuccess([]));
        })
        .catch(errors => dispatch(getTasksFailure(errors)));
    }

    return '';
  };
}

function fetchRecords(
  action = 'load',
  record = {},
  routerHistory,
  flag = false,
) {
  return dispatch => {
    dispatch(getRecords);

    if (action === 'load') {
      return axios
        .get('https://steptracking-api.herokuapp.com/records', {
          withCredentials: true,
        })
        .then(response => {
          dispatch(getTRecordsSuccess(response.data.records));
        })
        .catch(errors => dispatch(getTRecordsFailure(errors)));
    }

    if (action === 'save') {
      return axios
        .post(
          'https://steptracking-api.herokuapp.com/records',
          {
            record: {
              percentage: record.percentage,
              user_id: record.userId,
              task_id: record.value,
            },
          },
          { withCredentials: true },
        )
        .then(() => {
          if (!flag) routerHistory.push('/dashboard/tasks');
          else routerHistory.push('/dashboard/records');
        })
        .catch(errors => dispatch(getTRecordsFailure(errors)));
    }

    return '';
  };
}

export { fetchUser, fetchTasks, fetchRecords };
