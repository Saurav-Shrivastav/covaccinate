const path = require("path");

module.exports = {
  apps: [
    {
      name: "publisher",
      script: "./lib/publisher.js",
      min_uptime: 5000,
      max_restarts: 5,
    },
    {
      name: "subscriber-1",
      script: "./lib/subscriber/subscriber1.js",
      min_uptime: 5000,
      max_restarts: 5,
    },
    {
      name: "subscriber-2",
      script: "./lib/subscriber/subscriber1.js",
      min_uptime: 5000,
      max_restarts: 5,
    },
  ],
};
