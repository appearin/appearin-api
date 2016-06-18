"use strict";

var request = require('browser-request');
var promise = require('promise');
var roomNameUtil = require('./roomNameUtil');

// promisify
var req = promise.denodeify(request);

var API_URL = "https://api.appear.in";
var BASE_URL = "https://appear.in";


function checkSupportForIce(server) {
    var stunServer = server || "stun:stun.l.google.com:19302";
    var config = {"iceServers": [{"url": stunServer}]};
    try {
        var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        var pc = new RTCPeerConnection(config);
        return pc && !!pc.iceConnectionState; // pc.iceState is deprecated, no longer supported
    } catch (e) {
        return false;
    }
}

function addRoomToElement(element, roomName) {
    roomName = roomNameUtil.normalize(roomName);
    element.src = BASE_URL + roomName;
}

function AppearIn(config) {
    config = config || {};
    if (config.debug) {
        // Do not send network requests when testing
        req = function () {
            return new promise(function (resolve) {
                resolve({ body: "{\"roomName\": \"/sly-koala\"}" });
            });
        };
    }
}

AppearIn.prototype.isWebRtcCompatible = function isWebRtcCompatible() {
    try {
        var supportsVideoElement = !!document.createElement('video').canPlayType;
        var supportsVP8 = document.createElement('video').canPlayType('video/webm; codecs="vp8", vorbis') === "probably";
        var supportsGetUserMedia = !!(navigator.mozGetUserMedia
            || navigator.webkitGetUserMedia
            || navigator.msGetUserMedia
            || navigator.getUserMedia);
        var supportsRTCPeerConnection = !!(window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection);
        var supportsIceCandidates = checkSupportForIce(this.stunServer);

        return supportsVideoElement
            && supportsVP8
            && supportsGetUserMedia
            && supportsRTCPeerConnection
            && supportsIceCandidates;
    } catch (e) {
        return false;
    }
};

AppearIn.prototype.getRandomRoomName = promise.nodeify(function getRandomRoomName() {
    return req({
        method: "POST",
        uri: API_URL + "/random-room-name",
        headers: {
            accept: "application/json, text/plain, */*"
        }
    }).then(function (res) {
        try {
            return JSON.parse(res.body).roomName;
        } catch(e) {
            throw new Error("Could not parse response body");
        }
    });
});

AppearIn.prototype.addRoomToIframe = function addRoomToIframe(iframe, roomName) {
    if (!iframe || !roomName) {
        throw new Error('Missing parameters or was passed as undefined.');
    }

    if (iframe.tagName !== 'IFRAME') {
        throw new Error('This is not an iframe element.');
    }

    addRoomToElement(iframe, roomName);
};

AppearIn.prototype.addRoomToElementById = function addRoomToElementById(id, roomName) {
    if (!id || !roomName) {
        throw new Error('Missing parameters or was passed as undefined.');
    }

    var iframe = document.getElementById(id);
    
    if (!iframe) {
        throw new Error('The element with id ' + id + ' not found. Make sure it exists on your page.');
    }

    addRoomToElement(iframe, roomName);
};

module.exports = AppearIn;
