/*
 * Copyright (C) 2016, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

var fetcher = require('./fetcher');
var profile = require('./profile');
var company = require('./company');

var exports = module.exports = {};

exports.profile = function (url, next) {
  fetcher(url, function(err, url, html){

    if( err ){
      return next(err, {url: url});
    }

    profile(url, html, function (err, data) {
      return next(err, data);
    })
  })
};

exports.company = function (url, next) {
  fetcher(url, function (err, url, html) {

    if (err) {
      return next(err, {url: url});
    }

    company(url, html, function (err, data) {
      return next(err, data);
    })
  })
}
