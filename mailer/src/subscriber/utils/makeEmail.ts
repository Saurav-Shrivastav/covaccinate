import ResponseData from "../../publisher/utils/fetch.types";
import ejsTemplate from "./emailTemplate";
import ejs from "ejs";

const makeEmail = (
  data: NonNullable<ResponseData["data18-44"] | ResponseData["data45+"]>
) => {
  const html = ejs.render(ejsTemplate, { data });

  return html;
};

export default makeEmail;
