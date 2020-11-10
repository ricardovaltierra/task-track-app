import {
  GET_TASK_RECORDS,
  GET_TASK_RECORDS_SUCCESS,
  GET_TASK_RECORDS_FAILURE,
} from "../helpers/actions";
import axios from "axios";

const getRecords = () => ({ type: GET_TASK_RECORDS });

const getTRecordsSuccess = (records) => ({
  type: GET_TASK_RECORDS_SUCCESS,
  payload: records,
});

const getTRecordsFailure = (errors) => ({
  type: GET_TASK_RECORDS_FAILURE,
  errors: errors,
});

function fetchRecords(
  action = "load",
  record = {},
  routerHistory,
  flag = false
) {
  return (dispatch) => {
    dispatch(getRecords);

    if (action === "load") {
      return axios
        .get("https://steptracking-api.herokuapp.com/records", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(getTRecordsSuccess(response.data.records));
        })
        .catch((errors) => dispatch(getTRecordsFailure(errors)));
    }

    if (action === "save") {
      return axios
        .post(
          "https://steptracking-api.herokuapp.com/records",
          {
            record: {
              percentage: record.percentage,
              user_id: record.user_id,
              task_id: record.value,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (!flag) routerHistory.push("/dashboard/tasks");
          else routerHistory.push("/dashboard/records");
        })
        .catch((errors) => dispatch(getTRecordsFailure(errors)));
    }
  };
}

export { getRecords, getTRecordsSuccess, getTRecordsFailure, fetchRecords };
