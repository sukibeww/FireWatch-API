const axios = require("axios");
const parseString = require("xml2js").parseString;

const processRegion = async (item) => {
  const date = item.pubDate[0];
  console.log(date);
  const sections = item.description[0].split('\n');
  sections.pop();
  const regex = RegExp('no');
  const fireBan = !regex.test(sections[1]);
  const fireRating = undefined;
  const regionNames = sections[0].split("</b> ")[1].split("</div>")[0].split(", ");
  const result = regionNames.map((name) => {
    return {
      regionName: name,
      fireBan,
      fireRating,
      date
    }
  })
  return result
}

exports.getQLD = async (req, res, next) => {
  await axios
    .get("https://www.ruralfire.qld.gov.au/BushFire_Safety/Neighbourhood-Safer-Places/lgas/_layouts/15/listfeed.aspx?List=a4f237e1-b263-4062-a8e2-82774f87f01d&View=a0a7270f-6252-422c-96f2-d7088ae16ffe")
    .then(async response => {
      const xml = response.data;
      await parseString(xml, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(await processRegion(result.rss.channel[0].item[0]));
        }
      });
    });
};
