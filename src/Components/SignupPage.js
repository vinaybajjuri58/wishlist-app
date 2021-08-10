import { useData } from "../Context";
import { useNavigate } from "react-router-dom";
import { signUpUserHandler } from "./serverCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const SignupPage = () => {
  const { setToast, setToastMessage } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const signupHandler = async (data) => {
    const response = await signUpUserHandler({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    if (response.success === true) {
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
        <form onSubmit={handleSubmit(signupHandler)}>
          <label>
            <p>Name : </p>
          </label>
          <input
            className="input-styled"
            type="text"
            name="name"
            {...register("name")}
          />
          <p className="error-text">{errors.name?.message}</p>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};
