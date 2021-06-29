import mailgun from "mailgun-js";
import keys from "../config";
import { ConsumeMessage } from "amqplib";
import ResponseData from "../publisher/fetch.types";
import makeEmail from "./makeEmail";

const who = process.env.WHO?.trim().toUpperCase() || "ARYAMAN";

type config = {
  from: string;
  apiKey: string;
  domain: string;
};

let mgConfig: config;

switch (who) {
  case "ARYAMAN":
    {
      mgConfig = {
        from:
          "Covaccinate Notification <notification@aryaman.covaccinate.tech>",
        apiKey: keys.API_KEY1,
        domain: keys.DOMAIN1,
      };
    }
    break;

  case "ANIKET":
    {
      mgConfig = {
        from:
          "Covaccinate Notification <notification@helper-a.covaccinate.tech>",
        apiKey: keys.API_KEY2,
        domain: keys.DOMAIN2,
      };
    }
    break;

  case "SAURAV":
    {
      mgConfig = {
        from: "Covaccinate Notification <notification@saurav.covaccinate.tech>",
        apiKey: keys.API_KEY3,
        domain: keys.DOMAIN3,
      };
    }
    break;

  default:
    {
      mgConfig = {
        from:
          "Covaccinate Notification <notification@aryaman.covaccinate.tech>",
        apiKey: keys.API_KEY1,
        domain: keys.DOMAIN3,
      };
    }
    break;
}

const mg = mailgun({ apiKey: mgConfig.apiKey, domain: mgConfig.domain });

const sendEmails = (msg: ConsumeMessage) => {
  const districtSlots: ResponseData = JSON.parse(msg.content.toString());
  const emails = districtSlots["emails18-44"].map((emailObj) => emailObj.email);
  const emailBody = makeEmail(districtSlots["data18-44"]);

  return mg.messages().send({
    from: mgConfig.from,
    to: emails,
    subject: "Vaccine slots are available near you.",
    html: emailBody,
  });
};

export default sendEmails;
