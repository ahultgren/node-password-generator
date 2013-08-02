"use strict";

var exec = require('child_process').exec,
    program = 'node ./bin/passgen',
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;


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

function noUndefined (password) {
  return function () {
    password.indexOf('undefined').should.equal(-1);
  };
}


/* Tests
============================================================================= */

describe('Default command-line password', function () {
  var password = '';

  before(function (done) {
    exec(program, function (err, stdout, stderr) {
      password = stdout.substring(0, stdout.length - 1);
      done(err);
    });
  });

  it('has length 30', function () {
    length(password, 30)();
  });

  it('matches an all-including regex', function () {
    match(password, /^[\w\W]+$/)();
  });

  it('doesn\'t contain any "undefined"', function () {
    noUndefined(password)();
  });
});

describe('Short password with ascii and custom chars', function () {
  var password = '';

  before(function (done) {
    exec(program + ' -aul 10 -x "™"', function (err, stdout, stderr) {
      password = stdout.substring(0, stdout.length - 1);
      done(err);
    });
  });

  it('has length 10', function () {
    length(password, 10)();
  });

  it('matches an ascii+special regex', function () {
    match(password, /^[\w™]+$/)();
  });

  it('doesn\'t contain any "undefined"', function () {
    noUndefined(password)();
  });
});
