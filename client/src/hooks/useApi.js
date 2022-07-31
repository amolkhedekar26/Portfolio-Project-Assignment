import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const request = async (...args) => {
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (error) {
      // setError(err.message || "Unexpected Error!");
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        setData(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
    }
  };

  return {
    data,
    error,
    request,
  };
};


export default useApi;
