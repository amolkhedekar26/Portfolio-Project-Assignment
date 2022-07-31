import { GET_PROJECTS, CREATE_PROJECT } from "./types";
import ProjectsService from "../services/projects.service";

export const getProjects = () => async (dispatch) => {
  try {
    const res = await ProjectsService.getProjects();
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.data.projects,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createProject = (data, notify, setOpen) => async (dispatch) => {
  try {
    const res = await ProjectsService.createProject(data);

    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
    notify(res.data.message, "success");
    setOpen(false);
  } catch (err) {
    notify(err.response.data.message, "error");
    setOpen(true);
  }
};
