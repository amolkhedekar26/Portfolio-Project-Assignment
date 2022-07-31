const validContactNo = (contactNo) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(contactNo);
};

const validate = (data, notify) => {
  const { firstName, lastName, location, contactNo, aboutMe } = data;
  if (!firstName || firstName === "") {
    notify("First name is required", "error");
    return false;
  } else if (!lastName || lastName === "") {
    notify("Last name is required", "error");
    return false;
  } else if (!location || location === "") {
    notify("Location is required", "error");
    return false;
  } else if (!contactNo || contactNo === "") {
    notify("Contact number is required", "error");
    return false;
  } else if (!validContactNo(contactNo)) {
    notify("Contact number should be 10 digit", "error");
    return false;
  } else if (!aboutMe || aboutMe === "") {
    notify("About me is required", "error");
    return false;
  }
  return true;
};

export default {
  validate,
};
