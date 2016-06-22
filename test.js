'use strict';

var chai = require('chai'),
    expect = chai.expect;

var AppearIn = require('./lib/appearin');
var RoomUtil = require('./lib/roomNameUtil');

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

    it('should be works with a valid parameters', function () {
      var roomName = 'any-room';

      document.body.appendChild(iframeElement);
      
      appearin.addRoomToElementById(idOfIframe, roomName);
      expect(iframeElement.src).to.be.equal(BASE_URL + '/' + roomName);
    });

  });
});

describe('RoomUtil', function() {
  it('should be return in lower case the room name after normalize', function() {
    expect(RoomUtil.normalize('/HELLOword')).to.be.equal('/helloword');
  });

  it('should be return the room name with slash after normalize', function() {
    expect(RoomUtil.normalize('with-slash-after-normalize')).to.be.equal('/with-slash-after-normalize');
  });

  it('should be return error when the room name are reserved', function() {
    expect(function(){
        RoomUtil.normalize('robots.txt');
    }).to.throw(Error, 'This name are reserved. Please, choose another for your room.');

    expect(function(){
        RoomUtil.normalize('templates');
    }).to.throw(Error, 'This name are reserved. Please, choose another for your room.');

    expect(function(){
        RoomUtil.normalize('images/foo/bar/baz.jpg');
    }).to.throw(Error, 'This name are reserved. Please, choose another for your room.');

    expect(function(){
        RoomUtil.normalize('information/foo');
    }).to.throw(Error, 'This name are reserved. Please, choose another for your room.');

    expect(function(){
        RoomUtil.normalize('scripts');
    }).to.throw(Error, 'This name are reserved. Please, choose another for your room.');
  });
});
