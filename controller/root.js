const { rootNSW } = require('../controller/nsw')
const { rootVIC } = require('../controller/vic')
const { rootQLD } = require('../controller/qld')

exports.getAll = (req, res, next) => {
  Promise.all([rootNSW(), rootVIC(), rootQLD()]).then(function(values) {
    res.send(values)
  });
};
