// * NPM Packages
import express from "express";
import * as functions from "firebase-functions";

// * Routes
import news from "./routes/news";

import { scraper } from "./scraper";

const app = express();

// * Routes
app.use("/scraper-api", news);

// const PORT = process.env.PORT || 8080;

// const server = app.listen(PORT, () =>
//   console.log(`Server started on Port ${PORT}`)
// );

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err: Error, _promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server and exit process
//   server.close(() => process.exit(1));
// });

exports.api = functions.https.onRequest(app);
exports.scheduledFunction = functions.pubsub
  .schedule("0 */6 * * *")
  // @ts-ignore
  .onRun((context) => {
    scraper()
      .then(() => console.log("successfully scraped"))
      .catch((err) => console.log(err));
    return null;
  });
