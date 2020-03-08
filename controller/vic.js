const axios = require("axios");
const parseString = require("xml2js").parseString;

const processRegion = async (fireBans, fireRatings, date) => {
  const regions = fireBans.map((status, index) => {
    const regionName = status.split(": ")[0];
    const fireBan = !(/NO/).test(status.split(": ")[1]);
    const fireRating = fireRatings[index].split(": ")[1];
    return {
      regionName,
      fireBan,
      fireRating,
      date
    }
  })
  const VIC = { VIC: regions}
  return VIC;
}


const processContent = async ( firebanInfo, date ) => {
  const splitContent = firebanInfo.split("<p>");
  let cleanContent = splitContent.map(content => {
    return content.replace("</p>", "");
  });
  let fireBans = cleanContent[2].split("<br>");
  fireBans.pop();
  let fireRatings = cleanContent[4].split("<br>");
  fireRatings.pop();
  cleanContent = processRegion(fireBans, fireRatings, date);
  return cleanContent;
};

exports.getVIC = async (req, res, next) => {
  await axios
    .get("https://data.emergency.vic.gov.au/Show?pageId=getFDRTFBRSS")
    .then(async response => {
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        const date = result.rss.channel[0].pubDate[0];
        const firebanInfo = result.rss.channel[0].item[0].description[0];
        if (err) {
          console.log(err);
        } else {
          res.send( await processContent(firebanInfo, date));
        }
      });
    });
};
