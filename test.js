'use strict';

var chai = require('chai'),
    expect = chai.expect;

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
        expect(appearin.isWebRtcCompatible()).to.be.true;
      }
    });

    it('should return false if the browser not has compatibility', function () {
      if (false === hasCompatibility) {
        expect(appearin.isWebRtcCompatible()).to.be.false;
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
        expect(name).to.be.a('string');
        done();
      });
    });

    it('should return a room name with a leading slash', function (done) {
      appearin.getRandomRoomName().then(function (name) {
        expect(name[0] === '/').to.be.true;
        done();
      });
    });
  });

  describe('addRoomToIframe', function () {
    it('should throw error when all parameters are missing', function () {
      expect(appearin.addRoomToIframe).to.throw(Error, 'Missing parameters');
    });

    it('should throw error when is not a valid iframe element', function () {
      expect(function(){
        appearin.addRoomToIframe(document.createElement('div'), 'anyRoomName');
      }).to.throw('This is not a iframe element.');
    });
  });
});
