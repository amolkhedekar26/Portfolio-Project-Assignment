const validEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = (data, notify) => {
  const { email, password } = data;
  if (!email || email === "") {
    notify("Email is required", "error");
    return false;
  } else if (!validEmail(email)) {
    notify("Email is invalid", "error");
    return false;
  } else if (!password || password === "") {
    notify("Password is required", "error");
    return false;
  }
  return true;
};

export default {
  validate,
};
