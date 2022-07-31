import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import skills from "./skills";
import projects from "./projects";

export default combineReducers({
  auth,
  profile,
  skills,
  projects,
});
