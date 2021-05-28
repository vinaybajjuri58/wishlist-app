import { useState } from "react";
import { useData } from "../Context";
import { useNavigate } from "react-router-dom";
import { signUpUserHandler } from "./serverCalls";
const initialState = {
  name: "",
  email: "",
  password: "",
};
export const SignupPage = () => {
  const [signUpDetails, setSignUpDetails] = useState(initialState);
  const { setToast, setToastMessage } = useData();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignUpDetails((initialData) => ({
      ...initialData,
      [e.target.name]: e.target.value,
    }));
  };
  const signupHandler = async () => {
    const data = await signUpUserHandler({
      email: signUpDetails.email,
      password: signUpDetails.password,
      name: signUpDetails.name,
    });
    if (data.success === true) {
      navigate("/login");
      setToastMessage("User registered Successfully");
      setToast("true");
    } else {
      setToastMessage("Error in signup");
      setToast("true");
    }
  };
  return (
    <div className="div-flex-center">
      <h2> Signup Page </h2>
      <div className="login-div-container">
        <label>
          <p>Name : </p>
          <input
            className="input-styled"
            name="name"
            value={signUpDetails.name}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Email : </p>
          <input
            className="input-styled"
            name="email"
            value={signUpDetails.email}
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Password : </p>
          <input
            className="input-styled"
            name="password"
            value={signUpDetails.password}
            type="password"
            onChange={handleChange}
          />
        </label>
        <button
          onClick={signupHandler}
          className="button button-border border-primary"
        >
          Signup
        </button>
      </div>
    </div>
  );
};
