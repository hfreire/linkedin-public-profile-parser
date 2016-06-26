var fs    = require('fs');
var Wreck = require('wreck');
var Promise = require('bluebird');

var wreck = Wreck.defaults({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0',
    'Accept-Encoding': 'identity'
  }
});

module.exports = function switcher (url) {
  
  return new Promise(function (resolve, reject) {

    return Promise.delay(20000)
        .then(function () {

          if(!url || typeof url === 'undefined') {
            return reject('url undefined', url);
          }
          wreck.get(url, function (error, response, html) {
            // http://stackoverflow.com/questions/27231113/999-error-code-on-head-request-to-linkedin
            if(response.statusCode === 404 || response.statusCode === 999 ) {
              return reject(new Error(response.statusCode));
            }

            if (error || !response || response.statusCode !== 200) {
              console.log(" - - - URL FAIL >> " + url + "  - - - ");
              console.log(error)
              console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
              console.log(response.headers)
              console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
              console.log(response.reply)
              return reject(new Error('error fetcher'));
            }
            else {
              return resolve(html);
            }
          })

        })
  });
};
