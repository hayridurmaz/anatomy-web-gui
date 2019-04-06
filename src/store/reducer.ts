import * as types from "./types";

const initialState: types.GlobalState = {
  loggedIn: false,
  Account: undefined
};

export default function reducer(
  state: types.GlobalState = initialState,
  action: types.Action
) {
  switch (action.type) {
    case types.UPDATE_ACCOUNT:
      return { ...state, Account: action.Account };
    case types.UPDATE_LOGGED_IN:
      return { ...state, loggedIn: action.loggedIn };
    default: {
      return state;
    }
  }
}
