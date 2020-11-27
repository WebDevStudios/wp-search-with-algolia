"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _instantsearch = require("./instantsearch");

Object.keys(_instantsearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _instantsearch[key];
    }
  });
});

var _connector = require("./connector");

Object.keys(_connector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _connector[key];
    }
  });
});

var _widget = require("./widget");

Object.keys(_widget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _widget[key];
    }
  });
});

var _insights = require("./insights");

Object.keys(_insights).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _insights[key];
    }
  });
});