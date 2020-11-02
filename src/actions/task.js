import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE
} from '../helpers/actions';
import axios from "axios";

const getTasks = () => ({ type: GET_TASKS });

const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks
});

const getTasksFailure = errors => ({
  type: GET_TASKS_FAILURE,
  errors: errors
})

function fetchTasks() {
  return dispatch => {
    dispatch(getTasks());
    return axios.get('https://steptracking-api.herokuapp.com/tasks', { withCredentials: true })
          .then((response) => {
            dispatch(getTasksSuccess(response.data.tasks))
          })
          .catch(errors => dispatch(getTasksFailure(errors)));
    
  }
}

export { getTasks, getTasksSuccess, getTasksFailure, fetchTasks };