import {
  GET_TASK_RECORDS,
  GET_TASK_RECORDS_SUCCESS,
  GET_TASK_RECORDS_FAILURE,
} from '../helpers/actions';

const getRecords = () => ({ type: GET_TASK_RECORDS });

const getTRecordsSuccess = records => ({
  type: GET_TASK_RECORDS_SUCCESS,
  payload: records,
});

const getTRecordsFailure = errors => ({
  type: GET_TASK_RECORDS_FAILURE,
  errors,
});

export {
  getRecords, getTRecordsSuccess, getTRecordsFailure,
};
