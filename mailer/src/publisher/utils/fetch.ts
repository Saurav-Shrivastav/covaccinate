import axios from "../../axios";

import ResponseData from "./fetch.types";

const requestPromise = () => {
  console.log("Trying to fetch...");

  return axios
    .get("https://covaccinate.tech/api/users/slots/")
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
