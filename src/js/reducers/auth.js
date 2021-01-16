import { combineReducers } from "redux";
import { createErrorReducer, createIsFetchReducer } from "./common";

function createLoginReducer() {
  return combineReducers({
    isChecking: createIsFetchReducer("AUTH_LOGIN"),
    error: createErrorReducer("AUTH_LOGIN"),
  });
}
function createRegisterReducer() {
  return combineReducers({
    isChecking: createIsFetchReducer("AUTH_REGISTER"),
    error: createErrorReducer("AUTH_REGISTER"),
  });
}

function createAuthReducer() {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_ERROR":
      case "AUTH_ON_INIT":
        return null;
      case "AUTH_REGISTER_SUCCESS":
      case "AUTH_LOGIN_SUCCESS":
      case "AUTH_ON_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  // const isChecking = (state = false, action) => {
  //   switch (action.type) {
  //     case "AUTH_REGISTER_INIT":
  //     case "AUTH_LOGIN_INIT":
  //     case "AUTH_ON_INIT":
  //       return true;
  //     case "AUTH_ON_SUCCESS":
  //     case "AUTH_ON_ERROR":
  //     case "AUTH_REGISTER_ERROR":
  //     case "AUTH_LOGIN_ERROR":
  //       return false;

  //     default:
  //       return state;
  //   }
  // };
  return combineReducers({
    user,
    isChecking: createIsFetchReducer("AUTH_ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
}

export default createAuthReducer();
