'use strict';

var assert = require('chai').assert;
var AppearIn = require('./index-browser');

describe('AppearIn', function() {
  var appearin,
      hasCompatibility;

  beforeEach(function() {
    appearin = new AppearIn({ debug: true });
    hasCompatibility = (window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.RTCPeerConnection);
  });

  describe('isWebRtcCompatible', function () {
    it('should return true if the browser has compatibility', function () {
      if (true === hasCompatibility) {
        assert.isTrue(appearin.isWebRtcCompatible());
      }
    });

    it('should return false if the browser not has compatibility', function () {
      if (false === hasCompatibility) {
        assert.isFalse(appearin.isWebRtcCompatible());
      }
    });
  });

  describe('getRandomRoomName', function () {
    it('should support promises', function (done) {
      appearin.getRandomRoomName().then(function () {
        done();
      });
    });

    it('should support callbacks', function (done) {
      appearin.getRandomRoomName(function () {
        done();
      });
    });

    it('should return a random room name', function (done) {
      appearin.getRandomRoomName().then(function (name) {
        assert.isString(name);
        done();
      });
    });

    it('should return a room name with a leading slash', function (done) {
      appearin.getRandomRoomName().then(function (name) {
        assert.equal(name[0], '/');
        done();
      });
    });
  });

  describe('addRoomToIframe', function () {
    it("should throw if all parameters are missing", function () {
      assert.throws(appearin.addRoomToIframe, Error, 'Missing parameters');
    });
  });
});
