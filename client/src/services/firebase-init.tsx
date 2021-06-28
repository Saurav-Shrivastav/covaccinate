import React from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { message } from "antd";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

export const getToken = (
  setTokenFound: React.Dispatch<React.SetStateAction<boolean>>,
  setToken: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> | null => {
  if (!messaging) {
    message.error({
      content:
        "Push Notification unsupported. Please switch to Chrome or Firefox Browser.",
      duration: 2,
    });
    return null;
  }
  return messaging
    .getToken({ vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        setToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
      message.error({
        content: "Please enable notifications to get background alerts",
        duration: 2,
      });
    });
};

export const onMessageListener = (): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!messaging) {
      reject("Browser Not Supported");
      return;
    }
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
