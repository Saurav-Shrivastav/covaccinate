import mailgun from "mailgun-js";
import keys from "../../config";
import makeEmail from "./makeEmail";

import { ConsumeMessage } from "amqplib";
import ResponseData from "../../publisher/utils/fetch.types";
import { SendEmailItem } from "./mailgun.types";

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
  const sendEmailsArr: SendEmailItem[] = [];

  if (
    districtSlots["emails18-44"] &&
    districtSlots["emails18-44"].length >= 1 &&
    districtSlots["data18-44"] &&
    districtSlots["data18-44"].length >= 1
  ) {
    sendEmailsArr.push({
      emails: districtSlots["emails18-44"].map((item) => item.email),
      emailBody: makeEmail(districtSlots["data18-44"]),
    });
  }

  if (
    districtSlots["emails45+"] &&
    districtSlots["emails45+"].length >= 1 &&
    districtSlots["data45+"] &&
    districtSlots["data45+"].length >= 1
  ) {
    sendEmailsArr.push({
      emails: districtSlots["emails45+"].map((item) => item.email),
      emailBody: makeEmail(districtSlots["data45+"]),
    });
  }

  return Promise.all(
    sendEmailsArr.map((item) =>
      mg.messages().send({
        from: mgConfig.from,
        to: mgConfig.from,
        bcc: item.emails,
        subject: "Vaccine slots are available near you.",
        html: item.emailBody,
      })
    )
  );
};

export default sendEmails;
