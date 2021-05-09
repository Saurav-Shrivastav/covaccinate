const axios = require("axios");
const cheerio = require("cheerio");

const fetchNdtv = async () => {
  const res = await axios.get(
    "https://www.ndtv.com/coronavirus?pfrom=home-ndtv_mainnavgation"
  );
  if (res) {
    const $ = cheerio.load(res.data);
    const selectedNews = $(".list-txt a");
    const finalData = [];
    selectedNews.toArray().map((cell) => {
      const obj = {
        headline: cell.children[0].data,
        link: cell.attribs.href,
      };
      finalData.push(obj);
    });
    return finalData;
  }
};

const fetchTOI = async () => {
  const res = await axios.get("https://m.timesofindia.com/india");
  if (res) {
    const $ = cheerio.load(res.data);
    const selectedNews = $("script[type = 'application/ld+json']")[2];
    const finalData = [];
    const news = JSON.parse(selectedNews.children[0].data);
    news.itemListElement.map((cell) => {
      const obj = {
        headline: cell.name,
        link: cell.url,
      };
      finalData.push(obj);
    });
    return finalData;
  }
};

const fetchHT = async () => {
  const res = await axios.get("https://www.hindustantimes.com/india-news");
  if (res) {
    const $ = cheerio.load(res.data);
    const selectedNews = $("script[type = 'application/ld+json']")[3];
    const finalData = [];
    const news = JSON.parse(selectedNews.children[0].data);
    news.itemListElement.map((cell) => {
      const obj = {
        headline: cell.name,
        link: cell.url,
      };
      finalData.push(obj);
    });
    return finalData;
  }
};

(async () => {
  const [ndtv, toi, ht] = await Promise.all([
    fetchNdtv(),
    fetchTOI(),
    fetchHT(),
  ]);
  let finalArr = [];
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
  const filteredNews = [];
  finalArr.map((item) => {
    if (keywords.some((substring) => item.headline.includes(substring))) {
      filteredNews.push(item);
    }
  });
  console.log(filteredNews);
})();
