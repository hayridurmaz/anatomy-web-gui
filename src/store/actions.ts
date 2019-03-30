import * as types from "./types";

export function updateLoggedIn(newLoggedIn: boolean): types.Action {
  return {
    type: types.UPDATE_LOGGED_IN,
    loggedIn: newLoggedIn
  };
}

export function updateAccount(newAcc: types.Account): types.Action {
  return {
    type: types.UPDATE_ACCOUNT,
    Account: newAcc
  };
}
