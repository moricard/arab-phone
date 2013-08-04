'use strict';

var http = require('http'),
    qs   = require('querystring');


function languagePair ( from, to ) {
  return '' + from + '|' + to;
}

// request translation query
var query = {
  q: "this is a test phrase",
  langpair: languagePair('en', 'fr')
};

var options = {
  hostname: 'api.mymemory.translated.net',
  path: 'get?' + qs.stringify( query )
};

http.get( options, function( res ) {
  console.log( res );
});
