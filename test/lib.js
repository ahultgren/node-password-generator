"use strict";

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    pass = require('../.');


/* Test utils
============================================================================= */

function length (password, l) {
  return function () {
    password.should.have.property('length').and.equal(l);
  };
}

function match (password, regex) {
  return function () {
    expect(password.match(regex)).to.not.equal(null);
  };
}

function entropy (measuredBytesOfEntropy, sets, unsets, extra) {
  return function () {
    var expectedBytesOfEntropy = 0, set;

    sets = sets || Object.keys(pass.sets);
    unsets = unsets || Object.keys(pass.unsets);

    for(set in sets) {
      if(pass.sets[sets[set]]) {
        expectedBytesOfEntropy += pass.sets[sets[set]].length;
      }
    }

    for(set in unsets) {
      if(pass.unsets[unsets[set]]) {
        expectedBytesOfEntropy -= pass.unsets[unsets[set]].length;
      }
    }

    if(extra) {
      expectedBytesOfEntropy += extra;
    }

    measuredBytesOfEntropy.should.equal(expectedBytesOfEntropy);
  };
}

function noUndefined (password) {
  return function () {
    password.indexOf('undefined').should.equal(-1);
  };
}


/* Tests
============================================================================= */

describe('Default password', function () {
  var password = pass(),
      setSize = pass.lastSetSize;

  it('has length 30', length(password, 30));
  it('matches an all-including regex', match(password, /^[\w\W]+$/));
  it('uses the expected amount of entropy', entropy(setSize));
  it('doesn\'t contain any "undefined"', noUndefined(password));
});

describe('ASCII password (using array)', function () {
  var sets = ['numbers', 'ascii', 'ASCII'],
      password = pass(sets),
      setSize = pass.lastSetSize;

  it('has length 30', length(password, 30));
  it('matches ascii-regex', match(password, /^[\w]+$/));
  it('uses the expected amount of entropy', entropy(setSize, sets, []));
  it('doesn\'t contain any "undefined"', noUndefined(password));
});

describe('Latin password (using object)', function () {
  var sets = {
        latin: true,
        Latin: true,
        Special: 1
      },
      password = pass(sets),
      setSize = pass.lastSetSize;

  it('has length 30', length(password, 30));
  it('matches latin-regex', match(password, /^[\W]+$/));
  it('uses the expected amount of entropy', entropy(setSize, Object.keys(sets), []));
  it('doesn\'t contain any "undefined"', noUndefined(password));
});

describe('Password with custom charset', function () {
  var sets = {
        extra: '≈∞™Ω•',
        length: 20
      },
      password = pass(sets),
      setSize = pass.lastSetSize;

  it('has length 20', length(password, 20));
  it('matches unicode-regex', match(password, /^[≈∞™Ω•]+$/));
  it('uses the expected amount of entropy', entropy(setSize, Object.keys(sets), [], sets.extra.length));
  it('doesn\'t contain any "undefined"', noUndefined(password));
});
