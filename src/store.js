import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  accaunt: accauntReducer,
  customer: customReducer,
});

const store = createStore(rootReducer);
