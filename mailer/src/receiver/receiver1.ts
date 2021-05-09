import * as amqp from "amqplib";

const main = async () => {
  console.log("Trying to connect...");

  const connection = await amqp
    .connect("amqp://localhost")
    .then((conn) => conn)
    .catch((err: Error) => err.message);

  if (typeof connection === "string") {
    console.log("Connection failed...");
    return;
  }

  console.log("Connected...");

  connection.on("error", () => {
    console.log("Error in connection...");
  });

  connection.on("close", () => {
    console.log("connection closed...");
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
    durable: false,
  });

  console.log("Waiting for messages in queue...");
  channel.prefetch(1);

  channel.consume(
    queue,
    (msg) => {
      if (msg) {
        const msgStr = msg.content.toString();
        console.log(`Received new message ${msgStr}`);

        const secs = Number(msgStr?.split("-")[0]);

        setTimeout(() => {
          console.log(`message ${msgStr} completed...`);
          channel.ack(msg);
        }, secs * 1000);
      }
    },
    {
      noAck: false,
    }
  );
};

main();
