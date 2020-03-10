const axios = require("axios");
const parseString = require("xml2js").parseString;

const processContent = async ( report ) => {
  const result = report.map((item) => {
    const regionName = item.title[0];
    const date = item.pubDate[0];
    let description = item.description[0].split("<br />")[0].split(":");
    const fireBan = !(/No/).test(description[2].split(".")[0]);
    const fireRating = description[3].split(".")[0].trim();
    return({regionName, fireBan, fireRating, date });
  })
  return {SouthernAustralia: result};
};

exports.getSouth = async (req, res, next) => {
  await axios
    .get("https://www.cfs.sa.gov.au/fire_bans_rss/index.jsp")
    .then(async response => {
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const report = result.rss.channel[0].item;
          res.send(await processContent(report));
        }
      });
    });
};

exports.rootSouth = async (req, res, next) => {
  let south;
  await axios
    .get("https://www.cfs.sa.gov.au/fire_bans_rss/index.jsp")
    .then(async response => {
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const report = result.rss.channel[0].item;
          south = await processContent(report);
        }
      });
    });
  return south;
};
