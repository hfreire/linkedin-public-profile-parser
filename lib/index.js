var fetcher = require('./fetcher');
var profile = require('./profile');
var company = require('./company');
var Promise = require('bluebird');

var exports = module.exports = {};

exports.profile = function (url, next) {
  return fetcher(url)
      .then(function (html) {
        profile(url, html, function (err, data) {
          return next(err, data);
        })
      })
      .catch(function (error) {
        return next(error, {url: url});
      })
};

exports.company = function (url, next) {
  return fetcher(url)
      .then(function (html) {
        company(url, html, function (err, data) {
          return next(err, data);
        })
      })
      .catch(function (error) {
        return next(error, {url: url});
      })
};
