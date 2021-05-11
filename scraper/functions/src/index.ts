// * NPM Packages
import express from "express";
import * as functions from "firebase-functions";
import cors from "cors";

// * Routes
import news from "./routes/news";

import { scraper } from "./scraper";

const app = express();

const whitelist = ["http://localhost:3000", "https://jabme.netlify.app/"];
const corsOption = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, origin: boolean) => void
  ) {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};

app.use(cors(corsOption));

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
