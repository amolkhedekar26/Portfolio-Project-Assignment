import { GET_SKILLS, CREATE_SKILL } from "./types";
import SkillsService from "../services/skills.service";

export const getSkills = (setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const res = await SkillsService.getSkills();
    if (res.data.data == null) {
      setTimeout(() => {
        setLoading(false);
        return;
      }, 1000);
    }
    dispatch({
      type: GET_SKILLS,
      payload: res.data.data.skills,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const createSkill =
  (data, notify, setOpen, setLoading) => async (dispatch) => {
    try {
      setLoading(true);
      const res = await SkillsService.createSkill(data);
      dispatch({
        type: CREATE_SKILL,
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
