import * as amqp from "amqplib";
import mailgun from "mailgun-js";
import keys from "../config";

const main = async () => {
  console.log("Trying to connect...");

  const connection = await amqp
    .connect(`${keys.RABBITMQ_CONNECTION}?heartbeat=30`)
    .then((conn) => conn)
    .catch((err: Error) => err.message);

  if (typeof connection === "string") {
    console.log("Connection failed...");
    process.exit(1);
  }

  console.log("Connected...");

  connection.on("error", () => {
    console.log("Error in connection...");
    connection.close();
  });

  connection.on("close", () => {
    console.log("connection closed...");
    process.exit(1);
  });

  const channel = await connection
    .createChannel()
    .then((chl) => chl)
    .catch((err: Error) => err.message);

  if (typeof channel === "string") {
    console.log("Failed to create a channel...");
    connection.close();
    return;
  }

  const queue = "mailer";

  channel.assertQueue(queue, {
    // true in production
    durable: true,
  });

  console.log("Waiting for messages in queue...");
  channel.prefetch(1);

  // Mailing System
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
          from:
            "Covaccinate Notification <notification@saurav.covaccinate.tech>",
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

  channel.consume(
    queue,
    (msg) => {
      if (msg) {
        console.log("Received new message...");

        mg.messages().send(
          {
            from: mgConfig.from,
            to: "1761ary@gmail.com, aryamankumud@gmail.com",
            subject: "Vaccine slots available in your district.",
            text: msg.content.toString(),
          },
          (error, body) => {
            if (error) {
              console.error(error.message);
            } else {
              console.log(body);
            }

            console.log("Mails sent");
            channel.ack(msg);
          }
        );
      }
    },
    {
      noAck: false,
    }
  );
};

main();
