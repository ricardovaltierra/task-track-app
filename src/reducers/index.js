import { combineReducers } from 'redux';
import account from './account';
import tasks from './tasks';

const rootReducer = combineReducers({ account, tasks });

export default rootReducer;