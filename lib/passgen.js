"use strict";

var mersenne = require('mersenne');


/* Charsets:
============================================================================= */
// Source/reference: http://en.wikipedia.org/wiki/ISO/IEC_8859-1#Codepage_layout

var sets = {
      numbers: ['0','1','2','3','4','5','6','7','8','9'],
      ascii: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      ASCII: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      special: [' ','!','"','#','%','&','\'','(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'],
      latin: ['\u00e0','\u00e1','\u00e2','\u00e3','\u00e4','\u00e5','\u00e6','\u00e7','\u00e8','\u00e9','\u00ea','\u00eb','\u00ec','\u00ed','\u00ee','\u00ef','\u00f0','\u00f1','\u00f2','\u00f3','\u00f4','\u00f5','\u00f6','\u00f8','\u00f9','\u00fa','\u00fb','\u00fc','\u00fd','\u00fe','\u00ff'],
      Latin: ['\u00c0','\u00c1','\u00c2','\u00c3','\u00c4','\u00c5','\u00c6','\u00c7','\u00c8','\u00c9','\u00ca','\u00cb','\u00cc','\u00cd','\u00ce','\u00cf','\u00d0','\u00d1','\u00d2','\u00d3','\u00d4','\u00d5','\u00d6','\u00d8','\u00d9','\u00da','\u00db','\u00dc','\u00dd','\u00de','\u00df'],
      Special: ['\u00a0','\u00a1','\u00a2','\u00a3','\u00a4','\u00a5','\u00a6','\u00a7','\u00a8','\u00a9','\u00aa','\u00ab','\u00ac','\u00ae','\u00af','\u00b0','\u00b1','\u00b2','\u00b3','\u00b4','\u00b5','\u00b6','\u00b7','\u00b8','\u00b9','\u00ba','\u00bb','\u00bc','\u00bd','\u00be','\u00bf','\u00d7','\u00f7'],
    },
    unsets = {
      ambiguous: [' ','\u00A0','\u00d7','\u00B9','`','´','\'','"','|','i','I','l','o','O','0']
    };


/* Main module:
============================================================================= */

module.exports = exports = function (options, l) {
  options = options || {};

  var set = [],
      args = Array.isArray(options) && options || Object.keys(options),
      length = l || !Array.isArray(options) && options.length || 30,
      result = '',
      ambiguous = false;

  // Set defaults
  if(!args.length || args.length === 1 && args[0] === 'length') {
    args = Object.keys(sets);
    args.push('ambiguous');
  }

  // Add extra chars
  if(options.extra) {
    if(Array.isArray(options.extra)) {
      set.push.apply(set, options.extra);
    }
    else {
      set.push.apply(set, options.extra.split(''));
    }
  }

  // Merge chosen charsets
  args.map(function (arg) {
    if(arg in sets) {
      set.push.apply(set, sets[arg]);
    }
    else if(arg in unsets) {
      ambiguous = true;
    }
  });

  // Remove ambiguous chars
  (function () {
    var i, ii;
    
    if(ambiguous) {

      for(i = unsets.ambiguous.length; i--;) {
        for(ii = set.length; ii--;) {
          if(unsets.ambiguous[i] === set[ii]) {
            set.splice(ii, 1);
            break;
          }
        }
      }
    }
  }());

  // Generate random chars
  (function (i) {
    for(;i--;) {
      result += set[mersenne.rand(set.length)];
    }
  }(length));

  // Expose number of used bytes so entropy can be calculated
  exports.lastSetSize = set.length;
  return result;
};


/* Expose stuff
============================================================================= */

exports.lastSetSize = 0;
exports.sets = sets;
exports.unsets = unsets;
