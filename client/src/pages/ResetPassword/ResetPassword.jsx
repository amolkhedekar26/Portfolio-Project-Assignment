import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInputAuth } from "../../components/TextInputAuth";
import { PrimaryButton } from "../../components/PrimaryButton";
import PasswordIcon from "../../assets/icons/password.svg";
import { ToastContainer, notify } from "../../utils/toast";

import { useDispatch } from "react-redux";

import "./ResetPassword.css";
import ResetPassWordValidator from "../../validation/ResetPassword";
import { changePassword } from "../../actions/auth";

function ResetPassword(props) {
  const navigate = useNavigate();

  const initialState = {
    inputPassword: "",
    inputReEnterPassword: "",
  };
  const [state, setState] = useState(initialState);

  const { userId, resetToken } = useParams();

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
    const { password, reEnterPassword } = data;
    return {
      password: password.trim(),
      reEnterPassword: reEnterPassword.trim(),
    };
  };

  // Handle Reset button click
  function handleResetPassword(e) {
    e.preventDefault();
    const reqBody = {
      password: state.inputPassword,
      reEnterPassword: state.inputReEnterPassword,
    };
    const trimmedData = trimData(reqBody);
    const isValid = ResetPassWordValidator.validate(trimmedData, notify);
    if (isValid) {
      dispatch(changePassword(userId, resetToken, trimmedData.password, notify))
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch(() => {});
    }
  }
  return (
    <section className="sign-in-container">
      <h1>Reset Password</h1>
      <form className="sign-in-form">
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
          label={"Re-enter Password"}
          name={"inputReEnterPassword"}
          value={state.inputReEnterPassword}
          placeholder={"Re-Enter your password here"}
          onChange={handleChange}
        />
        <PrimaryButton onClick={handleResetPassword}>
          Reset Password
        </PrimaryButton>
      </form>
      <ToastContainer />
    </section>
  );
}

export default ResetPassword;
