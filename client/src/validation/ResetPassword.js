const validPassword = (password) => {
  return String(password).match(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  );
};

const matchPasswords = (password, reEnterPassword) => {
  return password === reEnterPassword;
};

const validate = (data, notify) => {
  const { password, reEnterPassword } = data;

  if (!password || password === "") {
    notify("Password is required", "error");
    return false;
  } else if (!validPassword(password)) {
    notify(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      "error"
    );
    return false;
  } else if (!reEnterPassword || reEnterPassword === "") {
    notify("Re-enter password is required", "error");
    return false;
  } else if (!matchPasswords(password, reEnterPassword)) {
    notify("Passwords do not match", "error");
    return false;
  }
  return true;
};

export default {
  validate,
};
