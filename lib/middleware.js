'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiMiddleware = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _RSAA = require('./RSAA');

var _RSAA2 = _interopRequireDefault(_RSAA);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(action) {
        var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, method, body, credentials, bailout, types, _normalizeTypeDescrip, _normalizeTypeDescrip2, requestType, successType, failureType, res;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _validation.isRSAA)(action)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', next(action));

              case 2:

                // Try to dispatch an error request FSA for invalid RSAAs
                validationErrors = (0, _validation.validateRSAA)(action);

                if (!validationErrors.length) {
                  _context.next = 7;
                  break;
                }

                _callAPI = action[_RSAA2.default];

                if (_callAPI.types && Array.isArray(_callAPI.types)) {
                  _requestType = _callAPI.types[0];

                  if (_requestType && _requestType.type) {
                    _requestType = _requestType.type;
                  }
                  next({
                    type: _requestType,
                    payload: new _errors.InvalidRSAA(validationErrors),
                    error: true
                  });
                }
                return _context.abrupt('return');

              case 7:

                // Parse the validated RSAA action
                callAPI = action[_RSAA2.default];
                endpoint = callAPI.endpoint, headers = callAPI.headers;
                method = callAPI.method, body = callAPI.body, credentials = callAPI.credentials, bailout = callAPI.bailout, types = callAPI.types;
                _normalizeTypeDescrip = (0, _util.normalizeTypeDescriptors)(types), _normalizeTypeDescrip2 = (0, _slicedToArray3.default)(_normalizeTypeDescrip, 3), requestType = _normalizeTypeDescrip2[0], successType = _normalizeTypeDescrip2[1], failureType = _normalizeTypeDescrip2[2];

                // Should we bail out?

                _context.prev = 11;

                if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return');

              case 14:
                _context.next = 22;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](11);
                _context.next = 20;
                return (0, _util.actionWith)((0, _extends3.default)({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].bailout function failed'),
                  error: true
                }), [action, getState()]);

              case 20:
                _context.t1 = _context.sent;
                return _context.abrupt('return', next(_context.t1));

              case 22:
                if (!(typeof endpoint === 'function')) {
                  _context.next = 33;
                  break;
                }

                _context.prev = 23;

                endpoint = endpoint(getState());
                _context.next = 33;
                break;

              case 27:
                _context.prev = 27;
                _context.t2 = _context['catch'](23);
                _context.next = 31;
                return (0, _util.actionWith)((0, _extends3.default)({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].endpoint function failed'),
                  error: true
                }), [action, getState()]);

              case 31:
                _context.t3 = _context.sent;
                return _context.abrupt('return', next(_context.t3));

              case 33:
                if (!(typeof headers === 'function')) {
                  _context.next = 44;
                  break;
                }

                _context.prev = 34;

                headers = headers(getState());
                _context.next = 44;
                break;

              case 38:
                _context.prev = 38;
                _context.t4 = _context['catch'](34);
                _context.next = 42;
                return (0, _util.actionWith)((0, _extends3.default)({}, requestType, {
                  payload: new _errors.RequestError('[RSAA].headers function failed'),
                  error: true
                }), [action, getState()]);

              case 42:
                _context.t5 = _context.sent;
                return _context.abrupt('return', next(_context.t5));

              case 44:
                _context.next = 46;
                return (0, _util.actionWith)(requestType, [action, getState()]);

              case 46:
                _context.t6 = _context.sent;
                next(_context.t6);
                _context.prev = 48;
                _context.next = 51;
                return fetch(endpoint, { method: method, body: body, credentials: credentials, headers: headers });

              case 51:
                res = _context.sent;
                _context.next = 60;
                break;

              case 54:
                _context.prev = 54;
                _context.t7 = _context['catch'](48);
                _context.next = 58;
                return (0, _util.actionWith)((0, _extends3.default)({}, requestType, {
                  payload: new _errors.RequestError(_context.t7.message),
                  error: true
                }), [action, getState()]);

              case 58:
                _context.t8 = _context.sent;
                return _context.abrupt('return', next(_context.t8));

              case 60:
                if (!res.ok) {
                  _context.next = 67;
                  break;
                }

                _context.next = 63;
                return (0, _util.actionWith)(successType, [action, getState(), res]);

              case 63:
                _context.t9 = _context.sent;
                return _context.abrupt('return', next(_context.t9));

              case 67:
                _context.next = 69;
                return (0, _util.actionWith)((0, _extends3.default)({}, failureType, {
                  error: true
                }), [action, getState(), res]);

              case 69:
                _context.t10 = _context.sent;
                return _context.abrupt('return', next(_context.t10));

              case 71:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[11, 16], [23, 27], [34, 38], [48, 54]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  };
}

exports.apiMiddleware = apiMiddleware;