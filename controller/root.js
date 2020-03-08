const axios = require("axios");
const parseString = require("xml2js").parseString;
const { rootNSW } = require('../controller/nsw')
const { rootVIC } = require('../controller/vic')
const { rootQLD } = require('../controller/qld')

exports.getAll = async (req, res, next) => {
  // Promise.all([rootNSW, rootVIC, rootQLD]).then(function(values) {
  //   console.log(values);
  //   res.send(values);
  // });

  const nsw = await rootNSW();
  const vic = await rootVIC();
  const qld = await rootQLD();
  console.log({nsw, vic, qld});
  
  Promise.all([rootNSW(), rootVIC(), rootQLD()]).then(function(values) {
    console.log(values);
    res.send(values)
  });
};
