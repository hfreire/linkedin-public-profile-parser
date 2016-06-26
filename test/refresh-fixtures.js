var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');

var transform_linkedin_url = require('linkedin-canonical-url');
var fetcher = require('../lib/fetcher');

var urls = {
  'https://www.linkedin.com/pub/abdi-ahmed/100/384/6b0': 'abdi-ahmed.html',
  'https://www.linkedin.com/in/emusk': 'emusk.html',
  'https://uk.linkedin.com/in/simonlab': 'simonlab.html',
  'https://uk.linkedin.com/in/iteles': 'iteles.html',
  'https://www.linkedin.com/in/nelsonic': 'nelsonic.html',
  'https://uk.linkedin.com/pub/z%C3%BCmra-kinali/2b/731/b5b': 'zumra.html',
  'https://uk.linkedin.com/pub/benjamin-lees/58/75/162': 'benji.html',
  'https://www.linkedin.com/company/keybroker-ab': 'keybroker.html',
  'https://www.linkedin.com/company/apple': 'apple.html',
  'https://www.linkedin.com/company/monsanto': 'monsanto.html'
};

Promise.mapSeries(_.keys(urls), function(url) {
  var _url = transform_linkedin_url(url);
  var _file = __dirname + '/fixtures/' + urls[url];

  return fetcher(_url)
      .then(function(html) {
        fs.writeFile(_file, html.toString(), function(){
          console.log(_url, ' ✓');
        })
      })
      .catch(function (error) {
        console.error(error);
      })
});