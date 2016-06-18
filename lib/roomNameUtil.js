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

roomNameUtil.normalize = function (rawName) {
  var rawNameWithSlash = ensurePrependedSlash(rawName),
      roomNameNormalized = (rawNameWithSlash + '').trim().toLowerCase().replace(/\/*$/, '');

  reservedNames.forEach(function(reservedName){
    var isReservedName = (roomNameNormalized === ('/' + reservedName));
    if (isReservedName) {
      throw new Error('This name are reserved. Please, choose another for your room.');  
    }
  });

  return roomNameNormalized;
};

module.exports = roomNameUtil;
