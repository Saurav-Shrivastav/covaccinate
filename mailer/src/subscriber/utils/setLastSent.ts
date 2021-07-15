import axios from "../../axios";

const setLastSent = (district_id: string) => {
  return axios.post("https://covaccinate.tech/api/users/update-lastsent/", {
    district_ids: [district_id],
  });
};

export default setLastSent;
