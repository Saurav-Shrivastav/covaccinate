import axios from "axios";

export default axios.create({
  baseURL: "http://jabme.herokuapp.com/api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
