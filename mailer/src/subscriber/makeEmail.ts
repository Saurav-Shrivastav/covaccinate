import ResponseData from "../publisher/fetch.types";
import ejsTemplate from "./emailTemplate";
import ejs from "ejs";

const makeEmail = (data: ResponseData["data18-44"]) => {
  const html = ejs.render(ejsTemplate, { data });

  return html;
};

export default makeEmail;
