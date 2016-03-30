var test = require('tape');
var fs = require('fs');
var company = require('../lib/company');
var transform_linkedin_url = require('linkedin-canonical-url');

test('Parse Keybroker\'s Company Page', function (t) {
  var file = __dirname + '/fixtures/keybroker.html'
  fs.readFile(file, function (err, html) {
    var url = 'https://www.linkedin.com/company/keybroker-ab';
    url = transform_linkedin_url(url);
    company(url, html, function (err, data) {
      // console.log(data);
      t.ok(data.name === 'Keybroker', 'Keybroker\'s company page name is ' + data.name);
      t.ok(data.industry === 'Internet', 'Keybroker is an ' + data.industry + ' company');
      t.ok(data.employee_urls.length >= 10, 'Keybroker has at least ' + data.employee_urls.length + ' employees');
      t.ok(data.specialties[0].indexOf('Search marketing') > -1, 'Keybroker sells ' + data.specialties[0] + ' services');
      t.ok(data.website === 'http://www.keybroker.se', 'Keybroker\'s webpage is at ' + data.website);
      t.end();
    })
  })
})

test('Parse Apple\'s Company Page', function (t) {
  var file = __dirname + '/fixtures/apple.html'
  fs.readFile(file, function (err, html) {
    var url = 'https://www.linkedin.com/company/apple';
    url = transform_linkedin_url(url);
    company(url, html, function (err, data) {
      // console.log(data);
      t.ok(data.name === 'Apple', 'Apple\'s company page name is ' + data.name);
      t.ok(data.industry === 'Consumer Electronics', 'Apple is a ' + data.industry + ' company');
      t.ok(data.employee_urls.length >= 10, 'Apple has at least ' + data.employee_urls.length + ' employees');
      t.ok(data.specialties[0].indexOf('Innovative product development') > -1, 'Apple sells ' + data.specialties[0] + ' services');
      t.ok(data.website === 'http://www.apple.com/', 'Apple\'s webpage is at ' + data.website);
      t.end();
    })
  })

  test('Parse Monsanto\'s Company Page', function (t) {
    var file = __dirname + '/fixtures/monsanto.html'
    fs.readFile(file, function (err, html) {
      var url = 'https://www.linkedin.com/company/monsanto';
      url = transform_linkedin_url(url);
      company(url, html, function (err, data) {
        // console.log(data);
        t.ok(data.name === 'Monsanto Company', 'Monsanto\'s company page name is ' + data.name);
        t.ok(data.industry === 'Farming', 'Monsanto is a ' + data.industry + ' company');
        t.ok(data.employee_urls.length >= 10, 'Monsanto has at least ' + data.employee_urls.length + ' employees');
        t.ok(data.specialties[0].indexOf('Science') > -1, 'Monsanto sells ' + data.specialties[0] + ' services');
        t.ok(data.website === 'http://www.monsanto.com', 'Monsanto\'s webpage is at ' + data.website);
        t.end();
      })
    })
  })
})
