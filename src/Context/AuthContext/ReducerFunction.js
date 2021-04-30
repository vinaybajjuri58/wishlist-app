import * as AuthActions from "./ActionTypes";
export const reducerFunction = (state, action) => {
  switch (action.type) {
    case AuthActions.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case AuthActions.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
