import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";
import accauntReducer from "./features/accaunts/accauntSlice";
import customReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  accaunt: accauntReducer,
  customer: customReducer,
});

const store = createStore(rootReducer);
export default store;
