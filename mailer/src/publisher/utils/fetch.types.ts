type Email = {
  email: string;
  name: string;
};

type Data = {
  name: string;
  date: string;
  slots: string[];
  vaccine: string;
  availability: number;
  address: string;
  block_name: string;
  fee_type: "Free" | "Paid";
  min_age_limit: 18 | 45;
};

type ResponseData = {
  district_id: string;
  "emails18-44"?: Email[];
  "data18-44"?: Data[];
  "emails45+"?: Email[];
  "data45+"?: Data[];
};

export default ResponseData;
