const { rootNSW } = require('../controller/nsw')
const { rootVIC } = require('../controller/vic')
const { rootQLD } = require('../controller/qld')
const { rootSouth } = require('../controller/south')

exports.getAll = (req, res, next) => {
  Promise.all([rootNSW(), rootVIC(), rootQLD(), rootSouth()]).then(function(values) {
    res.send(values)
  });
};
