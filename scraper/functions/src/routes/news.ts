// * NPM Packages
import express from "express";

// * Controllers
import { fetchNews } from "../controllers/news";

// * API Endpoints -->
const router = express.Router();

router.get("/all", fetchNews);

export default router;
