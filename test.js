'use strict';

var chai = require('chai'),
    expect = chai.expect;

var AppearIn = require('./index-browser');

var BASE_URL = 'https://appear.in';

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
    var iframeElement,
        roomName;

    beforeEach(function(){
      iframeElement = document.createElement('iframe');
      roomName = 'anyroomname';
    });
    
    it('should throw error when all parameters are missing', function () {
      expect(appearin.addRoomToIframe).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should throw error when is not a valid iframe element', function () {
      expect(function(){
        appearin.addRoomToIframe(document.createElement('div'), roomName);
      }).to.throw('This is not an iframe element.');
    });

    it('should throw error if the iframe parameter is undefined', function () {
      expect(function(){
        appearin.addRoomToIframe(undefined, roomName);
      }).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should throw error if the room name parameter is undefined', function () {
      expect(function(){
        appearin.addRoomToIframe(iframeElement, undefined);
      }).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should attach the room to the iframe element', function () {
      appearin.addRoomToIframe(iframeElement, roomName);
      expect(iframeElement.src).to.be.ok;
    });

    it('should attach a room name with a prepending slash correctly', function () {
      var roomNameWithSlash = '/' + roomName;
      
      appearin.addRoomToIframe(iframeElement, roomNameWithSlash);
      expect(iframeElement.src).to.be.equal(BASE_URL + roomNameWithSlash);
    });

    it('should attach a room name with a prepending slash correctly', function () {
      var roomNameWithSlash = '/' + roomName;
      
      appearin.addRoomToIframe(iframeElement, roomNameWithSlash);
      expect(iframeElement.src).to.be.equal(BASE_URL + roomNameWithSlash);
    });

    it('should attach a room name without a prepending slash correctly', function () {
      appearin.addRoomToIframe(iframeElement, roomName);
      expect(iframeElement.src).to.be.equal(BASE_URL + '/' + roomName);
    });
  });

  describe('addRoomToElementById', function () {
    var idOfIframe,
        iframeElement;

    beforeEach(function(){
      idOfIframe = 'my-appear-room';

      iframeElement = document.createElement('iframe');
      iframeElement.id = idOfIframe;
    });

    it('should throw error when all parameters are missing', function () {
      expect(appearin.addRoomToElementById).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should throw error if the iframe parameter is undefined', function () {
      expect(function(){
        appearin.addRoomToElementById(undefined, 'myroom');
      }).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should throw error if the room name parameter is undefined', function () {
      expect(function(){
        appearin.addRoomToElementById(idOfIframe, undefined);
      }).to.throw(Error, 'Missing parameters or was passed as undefined');
    });

    it('should throw error if the element with id not found', function () {
      var id = 'not-exists';

      expect(function(){
        appearin.addRoomToElementById(id, 'any-room');
      }).to.throw(Error, 'The element with id ' + id + ' not found. Make sure it exists on your page.');
    });

  });

});
