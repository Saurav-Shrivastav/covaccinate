const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const fs = require("fs");

const data = `
const swprocess = {
    env: {
        REACT_APP_FIREBASE_API_KEY:process.env.REACT_APP_FIREBASE_API_KEY,
        REACT_APP_FIREBASE_AUTH_DOMAIN:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        REACT_APP_FIREBASE_PROJECT_ID:process.env.REACT_APP_FIREBASE_PROJECT_ID,
        REACT_APP_FIREBASE_STORAGE_BUCKET:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        REACT_APP_FIREBASE_SENDER_ID:process.env.REACT_APP_FIREBASE_SENDER_ID,
        REACT_APP_FIREBASE_APP_ID:process.env.REACT_APP_FIREBASE_APP_ID,
        REACT_APP_FIREBASE_MEASUREMENT_ID:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        REACT_APP_FIREBASE_VAPID_KEY:process.env.REACT_APP_FIREBASE_VAPID_KEY
    }
}
`;

fs.writeFileSync("./public/swenv.js", data);
