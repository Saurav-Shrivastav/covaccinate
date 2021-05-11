// * NPM Packages
import express from "express";
import * as functions from "firebase-functions";

// * Routes
import news from "./routes/news";

import { scraper } from "./scraper";

const app = express();

// * Routes
app.use("/scraper-api", news);

exports.api = functions.region("asia-south1").https.onRequest(app);
exports.scheduledFunction = functions
  .region("asia-south1")
  .pubsub.schedule("0 */6 * * *")
  // @ts-ignore
  .onRun((context) => {
    return scraper();
  });
