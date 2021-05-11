import admin from "firebase-admin";
// import path from "path";
// const serviceAccount = path.resolve(__dirname, "../", "firebase-keys.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
admin.initializeApp();
const db = admin.firestore();
export default db;
