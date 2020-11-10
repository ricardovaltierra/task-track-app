import { combineReducers } from "redux";
import account from "./account";
import tasks from "./tasks";
import records from "./records";

const rootReducer = combineReducers({ account, tasks, records });

export default rootReducer;
