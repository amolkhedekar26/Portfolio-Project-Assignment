import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EMAIL_VERIFY_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
} from "./types";

import AuthService from "../services/auth.service";
import { notify } from "../utils/toast";

export const register = (email, password) => (dispatch) => {
  return AuthService.register(email, password, notify).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      if (!data.success) {
        dispatch({
          type: REGISTER_FAIL,
          payload: data.message,
        });
        notify(data.message, "error");
        return Promise.reject();
      }
      console.log(data);
      notify(data.message, "success");
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
      });
      return Promise.reject();
    }
  );
};

export const login = (email, password, setHasError, notify) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data },
      });

      if (!data.success) {
        if (data.status === 404 || data.status === 422) {
          notify(data.message, "error");
        } else if (data.status === 401) {
          setHasError(true);
        }
        return Promise.reject();
      }
      notify(data.message, "success");
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const changePassword =
  (userId, resetToken, password, notify) => (dispatch) => {
    return AuthService.changePassword(userId, resetToken, password).then(
      (data) => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
        });

        if (!data.success) {
          notify(data.message, "error");
          return Promise.reject();
        }
        notify(data.message, "success");
        return Promise.resolve(data.data);
      },
      (error) => {
        dispatch({
          type: LOGIN_FAIL,
        });

        return Promise.reject();
      }
    );
  };

export const verifyEmail = (email) => (dispatch) => {
  return AuthService.verifyEmail(email).then(
    (data) => {
      dispatch({
        type: EMAIL_VERIFY_SUCCESS,
      });

      if (!data.success) {
        notify(data.message, "error");
        return Promise.reject();
      }
      notify(data.message, "success");
      return Promise.resolve(data.data);
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
