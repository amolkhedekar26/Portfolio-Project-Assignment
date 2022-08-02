import { GET_PROJECTS, CREATE_PROJECT } from "./types";
import ProjectsService from "../services/projects.service";

export const getProjects = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const res = await ProjectsService.getProjects();

    if (res.data.data == null) {
      setTimeout(() => {
        setLoading(false);
        return;
      }, 1000);
    }
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.data.projects,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const createProject =
  (data, notify, setOpen, setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      const res = await ProjectsService.createProject(data);

      dispatch({
        type: CREATE_PROJECT,
        payload: res.data,
      });
      notify(res.data.message, "success");
      setOpen(false);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      notify(err.response.data.message, "error");
      setOpen(true);
    }
  };
