'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeRequestTransport = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.responseToLogData = responseToLogData;
exports.createNodeRequestTransport = createNodeRequestTransport;

var _BaseTransport2 = require('./BaseTransport');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import { logData } from 'core/logging/logData';

var NodeRequestTransport = exports.NodeRequestTransport = function (_BaseTransport) {
  _inherits(NodeRequestTransport, _BaseTransport);

  function NodeRequestTransport() {
    _classCallCheck(this, NodeRequestTransport);

    return _possibleConstructorReturn(this, (NodeRequestTransport.__proto__ || Object.getPrototypeOf(NodeRequestTransport)).apply(this, arguments));
  }

  _createClass(NodeRequestTransport, [{
    key: 'request',
    value: function request(config, meta) {
      var _this2 = this;

      var context = meta.context;

      //todo: let logData = this.createRequestLogData(config, context);

      var logData = {};

      //todo: this._logger.info('Preparing http request', logData);
      this._logger.info('Preparing http request');

      /**
       * mapping 'data' property, that we have in config object to body required by request library
       */
      if (config.data && config.method === 'POST') {
        config.body = JSON.stringify(config.data);

        delete config.data;
      }

      return new Promise(function (resolve, reject) {
        _this2.stream(config, _extends({}, meta, { logData: logData }), function (error, response, body) {
          if (error) {
            return reject(error);
          }

          if (body) {

            if (typeof body === 'string') {
              try {
                response.data = JSON.parse(body);
              } catch (error) {
                /*todo: this._logger.error(
                  'Could not parse response body', logData.clone().errorMessage(error.message).httpBody(body)
                );*/

                _this2._logger.error('Could not parse response body', error.message, body);
              }
            }

            //this._logger.debug('Transport request response data', logData.extend({ body }));
            _this2._logger.debug('Transport request response data', body);
          }

          return resolve(response);
        });
      });
    }

    /**
     * Creates stream for http request
     *
     * @param {Object} config
     * @param {Object} meta
     * @param {Function} callback
     *
     * @returns {Stream} https://nodejs.org/api/stream.html#stream_readable_streams
     */

  }, {
    key: 'stream',
    value: function stream(config, _ref) {
      var _this3 = this;

      var context = _ref.context,
          logData = _ref.logData;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      //logData = logData || this.createRequestLogData(config, context);

      /**
       * request configuration accepts `qs` property as object of query params,
       * from config we have `params` property with same data, so mapping goes here
       */

      if (config.params) {
        config.qs = config.params;

        delete config.params;
      }

      //this._logger.info(`Request to ${config.url} started`, logData);
      this._logger.info('Request to ' + config.url + ' started');
      //this._logger.debug(`${config.url} request headers`, logData.clone().httpHeaders(config.headers));
      this._logger.debug(config.url + ' request headers', config.headers);

      return (0, _request2.default)(config, function (error, response, body) {
        if (error) {
          /*todo: this._logger.error(
            error.toString(), responseToLogData(logData.clone(), response, error)
          );*/
          _this3._logger.error(error.toString());

          return callback && callback(error, response);
        }

        //this._logger.debug(`${config.url} response headers`, logData.clone().httpHeaders(response.headers));
        _this3._logger.debug(config.url + ' response headers', response.headers);

        return callback && callback(error, response, body);
      });
    }

    /**
     * Proxies http request to remote host and back to server response using streaming
     * request stream -> proxy stream -> response stream
     *
     * @param {http.ClientRequest} req
     * @param {http.ServerResponse} res
     * @param {String} destination
     * @param {Object} [settings]
     *
     * @returns {Stream} Proxy stream
     */

  }, {
    key: 'pureProxy',
    value: function pureProxy(req, res, destination) {
      var _this4 = this;

      var settings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var proxyStream = (0, _request2.default)(destination);
      var reqPipe = req.pipe(proxyStream);
      //let proxyLogData = logData().url(destination);

      proxyStream.on('error', function (error) {

        /*todo: this._logger.error(
          `Proxy to ${destination} failed!`,
          responseToLogData(proxyLogData.error(error), null, error)
        );*/

        _this4._logger.error('Proxy to ' + destination + ' failed!');

        var retryTimeout = settings.retryTimeout;

        if (retryTimeout) {
          res.set('Retry-After', retryTimeout);
        }

        switch (error.code) {
          case 'ETIMEDOUT':
            res.status(504);
            break;
          default:
            res.status(503);
            break;
        }

        res.send(error);
      }).on('response', function () {
        reqPipe.pipe(res);
      });

      return proxyStream;
    }

    /*createRequestLogData(config, context, baseUrl = 'http://localhost') {
      return super.createRequestLogData(config, context, baseUrl);
    }*/

  }]);

  return NodeRequestTransport;
}(_BaseTransport2.BaseTransport);

exports.default = NodeRequestTransport;
function responseToLogData(logData, response) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (error) {
    logData.host(error.host).port(error.port);
  }

  if (response) {
    logData.httpStatus(response.statusCode);

    if (response.statusCode >= 400) {
      logData.httpBody(response.data || response.body);
    }
  }

  return logData;
}

function createNodeRequestTransport(config, rootLogger) {
  return new NodeRequestTransport(config, rootLogger.getInterface('transport.node_request'));
}

createNodeRequestTransport.$inject = ['config', 'logger'];
createNodeRequestTransport.$singleton = true;