'use strict';

var http = require('http'),
    qs   = require('querystring'),
    Backbone = require('backbone'),
    _ = require('underscore');


var dataHandler = _.extend({}, Backbone.Events);

var counter = 5;

dataHandler.listenTo( Backbone, 'translated', function( data ) {
  console.log( data );
});

dataHandler.listenTo( Backbone, 'translate', function( phrase, from, to ) {
  translate( phrase, from, to );
});

function languagePair ( from, to ) {
  return '' + from + '|' + to;
}

function languageChain () {
  var languages = _.toArray( arguments ), pairs = [], i = 0;
  while ( i < languages.length-1 ) pairs.push([ languages[i++], languages[i] ]);
  return pairs;
}

function eventName( from, to ) {
  return 'translated:' + from + ':' + to;
}

function phone( phrase /*,languages*/) {
  var pairs = languageChain.apply( this, [].splice.call(arguments, 1) ),
      i = pairs.length-1;

  // Last event from the chain
  dataHandler.listenToOnce( Backbone, eventName(pairs[i][0], pairs[i][1]), function(data) {
    Backbone.trigger('translated', data.responseData.translatedText );
  });

  // Register events that trigger translation of the next sequence when we 
  // recieve data from the api.
  while( i-- ) dataHandler.listenToOnce( Backbone, 
                                         eventName(pairs[i][0], pairs[i][1]), 
                                         next(pairs[i+1][0], pairs[i+1][1], i) );
  // Start the chain
  translate( phrase, pairs[0][0], pairs[0][1] );
}

function next( from, to, i ) {
  return function( data ) {
    var phrase = data.responseData.translatedText;
      console.log('translation step['+ i +']: ' + phrase );
      console.log('translating "' + from + '" to "' + to + '"');
      translate( phrase, from, to );
  };
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
    var content = '';
    res.on('data', function ( chunk ) { content += chunk; });
    res.on('end', function() { Backbone.trigger( eventName(from, to), 
                                          JSON.parse(content) ); });
  });
}

phone('pendant que les jeunes vierges se baignent a la fontaine, les vieillards boivent et parient aux jeux de carte', 
      'fr', 'en', 'de', 'fr', 'ru', 'es', 'fr', 'es', 'en', 'de', 'fr', 'ko', 'fr');


module.exports = {
  chain: languageChain,
  phone: phone
};

