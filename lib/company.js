/*
 * Copyright (C) 2016, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

var cheerio = require('cheerio');

/**
 * company method finds data in a given company page
 * @param {String} url - a valid Linkedin company page url
 * @param {String} html - the full html for the company page
 * @param {Function} next - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {Objectj} error an error object (set to null if no error occurred)
 *  @param {Object} data - the complete Linkedin Company page for the given url
 */
module.exports = function company(url, html, next) {
  var $ = cheerio.load(html); // use Server-Side JQuery to access DOM
  var data = {url: url};    // store all parsed data inside data object
  var i = 0;                  // we re-use this in all our for loops below
  var employee_urls;          // store employee urls to be mangled

  data.name = $('h1.name').text().trim();
  data.industry = $('p.industry').text().trim();

  // linkedin does not show the direct employee profile, so we need to build it
  // we want this https://www.linkedin.com/pub/alexandra-nordstr%C3%B6m/8a/374/a33?trk=biz_employee_pub
  // to be this https://www.linkedin.com/in/alexandra-nordstr%C3%B6m-a333748a
  employee_urls = $('a.discovery-photo');
  data.employee_urls = [];

  function buildEmployeeProfileUrl(href) {
    var regex = /^((http[s]?|ftp))?:\/\/\/?([^:\/\s]+)\/(\w+)\/([\w\-\%]+)\/([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
    var username = href.replace(regex, '$5');
    var mag = href.replace(regex, '$6').split('/');
    return 'https://www.linkedin.com/in/' + username + '-' + mag[2] + mag[1] + mag[0];
  }

  if (employee_urls.length > 0) {
    for (i = 0; i < employee_urls.length; i++) {
      var href = employee_urls[i]['attribs'].href;
      data.employee_urls.push(buildEmployeeProfileUrl(href));
    }
  }

  data.specialties = $('div.specialties > p').text().trim().split(',\n');
  data.website = $('li.website > p > a').text();
  data.type = $('li.type > p').text().trim();
  data.streetAddress = $('span.street-address').text();
  data.locality = $('span.locality').text().replace(',', '');
  data.region = $('span.region').text();
  data.postalCode = $('span.postal-code').text();
  data.countryName = $('span.country-name').text();
  data.founded = $('li.founded > p').text().trim();

  next(null, data);
}
