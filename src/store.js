import { type } from "@testing-library/user-event/dist/type";

import accauntReducer from "./features/accaunts/accauntSlice";
import customReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    accaunt: accauntReducer,
    customer: customReducer,
  },
});
export default store;
