import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
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

      dispatch({
        type: SET_MESSAGE,
        payload: data.message,
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
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
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
