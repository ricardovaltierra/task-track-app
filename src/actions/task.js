import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_FAILURE
} from '../helpers/actions';

const getTasks = () => ({ type: GET_TASKS });

const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
});

const getTasksFailure = errors => ({
  type: GET_TASKS_FAILURE,
  errors,
});

const saveTaskSuccess = () => ({ type: SAVE_TASK_SUCCESS });

const saveTaskFailure = errors => ({
  type: SAVE_TASK_FAILURE,
  errors,
});

export {
  getTasks, getTasksSuccess, getTasksFailure, saveTaskSuccess, saveTaskFailure,
};
