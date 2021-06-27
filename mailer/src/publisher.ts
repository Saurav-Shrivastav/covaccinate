import * as amqp from "amqplib";
import * as axios from "axios";
import keys from "./config";

type ResponseData = { [key: string]: string }[];

const requestPromise = () => {
  console.log("Trying to fetch...");

  return axios.default
    .get("https://fakerapi.it/api/v1/users?_quantity=1")
    .then((res) => res.data.data as ResponseData)
    .catch((err: Error) => {
      console.error(err.message);
      return null;
    });
};

const fetch = async () => {
  let responseData: ResponseData | null = null;
  let retryCount = 3;
  while (!responseData && retryCount > 0) {
    responseData = await requestPromise();
    retryCount--;
  }

  if (!responseData) {
    return null;
  }

  const data = responseData.map((obj) => ({
    ...obj,
    email: undefined,
  }));

  const email = responseData.map((obj) => obj.email);

  return {
    date: new Date().toUTCString(),
    data,
    email,
  };
};

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

  // Sending messages;
  const timeout = setInterval(() => {
    fetch().then((data) => {
      if (!data) {
        console.log("No data fetched...");
      } else {
        const msg = JSON.stringify(data);
        channel.sendToQueue(queue, Buffer.from(msg), {
          // true in production
          persistent: true,
        });
      }
    });
  }, 15 * 60 * 1000);

  setTimeout(() => {
    clearInterval(timeout);
  }, 1 * 60 * 60 * 1000);
};

main();
