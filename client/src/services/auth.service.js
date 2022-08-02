import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/users/";

const register = (email, password) => {
  return axios
    .post(API_URL + "register", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      const data = response.data.data;
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const verifyEmail = (email) => {
  return axios
    .post(API_URL + "verify-email", {
      email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const changePassword = (userId, resetToken, password) => {
  return axios
    .post(API_URL + "change-password", {
      uid: userId,
      resetToken: resetToken,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  verifyEmail,
  changePassword,
};
