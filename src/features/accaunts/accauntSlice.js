const initialStateAccaunt = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accauntReducer(state = initialStateAccaunt, action) {
  switch (action.type) {
    case "accaunt/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "accaunt/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

// function convert(base, quote, amount) {
//   const api = "https://api.frankfurter.dev";
//   return fetch(`${api}/v2/rate/${base}/${quote}`)
//     .then((r) => r.json())
//     .then((d) => (amount * d.rate).toFixed(2));
// }

// convert("eur", "usd", 10).then((result) =>
//   alert(`10 EUR = ${result} USD`)
// );

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "accaunt/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "accaunt/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    );

    const data = await res.json();
    const converted = amount * data.rates.USD;
    dispatch({ type: "accaunt/deposit", payload: converted });
  };
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
