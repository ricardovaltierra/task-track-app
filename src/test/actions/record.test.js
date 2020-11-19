import { 
  getRecords, 
  getTRecordsSuccess, 
  getTRecordsFailure 
} from "../../actions/record";
import {
  GET_TASK_RECORDS,
  GET_TASK_RECORDS_SUCCESS,
  GET_TASK_RECORDS_FAILURE
} from '../../helpers/actions';

describe('record actions', () => {
  it('should set state for getting records', () => {
    const getRecordsTest = { type: GET_TASK_RECORDS };
    expect(getRecords()).toEqual(getRecordsTest);
  });

  it('should return an array of records', () => {
    const records = [
      { "data": "record #1 data here" },
      { "data": "record #2 data here" },
      { "data": "record #3 data here" },
      { "data": "record #4 data here" },
      { "data": "record #5 data here" },
      { "data": "record #6 data here" },
      { "data": "record #7 data here" },
      { "data": "record #8 data here" }
    ];

    const getSuccessTest = {
      type: GET_TASK_RECORDS_SUCCESS,
      payload: records,
    };

    expect(getTRecordsSuccess(records)).toEqual(getSuccessTest);
  });

  it('should return an object with errors', () => {
    const errors = {
      "records":
      ["Unable to load records. Something went wrong on server."]
    };

    const getFailureTest = {
      type: GET_TASK_RECORDS_FAILURE,
      errors,
    };

    expect(getTRecordsFailure(errors)).toEqual(getFailureTest);
  });
});