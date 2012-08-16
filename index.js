module.exports = function(winston) {
  return function(req, res, next) {
    var time_start = new Date();

    var end = res.end;

    res.end = function() {
      var data = {
        url: req.url,
        status: res.statusCode,
        elapsed: ((new Date()) - time_start),
      };

      if (res.statusCode >= 200 && res.statusCode <= 399) {
        winston.info("response", data);
      } else if (res.statusCode >= 500 && res.statusCode <= 599) {
        winston.error("response", data);
      } else {
        winston.warn("response", data);
      }

      end.apply(res, arguments);
    };

    next(null);
  };
};
