import axios from "axios";

const axiosAPI = axios.create({
  baseURL:
    "https://begimai-firebase-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosAPI;
