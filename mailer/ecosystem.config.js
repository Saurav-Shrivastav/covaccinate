const path = require("path");

module.exports = {
  apps: [
    {
      name: "publisher",
      script: "./lib/publisher/publisher.js",
      min_uptime: 5000,
      max_restarts: 5,
    },
    {
      name: "subscriber-aryaman",
      script: "./lib/subscriber/subscriber.js",
      min_uptime: 5000,
      max_restarts: 5,
      env: {
        WHO: "ARYAMAN",
      },
    },
    {
      name: "subscriber-aniket",
      script: "./lib/subscriber/subscriber.js",
      min_uptime: 5000,
      max_restarts: 5,
      env: {
        WHO: "ANIKET",
      },
    },
    {
      name: "subscriber-saurav",
      script: "./lib/subscriber/subscriber.js",
      min_uptime: 5000,
      max_restarts: 5,
      env: {
        WHO: "SAURAV",
      },
    },
  ],
};
