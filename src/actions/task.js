import axios from 'axios';
import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
} from '../helpers/actions';
import { getTRecordsSuccess } from './record';

const getTasks = () => ({ type: GET_TASKS });

const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
});

const getTasksFailure = errors => ({
  type: GET_TASKS_FAILURE,
  errors,
});

function fetchTasks(action = 'load', task = {}, routerHistory = '') {
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

export {
  getTasks, getTasksSuccess, getTasksFailure, fetchTasks,
};
