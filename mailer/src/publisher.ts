import * as amqp from "amqplib";
import * as axios from "axios";

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
    .connect(
      "amqps//lwoowmfz:tS7UsVg6_jI2Cn2NP52DCImMO1yj53KI@baboon.rmq.cloudamqp.com/lwoowmfz?heartbeat=30"
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

  // Sending messages;
  setInterval(() => {
    fetch().then((data) => {
      if (!data) {
        console.log("No data fetched...");
      } else {
        const msg = JSON.stringify(data);

        channel.sendToQueue(queue, Buffer.from(msg), {
          // true in production
          persistent: false,
        });
      }
    });
  }, 10000);
};

main();
