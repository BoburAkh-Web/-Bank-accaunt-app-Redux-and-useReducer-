import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const initialStateAccaunt = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accauntReducer(state = initialStateAccaunt, action) {
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

function customReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  accaunt: accauntReducer,
  customer: customReducer,
});

const store = createStore(rootReducer);

// function deposit(amout) {
//   return { type: "accaunt/deposit", payload: amout };
// }
// function withdraw(amount) {
//   return { type: "accaunt/withdraw", payload: amount };
// }
// function requestLoan(amount, purpose) {
//   return { type: "accaunt/requestLoan", payload: { amount, purpose } };
// }
// function payLoan(amount) {
//   return { type: "accaunt/payLoan", payload: amount };
// }

// store.dispatch(deposit(200));
// store.dispatch(withdraw(100));
// store.dispatch(requestLoan(50, "Buy a new car"));

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Bobur Akhmadaliev", "230520"));
console.log(store.getState());
