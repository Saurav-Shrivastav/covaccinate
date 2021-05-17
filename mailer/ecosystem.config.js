const path = require("path");

module.exports = {
  apps: [
    {
      name: "publisher",
      // interpreter: "/home/aryaman/.nvm/versions/node/v14.17.0/bin/ts-node",
      // script: "./src/publisher.ts",
      script: "./lib/publisher.js",
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
  ],
};
