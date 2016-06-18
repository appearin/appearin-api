'use strict';

function ensurePrependedSlash(roomName) {
  return (roomName && roomName[0] !== '/') ? '/' + roomName : roomName;
}

var reservedNames = [
  'templates', 
  'styles', 
  'scripts', 
  'libraries', 
  'i', 
  'images', 
  'information', 
  'error', 
  'extensions', 
  'translations', 
  'robots.txt'
];

var roomNameUtil = {};

roomNameUtil.requirements = 'the room name cannot start with / or be any of these reserved words: ' + reservedNames.join(', ') + '.';
roomNameUtil.pattern = '(?!(?:' + reservedNames.join('|') + ')(?:\/.*|$))([^?#]+)';

roomNameUtil.normalize = function (rawName) {
  var rawNameWithSlash = ensurePrependedSlash(rawName);
  return (rawNameWithSlash + "").trim().toLowerCase().replace(/\/*$/, '');
};

module.exports = roomNameUtil;
