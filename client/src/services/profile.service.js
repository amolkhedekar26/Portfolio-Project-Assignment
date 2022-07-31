import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/api/v1/profiles/";

const getProfile = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createProfile = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
}

const ProfileService = {
    getProfile,
    createProfile
}

export default ProfileService;
