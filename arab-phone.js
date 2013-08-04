'use strict';

var http = require('http'),
    qs   = require('querystring'),
    Backbone = require('backbone'),
    _ = require('underscore');


// Simple event handler to register asynchronous API callbacks
var dataHandler = _.extend({}, Backbone.Events);

// Returns a string for language pairs understood by the MyMemory API
function languagePair ( from, to ) {
  return '' + from + '|' + to;
}

// Transforms a language chain to a list of language pairs.
function languageChain ( languages ) {
  var pairs = [], i = 0;
  while ( i < languages.length-1 ) pairs.push({ from: languages[i], 
                                                to:   languages[++i] });
  return pairs;
}

// Returns a normalized event name for translation 'from' language 'to' language.
function eventName( from, to ) {
  return 'translated:' + from + ':' + to;
}

// Starts a translation chain, first argument is the phrase to translate, rest
// is the language chain. ex: phone('this is funny', 'en', 'fr', 'es', 'ko', 'ru', 'en')
// will translate english to french to spanish to korean to russian back to english. 
function phone( phrase /*,languages*/) {
  var pairs = languageChain( [].splice.call(arguments, 1) ),
      i = pairs.length-1;

  // Last event from the chain
  dataHandler.once( eventName(pairs[i].from, pairs[i].to), function(data) {
    console.log( data.responseData.translatedText );
  });

  // Register events that trigger translation of the next sequence when we 
  // recieve data from the api.
  while( i-- ) dataHandler.once( eventName(pairs[i].from, pairs[i].to), 
                                 next(pairs[i+1].from, pairs[i+1].to, i) );
  // Start the chain.
  translate( phrase, pairs[0].from, pairs[0].to );
}

function next( from, to, i ) {
  return function( data ) {
    var phrase = data.responseData.translatedText;
      console.log('translation step['+ from +']: ' + phrase );
      console.log('translating to "' + to + '"');
      translate( phrase, from, to );
  };
}

// Translates a phrase from language `from` to language `to`
function translate( phrase, from, to ) {
  var query = { q: phrase, langpair: languagePair(from, to), de: 'marco.ricard@gmail.com' },
      options = {
        hostname: 'api.mymemory.translated.net',
        path: '/get?' + qs.stringify( query )
      };

  http.get( options, function( res ) {
    var content = '';
    res.on('data', function ( chunk ) { content += chunk; });
    res.on('end', function() { dataHandler.trigger( eventName(from, to), 
                                             JSON.parse(content) ); });
  });
}

phone('pendant que les jeunes vierges se baignent a la fontaine, les vieillards boivent et parient aux courses', 
      'fr', 'en', 'de', 'fr', 'ru', 'es', 'fr', 'es', 'en', 'ko', 'fr');


module.exports = {
  chain: languageChain,
  phone: phone
};

