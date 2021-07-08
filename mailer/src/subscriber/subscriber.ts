import * as amqp from "amqplib";
import keys from "../config";
import sendEmails from "./mailgun";
import setLastSent from "./setLastSent";

import ResponseData from "../publisher/fetch.types";

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
    durable: true,
  });

  console.log("Waiting for messages in queue...");
  channel.prefetch(1);

  channel.consume(
    queue,
    async (msg) => {
      if (msg) {
        try {
          console.log(`Received new message by ${process.env.WHO} ...`);

          await sendEmails(msg);

          const msgJSON: ResponseData = JSON.parse(msg.content.toString());
          console.log(`Mails sent to district_id ${msgJSON.district_id}`);

          channel.ack(msg);

          await setLastSent(msgJSON.district_id);
          console.log(`Updated lastSent of district_id ${msgJSON.district_id}`);
        } catch (error) {
          console.error(error);
          channel.nack(msg, false, true);
        }
      }
    },
    {
      noAck: false,
    }
  );
};

main();
