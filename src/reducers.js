import { combineReducers } from "redux";
import searchReducer from "./search/duck/reducers";

const rootReducer = combineReducers({
  search: searchReducer
});

export default rootReducer;
