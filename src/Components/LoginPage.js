import { useData, useAuth, AuthActionTypes } from "../Context";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUserHandler } from "./serverCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const LoginPage = () => {
  const { authDispatch } = useAuth();
  const { setToast, setToastMessage } = useData();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "vinay5@gmail.com",
      password: "123456789",
    },
  });

  const loginHandler = async (data) => {
    const response = await loginUserHandler({
      email: data.email,
      password: data.password,
    });
    if (response.success === true) {
      const loginTime = new Date().getTime();
      localStorage?.setItem(
        "login",
        JSON.stringify({
          isLoggedIn: true,
          userToken: response.token,
          expiry: loginTime + 64800000,
        })
      );
      authDispatch({
        type: AuthActionTypes.SET_LOGGED_IN,
        payload: {
          token: response.token,
        },
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
        <form onSubmit={handleSubmit(loginHandler)}>
          <label>
            <p>Email : </p>
          </label>
          <input
            className="input-styled"
            type="text"
            name="email"
            {...register("email")}
          />
          <p className="error-text">{errors.email?.message}</p>
          <label>
            <p>Password : </p>
          </label>
          <input
            className="input-styled"
            type="password"
            name="password"
            {...register("password")}
          />
          <p className="error-text">{errors.password?.message}</p>
          <button type="submit" className="button button-border border-primary">
            Login
          </button>
        </form>
      </div>
      <Link to="/signup">
        <button className="button button-primary">Signup</button>
      </Link>
    </div>
  );
};
