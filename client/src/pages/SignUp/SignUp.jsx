import React, { useState } from "react";
import { TextInputAuth } from "../../components/TextInputAuth";
import "./SignUp.css";
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ToastContainer, notify } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";

import SignUpValidator from "../../validation/SignUp";

function SignUp() {
  const initialState = {
    inputEmail: "",
    inputPassword: "",
    inputConfirmPassword: "",
  };
  const [state, setState] = useState(initialState);

  const navigate = useNavigate();

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
    const { email, password, confirmPassword } = data;
    return {
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };
  };

  // Handle Signup button click
  async function handleSignUp(e) {
    e.preventDefault();
    const reqBody = {
      email: state.inputEmail,
      password: state.inputPassword,
      confirmPassword: state.inputConfirmPassword,
    };
    const trimmedData = trimData(reqBody);
    const isvalid = SignUpValidator.validate(trimmedData, notify);

    if (isvalid) {
      dispatch(register(trimmedData.email, trimmedData.password, notify))
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((message) => {
          notify(message, "error");
        });
    }
  }

  return (
    <section className="sign-up-container">
      <h1>Sign Up</h1>
      <form className="sign-up-form">
        <TextInputAuth
          icon={EmailIcon}
          type={"email"}
          label={"Email address"}
          name={"inputEmail"}
          value={state.inputEmail}
          placeholder={"Enter your email address here"}
          onChange={handleChange}
          required={true}
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
        <TextInputAuth
          icon={PasswordIcon}
          type={"password"}
          label={"Confirm Password"}
          name={"inputConfirmPassword"}
          value={state.inputConfirmPassword}
          placeholder={"Re-enter your password here"}
          onChange={handleChange}
        />
        <PrimaryButton onClick={handleSignUp}>Sign Up</PrimaryButton>
        <p className="sign-in-text">
          Already have an account?{" "}
          <a className="sign-in-link" href="/login">
            Sign in here
          </a>{" "}
        </p>
      </form>
      <ToastContainer />
    </section>
  );
}

export default SignUp;
