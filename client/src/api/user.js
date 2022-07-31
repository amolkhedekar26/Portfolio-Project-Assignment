import client from "../utils/apiClient";

const userApi = {
    registerUser: (data) => client.post("users/register", data),
    loginUser: (data) => client.post("users/login", data),
}

export default userApi;