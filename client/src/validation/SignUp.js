const validEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validPassword = (password) => {
  return String(password).match(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  );
};

const matchPasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

const validate = (data, notify) => {
  const { email, password, confirmPassword } = data;
  if (!email || email === "") {
    notify("Email is required", "error");
    return false;
  } else if (!validEmail(email)) {
    notify("Email is invalid", "error");
    return false;
  } else if (!password || password === "") {
    notify("Password is required", "error");
    return false;
  } else if (!validPassword(password)) {
    notify(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      "error"
    );
    return false;
  } else if (!confirmPassword || confirmPassword === "") {
    notify("Confirm password is required", "error");
    return false;
  } else if (!matchPasswords(password, confirmPassword)) {
    notify("Passwords do not match", "error");
    return false;
  }
  return true;
};

export default {
  validate,
};
