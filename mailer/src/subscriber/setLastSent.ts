import * as axios from "axios";
import { Agent } from "https";

const agent = new Agent({ rejectUnauthorized: false });

const setLastSent = (district_id: string) => {
  return axios.default.post(
    "https://covaccinate.tech/api/users/update-lastsent/",
    { district_ids: [district_id] },
    { httpsAgent: agent }
  );
};

export default setLastSent;
