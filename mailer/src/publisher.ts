import * as amqp from "amqplib";

const connect = async () => {
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

  // Sending messages
  let secs = 1;
  const interval = setInterval(() => {
    const msg = `${secs}-message`;
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`Sent message to queue ${msg}`);
    secs++;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    console.log("Stopped sending messages");
  }, 10000);
};

connect();
