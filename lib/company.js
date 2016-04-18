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
  var employees;          // store employee urls to be mangled


  function parse(html) {
    if (html === undefined || html === null) {
      return {employees: [], headquarters: {}};
    }

    return JSON.parse(html.substring(4, html.length - 3));  
  }
  
  var streamFooter = parse($('#stream-right-rail-embed-id-content').html());

  data.name = streamFooter.companyName;
  data.industry = streamFooter.industry;

  // linkedin does not show the direct employee profile, so we need to build it
  // we want this https://www.linkedin.com/pub/alexandra-nordstr%C3%B6m/8a/374/a33?trk=biz_employee_pub
  // to be this https://www.linkedin.com/in/alexandra-nordstr%C3%B6m-a333748a
  employees = streamFooter.employees;
  data.employee_urls = [];

  function buildEmployeeProfileUrl(href) {
    var regex = /^((http[s]?|ftp))?:\/\/\/?([^:\/\s]+)\/(\w+)\/([\w\-\%]+)\/([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
    var username = href.replace(regex, '$5');
    var mag = href.replace(regex, '$6').split('/');
    return 'https://www.linkedin.com/in/' + username + '-' + mag[2] + mag[1] + mag[0];
  }

  if (employees.length > 0) {
    for (i = 0; i < employees.length; i++) {
      var href = employees[i].url;
      data.employee_urls.push(buildEmployeeProfileUrl(href));
    }
  }

  data.specialties = streamFooter.specialties;
  data.website = streamFooter.website;
  data.type = streamFooter.companyType;
  data.streetAddress = streamFooter.headquarters.street1;
  data.locality = streamFooter.headquarters.city;
  data.region = streamFooter.headquarters.state;
  data.postalCode = streamFooter.headquarters.zip;
  data.countryName = streamFooter.headquarters.country;
  data.founded = streamFooter.yearFounded;

  next(null, data);
}
