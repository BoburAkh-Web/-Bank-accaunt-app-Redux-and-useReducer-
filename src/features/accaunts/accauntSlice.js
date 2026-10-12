const initialStateAccaunt = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accauntReducer(state = initialStateAccaunt, action) {
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
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}

export function deposit(amout) {
  return { type: "accaunt/deposit", payload: amout };
}
export function withdraw(amount) {
  return { type: "accaunt/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "accaunt/requestLoan", payload: { amount, purpose } };
}
export function payLoan(amount) {
  return { type: "accaunt/payLoan", payload: amount };
}
