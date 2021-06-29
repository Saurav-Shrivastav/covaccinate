import * as amqp from "amqplib";
import keys from "../config";
import sendEmails from "./mailgun";

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
    (msg) => {
      if (msg) {
        console.log("Received new message...");
        sendEmails(msg)
          .then(() => {
            console.log("Mails sent");
            channel.ack(msg);
          })
          .catch((err) => console.error(err));
      }
    },
    {
      noAck: false,
    }
  );
};

main();
