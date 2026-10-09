import { type } from "@testing-library/user-event/dist/type";
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "accaunt/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "accaunt/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "accaunt/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "accaunt/payLoan":
      return {
        ...state,
        loan: action.payload,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "accaunt/deposit", payload: 400 });
store.dispatch({ type: "accaunt/payLoan", payload: 0 });
store.dispatch({ type: "accaunt/withdraw", payload: 100 });
store.dispatch({
  type: "accaunt/requestLoan",
  payload: { amount: 100, purpose: "Buy a new car" },
});
console.log(store.getState());
