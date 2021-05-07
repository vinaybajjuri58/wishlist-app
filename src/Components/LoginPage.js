import { useState } from "react";
import { useData, useAuth, AuthActionTypes } from "../Context";
import { useLocation, useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState(initialState);
  const { authDispatch } = useAuth();
  const { setToast, setToastMessage } = useData();
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleChange = (e) => {
    setLoginDetails((initialData) => ({
      ...initialData,
      [e.target.name]: e.target.value,
    }));
  };
  const loginHandler = () => {
    if (
      loginDetails.email === "neog@gmail.com" &&
      loginDetails.password === "neog123"
    ) {
      authDispatch({
        type: AuthActionTypes.SET_LOGGED_IN,
      });
      navigate(state?.from ? state.from : "/");
      setToastMessage("Logged In Successfully");
      setToast("true");
    } else {
      setToastMessage("Please check login details");
      setToast("true");
    }
  };
  return (
    <div className="div-flex-center">
      <h2> Login Page </h2>
      <div className="login-div-container">
        <label>
          <p>Email : </p>
          <input
            className="input-styled"
            name="email"
            value={loginDetails.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Password : </p>
          <input
            className="input-styled"
            name="password"
            value={loginDetails.password}
            type="password"
            onChange={handleChange}
          />
        </label>
        <button
          onClick={loginHandler}
          className="button button-border border-primary"
        >
          Login
        </button>
      </div>
      <div>
        <h4>Login Details</h4>
        <p>Email: neog@gmail.com</p>
        <p>Password : neog123</p>
      </div>
    </div>
  );
};
