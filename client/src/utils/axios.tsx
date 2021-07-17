import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_SERVER_URL_DEV
      : "/api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
