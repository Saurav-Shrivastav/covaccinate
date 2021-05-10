// * NPM Packages
import express from "express";

// * Routes
import news from "./routes/news";

const app = express();

// * Routes
app.use("/scraper-api", news);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Server started on Port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, _promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
