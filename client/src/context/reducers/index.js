import { combineReducers } from "redux";

import alertReducer from "./alertReducer";
import allUserReducer from "./allUserReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
});

export default myReducers;