"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.logout = exports.loginSuccess = exports.kakaoLogin = exports.confrimUsername = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var kakaoLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var KAKAO_BASE_PATH, config, params, finalUrl, data, tokenRequest, access_token, userRequest, userData, _userData$kakao_accou, _userData$kakao_accou2, nickname, thumbnail_image_url, email, existingUser, accessToken, refreshToken, user, _accessToken, _refreshToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Access Token 받는 코드
          KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
          config = {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT,
            code: req.body.code,
            redirect_uri: process.env.REDIRECT_URI
          };
          params = new URLSearchParams(config).toString();
          finalUrl = "".concat(KAKAO_BASE_PATH, "?").concat(params);
          _context.next = 7;
          return fetch(finalUrl, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          });
        case 7:
          data = _context.sent;
          _context.next = 10;
          return data.json();
        case 10:
          tokenRequest = _context.sent;
          if (!("access_token" in tokenRequest)) {
            _context.next = 40;
            break;
          }
          access_token = tokenRequest.access_token;
          _context.next = 15;
          return fetch("https://kapi.kakao.com/v2/user/me", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer ".concat(access_token)
            }
          });
        case 15:
          userRequest = _context.sent;
          _context.next = 18;
          return userRequest.json();
        case 18:
          userData = _context.sent;
          _userData$kakao_accou = userData.kakao_account, _userData$kakao_accou2 = _userData$kakao_accou.profile, nickname = _userData$kakao_accou2.nickname, thumbnail_image_url = _userData$kakao_accou2.thumbnail_image_url, email = _userData$kakao_accou.email;
          console.log(nickname, thumbnail_image_url, email);
          _context.next = 23;
          return _user["default"].findOne({
            email: email
          });
        case 23:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 32;
            break;
          }
          accessToken = _jsonwebtoken["default"].sign({
            id: existingUser._id
          }, process.env.ACCESS_SECRET, {
            expiresIn: "24h"
          });
          refreshToken = _jsonwebtoken["default"].sign({
            id: existingUser._id
          }, process.env.REFRESH_SECRET, {
            expiresIn: "30d"
          });
          res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: "None"
          });
          res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: false,
            sameSite: "None"
          });
          return _context.abrupt("return", res.status(200).json({
            ok: true
          }));
        case 32:
          _context.next = 34;
          return _user["default"].create({
            name: nickname,
            username: nickname,
            email: email,
            password: "",
            socialOnly: true,
            avatarUrl: thumbnail_image_url
          });
        case 34:
          user = _context.sent;
          _accessToken = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.ACCESS_SECRET, {
            expiresIn: "24h"
          });
          _refreshToken = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.REFRESH_SECRET, {
            expiresIn: "30d"
          });
          res.cookie("accessToken", _accessToken, {
            secure: true,
            httpOnly: false,
            sameSite: "None"
          });
          res.cookie("refreshToken", _refreshToken, {
            secure: true,
            httpOnly: false,
            sameSite: "None"
          });
          return _context.abrupt("return", res.status(200).json({
            ok: true
          }));
        case 40:
          _context.next = 45;
          break;
        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 42]]);
  }));
  return function kakaoLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.kakaoLogin = kakaoLogin;
var logout = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          try {
            res.cookie("accessToken", "", {
              secure: true,
              httpOnly: false,
              sameSite: "None"
            });
            res.cookie("refreshToken", "", {
              secure: true,
              httpOnly: false,
              sameSite: "None"
            });
            res.status(200).json({
              ok: true,
              message: "로그아웃 성공"
            });
          } catch (error) {
            res.status(500).json({
              ok: false,
              error: error
            });
          }
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function logout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.logout = logout;
var loginSuccess = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$cookies, token, data, userData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.accessToken;
          data = _jsonwebtoken["default"].verify(token, process.env.ACCESS_SECRET);
          _context3.next = 5;
          return _user["default"].findOne({
            _id: data.id
          });
        case 5:
          userData = _context3.sent;
          res.status(200).json({
            ok: true,
            email: userData.email,
            username: userData.username,
            avatarUrl: userData.avatarUrl
          });
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(200).json({
            ok: false,
            message: "로그인이 실패"
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function loginSuccess(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.loginSuccess = loginSuccess;
var postLogin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, username, password, user, ok, accessToken, refreshToken;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context4.next = 3;
          return _user["default"].findOne({
            username: username
          });
        case 3:
          user = _context4.sent;
          if (user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(401).json({
            ok: "false",
            message: "해당하는 유저가 없습니다."
          }));
        case 6:
          _context4.next = 8;
          return _bcrypt["default"].compare(password, user.password);
        case 8:
          ok = _context4.sent;
          if (ok) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(401).json({
            ok: "false",
            message: "이메일/패스워드가 다릅니다."
          }));
        case 11:
          try {
            accessToken = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.ACCESS_SECRET, {
              expiresIn: "24h"
            });
            refreshToken = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.REFRESH_SECRET, {
              expiresIn: "30d"
            });
            res.cookie("accessToken", accessToken, {
              secure: true,
              httpOnly: false,
              sameSite: "None"
            });
            res.cookie("refreshToken", refreshToken, {
              secure: true,
              httpOnly: false,
              sameSite: "None"
            });
            res.status(200).json({
              ok: "true"
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              ok: false
            });
          }
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postLogin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var postJoin = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, password, name, username, password2;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, password = _req$body2.password, name = _req$body2.name, username = _req$body2.username, password2 = _req$body2.password2;
          console.log(password, password2, name, username);
          if (password !== password2) {
            res.json({
              ok: "false",
              error: "입력하신 패스워드가 다릅니다."
            });
          }
          _context5.prev = 3;
          _context5.next = 6;
          return _user["default"].create({
            username: username,
            name: name,
            password: password,
            createdAt: Date.now()
          });
        case 6:
          res.json({
            ok: "true"
          });
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](3);
          res.status(500).json({
            ok: "false",
            error: "\uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD587\uC501\uB2C8\uB2E4."
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 9]]);
  }));
  return function postJoin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var confrimUsername = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var username, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          username = req.query.username;
          _context6.prev = 1;
          _context6.next = 4;
          return _user["default"].findOne({
            username: username
          });
        case 4:
          user = _context6.sent;
          if (!user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            ok: false,
            message: "압력하신 아이디는 이미 존재합니다."
          }));
        case 7:
          return _context6.abrupt("return", res.status(200).json({
            ok: true,
            message: "해당 아이디는 사용할 수 있습니다."
          }));
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            ok: "false",
            error: "\uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD587\uC501\uB2C8\uB2E4."
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 10]]);
  }));
  return function confrimUsername(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.confrimUsername = confrimUsername;