const validate = (data, notify) => {
  const { name, level } = data;
  if (!name || name === "") {
    notify("Skill Name is required", "error");
    return false;
  } else if (!level || level === "") {
    notify("Skill Level is required", "error");
    return false;
  } else if (level < 1 || level > 5) {
    notify("Skill Level must be between 1 and 5", "error");
    return false;
  }
  return true;
};

export default {
  validate,
};
