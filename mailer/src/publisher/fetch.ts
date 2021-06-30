import * as axios from "axios";
import ResponseData from "./fetch.types";
import { Agent } from "https";

const requestPromise = () => {
  console.log("Trying to fetch...");

  const agent = new Agent({ rejectUnauthorized: false });

  return axios.default
    .get("https://covaccinate.tech/api/users/slots/", { httpsAgent: agent })
    .then((res) => res.data as ResponseData[])
    .catch((err: Error) => {
      console.error(err.message);
      return null;
    });
};

const fetch = async () => {
  let responseData: ResponseData[] | null = null;
  let retryCount = 3;

  while (!responseData && retryCount > 0) {
    responseData = await requestPromise();
    retryCount--;
  }

  if (!responseData) {
    return null;
  }

  return responseData;
};

export default fetch;
