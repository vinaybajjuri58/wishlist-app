import axios from "axios";
export const signUpUserHandler = async ({ email, name, password }) => {
  let response = {};
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}users/signup`,
      {
        email,
        name,
        password,
      }
    );
  } catch (err) {
    response.data = {
      success: "false",
      message: "Error in signup",
      errMessage: err.errMessage,
    };
  }
  return response.data;
};
export const loginUserHandler = async ({ email, password }) => {
  let response = {};
  try {
    response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}users/login`,
      {
        email,
        password,
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "error in login",
      errMessage: err.errMessage,
    };
  }
  return response.data;
};
