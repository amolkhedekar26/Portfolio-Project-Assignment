import { GET_SKILLS, CREATE_SKILL } from "../actions/types";

const initialState = [];

function skillsReducer(skills = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SKILLS:
      return payload;
    case CREATE_SKILL:
      return payload;
    default:
      return skills;
  }
}

export default skillsReducer;
