"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {
  return null;
};

function createDummyLogger() {
  return {
    trace: noop,
    verbose: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
    critical: noop,

    getInterface: createDummyLogger
  };
}

/**
 * Provides temporary dummy logger interface
 */

var DummyLogger = exports.DummyLogger = function () {
  function DummyLogger() {
    _classCallCheck(this, DummyLogger);
  }

  _createClass(DummyLogger, [{
    key: "getInterface",
    value: function getInterface() {
      return createDummyLogger();
    }
  }]);

  return DummyLogger;
}();

;