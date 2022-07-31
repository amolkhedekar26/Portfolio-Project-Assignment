import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputAuth } from "../../components/TextInputAuth";
import { PrimaryButton } from "../../components/PrimaryButton";
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import { ToastContainer, notify } from "../../utils/toast";
import ErrorIcon from "../../assets/icons/erroricon.svg";

import { useDispatch } from "react-redux";

import { login } from "../../actions/auth";
import SignInValidator from "../../validation/SignIn";

import "./SignIn.css";

function SignIn(props) {
  const navigate = useNavigate();

  const initialState = {
    inputEmail: "",
    inputPassword: "",
  };
  const [state, setState] = useState(initialState);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();

  // Handle input change for each input
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  const trimData = (data) => {
    const { email, password } = data;
    return { email: email.trim(), password: password.trim() };
  };

  // Handle Signin button click
  function handleSignIn(e) {
    e.preventDefault();
    const reqBody = {
      email: state.inputEmail,
      password: state.inputPassword,
    };
    const trimmedData = trimData(reqBody);
    const isvalid = SignInValidator.validate(trimmedData, notify);
    if (isvalid) {
      dispatch(
        login(trimmedData.email, trimmedData.password, setHasError, notify)
      )
        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch(() => {});
    }
  }
  return (
    <section className="sign-in-container">
      <h1>Sign In</h1>
      <form className="sign-in-form">
        <TextInputAuth
          icon={EmailIcon}
          type={"email"}
          label={"Email address"}
          name={"inputEmail"}
          value={state.inputEmail}
          placeholder={"Enter your email address here"}
          onChange={handleChange}
        />
        <TextInputAuth
          icon={PasswordIcon}
          type={"password"}
          label={"Password"}
          name={"inputPassword"}
          value={state.inputPassword}
          placeholder={"Enter your password here"}
          onChange={handleChange}
        />
        <div className="error-forgot-div">
          <span className={hasError ? "error-text show" : "hide"}>
            <img src={ErrorIcon} alt="" />
            Incorrect password entered
          </span>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <PrimaryButton onClick={handleSignIn}>Sign In</PrimaryButton>
        <p className="sign-up-text">
          Don't have an account?{" "}
          <a className="sign-up-link" href="/register">
            Sign up here
          </a>{" "}
        </p>
      </form>
      <ToastContainer />
    </section>
  );
}

export default SignIn;
