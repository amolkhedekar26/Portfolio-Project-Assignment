const validate = (data, notify) => {
  const { name, description, skills } = data;
  if (!name || name === "") {
    notify("Project Title is required", "error");
    return false;
  } else if (!description || description === "") {
    notify("Project Description is required", "error");
    return false;
  } else if (skills) {
    if (!Array.isArray(skills)) {
      notify("Project Skills must be an array", "error");
      return false;
    }
  }
  return true;
};

export default {
  validate,
};
