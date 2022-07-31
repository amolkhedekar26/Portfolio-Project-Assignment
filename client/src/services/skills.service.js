import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/v1/skills/";

const getSkills = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createSkill = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
}

const SkillsService = {
    getSkills,
    createSkill
}

export default SkillsService;
