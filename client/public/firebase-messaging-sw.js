/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
importScripts("swenv.js");

// Initialize the Firebase app in the service worker by passing the generated config
const config = {
  apiKey: swprocess.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: swprocess.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: `https://${swprocess.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: swprocess.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: swprocess.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: swprocess.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: swprocess.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: swprocess.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
