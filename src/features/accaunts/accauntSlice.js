import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accauntSlice = createSlice({
  name: "accaunt",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - action.payload;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accauntSlice);
export const { withdraw, requestLoan, payLoan } = accauntSlice.actions;

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

export default accauntSlice.reducer;
// export default function accauntReducer(state = initialStateAccaunt, action) {
//   switch (action.type) {
//     case "accaunt/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "accaunt/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "accaunt/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "accaunt/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - action.payload,
//       };
//     case "accaunt/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "accaunt/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: "accaunt/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
//     );

//     const data = await res.json();
//     const converted = amount * data.rates.USD;
//     dispatch({ type: "accaunt/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "accaunt/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "accaunt/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan(amount) {
//   return { type: "accaunt/payLoan", payload: amount };
// }
