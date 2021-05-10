// * NPM Packages
import axios from "axios";
import cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";

// * Config
import db from "./config/db";

interface INews {
  headline: string;
  link: string;
}

const fetchNdtv = async () => {
  try {
    const res = await axios.get(
      "https://www.ndtv.com/coronavirus?pfrom=home-ndtv_mainnavgation"
    );
    const $ = cheerio.load(res.data);
    const selectedNews = $(".list-txt a");
    const finalData: INews[] = [];
    selectedNews.toArray().map((cell: any) => {
      const obj: INews = {
        headline: cell.children[0].data,
        link: cell.attribs.href,
      };
      finalData.push(obj);
    });
    return finalData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const fetchTOI = async () => {
  try {
    const res = await axios.get("https://m.timesofindia.com/india");
    const $ = cheerio.load(res.data);
    const selectedNews = $("script[type = 'application/ld+json']")[2];
    const finalData: INews[] = [];
    // @ts-ignore
    const news = JSON.parse(selectedNews.children[0].data);
    news.itemListElement.map((cell: any) => {
      const obj: INews = {
        headline: cell.name,
        link: cell.url,
      };
      finalData.push(obj);
    });
    return finalData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const fetchHT = async () => {
  try {
    const res = await axios.get("https://www.hindustantimes.com/india-news");
    const $ = cheerio.load(res.data);
    const selectedNews = $("script[type = 'application/ld+json']")[3];
    const finalData: INews[] = [];
    // @ts-ignore
    const news = JSON.parse(selectedNews.children[0].data);
    news.itemListElement.map((cell: any) => {
      const obj: INews = {
        headline: cell.name,
        link: cell.url,
      };
      finalData.push(obj);
    });
    return finalData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

(async () => {
  const [ndtv, toi, ht] = await Promise.all([
    fetchNdtv(),
    fetchTOI(),
    fetchHT(),
  ]);
  let finalArr: INews[] = [];
  if (ndtv && toi && ht) {
    finalArr = [...finalArr, ...ndtv, ...toi, ...ht];
  }
  const keywords = [
    "COVID19",
    "COVID-19",
    "coronavirus",
    "Coronavirus",
    "vaccine",
    "pandemic",
    "lockdown",
    "Vaccine",
    "Covid",
    "WHO",
    "vaccinate",
  ];
  const filteredNews: INews[] = [];
  const batch = db.batch();
  finalArr.map((item) => {
    if (keywords.some((substring) => item.headline.includes(substring))) {
      filteredNews.push(item);
      const docRef = db.collection("news").doc(uuidv4());
      batch.set(docRef, item);
    }
  });
  await batch.commit();
  console.log(filteredNews);
})();
