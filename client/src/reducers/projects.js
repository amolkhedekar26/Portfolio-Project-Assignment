import { GET_PROJECTS, CREATE_PROJECT } from "../actions/types";

const initialState = [];

function projectsReducer(projects = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS:
      return payload;
    case CREATE_PROJECT:
      return payload;
    default:
      return projects;
  }
}

export default projectsReducer;
