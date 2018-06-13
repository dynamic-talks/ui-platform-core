'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Describe interface for concrete configuration reader classes
 */
var IConfigurationReader = exports.IConfigurationReader = function () {
  function IConfigurationReader() {
    _classCallCheck(this, IConfigurationReader);
  }

  _createClass(IConfigurationReader, [{
    key: 'read',


    /**
     * Implement concrete configuration reading. Since reading might be async logic it should return Promise instance
     *
     * @param {String} appName
     * @param {Object} envArgs
     * @param {Object} cliArgs
     * @return {Promise<Object>}
     */
    value: function read() {
      throw new Error('[IConfigurationReader] read() ins\'t implemented');
    }

    // Should be defined unique name in concrete class

  }]);

  return IConfigurationReader;
}();

IConfigurationReader.readerType = null;