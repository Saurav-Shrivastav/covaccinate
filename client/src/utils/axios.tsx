import axios from "axios";

export default axios.create({
  // TODO Add a base url
  //   baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
