import axios from "axios";

const api = axios.create({
  baseURL: "https://honeywell-hackathon.onrender.com/",
});

export default api;