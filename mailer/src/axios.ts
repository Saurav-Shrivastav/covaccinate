import axios from "axios";
import { Agent } from "https";
import keys from "./config";

const agent = new Agent({ rejectUnauthorized: false });

const headers: { [k: string]: string } = {};
headers[keys.SECRET_HEADER_KEY] = keys.SECRET_HEADER_VALUE;

const axiosConfig = axios.create({
  httpsAgent: agent,
  headers,
});

export default axiosConfig;
