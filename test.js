'use strict';

describe("AppearIn", function () {
    var AppearIn = require('./index-browser');
    var assert = require("assert");
    var appearin;
    var roomName = "/sly-koala";
    var roomNameWithoutPrependingSlash = "cool-panda";
    var BASE_URL = "https://appear.in";

    beforeEach(function () {
        appearin = new AppearIn({ debug: true });
    });

    describe("isWebRtcCompatible", function () {
        it("should return true only if the browser is WebRTC compatible", function () {
            // This test in itself is a bit weird, since it requires actually
            // testing if the browser is WebRTC compatible...
            // In reality this test here is much worse than the test in the test suite
            if (navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.getUserMedia) {
                assert.ok(appearin.isWebRtcCompatible());
            } else {
                assert.ok(!appearin.isWebRtcCompatible());
            }
        });
    });

    describe("getRandomRoomName", function () {
        it("should support promises", function (done) {
            appearin.getRandomRoomName().then(function () { done(); });
        });

        it("should support callbacks", function (done) {
            appearin.getRandomRoomName(function () {
                done();
            });
        });

        it("should return a random room name", function (done) {
            appearin.getRandomRoomName().then(function (roomName) {
                assert.ok(roomName);
                assert.ok(typeof roomName === "string");
                done();
            });
        });

        it("should return a room name with a leading slash", function (done) {
            appearin.getRandomRoomName().then(function (roomName) {
                assert.ok(roomName[0] === "/");
                done();
            });
        });
    });

    describe("addRoomToIframe", function () {
        var iframe;

        beforeEach(function () {
            iframe = document.createElement("iframe");
        });

        it("should throw if all parameters are missing", function () {
            try {
                appearin.addRoomToIframe();
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        it("should throw if the iframe parameter is undefined", function () {
            try {
                appearin.addRoomToIframe(undefined, roomName);
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        it("should throw if the roomName parameter is missing", function () {
            try {
                appearin.addRoomToIframe(iframe);
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        // use lodash.iselement
        it("should throw if the passed element is not an iframe");

        it("should attach the room to the iframe element", function () {
            appearin.addRoomToIframe(iframe, roomName);
            assert.ok(iframe.src);
        });

        it("should attach a room name with a prepending slash correctly", function () {
            appearin.addRoomToIframe(iframe, roomName);
            assert.ok(iframe.src === BASE_URL + roomName);
        });

        it("should attach a room name without a prepending slash correctly", function () {
            appearin.addRoomToIframe(iframe, roomNameWithoutPrependingSlash);
            assert.ok(iframe.src === BASE_URL + "/" + roomNameWithoutPrependingSlash);
        });

    });

    describe("addRoomToElementById", function () {
        var wrapperElement = document.createElement("div");
        document.body.appendChild(wrapperElement);

        var iframe;

        beforeEach(function () {
            wrapperElement.innerHTML = "";
            iframe = document.createElement("iframe");
            iframe.id = "appearin-iframe";
            wrapperElement.appendChild(iframe);
        });

        it("should throw if all parameters are missing", function () {
            try {
                appearin.addRoomToElementById();
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        it("should throw if the id parameter is undefined", function () {
            try {
                appearin.addRoomToElementById(undefined, roomName);
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        it("should throw if the roomName parameter is missing", function () {
            try {
                appearin.addRoomToElementById(iframe.id);
            } catch(e) {
                return;
            }
            throw new Error("should not get here");
        });

        it("should return if the element does not exist", function () {
            // maybe this should throw instead to keep consistent?
            appearin.addRoomToElementById("iframe-id-does-not-exist", roomName);
            assert.ok(iframe.src === "");
        });

        it("should add the room to the iframe", function () {
            appearin.addRoomToElementById(iframe.id, roomName);
            assert.ok(iframe.src === BASE_URL + roomName);
        });

        it("should handle roomNames with prepending slash", function () {
            appearin.addRoomToElementById(iframe.id, roomName);
            assert.ok(iframe.src === BASE_URL + roomName);
        });

        it("should handle room names without prepending slash", function () {
            appearin.addRoomToElementById(iframe.id, roomNameWithoutPrependingSlash);
            assert.ok(iframe.src === BASE_URL + "/" + roomNameWithoutPrependingSlash);
        });

    });
});
