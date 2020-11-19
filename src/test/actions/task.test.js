import {
  getTasks, 
  getTasksSuccess,
  getTasksFailure
} from '../../actions/task';
import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
} from '../../helpers/actions';

describe('task actions', () => {
  it('should set state for getting tasks', async () => {
    const getTasksTest = { type: GET_TASKS };
    expect(getTasks()).toEqual(getTasksTest);
  });

  it('should return array of tasks', () => {
    const tasks = [
      { "data": "task #1 data here" },
      { "data": "task #2 data here" },
      { "data": "task #3 data here" },
      { "data": "task #4 data here" },
      { "data": "task #5 data here" }
    ];

    const getTSuccessTest = {
      type: GET_TASKS_SUCCESS,
      payload: tasks
    };

    expect(getTasksSuccess(tasks)).toEqual(getTSuccessTest);
  });

  it('should return an object with errors', () => {
    const errors = {
      "tasks": 
      ["Unable to load tasks. Something went wrong on server."]
    };

    const getTFailureTest = {
      type: GET_TASKS_FAILURE,
      errors,
    };

    expect(getTasksFailure(errors)).toEqual(getTFailureTest);
  });
});