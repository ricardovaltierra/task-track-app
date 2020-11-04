import {
  GET_TASK_RECORDS,
  GET_TASK_RECORDS_SUCCESS,
  GET_TASK_RECORDS_FAILURE
} from '../helpers/actions';
import axios from "axios";

const getRecords = () => ({ type: GET_TASK_RECORDS });

const getTRecordsSuccess = records => ({
  type: GET_TASK_RECORDS_SUCCESS,
  payload: records
});

const getTRecordsFailure = errors => ({
  type: GET_TASK_RECORDS_FAILURE,
  errors: errors
});

function fetchRecords() {
  return dispatch => {
    dispatch(getRecords);
    return axios.get('https://steptracking-api.herokuapp.com/records', { withCredentials: true })
      .then((response) => {
        dispatch(getTRecordsSuccess(response.data.records))
      })
      .catch(errors => dispatch(getTRecordsFailure(errors)));
  }
}

export { getRecords, getTRecordsSuccess, getTRecordsFailure, fetchRecords };