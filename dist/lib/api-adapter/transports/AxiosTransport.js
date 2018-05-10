'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxiosTransport = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createAxiosTransport = createAxiosTransport;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _BaseTransport2 = require('./BaseTransport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxiosTransport = exports.AxiosTransport = function (_BaseTransport) {
  _inherits(AxiosTransport, _BaseTransport);

  function AxiosTransport() {
    _classCallCheck(this, AxiosTransport);

    return _possibleConstructorReturn(this, (AxiosTransport.__proto__ || Object.getPrototypeOf(AxiosTransport)).apply(this, arguments));
  }

  _createClass(AxiosTransport, [{
    key: 'request',
    value: function request(config, daoMeta) {
      var context = daoMeta.context;
      //let logData = this.createRequestLogData(config, context , window.location.origin);

      // TODO: recover commented code as soon as `logData` is implemented
      // this._logger.debug('ApiAdapter responsePipeline finished', logData.clone().httpBody(config.data), null, ['app_core', 'ApiAdapter', 'ajax']);

      this._logger.debug('ApiAdapter responsePipeline finished');

      var availableMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

      if (!config.method) {
        throw new Error('AxiosTransport config should define `method` property');
      }

      var method = config.method.toLowerCase();

      if (availableMethods.indexOf(method) === -1) {
        throw new Error('axiosTransport cannot handle ' + method + ' method');
      }

      if (!config.url) {
        throw new Error('AxiosTransport config should define `url` property');
      }

      config.headers = config.headers || {};

      // TODO: recover commented code as soon as `logData` is implemented
      // this._logger.debug(`Transport ${method} request started`, logData, null, ['app_core', 'ApiAdapter', 'transport', 'ajax']);
      this._logger.debug('Transport ' + method + ' request started');

      return _axios2.default.create({
        timeout: this._config.get('api.transports.requestTimeout'),
        rejectUnauthorized: this._config.get('api.transports.rejectUnauthorized')
      }).request(config);
    }
  }], [{
    key: 'factory',
    value: function factory(config, rootLogger) {
      return new AxiosTransport(config, rootLogger.getInterface('transport.axios'));
    }
  }]);

  return AxiosTransport;
}(_BaseTransport2.BaseTransport);

function createAxiosTransport(config, rootLogger) {
  return new AxiosTransport(config, rootLogger.getInterface('transport.axios'));
}

createAxiosTransport.$inject = ['config', 'logger'];
createAxiosTransport.$singletion = true;