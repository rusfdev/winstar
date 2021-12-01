/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar breakpoints = {\n  sm: 576,\n  md: 768,\n  lg: 1024,\n  xl: 1280,\n  xxl: 1600\n};\nvar $wrapper = document.querySelector('.wrapper');\nvar $header = document.querySelector('.header');\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  CustomInteractionEvents.init();\n});\nvar CustomInteractionEvents = Object.create({\n  targets: {\n    value: 'a, button, [data-custom-interaction]'\n  },\n  touchEndDelay: {\n    value: 100\n  },\n  init: function init() {\n    var _this = this;\n\n    this.events = function (event) {\n      var $targets = [];\n      $targets[0] = event.target !== document ? event.target.closest(_this.targets.value) : null;\n      var $element = $targets[0],\n          i = 0;\n\n      while ($targets[0]) {\n        $element = $element.parentNode;\n\n        if ($element !== document) {\n          if ($element.matches(_this.targets.value)) {\n            i++;\n            $targets[i] = $element;\n          }\n        } else {\n          break;\n        }\n      } //touchstart\n\n\n      if (event.type == 'touchstart') {\n        _this.touched = true;\n        if (_this.timeout) clearTimeout(_this.timeout);\n\n        if ($targets[0]) {\n          var _iterator = _createForOfIteratorHelper($targets),\n              _step;\n\n          try {\n            for (_iterator.s(); !(_step = _iterator.n()).done;) {\n              var $target = _step.value;\n              $target.setAttribute('data-touch', '');\n            }\n          } catch (err) {\n            _iterator.e(err);\n          } finally {\n            _iterator.f();\n          }\n        }\n      } //touchend\n      else if (event.type == 'touchend' || event.type == 'contextmenu' && _this.touched) {\n        _this.timeout = setTimeout(function () {\n          _this.touched = false;\n        }, 500);\n\n        if ($targets[0]) {\n          setTimeout(function () {\n            var _iterator2 = _createForOfIteratorHelper($targets),\n                _step2;\n\n            try {\n              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                var _$target = _step2.value;\n\n                _$target.removeAttribute('data-touch');\n              }\n            } catch (err) {\n              _iterator2.e(err);\n            } finally {\n              _iterator2.f();\n            }\n          }, _this.touchEndDelay.value);\n        }\n      } //mouseenter\n\n\n      if (event.type == 'mouseenter' && !_this.touched && $targets[0] && $targets[0] == event.target) {\n        $targets[0].setAttribute('data-hover', '');\n      } //mouseleave\n      else if (event.type == 'mouseleave' && !_this.touched && $targets[0] && $targets[0] == event.target) {\n        $targets[0].removeAttribute('data-click');\n        $targets[0].removeAttribute('data-hover');\n      } //mousedown\n\n\n      if (event.type == 'mousedown' && !_this.touched && $targets[0]) {\n        $targets[0].setAttribute('data-click', '');\n      } //mouseup\n      else if (event.type == 'mouseup' && !_this.touched && $targets[0]) {\n        $targets[0].removeAttribute('data-click');\n      }\n    };\n\n    document.addEventListener('touchstart', this.events);\n    document.addEventListener('touchend', this.events);\n    document.addEventListener('mouseenter', this.events, true);\n    document.addEventListener('mouseleave', this.events, true);\n    document.addEventListener('mousedown', this.events);\n    document.addEventListener('mouseup', this.events);\n    document.addEventListener('contextmenu', this.events);\n  }\n});\n\n//# sourceURL=webpack:///./src/scripts/main.js?");

/***/ })

/******/ });