import { type } from "@testing-library/user-event/dist/type";
import { applyMiddleware, combineReducers, createStore } from "redux";
import accauntReducer from "./features/accaunts/accauntSlice";
import customReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  accaunt: accauntReducer,
  customer: customReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
