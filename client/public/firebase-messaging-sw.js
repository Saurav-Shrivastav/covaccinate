/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const config = {
  apiKey: "AIzaSyBUFUKKkhpYphhXZBXYXYxAjGpjKTrXnEM",
  authDomain: "covaccinate.firebaseapp.com",
  databaseURL: "https://covaccinate.firebaseio.com",
  projectId: "covaccinate",
  storageBucket: "covaccinate.appspot.com",
  messagingSenderId: "1012777032784",
  appId: "1:1012777032784:web:2aa056a70a7eeb99ab8555",
  measurementId: "G-564B0DGRX1",
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
