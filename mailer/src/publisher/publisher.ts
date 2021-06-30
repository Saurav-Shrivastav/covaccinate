import * as amqp from "amqplib";
import keys from "../config";
import fetch from "./fetch";

const main = async () => {
  console.log("Trying to connect...");

  const connection = await amqp
    .connect(`${keys.RABBITMQ_CONNECTION}?heartbeat=30`)
    .then((conn) => conn)
    .catch((err: Error) => err.message);

  if (typeof connection === "string") {
    console.log("Connection failed...", connection);
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

  const timeout = setInterval(() => {
    fetch().then((data) => {
      if (!data) {
        console.log("No data fetched...");
      } else {
        data.forEach((districtSlots) => {
          const msg = JSON.stringify(districtSlots);

          console.log("Pushing to queue...");
          channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true,
          });
        });
      }
    });
  }, 15 * 60 * 1000); // 15 minutes

  // Remove in production
  setTimeout(() => {
    clearInterval(timeout);
  }, 1 * 60 * 60 * 1000); // 1 hour
};

main();
