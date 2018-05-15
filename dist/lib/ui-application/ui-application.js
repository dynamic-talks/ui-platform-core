'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiApplication = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('rxjs');

var _recompose = require('recompose');

var _libioc = require('libioc');

var _createStore = require('../redux/create-store');

var _withIoCProvider = require('../react-enhancers/withIoCProvider');

var _withReduxProvider = require('../react-enhancers/withReduxProvider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UiApplication = exports.UiApplication = function () {
  function UiApplication(ioc, config) {
    _classCallCheck(this, UiApplication);

    this._ioc = new _libioc.IoCContainer({ parent: ioc });
    this._store = null;
    this._config = config;
    /**
     * @type {Module}
     * @private
     */
    this._modules = [];
    this._modulesMap = new Map();

    this._configured = false;
    this._running = false;
  }

  _createClass(UiApplication, [{
    key: 'addModule',
    value: function addModule(module) {
      if (this._configured) {
        throw new Error('Module couldn\'t be added to application because it already has been configured!');
      }

      if (!module || (typeof module === 'undefined' ? 'undefined' : _typeof(module)) !== 'object') {
        throw new TypeError('Module should be an object!');
      }

      this._modules.push(module);
      this._modulesMap.set(module.name, module);

      // TODO: Provide right order of storing modules and dependencies
      if (module.dependsOn) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = module.dependsOn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dependency = _step.value;

            if (typeof dependency === 'string') {
              if (!this._modulesMap.has(dependency)) {
                throw new ReferenceError('Module \'' + dependency + '\' which is required for module \'' + module.name + '\' is absent in application');
              }
            } else {
              this.addModule(dependency);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return this;
    }
  }, {
    key: 'configure',
    value: function configure() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$state = _ref.state,
          state = _ref$state === undefined ? {} : _ref$state,
          _ref$rawConfig = _ref.rawConfig,
          rawConfig = _ref$rawConfig === undefined ? null : _ref$rawConfig;

      if (this._configured) {
        throw new Error('UI application already configured!');
      }

      var reducers = {};
      var epics = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._modules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var module = _step2.value;

          if (module.resources) {
            this._ioc.registerAll(module.resources);
          }

          if (module.reducers) {
            Object.assign(reducers, module.reducers);
          }

          if (module.epics) {
            epics.push.apply(epics, module.epics);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (Object.keys(reducers).length > 0) {
        this._store = (0, _createStore.createStore)({ reducers: reducers, state: state, epics: epics, ioc: this._ioc });
      }

      this._configured = true;

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._modules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _module = _step3.value;

          if (_module.configure) {
            // TODO: redesign to use multiple Redux stores
            _module.configure({ ioc: this._ioc, store: this._store });
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return this;
    }

    /**
     * Render React app with Redux and IoC providers
     * @param Component
     * @returns {XML}
     */

  }, {
    key: 'renderApp',
    value: function renderApp(Component) {
      var EnhancedComponent = (0, _recompose.compose)((0, _withIoCProvider.withIoCProvider)(this._ioc), (0, _withReduxProvider.withReduxProvider)(this._store))(Component);

      return _react2.default.createElement(EnhancedComponent, null);
    }
  }, {
    key: 'run',
    value: function run() {
      if (this._running) {
        throw new Error('UI application already running!');
      }

      if (!this._configured) {
        this.configure();
      }

      this._running = true;

      var renderedContent = this.render();

      var didMountPromises = [];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._modules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var module = _step4.value;

          if (module.moduleDidMount) {
            didMountPromises.push(module.moduleDidMount({ ioc: this._ioc, store: this._store }) || Promise.resolve(true));
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return Promise.all(didMountPromises).then(function () {
        return renderedContent;
      });
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'store',
    get: function get() {
      return this._store;
    }
  }]);

  return UiApplication;
}();