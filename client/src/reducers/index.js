import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profile from "./profile";
import skills from "./skills";
import projects from "./projects";

export default combineReducers({
  auth,
  message,
  profile,
  skills,
  projects,
});
