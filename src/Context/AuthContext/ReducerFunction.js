import * as AuthActions from "./ActionTypes";
export const reducerFunction = (state, action) => {
  switch (action.type) {
    case AuthActions.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload.token,
      };
    case AuthActions.SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
      };
    default:
      return state;
  }
};
