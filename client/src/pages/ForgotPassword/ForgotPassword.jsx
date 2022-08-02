import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputAuth } from "../../components/TextInputAuth";
import { PrimaryButton } from "../../components/PrimaryButton";
import EmailIcon from "../../assets/icons/email.svg";
import { ToastContainer, notify } from "../../utils/toast";
import { useDispatch } from "react-redux";

import "./ForgotPassword.css";
import { verifyEmail } from "../../actions/auth";

function ForgotPassword(props) {
  const navigate = useNavigate();

  const initialState = {
    inputEmail: "",
  };
  const [state, setState] = useState(initialState);

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
    const { email } = data;
    return { email: email.trim() };
  };

  // Handle Signin button click
  function handleForgotPassword(e) {
    e.preventDefault();
    const reqBody = {
      email: state.inputEmail,
    };
    const trimmedData = trimData(reqBody);
    if (trimmedData.email.length === 0) {
      notify("Please enter your email", "error");
      return;
    }
    dispatch(verifyEmail(trimmedData.email, notify))
      .then((data) => {
        setTimeout(() => {
          navigate(`/reset-password/${data.userId}/${data.resetToken}`);
        }, 1000);
      })
      .catch(() => {});
  }
  return (
    <section className="forgot-password-container">
      <h1>Forgot Password</h1>
      <p className="forgot-text">
        No worries, we’ll send you reset instructions.
      </p>
      <form className="forgot-password-form">
        <TextInputAuth
          icon={EmailIcon}
          type={"email"}
          label={"Email address"}
          name={"inputEmail"}
          value={state.inputEmail}
          placeholder={"Enter your email address here"}
          onChange={handleChange}
        />
        <PrimaryButton onClick={handleForgotPassword}>Send</PrimaryButton>
      </form>
      <ToastContainer />
    </section>
  );
}

export default ForgotPassword;
