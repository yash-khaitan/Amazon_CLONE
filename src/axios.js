import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-a5a48/us-central1/api", // THE API (cloud function) URL
});

export default instance;
