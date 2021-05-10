import * as amqp from "amqplib";

const main = async () => {
  console.log("Trying to connect...");

  const connection = await amqp
    .connect(
      "amqps://lwoowmfz:tS7UsVg6_jI2Cn2NP52DCImMO1yj53KI@baboon.rmq.cloudamqp.com/lwoowmfz?heartbeat=30"
    )
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
    durable: false,
  });

  console.log("Waiting for messages in queue...");
  channel.prefetch(1);

  channel.consume(
    queue,
    (msg) => {
      if (msg) {
        console.log("Received new message...");
        const obj = JSON.parse(msg.content.toString());
        console.log(obj);

        setTimeout(() => {
          console.log(`message completed...`);
          channel.ack(msg);
        }, 5000);
      }
    },
    {
      noAck: false,
    }
  );
};

main();
