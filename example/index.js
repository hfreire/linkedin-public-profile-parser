/*
 * Copyright (C) 2016, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

var lp = require('../lib/').profile;
var url = 'https://www.linkedin.com/in/nelsonic';
lp(url, function(err, data){
  console.log(JSON.stringify(data,null,2));
})
