import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/v1/projects/";

const getProjects = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createProject = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
}

const ProjectsService = {
    getProjects,
    createProject
}

export default ProjectsService;
