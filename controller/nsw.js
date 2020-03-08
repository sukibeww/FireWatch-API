const axios = require("axios");
const parseString = require("xml2js").parseString;

const processContent = async (regions, date ) => {
  regions.pop();
  const result = regions.map((region) => {
    const regionName = region.Name[0];
    const fireBan = !(/No/).test(region.FireBanToday[0]);
    const fireRating = region.DangerLevelToday[0];
    return {
      regionName,
      fireBan,
      fireRating,
      date
    }
  })
  const nsw = {NSW: result};
  return nsw;
};

exports.getNSW = async (req, res, next) => {
  await axios
    .get("http://www.rfs.nsw.gov.au/feeds/fdrToban.xml")
    .then(async response => {
      const date = response.headers["last-modified"]
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        const regions = result.FireDangerMap.District
        if (err) {
          console.log(err);
        } else {
          res.send(await processContent(regions, date));
        }
      });
    });
};

exports.rootNSW = async (req, res, next) => {
  let nsw;
  await axios
    .get("http://www.rfs.nsw.gov.au/feeds/fdrToban.xml")
    .then(async response => {
      const date = response.headers["last-modified"]
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        const regions = result.FireDangerMap.District
        if (err) {
          console.log(err);
        } else {
          // const result = await processContent(regions, date);
          // console.log(result);
          nsw = await processContent(regions, date);
        }
      });
    });
  return nsw;
};

