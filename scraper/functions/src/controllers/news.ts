import { Request, Response } from "express";
// import { firestore } from "firebase-admin";
import db from "../config/db";

interface IData {
  headline: string;
  link: string;
}

// interface IDataSnap extends firestore.QueryDocumentSnapshot, IData {}

// @desc    Fetch all news
// @route   GET /scraper-api/all
// @access  Public
export const fetchNews = async (_req: Request, res: Response) => {
  try {
    const newsRef = db.collection("news");
    const snapshot = await newsRef.get();
    const data: IData[] = [];
    snapshot.forEach((doc: any) => {
      data.push(doc.data());
    });
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
};
