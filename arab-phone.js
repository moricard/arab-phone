'use strict';

var http = require('http'),
    qs   = require('querystring'),
    Backbone = require('backbone'),
    _ = require('underscore');


var dataHandler = _.extend({}, Backbone.Events);

dataHandler.listenTo( Backbone, 'translated', function( data ) {
  console.log( data );
});

dataHandler.listenTo( Backbone, 'translate', function( phrase, from, to ) {
  translate( phrase, from, to );
});

function languagePair ( from, to ) {
  return '' + from + '|' + to;
}

function translate( phrase, from, to ) {
  var query = {
    q: phrase,
    langpair: languagePair(from, to)
  };

  var options = {
    hostname: 'api.mymemory.translated.net',
    path: '/get?' + qs.stringify( query )
  };

  http.get( options, function( res ) {
    res.on('data', function ( chunk ) { 
      Backbone.trigger('translated', JSON.parse(chunk) );
    });
  });
}
