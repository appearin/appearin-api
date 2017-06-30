# DEPRECATED

**The API has been deprecated as of 2017-06-30. See https://developer.appear.in for more information.**

# appear.in JavaScript SDK

The official appear.in JavaScript SDK, available for browsers.

Release notes can be found at https://developer.appear.in/#sdk-changelog

[![Build Status](https://secure.travis-ci.org/appearin/appearin-sdk.png)](http://travis-ci.org/appearin/appearin-sdk)

[![NPM](https://nodei.co/npm/appearin-sdk.png?stars&downloads&downloadRank)](https://nodei.co/npm/appearin-sdk/) [![NPM](https://nodei.co/npm-dl/appearin-sdk.png?months=6&height=3)](https://nodei.co/npm/appearin-sdk/)

## Installing

You can add this library to your browserify/whatever is cool these days package by doing:

`npm install appearin-sdk`

Alternatively, you can fetch link to the sources directly at the bottom of you body:

`<script src="//developer.appear.in/scripts/appearin-sdk.0.0.4.min.js"></script>`

You can read more on the appear.in API at our [developer pages](https://developer.appear.in).

[Documentation can be found at our developer pages too](https://developer.appear.in/#javascript-sdk-documentation).

# Development
*This section is only here for those manually going to the GitHub
repository and want to build/hack it themselves.*

The project uses browserify to compile the sources. A test page has been added
as index.html to verify that the core functionality is working. Hopefully this
will be replaced by automated tests soon™.

To start off, run `npm install` to fetch dependencies.

To compile the latest sources do `grunt dev`.

## Building outside NPM
Building outside NPM is done by doing `grunt build`. This will create three files:

````
appearin-sdk.<version>.js
appearin-sdk.<version>.min.js
appearin-sdk.<version>.min.js.map
````

These can be self hosted, and they contain all dependencies necessary,
including wrapping with browserify-standalone.
