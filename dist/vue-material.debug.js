(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory(require("vue"));
	else
		root["VueMaterial"] = factory(root["Vue"]);
})(this, (function(__WEBPACK_EXTERNAL_MODULE_282__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 306);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ ((function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ })),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Theme mixin

// Grab the closest ancestor component's `md-theme` attribute OR grab the
// `md-name` attribute from an `<md-theme>` component.
function getAncestorThemeName(component) {
  if (!component) {
    return null;
  }

  var name = component.mdTheme;

  if (!name && component.$options._componentTag === 'md-theme') {
    name = component.mdName;
  }

  return name || getAncestorThemeName(component.$parent);
}

exports.default = {
  props: {
    mdTheme: String
  },
  computed: {
    mdEffectiveTheme: function mdEffectiveTheme() {
      return getAncestorThemeName(this) || this.$material.currentTheme;
    },
    themeClass: function themeClass() {
      return this.$material.prefix + this.mdEffectiveTheme;
    }
  },
  watch: {
    mdTheme: function mdTheme(value) {
      this.$material.useTheme(value);
    }
  },
  beforeMount: function beforeMount() {
    var localTheme = this.mdTheme;

    this.$material.useTheme(localTheme ? localTheme : 'default');
  }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)((function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
}));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(31);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(25);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(22)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(4);
var ctx = __webpack_require__(29);
var hide = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
  if (!$parent || !$parent.$el) {
    return false;
  }

  if ($parent._uid === 0) {
    return false;
  }

  if ($parent.$el.classList.contains(cssClass)) {
    return $parent;
  }

  return getClosestVueParent($parent.$parent, cssClass);
};

exports.default = getClosestVueParent;
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(22)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(30);
var enumBugKeys = __webpack_require__(23);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(35);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(9);
var arrayIndexOf = __webpack_require__(33)(false);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(5)((function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
}));


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9);
var toLength = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(34);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(11)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniqueId = function uniqueId() {
  return Math.random().toString(36).slice(4);
};

exports.default = uniqueId;
module.exports = exports["default"];

/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function transitionEndEventName() {
  var el = document.createElement('span');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (var transition in transitions) {
    if (el.style[transition] !== undefined) {
      return transitions[transition];
    }
  }
}

exports.default = transitionEndEventName();
module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(40);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(10);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(55);
var setToStringTag = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(58);
var ITERATOR = __webpack_require__(11)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
module.exports = __webpack_require__(4).Object.keys;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21);
var $keys = __webpack_require__(19);

__webpack_require__(46)('keys', (function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
}));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(15);
var core = __webpack_require__(4);
var fails = __webpack_require__(5);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails((function () { fn(1); })), 'Object', exp);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(14);
var dPs = __webpack_require__(56);
var enumBugKeys = __webpack_require__(23);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(57).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(54)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(43)(String, 'String', (function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}), (function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
}));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(15);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(53) });


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(37);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(25);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(5)((function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach((function (k) { B[k] = k; }));
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
})) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var defined = __webpack_require__(12);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(49);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(36);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(11)('iterator'), (function () { return this; }));

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(14);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    value: [String, Number],
    debounce: {
      type: Number,
      default: 1E2
    },
    disabled: Boolean,
    required: Boolean,
    maxlength: [Number, String],
    name: String,
    placeholder: String,
    readonly: Boolean
  },
  data: function data() {
    return {
      timeout: 0
    };
  },

  watch: {
    value: function value() {
      this.updateValues();
    },
    disabled: function disabled() {
      this.setParentDisabled();
    },
    required: function required() {
      this.setParentRequired();
    },
    placeholder: function placeholder() {
      this.setParentPlaceholder();
    },
    maxlength: function maxlength() {
      this.handleMaxLength();
    }
  },
  methods: {
    handleMaxLength: function handleMaxLength() {
      this.parentContainer.enableCounter = this.maxlength > 0;
      this.parentContainer.counterLength = this.maxlength;
    },
    lazyEventEmitter: function lazyEventEmitter() {
      var _this = this;

      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout((function () {
        _this.$emit('change', _this.$el.value);
        _this.$emit('input', _this.$el.value);
      }), this.debounce);
    },
    setParentValue: function setParentValue(value) {
      this.parentContainer.setValue(value || this.$el.value);
    },
    setParentDisabled: function setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled;
    },
    setParentRequired: function setParentRequired() {
      this.parentContainer.isRequired = this.required;
    },
    setParentPlaceholder: function setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder;
    },
    updateValues: function updateValues() {
      var _this2 = this;

      this.$nextTick((function () {
        var newValue = _this2.$el.value || _this2.value;

        _this2.setParentValue(newValue);
        _this2.parentContainer.inputLength = newValue ? newValue.length : 0;
      }));
    },
    onFocus: function onFocus(event) {
      if (this.parentContainer) {
        this.parentContainer.isFocused = true;
      }

      this.$emit('focus', this.$el.value, event);
    },
    onBlur: function onBlur(event) {
      this.parentContainer.isFocused = false;
      this.setParentValue();

      this.$emit('blur', this.$el.value, event);
    },
    onInput: function onInput() {
      this.updateValues();
      this.lazyEventEmitter();
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(40);
var wksExt = __webpack_require__(60);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(63);
var ITERATOR = __webpack_require__(11)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(11)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = function isArray(value) {
  return value && value.constructor === Array;
};

exports.default = isArray;
module.exports = exports["default"];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getImageLightness = function getImageLightness(image, onLoad, onError) {
  var canvas = document.createElement('canvas');

  image.crossOrigin = 'Anonymous';

  image.onload = function () {
    var colorSum = 0;
    var ctx = void 0;
    var imageData = void 0;
    var imageMetadata = void 0;
    var r = void 0;
    var g = void 0;
    var b = void 0;
    var average = void 0;

    canvas.width = this.width;
    canvas.height = this.height;
    ctx = canvas.getContext('2d');

    ctx.drawImage(this, 0, 0);

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageMetadata = imageData.data;

    for (var x = 0, len = imageMetadata.length; x < len; x += 4) {
      r = imageMetadata[x];
      g = imageMetadata[x + 1];
      b = imageMetadata[x + 2];

      average = Math.floor((r + g + b) / 3);
      colorSum += average;
    }

    onLoad(Math.floor(colorSum / (this.width * this.height)));
  };

  image.onerror = onError;
};

exports.default = getImageLightness;
module.exports = exports['default'];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
var global = __webpack_require__(2);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(32);
var TO_STRING_TAG = __webpack_require__(11)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(68);
var step = __webpack_require__(69);
var Iterators = __webpack_require__(32);
var toIObject = __webpack_require__(9);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(43)(Array, 'Array', (function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}), (function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}), 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(30);
var hiddenKeys = __webpack_require__(23).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(72);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(74);
module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(29);
var $export = __webpack_require__(15);
var toObject = __webpack_require__(21);
var call = __webpack_require__(75);
var isArrayIter = __webpack_require__(76);
var toLength = __webpack_require__(28);
var createProperty = __webpack_require__(77);
var getIterFn = __webpack_require__(62);

$export($export.S + $export.F * !__webpack_require__(78)((function (iter) { Array.from(iter); })), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(14);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(11)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(16);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(11)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, (function () { throw 2; }));
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 79 */,
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdTheme = __webpack_require__(81);

var _mdTheme2 = _interopRequireDefault(_mdTheme);

var _mdInkRipple = __webpack_require__(88);

var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);

var _core = __webpack_require__(93);

var _core2 = _interopRequireDefault(_core);

__webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Code Components */
function install(Vue) {
  if (install.installed) {
    console.warn('Vue Material is already installed.');

    return;
  }

  install.installed = true;

  Vue.use(_mdTheme2.default);
  Vue.use(_mdInkRipple2.default);
  Vue.material.styles.push(_core2.default);
}

/* Core Stylesheets */
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(41);

var _keys2 = _interopRequireDefault(_keys);

exports.default = install;

var _palette = __webpack_require__(82);

var _palette2 = _interopRequireDefault(_palette);

var _rgba = __webpack_require__(83);

var _rgba2 = _interopRequireDefault(_rgba);

var _mdTheme = __webpack_require__(84);

var _mdTheme2 = _interopRequireDefault(_mdTheme);

var _dom = __webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_THEME_TYPE = ['primary', 'accent', 'background', 'warn', 'hue-1', 'hue-2', 'hue-3'];
var TYPE_REGEX = new RegExp('(' + VALID_THEME_TYPE.join('|').toUpperCase() + ')-(COLOR|CONTRAST)-?(A?\\d*)-?(\\d*\\.?\\d+)?', 'g');
var DEFAULT_THEME_COLORS = {
  primary: 'indigo',
  accent: 'pink',
  background: 'white',
  warn: 'deep-orange'
};
/*const DEFAULT_HUES = {
  accent: {
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  },
  background: {
    'hue-1': 'A100',
    'hue-2': '100',
    'hue-3': '300'
  }
};*/

var registeredPrimaryColor = {};
var injectedStyles = {};

var parseStyle = function parseStyle(style, theme, name) {
  return style.replace(TYPE_REGEX, (function (match, type, colorType, hue, opacity) {
    var color = void 0;
    var colorVariant = +hue === 0 ? 500 : hue;

    type = type.toLowerCase();

    if (theme[type]) {
      if (typeof theme[type] === 'string') {
        color = _palette2.default[theme[type]];
      } else {
        color = _palette2.default[theme[type].color] || _palette2.default[DEFAULT_THEME_COLORS[type]];
        colorVariant = +hue === 0 ? theme[type].hue : hue;
      }
    } else {
      color = _palette2.default[DEFAULT_THEME_COLORS[type]];
    }

    if (colorType === 'COLOR') {
      var isDefault = _palette2.default[theme[type]];

      if (!colorVariant && !isDefault) {
        if (type === 'accent') {
          colorVariant = 'A200';
        } else if (type === 'background') {
          colorVariant = 50;
        }
      }

      if (type === 'primary') {
        registeredPrimaryColor[name] = color[colorVariant];
      }

      if (opacity) {
        return (0, _rgba2.default)(color[colorVariant], opacity);
      }

      return color[colorVariant];
    }

    var isDarkText = color.darkText.indexOf(colorVariant) >= 0;

    if (theme[type] && typeof theme[type] !== 'string' && theme[type].textColor) {
      if (theme[type].textColor === 'black') {
        isDarkText = true;
      } else if (theme[type].textColor === 'white') {
        isDarkText = false;
      }
    }

    if (isDarkText) {
      if (opacity) {
        return (0, _rgba2.default)('#000', opacity);
      }

      return 'rgba(0, 0, 0, .87)';
    }

    if (opacity) {
      return (0, _rgba2.default)('#fff', opacity);
    }

    return 'rgba(255, 255, 255, .87)';
  }));
};

function warnNotFound(themeName) {
  console.warn('The theme \'' + themeName + '\' doesn\'t exists. You need to register' + ' it first in order to use.');
}

function injectStyle(style, spec, name, styleId) {
  if (_dom.createNewStyleElement) {
    style = parseStyle(style, spec, name);
    style = style.replace(/THEME_NAME/g, styleId);

    (0, _dom.createNewStyleElement)(style, styleId);
  }
}

function install(Vue) {
  Vue.material = new Vue({
    data: {
      currentTheme: null,
      inkRipple: true,
      prefix: 'md-theme-',
      styles: [],
      themes: {
        default: DEFAULT_THEME_COLORS
      }
    },
    watch: {
      styles: function styles() {
        this.refreshInjectedStyles();
      }
    },
    methods: {
      registerPalette: function registerPalette(name, spec) {
        _palette2.default[name] = spec;
      },
      useTheme: function useTheme(name) {
        if (name in injectedStyles) {
          return;
        }
        var spec = this.themes[name];

        if (!spec) {
          return warnNotFound(name);
        }

        injectStyle(this.styles.join('\n'), spec, name, this.prefix + name);

        return injectedStyles[name] = true;
      },
      refreshInjectedStyles: function refreshInjectedStyles() {
        var _this = this;

        var styles = this.styles.join('\n');
        var prefix = this.prefix;

        (0, _keys2.default)(injectedStyles).forEach((function (name) {
          var spec = _this.themes[name];

          injectStyle(styles, spec, name, prefix + name);
        }));
      },
      registerTheme: function registerTheme(name, spec) {
        var _this2 = this;

        if (typeof name === 'string') {
          this.themes[name] = spec;
        } else {
          (0, _keys2.default)(name).forEach((function (k) {
            return _this2.themes[k] = name[k];
          }));
        }
      },
      setCurrentTheme: function setCurrentTheme(name) {
        if (name === this.currentTheme) {
          return;
        }

        var prefix = this.prefix;

        this.useTheme(name);

        if (_dom.changeHtmlMetaColor) {
          (0, _dom.changeHtmlMetaColor)(registeredPrimaryColor[name], prefix + name, prefix + this.currentTheme);
        }

        this.currentTheme = name;
      }
    },
    created: function created() {
      // set the default theme by default
      this.setCurrentTheme('default');
    }
  });

  Vue.component('md-theme', _mdTheme2.default);

  Vue.prototype.$material = Vue.material;
}
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  red: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    A100: '#ff8a80',
    A200: '#ff5252',
    A400: '#ff1744',
    A700: '#d50000',
    darkText: [50, 100, 200, 300, 'A100']
  },
  pink: {
    50: '#fce4ec',
    100: '#f8bbd0',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
    A100: '#ff80ab',
    A200: '#ff4081',
    A400: '#f50057',
    A700: '#c51162',
    darkText: [50, 100, 200, 'A100']
  },
  purple: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    A100: '#ea80fc',
    A200: '#e040fb',
    A400: '#d500f9',
    A700: '#aa00ff',
    darkText: [50, 100, 200, 'A100']
  },
  'deep-purple': {
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#673ab7',
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
    A100: '#b388ff',
    A200: '#7c4dff',
    A400: '#651fff',
    A700: '#6200ea',
    darkText: [50, 100, 200, 'A100']
  },
  indigo: {
    50: '#e8eaf6',
    100: '#c5cae9',
    200: '#9fa8da',
    300: '#7986cb',
    400: '#5c6bc0',
    500: '#3f51b5',
    600: '#3949ab',
    700: '#303f9f',
    800: '#283593',
    900: '#1a237e',
    A100: '#8c9eff',
    A200: '#536dfe',
    A400: '#3d5afe',
    A700: '#304ffe',
    darkText: [50, 100, 200, 'A100']
  },
  blue: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff',
    darkText: [50, 100, 200, 300, 400, 'A100']
  },
  'light-blue': {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4',
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
    A100: '#80d8ff',
    A200: '#40c4ff',
    A400: '#00b0ff',
    A700: '#0091ea',
    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300']
  },
  cyan: {
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
    A100: '#84ffff',
    A200: '#18ffff',
    A400: '#00e5ff',
    A700: '#00b8d4',
    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
  },
  teal: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#009688',
    600: '#00897b',
    700: '#00796b',
    800: '#00695c',
    900: '#004d40',
    A100: '#a7ffeb',
    A200: '#64ffda',
    A400: '#1de9b6',
    A700: '#00bfa5',
    darkText: [50, 100, 200, 300, 400, 'A100', 'A200', 'A300', 'A400']
  },
  green: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    A100: '#b9f6ca',
    A200: '#69f0ae',
    A400: '#00e676',
    A700: '#00c853',
    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300', 'A400']
  },
  'light-green': {
    50: '#f1f8e9',
    100: '#dcedc8',
    200: '#c5e1a5',
    300: '#aed581',
    400: '#9ccc65',
    500: '#8bc34a',
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
    A100: '#ccff90',
    A200: '#b2ff59',
    A400: '#76ff03',
    A700: '#64dd17',
    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
  },
  lime: {
    50: '#f9fbe7',
    100: '#f0f4c3',
    200: '#e6ee9c',
    300: '#dce775',
    400: '#d4e157',
    500: '#cddc39',
    600: '#c0ca33',
    700: '#afb42b',
    800: '#9e9d24',
    900: '#827717',
    A100: '#f4ff81',
    A200: '#eeff41',
    A400: '#c6ff00',
    A700: '#aeea00',
    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 'A100', 'A200', 'A300', 'A400']
  },
  yellow: {
    50: '#fffde7',
    100: '#fff9c4',
    200: '#fff59d',
    300: '#fff176',
    400: '#ffee58',
    500: '#ffeb3b',
    600: '#fdd835',
    700: '#fbc02d',
    800: '#f9a825',
    900: '#f57f17',
    A100: '#ffff8d',
    A200: '#ffff00',
    A400: '#ffea00',
    A700: '#ffd600',
    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
  },
  amber: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
    A100: '#ffe57f',
    A200: '#ffd740',
    A400: '#ffc400',
    A700: '#ffab00',
    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
  },
  orange: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    A100: '#ffd180',
    A200: '#ffab40',
    A400: '#ff9100',
    A700: '#ff6d00',
    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 'A100', 'A200', 'A300', 'A400']
  },
  'deep-orange': {
    50: '#fbe9e7',
    100: '#ffccbc',
    200: '#ffab91',
    300: '#ff8a65',
    400: '#ff7043',
    500: '#ff5722',
    600: '#f4511e',
    700: '#e64a19',
    800: '#d84315',
    900: '#bf360c',
    A100: '#ff9e80',
    A200: '#ff6e40',
    A400: '#ff3d00',
    A700: '#dd2c00',
    darkText: [50, 100, 200, 300, 400, 'A100', 'A200']
  },
  brown: {
    50: '#efebe9',
    100: '#d7ccc8',
    200: '#bcaaa4',
    300: '#a1887f',
    400: '#8d6e63',
    500: '#795548',
    600: '#6d4c41',
    700: '#5d4037',
    800: '#4e342e',
    900: '#3e2723',
    A100: '#d7ccc8',
    A200: '#bcaaa4',
    A400: '#8d6e63',
    A700: '#5d4037',
    darkText: [50, 100, 200, 'A100', 'A200', 'A300', 'A400']
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#fff',
    A200: '#000000',
    A400: '#303030',
    A700: '#616161',
    darkText: [50, 100, 200, 300, 400, 500, 'A100']
  },
  'blue-grey': {
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#607d8b',
    600: '#546e7a',
    700: '#455a64',
    800: '#37474f',
    900: '#263238',
    A100: '#cfd8dc',
    A200: '#b0bec5',
    A400: '#78909c',
    A700: '#455a64',
    darkText: [50, 100, 200, 300, 'A100', 'A200', 'A300', 'A400']
  },
  white: {
    50: '#fff',
    100: '#fff',
    200: '#fff',
    300: '#fff',
    400: '#fff',
    500: '#fff',
    600: '#fff',
    700: '#fff',
    800: '#fff',
    900: '#fff',
    A100: '#fff',
    A200: '#fff',
    A400: '#fff',
    A700: '#fff',
    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
  },
  black: {
    50: '#000',
    100: '#000',
    200: '#000',
    300: '#000',
    400: '#000',
    500: '#000',
    600: '#000',
    700: '#000',
    800: '#000',
    900: '#000',
    A100: '#000',
    A200: '#000',
    A400: '#000',
    A700: '#000',
    darkText: []
  }
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (hex, opacity) {
  var r = '';
  var g = '';
  var b = '';
  var match = hex.toString().match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);

  if (!match) {
    throw new Error('Invalid color' + hex);
  }

  hex = match[1];

  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 3) {
    var rSubstring = hex.substring(0, 1);
    var gSubstring = hex.substring(1, 2);
    var bSubstring = hex.substring(2, 3);

    r = parseInt(rSubstring + rSubstring, 16);
    g = parseInt(gSubstring + gSubstring, 16);
    b = parseInt(bSubstring + bSubstring, 16);
  }

  if (opacity) {
    if (opacity > 1) {
      opacity = opacity / 100;
    }

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
  }

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(85),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/core/components/mdTheme/mdTheme.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78f39aae", Component.options)
  } else {
    hotAPI.reload("data-v-78f39aae", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'md-theme',
  props: {
    mdTag: String,
    mdName: {
      type: String,
      default: 'default'
    }
  },
  render: function render(createElement) {
    if (this.mdTag || this.$slots.default.length > 1) {
      return createElement(this.mdTag || 'div', {
        staticClass: this.$material.prefix + this.mdName
      }, this.$slots.default);
    }

    return this.$slots.default[0];
  },

  watch: {
    mdName: function mdName(value) {
      this.$material.useTheme(value);
    }
  },
  beforeMount: function beforeMount() {
    var localTheme = this.mdName;

    if (localTheme) {
      this.$material.useTheme(localTheme);
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var changeHtmlMetaColor = exports.changeHtmlMetaColor = undefined;
var createNewStyleElement = exports.createNewStyleElement = undefined;

if (process.env.VUE_ENV !== 'server') {
  exports.changeHtmlMetaColor = changeHtmlMetaColor = function changeHtmlMetaColor(color, themeClass, previousClass) {
    var elem = document.querySelector('meta[name="theme-color"]');

    if (elem) {
      elem.setAttribute('content', color);
    } else {
      elem = document.createElement('meta');
      elem.setAttribute('name', 'theme-color');
      elem.setAttribute('content', color);

      document.head.appendChild(elem);
    }

    document.body.classList.remove(previousClass);
    document.body.classList.add(themeClass);
  };

  exports.createNewStyleElement = createNewStyleElement = function createNewStyleElement(style, styleId) {
    var head = document.head;
    var styleElement = head.querySelector('#' + styleId);

    if (!styleElement) {
      var newTag = document.createElement('style');

      newTag.type = 'text/css';
      newTag.id = styleId;
      newTag.textContent = style;

      head.appendChild(newTag);
    } else {
      styleElement.textContent = style;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(87)))

/***/ }),
/* 87 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdInkRipple = __webpack_require__(89);

var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-ink-ripple', _mdInkRipple2.default);
}
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(90)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(92),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/core/components/mdInkRipple/mdInkRipple.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdInkRipple.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62c1a2f0", Component.options)
  } else {
    hotAPI.reload("data-v-62c1a2f0", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 90 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

var addEvent = function addEvent(target, type, handler) {
  if (type === 'start') {
    target.addEventListener('mousedown', handler);
    target.addEventListener('touchstart', handler);
  } else {
    target.addEventListener('mouseup', handler);
    target.addEventListener('touchend', handler);
  }
};
var removeEvent = function removeEvent(target, type, handler) {
  if (type === 'start') {
    target.removeEventListener('mousedown', handler);
    target.removeEventListener('touchstart', handler);
  } else {
    target.removeEventListener('mouseup', handler);
    target.removeEventListener('touchend', handler);
  }
};

exports.default = {
  name: 'md-ink-ripple',
  props: {
    mdDisabled: Boolean
  },
  data: function data() {
    return {
      mounted: false,
      rippleElement: null,
      parentElement: null,
      parentDimensions: {
        width: null,
        height: null,
        top: null,
        left: null
      },
      awaitingComplete: false,
      hasCompleted: false,
      fadeOut: false,
      active: false
    };
  },
  computed: {
    classes: function classes() {
      return {
        'md-fadeout': this.fadeOut,
        'md-active': this.active
      };
    },
    styles: function styles() {
      return {
        width: this.parentDimensions.width,
        height: this.parentDimensions.height,
        top: this.parentDimensions.top,
        left: this.parentDimensions.left
      };
    },
    disabled: function disabled() {
      return this.mdDisabled || !this.$material.inkRipple;
    }
  },
  watch: {
    disabled: function disabled(_disabled) {
      if (!_disabled) {
        this.init();
      } else {
        this.destroy();
      }
    }
  },
  methods: {
    checkAvailablePositions: function checkAvailablePositions(element) {
      var availablePositions = ['relative', 'absolute', 'fixed'];

      return availablePositions.indexOf(getComputedStyle(element).position) > -1;
    },
    getClosestPositionedParent: function getClosestPositionedParent(element) {
      var parent = element && element.parentNode;

      if (!parent || parent.tagName.toLowerCase() === 'body') {
        return false;
      }

      if (this.checkAvailablePositions(element)) {
        return element;
      }

      return this.getClosestPositionedParent(parent);
    },
    getParentSize: function getParentSize() {
      var parent = this.parentElement;

      return Math.round(Math.max(parent.offsetWidth, parent.offsetHeight)) + 'px';
    },
    getClickPosition: function getClickPosition(event) {
      if (this.$refs.ripple) {
        var rect = this.parentElement.getBoundingClientRect();
        var top = event.pageY;
        var left = event.pageX;

        if (event.type === 'touchstart') {
          top = event.changedTouches[0].pageY;
          left = event.changedTouches[0].pageX;
        }

        return {
          top: top - rect.top - this.$refs.ripple.offsetHeight / 2 - document.body.scrollTop + 'px',
          left: left - rect.left - this.$refs.ripple.offsetWidth / 2 - document.body.scrollLeft + 'px'
        };
      }

      return false;
    },
    setDimensions: function setDimensions() {
      var size = this.getParentSize();

      this.parentDimensions.width = size;
      this.parentDimensions.height = size;
    },
    setPositions: function setPositions(event) {
      var positions = this.getClickPosition(event);

      if (positions) {
        this.parentDimensions.top = positions.top;
        this.parentDimensions.left = positions.left;
      }
    },
    clearState: function clearState() {
      this.active = false;
      this.fadeOut = false;
      this.hasCompleted = false;
      this.setDimensions();
      window.clearTimeout(this.awaitingComplete);
      removeEvent(document.body, 'end', this.endRipple);
    },
    startRipple: function startRipple(event) {
      var _this = this;

      if (event.type === 'touchstart') {
        this.previous.push('touch');
      } else {
        this.previous.push('mouse');
      }

      this.previous = this.previous.splice(this.previous.length - 2, this.previous.length);

      if (this.previous.length >= 2 && this.previous[1] === 'touch' && this.previous[0] === 'mouse') {
        return;
      }

      this.clearState();
      this.awaitingComplete = window.setTimeout((function () {
        _this.hasCompleted = true;
      }), 400);

      addEvent(document.body, 'end', this.endRipple);

      this.$nextTick((function () {
        _this.setPositions(event);
        _this.active = true;
      }));
    },
    endRipple: function endRipple() {
      var _this2 = this;

      if (this.hasCompleted) {
        this.fadeOut = true;
      } else {
        this.awaitingComplete = window.setTimeout((function () {
          _this2.fadeOut = true;
        }), 200);
      }

      removeEvent(document.body, 'end', this.endRipple);
    },
    registerTriggerEvent: function registerTriggerEvent() {
      addEvent(this.parentElement, 'start', this.startRipple);
    },
    unregisterTriggerEvent: function unregisterTriggerEvent() {
      if (this.parentElement) {
        removeEvent(this.parentElement, 'start', this.startRipple);
      }
    },
    init: function init() {
      this.rippleElement = this.$el;
      this.parentElement = this.getClosestPositionedParent(this.$el.parentNode);
      this.previous = ['mouse'];

      if (this.parentElement) {
        this.rippleElement.parentNode.removeChild(this.rippleElement);

        if (this.parentElement.querySelectorAll('.md-ink-ripple').length > 0) {
          this.$destroy();
        } else {
          this.parentElement.appendChild(this.rippleElement);
          this.registerTriggerEvent();
          this.setDimensions();
        }
      } else {
        this.$destroy();
      }
    },
    destroy: function destroy() {
      if (this.rippleElement && this.rippleElement.parentNode) {
        this.unregisterTriggerEvent();
        this.rippleElement.parentNode.removeChild(this.rippleElement);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    window.setTimeout((function () {
      if (!_this3.disabled) {
        _this3.init();
      } else {
        _this3.destroy();
      }

      _this3.$nextTick((function () {
        _this3.mounted = true;
      }));
    }), 100);
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  }
};
module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.mounted || !_vm.disabled) ? _c('div', {
    staticClass: "md-ink-ripple"
  }, [_c('div', {
    ref: "ripple",
    staticClass: "md-ripple",
    class: _vm.classes,
    style: (_vm.styles)
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62c1a2f0", module.exports)
  }
}

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME :not(input):not(textarea)::selection {\n  background: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n\n.THEME_NAME a:not(.md-button) {\n  color: ACCENT-COLOR; }\n  .THEME_NAME a:not(.md-button):hover {\n    color: ACCENT-COLOR-800; }\n\nbody.THEME_NAME {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST-0.87; }\n\n/* Typography */\n.THEME_NAME .md-caption,\n.THEME_NAME .md-display-1,\n.THEME_NAME .md-display-2,\n.THEME_NAME .md-display-3,\n.THEME_NAME .md-display-4 {\n  color: BACKGROUND-CONTRAST-0.57; }\n\n.THEME_NAME code:not(.hljs) {\n  background-color: ACCENT-COLOR-A100-0.2;\n  color: ACCENT-COLOR-800; }\n"

/***/ }),
/* 94 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdAvatar = __webpack_require__(96);

var _mdAvatar2 = _interopRequireDefault(_mdAvatar);

var _mdAvatar3 = __webpack_require__(100);

var _mdAvatar4 = _interopRequireDefault(_mdAvatar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-avatar', _mdAvatar2.default);

  Vue.material.styles.push(_mdAvatar4.default);
}
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(97)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(99),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdAvatar/mdAvatar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdAvatar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb5ecf8", Component.options)
  } else {
    hotAPI.reload("data-v-4fb5ecf8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-avatar',
  mixins: [_mixin2.default]
}; //
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-avatar",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4fb5ecf8", module.exports)
  }
}

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-avatar.md-primary.md-avatar-icon {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-avatar.md-primary.md-avatar-icon .md-icon {\n    color: PRIMARY-CONTRAST-0.99999; }\n\n.THEME_NAME.md-avatar.md-accent.md-avatar-icon {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-avatar.md-accent.md-avatar-icon .md-icon {\n    color: ACCENT-CONTRAST-0.99999; }\n\n.THEME_NAME.md-avatar.md-warn.md-avatar-icon {\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-avatar.md-warn.md-avatar-icon .md-icon {\n    color: WARN-CONTRAST-0.99999; }\n"

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdBackdrop = __webpack_require__(102);

var _mdBackdrop2 = _interopRequireDefault(_mdBackdrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-backdrop', _mdBackdrop2.default);
}
module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(104),
  /* template */
  __webpack_require__(105),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdBackdrop/mdBackdrop.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdBackdrop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e09d01b8", Component.options)
  } else {
    hotAPI.reload("data-v-e09d01b8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-backdrop',
  methods: {
    close: function close() {
      this.$emit('close');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-backdrop",
    on: {
      "click": _vm.close,
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.close($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e09d01b8", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdButton = __webpack_require__(107);

var _mdButton2 = _interopRequireDefault(_mdButton);

var _mdButton3 = __webpack_require__(111);

var _mdButton4 = _interopRequireDefault(_mdButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-button', _mdButton2.default);

  Vue.material.styles.push(_mdButton4.default);
}
module.exports = exports['default'];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(108)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(110),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdButton/mdButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6dc87da4", Component.options)
  } else {
    hotAPI.reload("data-v-6dc87da4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-button',
  props: {
    href: String,
    target: String,
    rel: String,
    type: {
      type: String,
      default: 'button'
    },
    disabled: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    newRel: function newRel() {
      if (this.target === '_blank') {
        return this.rel || 'noopener';
      }

      return this.rel;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.href) ? _c('a', {
    staticClass: "md-button",
    class: [_vm.themeClass],
    attrs: {
      "href": _vm.href,
      "disabled": _vm.disabled,
      "target": _vm.target,
      "rel": _vm.newRel
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', $event)
      }
    }
  }, [_c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _vm._t("default")], 2) : _c('button', {
    staticClass: "md-button",
    class: [_vm.themeClass],
    attrs: {
      "type": _vm.type,
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', $event)
      }
    }
  }, [_c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6dc87da4", module.exports)
  }
}

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button) {\n  color: BACKGROUND-CONTRAST;\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button):hover {\n    background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised) {\n  color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-button:not([disabled]).md-fab {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button:not([disabled]).md-fab:hover {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME.md-button:not([disabled]).md-fab.md-clean {\n    color: BACKGROUND-CONTRAST;\n    background-color: BACKGROUND-COLOR; }\n    .THEME_NAME.md-button:not([disabled]).md-fab.md-clean:hover {\n      background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary:not(.md-icon-button) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-raised, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab:hover {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent:not(.md-icon-button) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-raised {\n  background-color: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-accent.md-raised:hover {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn:not(.md-icon-button) {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-raised, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab {\n  background-color: WARN-COLOR;\n  color: WARN-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab:hover {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised) {\n  color: WARN-COLOR; }\n"

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdCard = __webpack_require__(113);

var _mdCard2 = _interopRequireDefault(_mdCard);

var _mdCardMedia = __webpack_require__(117);

var _mdCardMedia2 = _interopRequireDefault(_mdCardMedia);

var _mdCardMediaCover = __webpack_require__(120);

var _mdCardMediaCover2 = _interopRequireDefault(_mdCardMediaCover);

var _mdCardMediaActions = __webpack_require__(123);

var _mdCardMediaActions2 = _interopRequireDefault(_mdCardMediaActions);

var _mdCardHeader = __webpack_require__(126);

var _mdCardHeader2 = _interopRequireDefault(_mdCardHeader);

var _mdCardHeaderText = __webpack_require__(129);

var _mdCardHeaderText2 = _interopRequireDefault(_mdCardHeaderText);

var _mdCardContent = __webpack_require__(132);

var _mdCardContent2 = _interopRequireDefault(_mdCardContent);

var _mdCardActions = __webpack_require__(135);

var _mdCardActions2 = _interopRequireDefault(_mdCardActions);

var _mdCardArea = __webpack_require__(138);

var _mdCardArea2 = _interopRequireDefault(_mdCardArea);

var _mdCardExpand = __webpack_require__(141);

var _mdCardExpand2 = _interopRequireDefault(_mdCardExpand);

var _mdCard3 = __webpack_require__(144);

var _mdCard4 = _interopRequireDefault(_mdCard3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-card', _mdCard2.default);
  Vue.component('md-card-media', _mdCardMedia2.default);
  Vue.component('md-card-media-cover', _mdCardMediaCover2.default);
  Vue.component('md-card-media-actions', _mdCardMediaActions2.default);
  Vue.component('md-card-header', _mdCardHeader2.default);
  Vue.component('md-card-header-text', _mdCardHeaderText2.default);
  Vue.component('md-card-content', _mdCardContent2.default);
  Vue.component('md-card-actions', _mdCardActions2.default);
  Vue.component('md-card-area', _mdCardArea2.default);
  Vue.component('md-card-expand', _mdCardExpand2.default);

  Vue.material.styles.push(_mdCard4.default);
}
module.exports = exports['default'];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(114)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(116),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCard.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-214af038", Component.options)
  } else {
    hotAPI.reload("data-v-214af038", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-card',
  props: {
    mdWithHover: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return {
        'md-with-hover': this.mdWithHover
      };
    }
  }
}; //
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card",
    class: [_vm.themeClass, _vm.classes]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-214af038", module.exports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(118),
  /* template */
  __webpack_require__(119),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardMedia.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardMedia.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-137f4a90", Component.options)
  } else {
    hotAPI.reload("data-v-137f4a90", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-media',
  props: {
    mdRatio: String,
    mdMedium: Boolean,
    mdBig: Boolean
  },
  computed: {
    classes: function classes() {
      var classes = {};

      if (this.mdRatio) {
        var ratio = [];

        if (this.mdRatio.indexOf(':') !== -1) {
          ratio = this.mdRatio.split(':');
        } else if (this.mdRatio.indexOf('/') !== -1) {
          ratio = this.mdRatio.split('/');
        }

        if (ratio.length === 2) {
          classes['md-' + ratio[0] + '-' + ratio[1]] = true;
        }
      }

      if (this.mdMedium || this.mdBig) {
        classes = {
          'md-medium': this.mdMedium,
          'md-big': this.mdBig
        };
      }

      return classes;
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-media",
    class: _vm.classes
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-137f4a90", module.exports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(122),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardMediaCover.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardMediaCover.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0df115b7", Component.options)
  } else {
    hotAPI.reload("data-v-0df115b7", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getImageLightness = __webpack_require__(65);

var _getImageLightness2 = _interopRequireDefault(_getImageLightness);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-card-media-cover',
  props: {
    mdTextScrim: Boolean,
    mdSolid: Boolean
  },
  data: function data() {
    return {
      backdropBg: {}
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-text-scrim': this.mdTextScrim,
        'md-solid': this.mdSolid
      };
    },
    styles: function styles() {
      return {
        background: this.backdropBg
      };
    }
  },
  methods: {
    applyScrimColor: function applyScrimColor(darkness) {
      if (this.$refs.backdrop) {
        this.backdropBg = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ' + darkness / 2 + ') 66%, rgba(0, 0, 0, ' + darkness + ') 100%)';
      }
    },
    applySolidColor: function applySolidColor(darkness) {
      var area = this.$el.querySelector('.md-card-area');

      if (area) {
        area.style.background = 'rgba(0, 0, 0, ' + darkness + ')';
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var applyBackground = function applyBackground() {
      var darkness = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.6;

      if (_this.mdTextScrim) {
        _this.applyScrimColor(darkness);
      } else if (_this.mdSolid) {
        _this.applySolidColor(darkness);
      }
    };
    var image = this.$el.querySelector('img');

    if (image && (this.mdTextScrim || this.mdSolid)) {
      (0, _getImageLightness2.default)(image, (function (lightness) {
        var limit = 256;
        var darkness = (Math.abs(limit - lightness) * 100 / limit + 15) / 100;

        if (darkness >= 0.7) {
          darkness = 0.7;
        }

        applyBackground(darkness);
      }), applyBackground);
    }
  }
}; //
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-media-cover",
    class: _vm.classes
  }, [_vm._t("default"), _vm._v(" "), (_vm.mdTextScrim) ? _c('div', {
    ref: "backdrop",
    staticClass: "md-card-backdrop",
    style: (_vm.styles)
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0df115b7", module.exports)
  }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(124),
  /* template */
  __webpack_require__(125),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardMediaActions.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardMediaActions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-04064406", Component.options)
  } else {
    hotAPI.reload("data-v-04064406", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-media-actions'
};
module.exports = exports['default'];

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-media-actions"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-04064406", module.exports)
  }
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(128),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61490f11", Component.options)
  } else {
    hotAPI.reload("data-v-61490f11", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-header'
};
module.exports = exports['default'];

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-header"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61490f11", module.exports)
  }
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(131),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardHeaderText.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardHeaderText.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5744755e", Component.options)
  } else {
    hotAPI.reload("data-v-5744755e", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-header-text',
  mounted: function mounted() {
    this.parentClasses = this.$parent.$el.classList;

    if (this.parentClasses.contains('md-card-header')) {
      this.insideParent = true;
      this.parentClasses.add('md-card-header-flex');
    }
  },
  destroyed: function destroyed() {
    this.parentClasses.remove('md-card-header-flex');
  }
};
module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-header-text"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5744755e", module.exports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(134),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6cb287a5", Component.options)
  } else {
    hotAPI.reload("data-v-6cb287a5", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-content'
};
module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-content"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6cb287a5", module.exports)
  }
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(137),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardActions.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardActions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39548bae", Component.options)
  } else {
    hotAPI.reload("data-v-39548bae", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-actions'
};
module.exports = exports['default'];

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-actions"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-39548bae", module.exports)
  }
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(139),
  /* template */
  __webpack_require__(140),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardArea.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardArea.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-180bafde", Component.options)
  } else {
    hotAPI.reload("data-v-180bafde", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-card-area',
  props: {
    mdInset: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'md-inset': this.mdInset
      };
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-card-area",
    class: _vm.classes
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-180bafde", module.exports)
  }
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(143),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCard/mdCardExpand.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCardExpand.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b963c9e", Component.options)
  } else {
    hotAPI.reload("data-v-0b963c9e", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//

exports.default = {
  name: 'md-card-expand',
  data: function data() {
    return {
      trigger: null,
      content: null
    };
  },

  methods: {
    toggle: function toggle() {
      this.$refs.expand.classList.toggle('md-active');
    }
  },
  mounted: function mounted() {
    var _this = this;

    window.setTimeout((function () {
      _this.trigger = _this.$el.querySelector('[md-expand-trigger]');
      _this.content = _this.$el.querySelector('.md-card-content');

      if (_this.content) {
        _this.trigger.addEventListener('click', _this.toggle);
      }
    }), 200);
  },
  destroyed: function destroyed() {
    if (this.content) {
      this.trigger.removeEventListener('click', this.toggle);
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "expand",
    staticClass: "md-card-expand"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b963c9e", module.exports)
  }
}

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-card {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-card.md-primary {\n    background-color: PRIMARY-COLOR;\n    color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n    .THEME_NAME.md-card.md-primary .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n      color: PRIMARY-CONTRAST-0.87; }\n    .THEME_NAME.md-card.md-primary .md-input-container.md-input-focused input,\n    .THEME_NAME.md-card.md-primary .md-input-container.md-input-focused textarea {\n      color: PRIMARY-CONTRAST;\n      text-shadow: 0 0 0 PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-input-container.md-input-focused label,\n    .THEME_NAME.md-card.md-primary .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-input-container:after {\n      background-color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-input-container input,\n    .THEME_NAME.md-card.md-primary .md-input-container textarea {\n      color: PRIMARY-CONTRAST;\n      text-shadow: 0 0 0 PRIMARY-CONTRAST; }\n      .THEME_NAME.md-card.md-primary .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-card.md-primary .md-input-container textarea::-webkit-input-placeholder {\n        color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-card.md-primary .md-input-container label,\n    .THEME_NAME.md-card.md-primary .md-input-container .md-icon:not(.md-icon-delete) {\n      color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-card-expand .md-card-actions {\n      background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-card.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n    .THEME_NAME.md-card.md-accent .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n      color: ACCENT-CONTRAST-0.87; }\n    .THEME_NAME.md-card.md-accent .md-input-container.md-input-focused input,\n    .THEME_NAME.md-card.md-accent .md-input-container.md-input-focused textarea {\n      color: ACCENT-CONTRAST;\n      text-shadow: 0 0 0 ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-input-container.md-input-focused label,\n    .THEME_NAME.md-card.md-accent .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-input-container:after {\n      background-color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-input-container input,\n    .THEME_NAME.md-card.md-accent .md-input-container textarea {\n      color: ACCENT-CONTRAST;\n      text-shadow: 0 0 0 ACCENT-CONTRAST; }\n      .THEME_NAME.md-card.md-accent .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-card.md-accent .md-input-container textarea::-webkit-input-placeholder {\n        color: ACCENT-CONTRAST-0.54; }\n    .THEME_NAME.md-card.md-accent .md-input-container label,\n    .THEME_NAME.md-card.md-accent .md-input-container .md-icon:not(.md-icon-delete) {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-card-expand .md-card-actions {\n      background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-card.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n    .THEME_NAME.md-card.md-warn .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n      color: WARN-CONTRAST-0.87; }\n    .THEME_NAME.md-card.md-warn .md-input-container.md-input-focused input,\n    .THEME_NAME.md-card.md-warn .md-input-container.md-input-focused textarea {\n      color: WARN-CONTRAST;\n      text-shadow: 0 0 0 WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-input-container.md-input-focused label,\n    .THEME_NAME.md-card.md-warn .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-input-container:after {\n      background-color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-input-container input,\n    .THEME_NAME.md-card.md-warn .md-input-container textarea {\n      color: WARN-CONTRAST;\n      text-shadow: 0 0 0 WARN-CONTRAST; }\n      .THEME_NAME.md-card.md-warn .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-card.md-warn .md-input-container textarea::-webkit-input-placeholder {\n        color: WARN-CONTRAST-0.54; }\n    .THEME_NAME.md-card.md-warn .md-input-container label,\n    .THEME_NAME.md-card.md-warn .md-input-container .md-icon:not(.md-icon-delete) {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-card-expand .md-card-actions {\n      background-color: WARN-COLOR; }\n  .THEME_NAME.md-card .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n  .THEME_NAME.md-card .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n    color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME.md-card > .md-card-area:after {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-card .md-card-media-cover.md-text-scrim .md-backdrop {\n    background: linear-gradient(to bottom, BACKGROUND-CONTRAST-0.0 20%, BACKGROUND-CONTRAST-0.275 66%, BACKGROUND-CONTRAST-0.55 100%); }\n  .THEME_NAME.md-card .md-card-media-cover.md-solid .md-card-area {\n    background-color: BACKGROUND-CONTRAST-0.4; }\n  .THEME_NAME.md-card .md-card-media-cover .md-card-header .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon,\n  .THEME_NAME.md-card .md-card-media-cover .md-card-actions .md-icon-button:not(.md-primary):not(.md-warn):not(.md-accent) .md-icon {\n    color: #fff; }\n  .THEME_NAME.md-card .md-card-expand .md-card-actions {\n    background-color: BACKGROUND-COLOR; }\n"

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdCheckbox = __webpack_require__(146);

var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);

var _mdCheckbox3 = __webpack_require__(150);

var _mdCheckbox4 = _interopRequireDefault(_mdCheckbox3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-checkbox', _mdCheckbox2.default);

  Vue.material.styles.push(_mdCheckbox4.default);
}
module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(148),
  /* template */
  __webpack_require__(149),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdCheckbox/mdCheckbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdCheckbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9f41cdf8", Component.options)
  } else {
    hotAPI.reload("data-v-9f41cdf8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-checkbox',
  props: {
    name: String,
    value: [String, Boolean, Array],
    id: String,
    disabled: Boolean,
    mdValue: [String]
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      checked: this.value || false
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-checked': this.isArray() ? this.value.indexOf(this.mdValue) >= 0 : this.checked,
        'md-disabled': this.disabled
      };
    }
  },
  watch: {
    value: function value() {
      if (!this.isArray()) {
        this.checked = !!this.value;
      }
    }
  },
  methods: {
    toggleCheck: function toggleCheck($event) {

      if (!this.disabled) {
        if (this.isArray()) {
          var index = this.value.indexOf(this.mdValue);

          if (index >= 0) {
            this.value.splice(index, 1);
          } else {
            this.value.push(this.mdValue);
          }

          this.$emit('change', this.value, $event);
          this.$emit('input', this.value, $event);
        } else {
          this.checked = !this.checked;
          this.$emit('change', this.checked, $event);
          this.$emit('input', this.checked, $event);
        }
      }
    },
    isArray: function isArray() {
      return Array.isArray(this.value);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-checkbox",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-checkbox-container",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleCheck($event)
      }
    }
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled,
      "tabindex": "-1"
    },
    domProps: {
      "value": _vm.mdValue,
      "checked": _vm.checked
    }
  }), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  })], 1), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
    staticClass: "md-checkbox-label",
    attrs: {
      "for": _vm.id || _vm.name
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleCheck($event)
      }
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9f41cdf8", module.exports)
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-checkbox.md-checked .md-checkbox-container {\n  background-color: ACCENT-COLOR;\n  border-color: ACCENT-COLOR; }\n  .THEME_NAME.md-checkbox.md-checked .md-checkbox-container:after {\n    border-color: ACCENT-CONTRAST; }\n\n.THEME_NAME.md-checkbox .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-checkbox .md-ripple {\n  opacity: .26; }\n\n.THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container {\n  background-color: PRIMARY-COLOR;\n  border-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container:after {\n    border-color: PRIMARY-CONTRAST; }\n\n.THEME_NAME.md-checkbox.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container {\n  background-color: WARN-COLOR;\n  border-color: WARN-COLOR; }\n  .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container:after {\n    border-color: WARN-CONTRAST; }\n\n.THEME_NAME.md-checkbox.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-checkbox.md-disabled.md-checked .md-checkbox-container {\n  background-color: rgba(0, 0, 0, 0.26);\n  border-color: transparent; }\n\n.THEME_NAME.md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdDialog = __webpack_require__(152);

var _mdDialog2 = _interopRequireDefault(_mdDialog);

var _mdDialogTitle = __webpack_require__(156);

var _mdDialogTitle2 = _interopRequireDefault(_mdDialogTitle);

var _mdDialogContent = __webpack_require__(159);

var _mdDialogContent2 = _interopRequireDefault(_mdDialogContent);

var _mdDialogActions = __webpack_require__(162);

var _mdDialogActions2 = _interopRequireDefault(_mdDialogActions);

var _mdDialogAlert = __webpack_require__(165);

var _mdDialogAlert2 = _interopRequireDefault(_mdDialogAlert);

var _mdDialogConfirm = __webpack_require__(168);

var _mdDialogConfirm2 = _interopRequireDefault(_mdDialogConfirm);

var _mdDialogPrompt = __webpack_require__(171);

var _mdDialogPrompt2 = _interopRequireDefault(_mdDialogPrompt);

var _mdDialog3 = __webpack_require__(174);

var _mdDialog4 = _interopRequireDefault(_mdDialog3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-dialog', _mdDialog2.default);
  Vue.component('md-dialog-title', _mdDialogTitle2.default);
  Vue.component('md-dialog-content', _mdDialogContent2.default);
  Vue.component('md-dialog-actions', _mdDialogActions2.default);

  /* Presets */
  Vue.component('md-dialog-alert', _mdDialogAlert2.default);
  Vue.component('md-dialog-confirm', _mdDialogConfirm2.default);
  Vue.component('md-dialog-prompt', _mdDialogPrompt2.default);

  Vue.material.styles.push(_mdDialog4.default);
}
module.exports = exports['default'];

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(154),
  /* template */
  __webpack_require__(155),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/mdDialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-341e9664", Component.options)
  } else {
    hotAPI.reload("data-v-341e9664", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _transitionEndEventName = __webpack_require__(42);

var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog',
  props: {
    mdClickOutsideToClose: {
      type: Boolean,
      default: true
    },
    mdEscToClose: {
      type: Boolean,
      default: true
    },
    mdBackdrop: {
      type: Boolean,
      default: true
    },
    mdOpenFrom: String,
    mdCloseTo: String,
    mdFullscreen: {
      type: Boolean,
      default: false
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      active: false,
      transitionOff: false,
      dialogTransform: ''
    };
  },
  computed: {
    classes: function classes() {
      return {
        'md-active': this.active
      };
    },
    dialogClasses: function dialogClasses() {
      return {
        'md-fullscreen': this.mdFullscreen,
        'md-transition-off': this.transitionOff,
        'md-reference': this.mdOpenFrom || this.mdCloseTo
      };
    },
    styles: function styles() {
      return {
        transform: this.dialogTransform
      };
    }
  },
  methods: {
    removeDialog: function removeDialog() {
      if (document.body.contains(this.dialogElement)) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    calculateDialogPos: function calculateDialogPos(ref) {
      var reference = document.querySelector(ref);

      if (reference) {
        var openFromRect = reference.getBoundingClientRect();
        var dialogRect = this.dialogInnerElement.getBoundingClientRect();
        var widthInScale = openFromRect.width / dialogRect.width;
        var heightInScale = openFromRect.height / dialogRect.height;
        var distance = {
          top: -(dialogRect.top - openFromRect.top),
          left: -(dialogRect.left - openFromRect.left + openFromRect.width)
        };

        if (openFromRect.top > dialogRect.top + dialogRect.height) {
          distance.top = openFromRect.top - dialogRect.top;
        }

        if (openFromRect.left > dialogRect.left + dialogRect.width) {
          distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
        }

        this.dialogTransform = 'translate3D(' + distance.left + 'px, ' + distance.top + 'px, 0) scale(' + widthInScale + ', ' + heightInScale + ')';
      }
    },
    open: function open() {
      var _this = this;

      document.body.appendChild(this.dialogElement);
      this.transitionOff = true;
      this.calculateDialogPos(this.mdOpenFrom);

      window.setTimeout((function () {
        _this.dialogElement.focus();
        _this.transitionOff = false;
        _this.active = true;
      }));

      this.$emit('open');
    },
    closeOnEsc: function closeOnEsc() {
      if (this.mdEscToClose) {
        this.close();
      }
    },
    close: function close() {
      var _this2 = this;

      if (document.body.contains(this.dialogElement)) {
        this.$nextTick((function () {
          var cleanElement = function cleanElement() {
            var activeRipple = _this2.dialogElement.querySelector('.md-ripple.md-active');

            if (activeRipple) {
              activeRipple.classList.remove('md-active');
            }

            _this2.dialogInnerElement.removeEventListener(_transitionEndEventName2.default, cleanElement);
            document.body.removeChild(_this2.dialogElement);
            _this2.dialogTransform = '';
          };

          _this2.transitionOff = true;
          _this2.dialogTransform = '';
          _this2.calculateDialogPos(_this2.mdCloseTo);

          window.setTimeout((function () {
            _this2.transitionOff = false;
            _this2.active = false;
            _this2.dialogInnerElement.addEventListener(_transitionEndEventName2.default, cleanElement);
          }));

          _this2.$emit('close');
        }));
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick((function () {
      _this3.dialogElement = _this3.$el;
      _this3.dialogInnerElement = _this3.$refs.dialog;
      _this3.removeDialog();
    }));
  },
  beforeDestroy: function beforeDestroy() {
    this.removeDialog();
  }
};
module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-dialog-container",
    class: [_vm.themeClass, _vm.classes],
    attrs: {
      "tabindex": "0"
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        $event.stopPropagation();
        _vm.closeOnEsc($event)
      }
    }
  }, [_c('div', {
    ref: "dialog",
    staticClass: "md-dialog",
    class: _vm.dialogClasses,
    style: (_vm.styles)
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.mdBackdrop) ? _c('md-backdrop', {
    ref: "backdrop",
    staticClass: "md-dialog-backdrop",
    class: _vm.classes,
    on: {
      "close": function($event) {
        _vm.mdClickOutsideToClose && _vm.close()
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-341e9664", module.exports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(157),
  /* template */
  __webpack_require__(158),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/mdDialogTitle.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogTitle.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ec2b6f8", Component.options)
  } else {
    hotAPI.reload("data-v-2ec2b6f8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-title'
};
module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-dialog-title md-title"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ec2b6f8", module.exports)
  }
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(160),
  /* template */
  __webpack_require__(161),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/mdDialogContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44792925", Component.options)
  } else {
    hotAPI.reload("data-v-44792925", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-content'
};
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-dialog-content"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44792925", module.exports)
  }
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(164),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/mdDialogActions.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogActions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-89c748ae", Component.options)
  } else {
    hotAPI.reload("data-v-89c748ae", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-actions'
};
module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-dialog-actions"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-89c748ae", module.exports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(167),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/presets/mdDialogAlert.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogAlert.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d32a2a6", Component.options)
  } else {
    hotAPI.reload("data-v-5d32a2a6", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-alert',
  props: {
    mdTitle: String,
    mdContent: String,
    mdContentHtml: String,
    mdOkText: {
      type: String,
      default: 'Ok'
    }
  },
  data: function data() {
    return {
      debounce: false
    };
  },
  methods: {
    fireCloseEvent: function fireCloseEvent() {
      if (!this.debounce) {
        this.$emit('close');
      }
    },
    open: function open() {
      this.$emit('open');
      this.debounce = false;
      this.$refs.dialog.open();
    },
    close: function close() {
      this.fireCloseEvent();
      this.debounce = true;
      this.$refs.dialog.close();
    }
  },
  mounted: function mounted() {
    if (!this.mdContent && !this.mdContentHtml) {
      throw new Error('Missing md-content or md-content-html attributes');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog",
    staticClass: "md-dialog-alert",
    on: {
      "close": function($event) {
        _vm.fireCloseEvent()
      }
    }
  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
    domProps: {
      "innerHTML": _vm._s(_vm.mdContentHtml)
    }
  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
    staticClass: "md-primary",
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d32a2a6", module.exports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(170),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/presets/mdDialogConfirm.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogConfirm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c309205e", Component.options)
  } else {
    hotAPI.reload("data-v-c309205e", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-confirm',
  props: {
    mdTitle: String,
    mdContent: String,
    mdContentHtml: String,
    mdOkText: {
      type: String,
      default: 'Ok'
    },
    mdCancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  data: function data() {
    return {
      debounce: false
    };
  },
  methods: {
    fireCloseEvent: function fireCloseEvent(type) {
      if (!this.debounce) {
        this.$emit('close', type);
      }
    },
    open: function open() {
      this.$emit('open');
      this.debounce = false;
      this.$refs.dialog.open();
    },
    close: function close(type) {
      this.fireCloseEvent(type);
      this.debounce = true;
      this.$refs.dialog.close();
    }
  },
  mounted: function mounted() {
    if (!this.mdContent && !this.mdContentHtml) {
      throw new Error('Missing md-content or md-content-html attributes');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog",
    staticClass: "md-dialog-confirm",
    on: {
      "close": function($event) {
        _vm.fireCloseEvent('cancel')
      }
    }
  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
    domProps: {
      "innerHTML": _vm._s(_vm.mdContentHtml)
    }
  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
    staticClass: "md-primary",
    on: {
      "click": function($event) {
        _vm.close('cancel')
      }
    }
  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
    staticClass: "md-primary",
    on: {
      "click": function($event) {
        _vm.close('ok')
      }
    }
  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c309205e", module.exports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(173),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdDialog/presets/mdDialogPrompt.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdDialogPrompt.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-288a5063", Component.options)
  } else {
    hotAPI.reload("data-v-288a5063", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-dialog-prompt',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    mdTitle: String,
    mdContent: String,
    mdContentHtml: String,
    mdOkText: {
      type: String,
      default: 'Ok'
    },
    mdCancelText: {
      type: String,
      default: 'Cancel'
    },
    mdInputId: String,
    mdInputName: String,
    mdInputMaxlength: [String, Number],
    mdInputPlaceholder: String
  },
  data: function data() {
    return {
      debounce: false
    };
  },
  methods: {
    fireCloseEvent: function fireCloseEvent(type) {
      if (!this.debounce) {
        this.$emit('close', type);
      }
    },
    open: function open() {
      var _this = this;

      this.$emit('open');
      this.debounce = false;
      this.$refs.dialog.open();

      window.setTimeout((function () {
        _this.$refs.input.$el.focus();
      }));
    },
    close: function close(type) {
      this.fireCloseEvent(type);
      this.debounce = true;
      this.$refs.dialog.close();
    },
    confirmValue: function confirmValue() {
      this.$emit('input', this.$refs.input.$el.value);
      this.close('ok');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-dialog', {
    ref: "dialog",
    staticClass: "md-dialog-prompt",
    on: {
      "close": function($event) {
        _vm.fireCloseEvent('cancel')
      }
    }
  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
    domProps: {
      "innerHTML": _vm._s(_vm.mdContentHtml)
    }
  }) : _vm._e(), _vm._v(" "), (_vm.mdContent) ? _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]) : _vm._e(), _vm._v(" "), _c('md-dialog-content', [_c('md-input-container', [_c('md-input', {
    ref: "input",
    attrs: {
      "id": _vm.mdInputId,
      "name": _vm.mdInputName,
      "maxlength": _vm.mdInputMaxlength,
      "placeholder": _vm.mdInputPlaceholder,
      "value": _vm.value
    },
    nativeOn: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.confirmValue($event)
      }
    }
  })], 1)], 1), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
    staticClass: "md-primary",
    on: {
      "click": function($event) {
        _vm.close('cancel')
      }
    }
  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
    staticClass: "md-primary",
    on: {
      "click": _vm.confirmValue
    }
  }, [_vm._v(_vm._s(_vm.mdOkText))])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-288a5063", module.exports)
  }
}

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-dialog-container .md-dialog {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdInputContainer = __webpack_require__(176);

var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);

var _mdInput = __webpack_require__(180);

var _mdInput2 = _interopRequireDefault(_mdInput);

var _mdAutocomplete = __webpack_require__(183);

var _mdAutocomplete2 = _interopRequireDefault(_mdAutocomplete);

var _mdTextarea = __webpack_require__(191);

var _mdTextarea2 = _interopRequireDefault(_mdTextarea);

var _mdInputContainer3 = __webpack_require__(195);

var _mdInputContainer4 = _interopRequireDefault(_mdInputContainer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-input-container', _mdInputContainer2.default);
  Vue.component('md-input', _mdInput2.default);
  Vue.component('md-autocomplete', _mdAutocomplete2.default);
  Vue.component('md-textarea', _mdTextarea2.default);

  Vue.material.styles.push(_mdInputContainer4.default);
}
module.exports = exports['default'];

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(179),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdInputContainer/mdInputContainer.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdInputContainer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-271c2778", Component.options)
  } else {
    hotAPI.reload("data-v-271c2778", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _isArray = __webpack_require__(64);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-input-container',
  props: {
    mdInline: Boolean,
    mdHasPassword: Boolean,
    mdClearable: Boolean
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      value: '',
      input: false,
      inputInstance: null,
      showPassword: false,
      enableCounter: false,
      hasSelect: false,
      hasPlaceholder: false,
      hasFile: false,
      isDisabled: false,
      isRequired: false,
      isFocused: false,
      counterLength: 0,
      inputLength: 0
    };
  },

  computed: {
    hasValue: function hasValue() {
      if ((0, _isArray2.default)(this.value)) {
        return this.value.length > 0;
      }

      return Boolean(this.value);
    },
    classes: function classes() {
      return {
        'md-input-inline': this.mdInline,
        'md-has-password': this.mdHasPassword,
        'md-clearable': this.mdClearable,
        'md-has-select': this.hasSelect,
        'md-has-file': this.hasFile,
        'md-has-value': this.hasValue,
        'md-input-placeholder': this.hasPlaceholder,
        'md-input-disabled': this.isDisabled,
        'md-input-required': this.isRequired,
        'md-input-focused': this.isFocused
      };
    }
  },
  methods: {
    isInput: function isInput() {
      return this.input && this.input.tagName.toLowerCase() === 'input';
    },
    togglePasswordType: function togglePasswordType() {
      if (this.isInput()) {
        if (this.input.type === 'password') {
          this.input.type = 'text';
          this.showPassword = true;
        } else {
          this.input.type = 'password';
          this.showPassword = false;
        }

        this.input.focus();
      }
    },
    clearInput: function clearInput() {
      this.inputInstance.$el.value = '';
      this.inputInstance.$emit('input', '');
      this.setValue('');
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  },
  mounted: function mounted() {
    this.input = this.$el.querySelectorAll('input, textarea, select, .md-file')[0];

    if (!this.input) {
      this.$destroy();

      throw new Error('Missing input/select/textarea inside md-input-container');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-input-container",
    class: [_vm.themeClass, _vm.classes]
  }, [_vm._t("default"), _vm._v(" "), (_vm.enableCounter) ? _c('span', {
    staticClass: "md-count"
  }, [_vm._v(_vm._s(_vm.inputLength) + " / " + _vm._s(_vm.counterLength))]) : _vm._e(), _vm._v(" "), (_vm.mdHasPassword) ? _c('md-button', {
    staticClass: "md-icon-button md-toggle-password",
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.togglePasswordType($event)
      }
    }
  }, [_c('md-icon', [_vm._v(_vm._s(_vm.showPassword ? 'visibility_off' : 'visibility'))])], 1) : _vm._e(), _vm._v(" "), (_vm.mdClearable && _vm.hasValue) ? _c('md-button', {
    staticClass: "md-icon-button md-clear-input",
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "click": _vm.clearInput
    }
  }, [_c('md-icon', [_vm._v("clear")])], 1) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-271c2778", module.exports)
  }
}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(182),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdInputContainer/mdInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22df0c6d", Component.options)
  } else {
    hotAPI.reload("data-v-22df0c6d", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(59);

var _common2 = _interopRequireDefault(_common);

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-input',
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  mixins: [_common2.default],
  mounted: function mounted() {
    var _this = this;

    this.$nextTick((function () {
      _this.parentContainer = (0, _getClosestVueParent2.default)(_this.$parent, 'md-input-container');

      if (!_this.parentContainer) {
        _this.$destroy();

        throw new Error('You should wrap the md-input in a md-input-container');
      }

      _this.parentContainer.inputInstance = _this;
      _this.setParentDisabled();
      _this.setParentRequired();
      _this.setParentPlaceholder();
      _this.handleMaxLength();
      _this.updateValues();
    }));
  }
};
module.exports = exports['default'];

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('input', {
    staticClass: "md-input",
    attrs: {
      "type": _vm.type,
      "name": _vm.name,
      "disabled": _vm.disabled,
      "required": _vm.required,
      "placeholder": _vm.placeholder,
      "maxlength": _vm.maxlength,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "focus": _vm.onFocus,
      "blur": _vm.onBlur,
      "input": _vm.onInput,
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.onInput($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.onInput($event)
      }]
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-22df0c6d", module.exports)
  }
}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(190),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdInputContainer/mdAutocomplete.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdAutocomplete.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27018515", Component.options)
  } else {
    hotAPI.reload("data-v-27018515", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(185);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _autocompleteCommon = __webpack_require__(189);

var _autocompleteCommon2 = _interopRequireDefault(_autocompleteCommon);

var _common = __webpack_require__(59);

var _common2 = _interopRequireDefault(_common);

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_common2.default, _autocompleteCommon2.default],
  data: function data() {
    return {
      items: [],
      loading: false,
      query: '',
      selected: null,
      isItemSelected: 0,
      timeout: 0,
      parentContainer: null,
      searchButton: null
    };
  },

  computed: {
    listIsEmpty: function listIsEmpty() {
      return this.list.length === 0;
    },
    itemsEmpty: function itemsEmpty() {
      return this.items.length === 0;
    },
    filterItemsByResLength: function filterItemsByResLength() {
      if (this.maxRes === 0) {
        return this.items;
      }
      return this.items.slice(0, this.maxRes);
    }
  },
  watch: {
    list: function list(value) {
      this.items = (0, _assign2.default)([], value);
    },
    query: function query(value) {
      this.$refs.input.value = value;
      this.setParentUpdateValue(value);
    },
    value: function value(_value) {
      this.query = _value;
      this.setParentUpdateValue(_value);
    }
  },
  methods: {
    debounceUpdate: function debounceUpdate() {
      var _this = this;

      this.onInput();

      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }

      this.timeout = window.setTimeout((function () {
        if (!_this.listIsEmpty) {
          _this.renderFilteredList();
          return;
        }
        _this.update();
      }), this.debounce);
    },
    hit: function hit(item) {
      this.query = item[this.printAttribute];
      this.$refs.input.value = item[this.printAttribute];
      this.selected = item;
      this.onInput();
      this.$emit('selected', this.selected, this.$refs.input.value);

      this.closeMenu();
    },
    makeFetchRequest: function makeFetchRequest(queryObject) {
      var _this2 = this;

      return this.fetch(queryObject).then((function (response) {
        var data = response || response.data || response.body;

        data = _this2.prepareResponseData ? _this2.prepareResponseData(data) : data;
        _this2.items = _this2.limit ? data.slice(0, _this2.limit) : data;

        _this2.loading = false;

        if (!_this2.itemsEmpty && !_this2.isItemSelected) {
          _this2.openMenu();
        } else {
          _this2.closeMenu();
        }
      }));
    },
    onFocus: function onFocus() {
      this.isItemSelected = 0;

      if (this.parentContainer) {
        this.parentContainer.isFocused = true;
      }

      this.$refs.input.focus();

      if (this.query.length >= this.minChars) {
        this.renderFilteredList();
        this.openMenu();
      }
    },
    onInput: function onInput() {
      this.updateValues();
      this.$emit('change', this.$refs.input.value);
      this.$emit('input', this.$refs.input.value);
    },
    renderFilteredList: function renderFilteredList() {
      if (this.filterList && this.query.length >= this.minChars) {
        this.items = this.filterList((0, _assign2.default)([], this.list), this.query);
      }

      if (this.query.length < this.minChars || this.itemsEmpty) {
        this.closeMenu();
      }

      if (!this.itemsEmpty && this.isItemSelected === 0) {
        this.openMenu();
      } else if (this.isItemSelected === 1) {
        this.isItemSelected = 0;
      }
    },
    reset: function reset() {
      this.items = [];
      this.query = '';
      this.loading = false;
    },
    setParentValue: function setParentValue(value) {
      // In some cases parentContainer would be null and value would be present
      if (this.parentContainer === null) {
        return;
      }
      this.parentContainer.setValue(value || this.$refs.input.value);
    },
    setParentDisabled: function setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled;
    },
    setParentRequired: function setParentRequired() {
      this.parentContainer.isRequired = this.required;
    },
    setParentPlaceholder: function setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder;
    },
    setParentUpdateValue: function setParentUpdateValue(value) {
      this.setParentValue(value);
      this.updateValues(value);
    },
    setSearchButton: function setSearchButton() {
      this.searchButton = this.parentContainer.$el.querySelector('[md-autocomplete-search]');

      if (this.searchButton) {
        this.searchButton.addEventListener('click', this.makeFetchRequest);
      }
    },
    update: function update() {
      if (!this.query && !this.list.length) {
        return this.reset();
      }

      if (this.minChars && this.query.length < this.minChars) {
        return;
      }

      this.loading = true;

      var queryObject = (0, _defineProperty3.default)({}, this.queryParam, this.query);

      return this.makeFetchRequest(queryObject);
    },
    toggleMenu: function toggleMenu() {
      if (this.items.length) {
        this.$refs.menu.toggle();
      }
    },
    openMenu: function openMenu() {
      if (this.items.length && !this.itemsEmpty) {
        this.$refs.menu.open();
        this.$refs.input.focus();
      }
    },
    closeMenu: function closeMenu() {
      this.$refs.menu.close();
    },
    updateValues: function updateValues(value) {
      var newValue = value || this.$refs.input.value || this.value;

      this.setParentValue(newValue);
      // In some cases parentContainer would be null and value would be present
      if (this.parentContainer === null) {
        return;
      }
      this.parentContainer.inputLength = newValue ? newValue.length : 0;
    },
    contentHighlightItem: function contentHighlightItem(direction) {
      this.menuContent = document.body.querySelector('.md-autocomplete-content');

      if (this.menuContent === null) {
        return false;
      }

      this.menuContent.__vue__.highlightItem(direction);

      return true;
    },
    contentFireClick: function contentFireClick() {
      this.menuContent = document.body.querySelector('.md-autocomplete-content');

      if (this.menuContent === null || this.menuContent.__vue__.highlighted === false || this.menuContent.__vue__.highlighted < 1) {

        this.closeMenu();

        return false;
      }

      var index = this.menuContent.__vue__.$children[0].$children[this.menuContent.__vue__.highlighted - 1].index;

      this.isItemSelected = 1;

      this.hit(this.items[index - 1]);
      this.closeMenu();

      return true;
    },
    setItemSelected: function setItemSelected(item) {
      this.isItemSelected = 2;
      this.hit(item);

      this.closeMenu();

      return true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.searchButton) {
      this.searchButton.removeEventListener('click', this.makeFetchRequest);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick((function () {
      _this3.parentContainer = (0, _getClosestVueParent2.default)(_this3.$parent, 'md-input-container');
      _this3.menuContent = document.body.querySelector('.md-autocomplete-content');

      if (!_this3.listIsEmpty) {
        _this3.items = (0, _assign2.default)([], _this3.list);
      }

      _this3.verifyProps();
      _this3.setSearchButton();

      _this3.setParentDisabled();
      _this3.setParentRequired();
      _this3.setParentPlaceholder();
      _this3.handleMaxLength();
      _this3.updateValues();
    }));
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(186);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(187), __esModule: true };

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(188);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    debounce: {
      type: Number,
      default: 1E3
    },
    disabled: Boolean,
    fetch: {
      type: Function
    },
    filterList: Function,
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    minChars: {
      type: Number,
      default: 1
    },
    name: String,
    prepareResponseData: Function,
    printAttribute: {
      type: String,
      default: 'name'
    },
    queryParam: {
      type: String,
      default: 'q'
    },

    maxHeight: {
      type: Number,
      default: 0
    },

    required: Boolean,

    maxRes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onFocus: function onFocus() {
      if (this.parentContainer) {
        this.parentContainer.isFocused = true;
      }
    },
    onBlur: function onBlur() {
      this.parentContainer.isFocused = false;
      this.setParentValue();
    },
    verifyProps: function verifyProps() {
      if (!this.parentContainer) {
        return this.throwErrorDestroy('You should wrap the md-input in a md-input-container');
      } else if (this.listIsEmpty && this.filterList) {
        return this.throwErrorDestroy('You should use a `filterList` function prop with the `list` prop');
      } else if (!this.fetch && this.listIsEmpty) {
        return this.throwErrorDestroy('You should use a `fetch` function prop');
      }
    },
    throwErrorDestroy: function throwErrorDestroy(errorMessage) {
      this.$destroy();
      throw new Error(errorMessage);
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-autocomplete",
    on: {
      "focus": _vm.onFocus,
      "blur": _vm.onBlur
    }
  }, [_c('md-menu', {
    ref: "menu",
    staticClass: "md-autocomplete-menu",
    attrs: {
      "md-align-trigger": "",
      "md-auto-width": "",
      "md-fixed": "",
      "md-no-focus": "",
      "md-manual-toggle": "",
      "md-max-height": _vm.maxHeight,
      "md-close-on-select": false,
      "md-align-trigger": ""
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    ref: "input",
    staticClass: "md-input",
    attrs: {
      "type": "text",
      "disabled": _vm.disabled,
      "required": _vm.required,
      "placeholder": _vm.placeholder,
      "maxlength": _vm.maxlength,
      "name": _vm.name,
      "md-menu-trigger": ""
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "focus": _vm.onFocus,
      "blur": _vm.onBlur,
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }, _vm.debounceUpdate],
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.contentHighlightItem('up')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.contentHighlightItem('down')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.contentFireClick()
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9)) { return null; }
        _vm.closeMenu()
      }]
    }
  }), _vm._v(" "), _c('md-menu-content', {
    staticClass: "md-autocomplete-content"
  }, _vm._l((_vm.filterItemsByResLength), (function(item, index) {
    return (_vm.items.length) ? _c('md-menu-item', {
      key: index,
      attrs: {
        "listIndex": index,
        "manual-highlight": ""
      },
      on: {
        "click": function($event) {
          _vm.setItemSelected(item)
        }
      }
    }, [_vm._v("\n        " + _vm._s(item[_vm.printAttribute]) + "\n      ")]) : _vm._e()
  })))], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-27018515", module.exports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(194),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdInputContainer/mdTextarea.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTextarea.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6243e5e7", Component.options)
  } else {
    hotAPI.reload("data-v-6243e5e7", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autosize = __webpack_require__(193);

var _autosize2 = _interopRequireDefault(_autosize);

var _common = __webpack_require__(59);

var _common2 = _interopRequireDefault(_common);

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-textarea',
  mixins: [_common2.default],
  watch: {
    value: function value() {
      var _this = this;

      this.$nextTick((function () {
        return _autosize2.default.update(_this.$el);
      }));
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.parentContainer = (0, _getClosestVueParent2.default)(_this2.$parent, 'md-input-container');

      if (!_this2.parentContainer) {
        _this2.$destroy();

        throw new Error('You should wrap the md-textarea in a md-input-container');
      }

      _this2.parentContainer.inputInstance = _this2;
      _this2.setParentDisabled();
      _this2.setParentRequired();
      _this2.setParentPlaceholder();
      _this2.handleMaxLength();
      _this2.updateValues();

      if (!_this2.$el.getAttribute('rows')) {
        _this2.$el.setAttribute('rows', '1');
      }

      (0, _autosize2.default)(_this2.$el);
      setTimeout((function () {
        return _autosize2.default.update(_this2.$el);
      }), 200);
    }));
  },
  beforeDestroy: function beforeDestroy() {
    _autosize2.default.destroy(this.$el);
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Autosize 3.0.21
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, (function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : (function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	})();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = 'auto';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach((function (el) {
				el.node.scrollTop = el.scrollTop;
			}));

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = (function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach((function (key) {
				ta.style[key] = style[key];
			}));

			map['delete'](ta);
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], (function (x) {
					return assign(x, options);
				}));
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
}));

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('textarea', {
    staticClass: "md-input",
    attrs: {
      "disabled": _vm.disabled,
      "required": _vm.required,
      "placeholder": _vm.placeholder,
      "maxlength": _vm.maxlength,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "focus": _vm.onFocus,
      "blur": _vm.onBlur,
      "input": _vm.onInput
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6243e5e7", module.exports)
  }
}

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-input-container.md-input-invalid:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-invalid label,\n.THEME_NAME.md-input-container.md-input-invalid input,\n.THEME_NAME.md-input-container.md-input-invalid textarea,\n.THEME_NAME.md-input-container.md-input-invalid .md-error,\n.THEME_NAME.md-input-container.md-input-invalid .md-count,\n.THEME_NAME.md-input-container.md-input-invalid .md-icon:not(.md-icon-delete) {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-inline label {\n  color: rgba(0, 0, 0, 0.54); }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-required label:after {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused:after {\n  height: 2px;\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused input,\n.THEME_NAME.md-input-container.md-input-focused textarea {\n  color: PRIMARY-COLOR;\n  text-shadow: 0 0 0 BACKGROUND-CONTRAST;\n  -webkit-text-fill-color: transparent; }\n\n.THEME_NAME.md-input-container.md-input-focused label,\n.THEME_NAME.md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-disabled label,\n.THEME_NAME.md-input-container.md-input-disabled input,\n.THEME_NAME.md-input-container.md-input-disabled textarea,\n.THEME_NAME.md-input-container.md-input-disabled .md-error,\n.THEME_NAME.md-input-container.md-input-disabled .md-count,\n.THEME_NAME.md-input-container.md-input-disabled .md-icon:not(.md-icon-delete),\n.THEME_NAME.md-input-container.md-input-disabled ::-webkit-input-placeholder {\n  color: BACKGROUND-CONTRAST-0.38; }\n"

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdList = __webpack_require__(197);

var _mdList2 = _interopRequireDefault(_mdList);

var _mdListItem = __webpack_require__(201);

var _mdListItem2 = _interopRequireDefault(_mdListItem);

var _mdListExpand = __webpack_require__(232);

var _mdListExpand2 = _interopRequireDefault(_mdListExpand);

var _mdList3 = __webpack_require__(235);

var _mdList4 = _interopRequireDefault(_mdList3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-list', _mdList2.default);
  Vue.component('md-list-item', _mdListItem2.default);
  Vue.component('md-list-expand', _mdListExpand2.default);

  Vue.material.styles.push(_mdList4.default);
}
module.exports = exports['default'];

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(198)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(200),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdList.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d60a7b8", Component.options)
  } else {
    hotAPI.reload("data-v-3d60a7b8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 198 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-list',
  mixins: [_mixin2.default]
}; //
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "md-list",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3d60a7b8", module.exports)
  }
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(202);

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = __webpack_require__(203);

var _typeof3 = _interopRequireDefault(_typeof2);

var _mdListItemButton = __webpack_require__(217);

var _mdListItemButton2 = _interopRequireDefault(_mdListItemButton);

var _mdListItemLink = __webpack_require__(220);

var _mdListItemLink2 = _interopRequireDefault(_mdListItemLink);

var _mdListItemRouter = __webpack_require__(223);

var _mdListItemRouter2 = _interopRequireDefault(_mdListItemRouter);

var _mdListItemExpand = __webpack_require__(226);

var _mdListItemExpand2 = _interopRequireDefault(_mdListItemExpand);

var _mdListItemDefault = __webpack_require__(229);

var _mdListItemDefault2 = _interopRequireDefault(_mdListItemDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: {
    href: String,
    disabled: Boolean
  },
  render: function render(createElement, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;

    var getItemComponent = function getItemComponent() {
      var on = data.on;
      var interactionEvents = ['contextmenu', 'dblclick', 'dragend', 'mousedown', 'touchstart', 'click'];
      var childrenCount = children.length;

      if (props.href) {
        return _mdListItemLink2.default;
      }

      while (childrenCount--) {
        var options = children[childrenCount].componentOptions;

        if (options) {
          if (options.tag === 'md-list-expand') {
            var _ret = (function () {
              var expandComponent = children[childrenCount];

              data.scopedSlots = {
                expand: function expand() {
                  return expandComponent;
                }
              };

              children.splice(childrenCount, 1);

              return {
                v: _mdListItemExpand2.default
              };
            })();

            if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
          } else if (options.tag === 'router-link') {
            children[childrenCount].data.staticClass = 'md-list-item-container md-button';

            return _mdListItemRouter2.default;
          }
        }
      }

      if (on) {
        var counter = interactionEvents.length;

        while (counter--) {
          if (on[interactionEvents[counter]]) {
            return _mdListItemButton2.default;
          }
        }
      }

      return _mdListItemDefault2.default;
    };

    return createElement(getItemComponent(), (0, _extends3.default)({ props: props }, data), children);
  }
};
module.exports = exports['default'];

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(204);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(206);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(205), __esModule: true };

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(66);
module.exports = __webpack_require__(60).f('iterator');


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(207), __esModule: true };

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(208);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(48);
var META = __webpack_require__(209).KEY;
var $fails = __webpack_require__(5);
var shared = __webpack_require__(22);
var setToStringTag = __webpack_require__(36);
var uid = __webpack_require__(20);
var wks = __webpack_require__(11);
var wksExt = __webpack_require__(60);
var wksDefine = __webpack_require__(61);
var enumKeys = __webpack_require__(210);
var isArray = __webpack_require__(211);
var anObject = __webpack_require__(14);
var toIObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(49);
var gOPNExt = __webpack_require__(212);
var $GOPD = __webpack_require__(213);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(19);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails((function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
})) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', (function toString() {
    return this._k;
  }));

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(37).f = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(40)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails((function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
}))), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(20)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(5)((function () {
  return isExtensible(Object.preventExtensions({}));
}));
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(37);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(9);
var gOPN = __webpack_require__(70).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(37);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(31);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 214 */
/***/ (function(module, exports) {



/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61)('asyncIterator');


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61)('observable');


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(218),
  /* template */
  __webpack_require__(219),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListItemButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListItemButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-105b12e9", Component.options)
  } else {
    hotAPI.reload("data-v-105b12e9", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-list-item',
  props: {
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'md-disabled': this.disabled
      };
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "md-list-item",
    class: _vm.classes
  }, [_c('div', {
    staticClass: "md-list-item-container md-button"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('md-button', {
    staticClass: "md-button-ghost",
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', $event)
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-105b12e9", module.exports)
  }
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(221),
  /* template */
  __webpack_require__(222),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListItemLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListItemLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44f9f371", Component.options)
  } else {
    hotAPI.reload("data-v-44f9f371", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-list-item',
  props: {
    href: String,
    target: String,
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'md-disabled': this.disabled
      };
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "md-list-item",
    class: _vm.classes
  }, [_c('a', {
    staticClass: "md-list-item-container md-button",
    attrs: {
      "href": _vm.href,
      "target": _vm.target,
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', $event)
      }
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "disabled": _vm.disabled
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44f9f371", module.exports)
  }
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(224),
  /* template */
  __webpack_require__(225),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListItemRouter.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListItemRouter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32609f80", Component.options)
  } else {
    hotAPI.reload("data-v-32609f80", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//

exports.default = {
  name: 'md-list-item',
  props: {
    disabled: Boolean
  },
  computed: {
    classes: function classes() {
      return {
        'md-disabled': this.disabled
      };
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "md-list-item",
    class: _vm.classes,
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._t("default"), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "disabled": _vm.disabled
    }
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-32609f80", module.exports)
  }
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(227),
  /* template */
  __webpack_require__(228),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListItemExpand.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListItemExpand.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b27d651", Component.options)
  } else {
    hotAPI.reload("data-v-1b27d651", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-list-item',
  props: {
    disabled: Boolean,
    mdExpandMultiple: Boolean
  },
  data: function data() {
    return {
      parentList: false,
      active: false,
      height: 0,
      contentObserver: null,
      transitionOff: true
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-disabled': this.disabled,
        'md-active': this.active
      };
    },
    expandClasses: function expandClasses() {
      return {
        'md-transition-off': this.transitionOff
      };
    },
    expandStyles: function expandStyles() {
      return {
        'margin-bottom': this.height
      };
    }
  },
  methods: {
    resetSiblings: function resetSiblings() {
      var _this = this;

      this.parentList.$children.forEach((function (child) {
        if (child.$el !== _this.$el && child.$el.classList.contains('md-list-item-expand')) {
          child.active = false;
        }
      }));
    },
    calculatePadding: function calculatePadding() {
      var _this2 = this;

      window.requestAnimationFrame((function () {
        if (_this2._destroyed) {
          return;
        }

        _this2.height = -_this2.$refs.expand.scrollHeight + 'px';

        window.setTimeout((function () {
          _this2.transitionOff = false;
        }));
      }));
    },
    toggleExpandList: function toggleExpandList($event) {
      if (!this.mdExpandMultiple) {
        this.resetSiblings();
      }

      this.calculatePadding();
      this.active = !this.active;
      this.$emit('click', $event);
    },
    recalculateAfterChange: function recalculateAfterChange() {
      this.transitionOff = true;
      this.calculatePadding();
    },
    observeChildChanges: function observeChildChanges() {
      this.contentObserver = new MutationObserver(this.recalculateAfterChange);
      this.contentObserver.observe(this.$refs.expand, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick((function () {
      _this3.parentList = (0, _getClosestVueParent2.default)(_this3.$parent, 'md-list');
      _this3.calculatePadding();
      _this3.observeChildChanges();
      window.addEventListener('resize', _this3.recalculateAfterChange);
    }));
  },
  beforeDestroy: function beforeDestroy() {
    if (this.contentObserver) {
      this.contentObserver.disconnect();
    }

    window.removeEventListener('resize', this.recalculateAfterChange);

    this._destroyed = true;
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "md-list-item md-list-item-expand",
    class: _vm.classes
  }, [_c('div', {
    staticClass: "md-list-item-container md-button"
  }, [_vm._t("default"), _vm._v(" "), _c('md-icon', {
    staticClass: "md-list-expand-indicator"
  }, [_vm._v("keyboard_arrow_down")])], 2), _vm._v(" "), _c('md-button', {
    staticClass: "md-button-ghost",
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": _vm.toggleExpandList
    }
  }), _vm._v(" "), _c('div', {
    ref: "expand",
    staticClass: "md-list-expand",
    class: _vm.expandClasses,
    style: (_vm.expandStyles)
  }, [_vm._t("expand")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1b27d651", module.exports)
  }
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(230),
  /* template */
  __webpack_require__(231),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListItemDefault.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListItemDefault.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c7aa21a", Component.options)
  } else {
    hotAPI.reload("data-v-4c7aa21a", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-list-item'
};
module.exports = exports['default'];

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "md-list-item"
  }, [_c('div', {
    staticClass: "md-list-item-container"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c7aa21a", module.exports)
  }
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(233),
  /* template */
  __webpack_require__(234),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdList/mdListExpand.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdListExpand.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8a19e44", Component.options)
  } else {
    hotAPI.reload("data-v-e8a19e44", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'md-list-expand'
};
module.exports = exports['default'];

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-list-expand-container"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e8a19e44", module.exports)
  }
}

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-list {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n  .THEME_NAME.md-list.md-transparent {\n    background-color: transparent;\n    color: inherit; }\n  .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container {\n    color: ACCENT-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container > .md-icon {\n      color: ACCENT-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container {\n    color: WARN-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container > .md-icon {\n      color: WARN-COLOR; }\n  .THEME_NAME.md-list .md-list-item-expand .md-list-item-container {\n    background-color: BACKGROUND-COLOR; }\n    .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:hover, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:focus {\n      background-color: rgba(153, 153, 153, 0.2); }\n"

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdMenu = __webpack_require__(237);

var _mdMenu2 = _interopRequireDefault(_mdMenu);

var _mdMenuItem = __webpack_require__(242);

var _mdMenuItem2 = _interopRequireDefault(_mdMenuItem);

var _mdMenuContent = __webpack_require__(246);

var _mdMenuContent2 = _interopRequireDefault(_mdMenuContent);

var _mdMenu3 = __webpack_require__(249);

var _mdMenu4 = _interopRequireDefault(_mdMenu3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-menu', _mdMenu2.default);
  Vue.component('md-menu-item', _mdMenuItem2.default);
  Vue.component('md-menu-content', _mdMenuContent2.default);

  Vue.material.styles.push(_mdMenu4.default);
}
module.exports = exports['default'];

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(238)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(239),
  /* template */
  __webpack_require__(241),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdMenu/mdMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c2b6ddf8", Component.options)
  } else {
    hotAPI.reload("data-v-c2b6ddf8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 238 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transitionEndEventName = __webpack_require__(42);

var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

var _getInViewPosition = __webpack_require__(240);

var _getInViewPosition2 = _interopRequireDefault(_getInViewPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-menu',
  props: {
    mdSize: {
      type: [Number, String],
      default: 0
    },
    mdDirection: {
      type: String,
      default: 'bottom right'
    },
    mdAlignTrigger: {
      type: Boolean,
      default: false
    },
    mdOffsetX: {
      type: [Number, String],
      default: 0
    },
    mdOffsetY: {
      type: [Number, String],
      default: 0
    },
    mdCloseOnSelect: {
      type: Boolean,
      default: true
    },
    mdAutoWidth: {
      type: Boolean,
      default: false
    },
    mdFixed: {
      type: Boolean,
      default: false
    },
    mdNoFocus: {
      type: Boolean,
      default: false
    },
    mdManualToggle: {
      type: Boolean,
      default: false
    },
    mdMaxHeight: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  watch: {
    mdSize: function mdSize(current, previous) {
      if (current >= 1 && current <= 7) {
        this.removeLastSizeMenuContentClass(previous);
        this.addNewSizeMenuContentClass(current);
      }
    },
    mdDirection: function mdDirection(current, previous) {
      this.removeLastDirectionMenuContentClass(previous);
      this.addNewDirectionMenuContentClass(current);
    },
    mdAlignTrigger: function mdAlignTrigger(trigger) {
      this.handleAlignTriggerClass(trigger);
    }
  },
  methods: {
    validateMenu: function validateMenu() {
      if (!this.menuContent) {
        this.$destroy();

        throw new Error('You must have a md-menu-content inside your menu.');
      }

      if (!this.menuTrigger) {
        this.$destroy();

        throw new Error('You must have an element with a md-menu-trigger attribute inside your menu.');
      }
    },
    removeLastSizeMenuContentClass: function removeLastSizeMenuContentClass(size) {
      this.menuContent.classList.remove('md-size-' + size);
    },
    removeLastDirectionMenuContentClass: function removeLastDirectionMenuContentClass(direction) {
      this.menuContent.classList.remove('md-direction-' + direction.replace(/ /g, '-'));
    },
    addNewSizeMenuContentClass: function addNewSizeMenuContentClass(size) {
      this.menuContent.classList.add('md-size-' + size);
    },
    addNewDirectionMenuContentClass: function addNewDirectionMenuContentClass(direction) {
      this.menuContent.classList.add('md-direction-' + direction.replace(/ /g, '-'));
    },
    handleAlignTriggerClass: function handleAlignTriggerClass(trigger) {
      if (trigger) {
        this.menuContent.classList.add('md-align-trigger');
      }
    },
    getPosition: function getPosition(vertical, horizontal) {
      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();

      var top = vertical === 'top' ? menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight : menuTriggerRect.top;

      var left = horizontal === 'left' ? menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width : menuTriggerRect.left;

      top += parseInt(this.mdOffsetY, 10);
      left += parseInt(this.mdOffsetX, 10);

      if (this.mdAlignTrigger) {
        if (vertical === 'top') {
          top -= menuTriggerRect.height + 11;
        } else {
          top += menuTriggerRect.height + 11;
        }
      }

      return { top: top, left: left };
    },
    calculateMenuContentPos: function calculateMenuContentPos() {
      var position = void 0;
      var width = void 0;

      var margin = 8;

      if (this._destroyed) {
        return;
      }

      if (!this.mdDirection) {
        position = this.getPosition('bottom', 'right');
      } else {
        position = this.getPosition.apply(this, this.mdDirection.trim().split(' '));
      }

      if (this.mdAutoWidth) {
        width = this.menuTrigger.getBoundingClientRect().width;
        this.menuContent.style.width = parseInt(width, 10) + 'px';
      }

      if (!this.mdFixed) {
        position = (0, _getInViewPosition2.default)(this.menuContent, position);
      } else if (this.mdMaxHeight === 0) {
        this.menuContent.style.maxHeight = window.innerHeight - this.menuTrigger.getBoundingClientRect().bottom - margin + 'px';
      } else if (this.menuContent.children[0].children.length > 0) {
        var listElemHeight = this.menuContent.children[0].children[0].clientHeight;

        this.menuContent.style.maxHeight = margin * 2 + listElemHeight * this.mdMaxHeight + 'px';
      }

      this.menuContent.style.top = position.top + window.pageYOffset + 'px';
      this.menuContent.style.left = position.left + window.pageXOffset + 'px';
    },
    recalculateOnResize: function recalculateOnResize() {
      window.requestAnimationFrame(this.calculateMenuContentPos);
    },
    open: function open() {
      if (document.body.contains(this.menuContent)) {
        document.body.removeChild(this.menuContent);
      }

      document.body.appendChild(this.menuContent);
      document.body.appendChild(this.backdropElement);
      window.addEventListener('resize', this.recalculateOnResize);

      this.calculateMenuContentPos();

      getComputedStyle(this.menuContent).top;
      this.menuContent.classList.add('md-active');

      if (!this.mdNoFocus) {
        this.menuContent.focus();
      }

      this.active = true;
      this.$emit('open');
    },
    close: function close() {
      var _this = this;

      var close = function close(event) {
        if (_this.menuContent && event.target === _this.menuContent) {
          var activeRipple = _this.menuContent.querySelector('.md-ripple.md-active');

          _this.menuContent.removeEventListener(_transitionEndEventName2.default, close);

          if (!_this.mdNoFocus) {
            _this.menuTrigger.focus();
          }

          _this.active = false;

          if (activeRipple) {
            activeRipple.classList.remove('md-active');
          }

          if (document.body.contains(_this.menuContent)) {
            document.body.removeChild(_this.menuContent);
          }

          if (document.body.contains(_this.backdropElement)) {
            document.body.removeChild(_this.backdropElement);
          }

          window.removeEventListener('resize', _this.recalculateOnResize);
        }
      };

      this.menuContent.addEventListener(_transitionEndEventName2.default, close);
      this.menuContent.classList.remove('md-active');
      this.$emit('close');
    },
    toggle: function toggle() {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.menuTrigger = _this2.$el.querySelector('[md-menu-trigger]');
      _this2.menuContent = _this2.$el.querySelector('.md-menu-content');
      _this2.backdropElement = _this2.$refs.backdrop.$el;
      _this2.validateMenu();
      _this2.handleAlignTriggerClass(_this2.mdAlignTrigger);
      _this2.addNewSizeMenuContentClass(_this2.mdSize);
      _this2.addNewDirectionMenuContentClass(_this2.mdDirection);
      _this2.$el.removeChild(_this2.$refs.backdrop.$el);
      _this2.menuContent.parentNode.removeChild(_this2.menuContent);

      if (!_this2.mdManualToggle) {
        _this2.menuTrigger.addEventListener('click', _this2.toggle);
      }
    }));
  },
  beforeDestroy: function beforeDestroy() {
    if (document.body.contains(this.menuContent)) {
      document.body.removeChild(this.menuContent);
      document.body.removeChild(this.backdropElement);
    }

    if (!this.mdManualToggle) {
      this.menuTrigger.removeEventListener('click', this.toggle);
    }

    window.removeEventListener('resize', this.recalculateOnResize);

    this._destroyed = true;
  }
};
module.exports = exports['default'];

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var margin = 0;

var isAboveOfViewport = function isAboveOfViewport(element, position) {
  return position.top <= margin - parseInt(getComputedStyle(element).marginTop, 10);
};

var isBelowOfViewport = function isBelowOfViewport(element, position) {
  return position.top + element.offsetHeight + margin >= window.innerHeight - parseInt(getComputedStyle(element).marginTop, 10);
};

var isOnTheLeftOfViewport = function isOnTheLeftOfViewport(element, position) {
  return position.left <= margin - parseInt(getComputedStyle(element).marginLeft, 10);
};

var isOnTheRightOfViewport = function isOnTheRightOfViewport(element, position) {
  return position.left + element.offsetWidth + margin >= window.innerWidth - parseInt(getComputedStyle(element).marginLeft, 10);
};

var getInViewPosition = function getInViewPosition(element, position) {
  var computedStyle = getComputedStyle(element);

  if (isAboveOfViewport(element, position)) {
    position.top = margin - parseInt(computedStyle.marginTop, 10);
  }

  if (isOnTheLeftOfViewport(element, position)) {
    position.left = margin - parseInt(computedStyle.marginLeft, 10);
  }

  if (isOnTheRightOfViewport(element, position)) {
    position.left = window.innerWidth - margin - element.offsetWidth - parseInt(computedStyle.marginLeft, 10);
  }

  if (isBelowOfViewport(element, position)) {
    position.top = window.innerHeight - margin - element.offsetHeight - parseInt(computedStyle.marginTop, 10);
  }

  return position;
};

exports.default = getInViewPosition;
module.exports = exports["default"];

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-menu"
  }, [_vm._t("default"), _vm._v(" "), _c('md-backdrop', {
    ref: "backdrop",
    staticClass: "md-menu-backdrop md-transparent md-active",
    on: {
      "close": _vm.close
    }
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c2b6ddf8", module.exports)
  }
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(243),
  /* template */
  __webpack_require__(245),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdMenu/mdMenuItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdMenuItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-185998b7", Component.options)
  } else {
    hotAPI.reload("data-v-185998b7", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

__webpack_require__(244);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-menu-item',
  props: {
    href: String,
    target: String,
    disabled: Boolean,
    listIndex: {
      type: Number,
      default: -1
    },
    manualHighlight: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      parentContent: {},
      index: 0,
      highlighted: false
    };
  },
  computed: {
    classes: function classes() {
      return {
        'md-highlighted': this.highlighted
      };
    },
    getHighlight: function getHighlight() {
      if (!this.manualHighlight) {
        if (this.index === this.parentContent.highlighted) {
          if (this.disabled) {
            if (this.parentContent.oldHighlight > this.parentContent.highlighted) {
              this.parentContent.highlighted--;
            } else {
              this.parentContent.highlighted++;
            }
          }

          if (this.index === 1) {
            this.parentContent.$el.scrollTop = 0;
          } else if (this.index === this.parentContent.itemsAmount) {
            this.parentContent.$el.scrollTop = this.parentContent.$el.scrollHeight;
          } else {
            this.$el.scrollIntoViewIfNeeded(false);
          }

          this.highlighted = true;
          return true;
        }

        this.highlighted = false;
        return false;
      }
    }
  },
  methods: {
    close: function close($event) {
      if (!this.parentMenu.mdManualToggle) {
        if (!this.disabled) {
          if (this.parentMenu.mdCloseOnSelect) {
            this.parentContent.close();
          }

          this.$emit('click', $event);
          this.$emit('selected', $event);
        }
      } else if (!this.disabled) {
        this.$emit('click', $event);
        this.$emit('selected', $event);
      }
    }
  },
  mounted: function mounted() {
    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');
    this.parentMenu = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu');

    if (!this.parentContent) {
      this.$destroy();

      throw new Error('You must wrap the md-menu-item in a md-menu-content');
    }

    if (this.listIndex === -1) {
      this.parentContent.itemListCount++;
      this.index = this.parentContent.itemListCount;
    } else {
      this.index = this.listIndex + 1;
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 244 */
/***/ (function(module, exports) {

if (!Element.prototype.scrollIntoViewIfNeeded) {
  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;

    var parent = this.parentNode,
        parentComputedStyle = window.getComputedStyle(parent, null),
        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
        overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
        alignWithTop = overTop && !overBottom;

    if ((overTop || overBottom) && centerIfNeeded) {
      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
    }

    if ((overLeft || overRight) && centerIfNeeded) {
      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
    }

    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
      this.scrollIntoView(alignWithTop);
    }
  };
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-list-item', {
    staticClass: "md-menu-item",
    class: _vm.classes,
    attrs: {
      "href": _vm.href,
      "target": _vm.target,
      "disabled": _vm.disabled
    },
    on: {
      "click": _vm.close
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-185998b7", module.exports)
  }
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(247),
  /* template */
  __webpack_require__(248),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdMenu/mdMenuContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdMenuContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-863c0af6", Component.options)
  } else {
    hotAPI.reload("data-v-863c0af6", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-menu-content',
  data: function data() {
    return {
      oldHighlight: false,
      highlighted: false,
      itemsAmount: 0,
      itemListCount: 0
    };
  },

  methods: {
    close: function close() {
      this.highlighted = false;
      this.$parent.close();
    },
    highlightItem: function highlightItem(direction) {
      this.itemsAmount = this.$children[0].$children.length;

      if (this.itemsAmount < this.highlighted - 1) {
        this.highlighted = 1;
      }

      this.oldHighlight = this.highlighted;

      if (direction === 'up') {
        if (this.highlighted === 1) {
          this.highlighted = this.itemsAmount;
        } else {
          this.highlighted--;
        }
      }

      if (direction === 'down') {
        if (this.highlighted === this.itemsAmount) {
          this.highlighted = 1;
        } else {
          this.highlighted++;
        }
      }

      this.$children[0].$children[this.highlighted - 1].$el.scrollIntoView({
        block: 'end', behavior: 'smooth'
      });

      for (var i = 0; i < this.itemsAmount; i++) {
        this.$children[0].$children[i].highlighted = false;
      }

      this.$children[0].$children[this.highlighted - 1].highlighted = true;
    },
    fireClick: function fireClick() {
      if (this.highlighted > 0) {
        this.getOptions()[this.highlighted - 1].$el.click();
      }
    },
    getOptions: function getOptions() {
      return this.$children[0].$children.filter((function (child) {
        return child.$el.classList.contains('md-option');
      }));
    }
  },
  mounted: function mounted() {
    if (!this.$parent.$el.classList.contains('md-menu')) {
      this.$destroy();

      throw new Error('You must wrap the md-menu-content in a md-menu');
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-menu-content",
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        $event.preventDefault();
        _vm.close($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9)) { return null; }
        $event.preventDefault();
        _vm.close($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.highlightItem('up')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.highlightItem('down')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.fireClick($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32)) { return null; }
        _vm.fireClick($event)
      }]
    }
  }, [_c('md-list', [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-863c0af6", module.exports)
  }
}

/***/ }),
/* 249 */
/***/ (function(module, exports) {

module.exports = ".md-menu-content .THEME_NAME.md-list {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n  .md-menu-content .THEME_NAME.md-list .md-menu-item:hover .md-button:not([disabled]), .md-menu-content .THEME_NAME.md-list .md-menu-item:focus .md-button:not([disabled]), .md-menu-content .THEME_NAME.md-list .md-menu-item.md-highlighted .md-button:not([disabled]) {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .md-menu-content .THEME_NAME.md-list .md-menu-item[disabled] {\n    color: BACKGROUND-CONTRAST-0.38; }\n"

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdProgress = __webpack_require__(251);

var _mdProgress2 = _interopRequireDefault(_mdProgress);

var _mdProgress3 = __webpack_require__(255);

var _mdProgress4 = _interopRequireDefault(_mdProgress3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-progress', _mdProgress2.default);

  Vue.material.styles.push(_mdProgress4.default);
}
module.exports = exports['default'];

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(253),
  /* template */
  __webpack_require__(254),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdProgress/mdProgress.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdProgress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2816f2c4", Component.options)
  } else {
    hotAPI.reload("data-v-2816f2c4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 252 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-progress',
  props: {
    mdIndeterminate: Boolean,
    mdProgress: {
      type: Number,
      default: 0
    }
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return {
        'md-indeterminate': this.mdIndeterminate
      };
    },
    styles: function styles() {
      if (!this.mdIndeterminate) {
        return {
          width: this.mdProgress + '%'
        };
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "md-progress",
      "appear": ""
    }
  }, [_c('div', {
    staticClass: "md-progress",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-progress-track",
    style: (_vm.styles)
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2816f2c4", module.exports)
  }
}

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-progress {\n  background-color: PRIMARY-COLOR-0.38; }\n  .THEME_NAME.md-progress:not(.md-indeterminate) .md-progress-track {\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-progress .md-progress-track:after, .THEME_NAME.md-progress .md-progress-track:before {\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-progress.md-accent {\n    background-color: ACCENT-COLOR-0.38; }\n    .THEME_NAME.md-progress.md-accent:not(.md-indeterminate) .md-progress-track {\n      background-color: ACCENT-COLOR; }\n    .THEME_NAME.md-progress.md-accent .md-progress-track:after, .THEME_NAME.md-progress.md-accent .md-progress-track:before {\n      background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-progress.md-warn {\n    background-color: WARN-COLOR-0.38; }\n    .THEME_NAME.md-progress.md-warn:not(.md-indeterminate) .md-progress-track {\n      background-color: WARN-COLOR; }\n    .THEME_NAME.md-progress.md-warn .md-progress-track:after, .THEME_NAME.md-progress.md-warn .md-progress-track:before {\n      background-color: WARN-COLOR; }\n"

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdRadio = __webpack_require__(257);

var _mdRadio2 = _interopRequireDefault(_mdRadio);

var _mdRadio3 = __webpack_require__(261);

var _mdRadio4 = _interopRequireDefault(_mdRadio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-radio', _mdRadio2.default);

  Vue.material.styles.push(_mdRadio4.default);
}
module.exports = exports['default'];

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(258)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(259),
  /* template */
  __webpack_require__(260),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdRadio/mdRadio.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdRadio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-079386ce", Component.options)
  } else {
    hotAPI.reload("data-v-079386ce", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 258 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-radio',
  props: {
    name: String,
    id: String,
    value: [String, Boolean, Number],
    mdValue: {
      type: [String, Boolean, Number],
      required: true
    },
    disabled: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return {
        'md-checked': typeof this.value !== 'undefined' && this.value !== null && this.mdValue.toString() === this.value.toString(),
        'md-disabled': this.disabled
      };
    }
  },
  methods: {
    toggleCheck: function toggleCheck($event) {
      if (!this.disabled) {
        this.$emit('change', this.mdValue, $event);
        this.$emit('input', this.mdValue, $event);
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-radio",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-radio-container",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleCheck($event)
      }
    }
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    }
  }), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  })], 1), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
    staticClass: "md-radio-label",
    attrs: {
      "for": _vm.id || _vm.name
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleCheck($event)
      }
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-079386ce", module.exports)
  }
}

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSelect = __webpack_require__(263);

var _mdSelect2 = _interopRequireDefault(_mdSelect);

var _mdOption = __webpack_require__(267);

var _mdOption2 = _interopRequireDefault(_mdOption);

var _mdSelect3 = __webpack_require__(270);

var _mdSelect4 = _interopRequireDefault(_mdSelect3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-select', _mdSelect2.default);
  Vue.component('md-option', _mdOption2.default);

  Vue.material.styles.push(_mdSelect4.default);
}
module.exports = exports['default'];

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(265),
  /* template */
  __webpack_require__(266),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdSelect/mdSelect.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSelect.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a6127e38", Component.options)
  } else {
    hotAPI.reload("data-v-a6127e38", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 264 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(47);

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__(41);

var _keys2 = _interopRequireDefault(_keys);

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

var _isArray = __webpack_require__(64);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-select',
  props: {
    name: String,
    id: String,
    required: Boolean,
    multiple: Boolean,
    value: [String, Boolean, Number, Array],
    disabled: Boolean,
    placeholder: String,
    mdMenuClass: String,
    mdMenuOptions: Object
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      lastSelected: null,
      selectedValue: null,
      selectedText: null,
      multipleOptions: {},
      options: {},
      optionsAmount: 0
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-disabled': this.disabled,
        'md-select-icon': this.hasIcon
      };
    },
    contentClasses: function contentClasses() {
      if (this.multiple) {
        return 'md-multiple ' + this.mdMenuClass;
      }

      return this.mdMenuClass;
    },
    hasIcon: function hasIcon() {
      return this.$slots['icon'];
    },
    valueStyle: function valueStyle() {
      return this.hasIcon ? {
        display: 'none'
      } : {};
    }
  },
  watch: {
    value: function value(_value) {
      this.setTextAndValue(_value);

      if (this.multiple) {
        this.selectOptions(_value);
      }
    },
    disabled: function disabled() {
      this.setParentDisabled();
    },
    required: function required() {
      this.setParentRequired();
    },
    placeholder: function placeholder() {
      this.setParentPlaceholder();
    }
  },
  methods: {
    changeValue: function changeValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.$emit('selected', value);
    },
    getSingleValue: function getSingleValue(value) {
      var _this = this;

      var output = {};

      (0, _keys2.default)(this.options).forEach((function (index) {
        var options = _this.options[index];

        if (options.value === value) {
          output.value = value;
          output.text = options.$refs.item.textContent, output.el = options.$refs.item;
        }
      }));

      return output;
    },
    getMultipleValue: function getMultipleValue(modelValue) {
      var _this2 = this;

      if ((0, _isArray2.default)(this.value)) {
        var outputText = [];

        modelValue.forEach((function (value) {
          (0, _keys2.default)(_this2.options).forEach((function (index) {
            var options = _this2.options[index];

            if (options.value === value) {
              var text = options.$refs.item.textContent;

              _this2.multipleOptions[index] = {
                value: value,
                text: text
              };
              outputText.push(text);
            }
          }));
        }));

        return {
          value: modelValue,
          text: outputText.join(', ')
        };
      }

      return {};
    },
    onOpen: function onOpen() {
      if (this.lastSelected) {
        this.lastSelected.scrollIntoViewIfNeeded(true);
      }

      this.$emit('opened');
    },
    removeChild: function removeChild(index) {
      this.optionsAmount--;
      var selection = (0, _assign2.default)({}, this.options[index]);

      delete this.options[index];
      delete this.multipleOptions[index];

      if (this.multiple) {
        var element = this.selectedValue.find((function (el) {
          return el.name === selection.$refs.item.textContent.trim();
        }));
        var selectionIndex = this.selectedValue.indexOf(element);

        if (selectionIndex !== -1) {
          this.selectedValue.splice(selectionIndex, 1);
        }
      }
    },
    setParentDisabled: function setParentDisabled() {
      this.parentContainer.isDisabled = this.disabled;
    },
    setParentRequired: function setParentRequired() {
      this.parentContainer.isRequired = this.required;
    },
    setParentPlaceholder: function setParentPlaceholder() {
      this.parentContainer.hasPlaceholder = !!this.placeholder;
    },
    selectOptions: function selectOptions(modelValue) {
      var _this3 = this;

      var optionsArray = (0, _keys2.default)(this.options).map((function (el) {
        return _this3.options[el];
      }));

      if (optionsArray && optionsArray.length) {
        var selectedOptions = optionsArray.filter((function (el) {
          return modelValue.includes(el.value);
        }));
        var unselectedOptions = optionsArray.filter((function (el) {
          return !modelValue.includes(el.value);
        }));

        selectedOptions.forEach((function (el) {
          el.check = true;
        }));
        unselectedOptions.forEach((function (el) {
          el.check = false;
        }));
      }
    },
    setTextAndValue: function setTextAndValue(modelValue) {
      var output = this.multiple ? this.getMultipleValue(modelValue) : this.getSingleValue(modelValue);

      this.selectedValue = output.value;
      this.selectedText = output.text;
      this.lastSelected = output.el;

      if (this.parentContainer) {
        this.parentContainer.setValue(this.selectedText);
      }
    },
    selectMultiple: function selectMultiple(index, value, text) {
      var _this4 = this;

      this.$nextTick((function () {
        var values = [];

        _this4.multipleOptions[index] = {
          value: value,
          text: text
        };

        for (var key in _this4.multipleOptions) {
          if (_this4.multipleOptions.hasOwnProperty(key) && _this4.multipleOptions[key].value) {
            values.push(_this4.multipleOptions[key].value);
          }
        }

        _this4.changeValue(values);
      }));
    },
    selectOption: function selectOption(value, text, el) {
      this.lastSelected = el;
      this.selectedText = text;
      this.setTextAndValue(value);
      this.changeValue(value);
    }
  },
  mounted: function mounted() {
    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');

    if (this.parentContainer) {
      this.setParentDisabled();
      this.setParentRequired();
      this.setParentPlaceholder();
      this.parentContainer.hasSelect = true;
    }

    this.setTextAndValue(this.value);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.setValue('');
      this.parentContainer.hasSelect = false;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-select",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('md-menu', _vm._b({
    attrs: {
      "md-close-on-select": !_vm.multiple
    },
    on: {
      "open": _vm.onOpen,
      "close": function($event) {
        _vm.$emit('closed')
      }
    }
  }, 'md-menu', _vm.mdMenuOptions, false), [_vm._t("icon"), _vm._v(" "), _c('span', {
    ref: "value",
    staticClass: "md-select-value",
    style: (_vm.valueStyle),
    attrs: {
      "md-menu-trigger": ""
    }
  }, [_vm._v("\n      " + _vm._s(_vm.selectedText || _vm.placeholder) + "\n    ")]), _vm._v(" "), _c('md-menu-content', {
    staticClass: "md-select-content",
    class: [_vm.themeClass, _vm.contentClasses]
  }, [_vm._t("default")], 2)], 2), _vm._v(" "), _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "required": _vm.required,
      "disabled": _vm.disabled,
      "tabindex": "-1"
    }
  }, [(!_vm.multiple) ? _c('option', {
    attrs: {
      "selected": "true"
    },
    domProps: {
      "value": _vm.selectedValue
    }
  }, [_vm._v("\n      " + _vm._s(_vm.selectedText) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.multipleOptions), (function(option, index) {
    return (option.value) ? _c('option', {
      key: index,
      attrs: {
        "selected": "true"
      },
      domProps: {
        "value": option.value
      }
    }, [_vm._v("\n      " + _vm._s(option.text) + "\n    ")]) : _vm._e()
  }))], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a6127e38", module.exports)
  }
}

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(268),
  /* template */
  __webpack_require__(269),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdSelect/mdOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdOption.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6189afdd", Component.options)
  } else {
    hotAPI.reload("data-v-6189afdd", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getClosestVueParent = __webpack_require__(17);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-option',
  props: {
    value: [String, Boolean, Number, Object]
  },
  data: function data() {
    return {
      parentSelect: {},
      check: false,
      index: 0
    };
  },
  computed: {
    isSelected: function isSelected() {
      if (this.value && this.parentSelect.value) {
        var thisValue = this.value.toString();

        if (this.parentSelect.multiple) {
          return this.parentSelect.value.indexOf(thisValue) >= 0;
        }

        return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
      }

      return false;
    },
    classes: function classes() {
      return {
        'md-selected': this.isSelected,
        'md-checked': this.check
      };
    }
  },
  methods: {
    isMultiple: function isMultiple() {
      return this.parentSelect.multiple;
    },
    setParentOption: function setParentOption() {
      if (!this.isMultiple()) {
        this.parentSelect.selectOption(this.value, this.$refs.item.textContent, this.$el);
      } else {
        this.check = !this.check;
      }
    },
    selectOption: function selectOption($event) {
      if (this.disabled) {
        return;
      }
      this.setParentOption();
      this.$emit('selected', $event);
    }
  },
  watch: {
    isSelected: function isSelected(selected) {
      if (this.isMultiple()) {
        this.check = selected;
      }
    },
    check: function check(_check) {
      if (_check) {
        this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
      } else {
        this.parentSelect.selectMultiple(this.index);
      }
    }
  },
  mounted: function mounted() {
    this.parentSelect = (0, _getClosestVueParent2.default)(this.$parent, 'md-select');
    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');

    if (!this.parentSelect) {
      throw new Error('You must wrap the md-option in a md-select');
    }

    this.parentSelect.optionsAmount++;
    this.index = this.parentSelect.optionsAmount;

    this.parentSelect.multipleOptions[this.index] = {};
    this.parentSelect.options[this.index] = this;

    if (this.isMultiple() && this.parentSelect.value.indexOf(this.value) >= 0 || this.parentSelect.value === this.value) {
      this.setParentOption();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentSelect) {
      this.parentSelect.removeChild(this.index);
      // delete this.parentSelect.options[this.index];
      // delete this.parentSelect.multipleOptions[this.index];
      // delete this.parentSelect.selectedValue[this.index];
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-menu-item', {
    staticClass: "md-option",
    class: _vm.classes,
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "click": _vm.selectOption
    }
  }, [(_vm.parentSelect.multiple) ? _c('md-checkbox', {
    staticClass: "md-primary",
    model: {
      value: (_vm.check),
      callback: function($$v) {
        _vm.check = $$v
      },
      expression: "check"
    }
  }, [_c('span', {
    ref: "item"
  }, [_vm._t("default")], 2)]) : _c('span', {
    ref: "item"
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6189afdd", module.exports)
  }
}

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.54; }\n\n.THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.38; }\n\n.THEME_NAME.md-select-content .md-menu-item.md-selected, .THEME_NAME.md-select-content .md-menu-item.md-checked {\n  color: PRIMARY-COLOR; }\n"

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSidenav = __webpack_require__(272);

var _mdSidenav2 = _interopRequireDefault(_mdSidenav);

var _mdSidenav3 = __webpack_require__(276);

var _mdSidenav4 = _interopRequireDefault(_mdSidenav3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-sidenav', _mdSidenav2.default);

  Vue.material.styles.push(_mdSidenav4.default);
}
module.exports = exports['default'];

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(273)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(274),
  /* template */
  __webpack_require__(275),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdSidenav/mdSidenav.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSidenav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52912130", Component.options)
  } else {
    hotAPI.reload("data-v-52912130", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 273 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-sidenav',
  data: function data() {
    return {
      mdVisible: false
    };
  },

  mixins: [_mixin2.default],
  props: {
    mdSwipeable: Boolean,
    mdSwipeThreshold: {
      type: Number,
      default: 15
    },
    mdSwipeDistance: {
      type: Number,
      default: 100
    }
  },
  computed: {
    classes: function classes() {
      return this.mdVisible && 'md-active';
    }
  },
  methods: {
    show: function show() {
      this.open();
    },
    open: function open() {
      this.mdVisible = true;
      this.$el.focus();
      this.$emit('open');
    },
    close: function close() {
      this.mdVisible = false;
      this.$el.blur();
      this.$emit('close');
    },
    toggle: function toggle() {
      if (this.mdVisible) {
        this.close();
      } else {
        this.open();
      }
    },
    isHorizontallyInside: function isHorizontallyInside(positionX) {
      return positionX > 0 && positionX < this.mountedRect.left + this.mountedRect.width;
    },
    isVerticallyInside: function isVerticallyInside(positionY) {
      return positionY > 0 && positionY < this.mountedRect.top + this.mountedRect.height;
    },
    isFromStartWhenClosed: function isFromStartWhenClosed(positionX) {
      if (this.mdVisible) {
        return true;
      }

      return positionX < this.mdSwipeThreshold;
    },
    handleTouchStart: function handleTouchStart(event) {
      var positionX = event.touches[0].clientX - this.mountedRect.left;
      var positionY = event.touches[0].clientY - this.mountedRect.top;

      if (!this.isHorizontallyInside(positionX) || !this.isVerticallyInside(positionY) || !this.isFromStartWhenClosed(positionX)) {
        return;
      }

      this.initialTouchPosition = positionX;
      this.canMove = true;
    },
    handleTouchEnd: function handleTouchEnd() {
      this.canMove = false;
      this.initialTouchPosition = null;
    },
    handleTouchMove: function handleTouchMove(event) {
      if (!this.canMove) {
        return;
      }

      var positionX = event.touches[0].clientX;

      var difference = this.mdVisible ? this.initialTouchPosition - positionX : positionX - this.initialTouchPosition;

      var action = this.mdVisible ? 'close' : 'open';

      if (difference > this.mdSwipeDistance) {
        this[action]();
      }
    }
  },
  mounted: function mounted() {
    if (!this.mdSwipeable) {
      return;
    }

    this.mountedRect = this.$refs.backdrop.$el.getBoundingClientRect();
    this.initialTouchPosition = null;
    this.canMove = false;

    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchmove', this.handleTouchMove);
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.mdSwipeable) {
      return;
    }

    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }
}; //
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-sidenav",
    class: [_vm.themeClass, _vm.classes],
    attrs: {
      "tabindex": "0"
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.close($event)
      }
    }
  }, [_c('div', {
    staticClass: "md-sidenav-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('md-backdrop', {
    ref: "backdrop",
    staticClass: "md-sidenav-backdrop",
    on: {
      "close": _vm.close
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-52912130", module.exports)
  }
}

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-sidenav .md-sidenav-content {\n  background-color: BACKGROUND-COLOR;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSnackbar = __webpack_require__(278);

var _mdSnackbar2 = _interopRequireDefault(_mdSnackbar);

var _mdSnackbar3 = __webpack_require__(284);

var _mdSnackbar4 = _interopRequireDefault(_mdSnackbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-snackbar', _mdSnackbar2.default);

  Vue.material.styles.push(_mdSnackbar4.default);
}
module.exports = exports['default'];

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(279)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(280),
  /* template */
  __webpack_require__(283),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdSnackbar/mdSnackbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSnackbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6cb8878", Component.options)
  } else {
    hotAPI.reload("data-v-b6cb8878", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 279 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId = __webpack_require__(38);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _transitionEndEventName = __webpack_require__(42);

var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _manager = __webpack_require__(281);

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'md-snackbar',
  props: {
    id: [String, Number],
    mdPosition: {
      type: String,
      default: 'bottom center'
    },
    mdDuration: {
      type: [String, Number],
      default: 4000
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      snackbarId: this.id || 'snackbar-' + (0, _uniqueId2.default)(),
      removedSnackBarElementEventName: 'removedSnackBarElement',
      active: false,
      rootElement: {},
      snackbarElement: {},
      directionClass: null,
      closeTimeout: null,
      removedSnackBarElementEvent: null
    };
  },

  computed: {
    classes: function classes() {
      var cssClasses = {
        'md-active': this.active
      };

      this.directionClass = this.mdPosition.replace(/ /g, '-');

      cssClasses['md-position-' + this.directionClass] = true;

      return cssClasses;
    }
  },
  watch: {
    active: function active(_active) {
      var directionClass = 'md-has-toast-' + this.directionClass;
      var toastClass = 'md-has-toast';

      if (_active) {
        document.body.classList.add(directionClass);
        document.body.classList.add(toastClass);
      } else {
        document.body.classList.remove(directionClass);
        document.body.classList.remove(toastClass);
      }
    }
  },
  methods: {
    removeElement: function removeElement() {
      // if we have the element and we don't want it active anymore, remove it
      if (document.body.contains(this.snackbarElement) && !this.active) {
        var activeRipple = this.snackbarElement.querySelector('.md-ripple.md-active');

        if (activeRipple) {
          activeRipple.classList.remove('md-active');
        }

        document.body.removeChild(this.snackbarElement);
      }
      document.dispatchEvent(this.removedSnackBarElementEvent);
    },
    open: function open() {
      if (_manager2.default.current) {
        // we need to wait for the old element to finishing closing before we can open a new one
        document.removeEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
        document.addEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
        _manager2.default.current.close();
        return;
      }

      this.showElementAndStartTimer();
    },
    showElementAndStartTimer: function showElementAndStartTimer() {
      if (document.body.contains(this.snackbarElement)) {
        return;
      }
      document.removeEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
      _manager2.default.current = this;
      document.body.appendChild(this.snackbarElement);
      if (this.$refs.container !== null && this.$refs.container !== undefined) {
        window.getComputedStyle(this.$refs.container).backgroundColor;
      }
      this.active = true;
      this.$emit('open');
      if (this.mdDuration !== Infinity) {
        this.setCloseTimeout(this.mdDuration);
      }
      this.timeoutStartedAt = Date.now();
    },
    close: function close() {
      var _this = this;

      if (this.$refs.container) {
        //we set the flag to false here, because we need to inform the removeElement method that we really
        // want to remove the element - we're in closing action
        this.active = false;

        var removeElement = function removeElement() {
          document.removeEventListener(_transitionEndEventName2.default, removeElement);
          _this.removeElement();
        };

        _manager2.default.current = null;
        this.$emit('close');
        document.removeEventListener(_transitionEndEventName2.default, removeElement);
        document.addEventListener(_transitionEndEventName2.default, removeElement);
        this.clearCloseTimeout();
        this.pendingDuration = this.mdDuration;
      }
    },
    pauseTimeout: function pauseTimeout() {
      this.pendingDuration = this.pendingDuration - (Date.now() - this.timeoutStartedAt);
      this.timeoutStartedAt = 0;
      this.clearCloseTimeout();
    },
    resumeTimeout: function resumeTimeout() {
      this.timeoutStartedAt = Date.now();
      if (this.pendingDuration === Infinity) {
        return;
      }
      this.setCloseTimeout(this.pendingDuration);
    },
    setCloseTimeout: function setCloseTimeout(delay) {
      this.clearCloseTimeout();
      this.closeTimeout = window.setTimeout(this.close, delay);
    },
    clearCloseTimeout: function clearCloseTimeout() {
      if (!this.closeTimeout) {
        return;
      }
      window.clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.snackbarElement = _this2.$el;
      _this2.snackbarElement.parentNode.removeChild(_this2.snackbarElement);
      _this2.timeoutStartedAt = 0;
      _this2.pendingDuration = _this2.mdDuration;
    }));
    this.removedSnackBarElementEvent = new Event(this.removedSnackBarElementEventName);
  },
  beforeDestroy: function beforeDestroy() {
    this.clearCloseTimeout();
    this.active = false;
    this.removeElement();
  }
};
module.exports = exports['default'];

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(282);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _vue2.default({
  data: function data() {
    return {
      current: null
    };
  }
});

exports.default = manager;
module.exports = exports['default'];

/***/ }),
/* 282 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_282__;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-snackbar",
    class: [_vm.themeClass, _vm.classes],
    attrs: {
      "id": _vm.snackbarId
    },
    on: {
      "mouseenter": _vm.pauseTimeout,
      "mouseleave": _vm.resumeTimeout
    }
  }, [_c('div', {
    ref: "container",
    staticClass: "md-snackbar-container"
  }, [_c('div', {
    staticClass: "md-snackbar-content"
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6cb8878", module.exports)
  }
}

/***/ }),
/* 284 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME .md-snackbar .md-ink-ripple, .THEME_NAME.md-snackbar .md-ink-ripple {\n  color: #fff; }\n"

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSubheader = __webpack_require__(286);

var _mdSubheader2 = _interopRequireDefault(_mdSubheader);

var _mdSubheader3 = __webpack_require__(290);

var _mdSubheader4 = _interopRequireDefault(_mdSubheader3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-subheader', _mdSubheader2.default);

  Vue.material.styles.push(_mdSubheader4.default);
}
module.exports = exports['default'];

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(287)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(288),
  /* template */
  __webpack_require__(289),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdSubheader/mdSubheader.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSubheader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c68ea1c", Component.options)
  } else {
    hotAPI.reload("data-v-6c68ea1c", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 287 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-subheader',
  mixins: [_mixin2.default]
}; //
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.$parent.$options._componentTag === 'md-list') ? _c('li', {
    staticClass: "md-subheader",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2) : _c('div', {
    staticClass: "md-subheader",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c68ea1c", module.exports)
  }
}

/***/ }),
/* 290 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-subheader.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-subheader.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-subheader.md-warn {\n  color: WARN-COLOR; }\n"

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdToolbar = __webpack_require__(292);

var _mdToolbar2 = _interopRequireDefault(_mdToolbar);

var _mdToolbar3 = __webpack_require__(296);

var _mdToolbar4 = _interopRequireDefault(_mdToolbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-toolbar', _mdToolbar2.default);

  Vue.material.styles.push(_mdToolbar4.default);
}
module.exports = exports['default'];

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(293)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(294),
  /* template */
  __webpack_require__(295),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdToolbar/mdToolbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdToolbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44d8bce4", Component.options)
  } else {
    hotAPI.reload("data-v-44d8bce4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 293 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-toolbar',
  mixins: [_mixin2.default]
}; //
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-toolbar",
    class: [_vm.themeClass]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44d8bce4", module.exports)
  }
}

/***/ }),
/* 296 */
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-toolbar {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar .md-input-container.md-input-focused input,\n  .THEME_NAME.md-toolbar .md-input-container.md-input-focused textarea {\n    color: PRIMARY-CONTRAST;\n    text-shadow: 0 0 0 PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar .md-input-container.md-input-focused label,\n  .THEME_NAME.md-toolbar .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n    color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar .md-input-container:after {\n    background-color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar .md-input-container input,\n  .THEME_NAME.md-toolbar .md-input-container textarea {\n    color: PRIMARY-CONTRAST;\n    text-shadow: 0 0 0 PRIMARY-CONTRAST; }\n    .THEME_NAME.md-toolbar .md-input-container input::-webkit-input-placeholder,\n    .THEME_NAME.md-toolbar .md-input-container textarea::-webkit-input-placeholder {\n      color: PRIMARY-CONTRAST-0.54; }\n  .THEME_NAME.md-toolbar .md-input-container label,\n  .THEME_NAME.md-toolbar .md-input-container .md-icon:not(.md-icon-delete) {\n    color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-accent .md-input-container.md-input-focused input,\n    .THEME_NAME.md-toolbar.md-accent .md-input-container.md-input-focused textarea {\n      color: ACCENT-CONTRAST;\n      text-shadow: 0 0 0 ACCENT-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-accent .md-input-container.md-input-focused label,\n    .THEME_NAME.md-toolbar.md-accent .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-accent .md-input-container:after {\n      background-color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-accent .md-input-container input,\n    .THEME_NAME.md-toolbar.md-accent .md-input-container textarea {\n      color: ACCENT-CONTRAST;\n      text-shadow: 0 0 0 ACCENT-CONTRAST; }\n      .THEME_NAME.md-toolbar.md-accent .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-toolbar.md-accent .md-input-container textarea::-webkit-input-placeholder {\n        color: ACCENT-CONTRAST-0.54; }\n    .THEME_NAME.md-toolbar.md-accent .md-input-container label,\n    .THEME_NAME.md-toolbar.md-accent .md-input-container .md-icon:not(.md-icon-delete) {\n      color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-warn .md-input-container.md-input-focused input,\n    .THEME_NAME.md-toolbar.md-warn .md-input-container.md-input-focused textarea {\n      color: WARN-CONTRAST;\n      text-shadow: 0 0 0 WARN-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-warn .md-input-container.md-input-focused label,\n    .THEME_NAME.md-toolbar.md-warn .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-warn .md-input-container:after {\n      background-color: WARN-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-warn .md-input-container input,\n    .THEME_NAME.md-toolbar.md-warn .md-input-container textarea {\n      color: WARN-CONTRAST;\n      text-shadow: 0 0 0 WARN-CONTRAST; }\n      .THEME_NAME.md-toolbar.md-warn .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-toolbar.md-warn .md-input-container textarea::-webkit-input-placeholder {\n        color: WARN-CONTRAST-0.54; }\n    .THEME_NAME.md-toolbar.md-warn .md-input-container label,\n    .THEME_NAME.md-toolbar.md-warn .md-input-container .md-icon:not(.md-icon-delete) {\n      color: WARN-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-transparent {\n    background-color: transparent;\n    color: BACKGROUND-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container.md-input-focused input,\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container.md-input-focused textarea {\n      color: BACKGROUND-CONTRAST;\n      text-shadow: 0 0 0 BACKGROUND-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container.md-input-focused label,\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container.md-input-focused .md-icon:not(.md-icon-delete) {\n      color: BACKGROUND-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container:after {\n      background-color: BACKGROUND-CONTRAST; }\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container input,\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container textarea {\n      color: BACKGROUND-CONTRAST;\n      text-shadow: 0 0 0 BACKGROUND-CONTRAST; }\n      .THEME_NAME.md-toolbar.md-transparent .md-input-container input::-webkit-input-placeholder,\n      .THEME_NAME.md-toolbar.md-transparent .md-input-container textarea::-webkit-input-placeholder {\n        color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container label,\n    .THEME_NAME.md-toolbar.md-transparent .md-input-container .md-icon:not(.md-icon-delete) {\n      color: BACKGROUND-CONTRAST; }\n"

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdTooltip = __webpack_require__(298);

var _mdTooltip2 = _interopRequireDefault(_mdTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-tooltip', _mdTooltip2.default);
}
module.exports = exports['default'];

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(299)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(300),
  /* template */
  __webpack_require__(301),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdTooltip/mdTooltip.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTooltip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afcfcec4", Component.options)
  } else {
    hotAPI.reload("data-v-afcfcec4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 299 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(71);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _transitionEndEventName = __webpack_require__(42);

var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-tooltip',
  props: {
    mdDirection: {
      type: String,
      default: 'bottom'
    },
    mdDelay: {
      type: String,
      default: '0'
    }
  },
  data: function data() {
    return {
      active: false,
      parentClass: null,
      transitionOff: false,
      topPosition: false,
      leftPosition: false
    };
  },
  computed: {
    classes: function classes() {
      var cssClasses = {
        'md-active': this.active,
        'md-transition-off': this.transitionOff,
        'md-tooltip-top': this.mdDirection === 'top',
        'md-tooltip-right': this.mdDirection === 'right',
        'md-tooltip-bottom': this.mdDirection === 'bottom',
        'md-tooltip-left': this.mdDirection === 'left'
      };

      if (this.parentClass) {
        cssClasses[this.parentClass] = true;
      }

      return cssClasses;
    },
    style: function style() {
      return {
        'transition-delay': this.mdDelay + 'ms',
        top: this.topPosition + 'px',
        left: this.leftPosition + 'px'
      };
    }
  },
  watch: {
    mdDirection: function mdDirection() {
      this.calculateTooltipPosition();
    }
  },
  methods: {
    removeTooltips: function removeTooltips() {
      if (this.tooltipElement.parentNode) {
        this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
        this.tooltipElement.parentNode.removeChild(this.tooltipElement);
      }
    },
    calculateTooltipPosition: function calculateTooltipPosition() {
      var position = this.parentElement.getBoundingClientRect();
      var cssPosition = {};

      switch (this.mdDirection) {
        case 'top':
          cssPosition.top = position.top - this.$el.offsetHeight;
          cssPosition.left = position.left + position.width / 2;

          break;

        case 'right':
          cssPosition.top = position.top;
          cssPosition.left = position.left + position.width;

          break;

        case 'bottom':
          cssPosition.top = position.bottom;
          cssPosition.left = position.left + position.width / 2;

          break;

        case 'left':
          cssPosition.top = position.top;
          cssPosition.left = position.left - this.$el.offsetWidth;

          break;

        default:
          console.warn('Invalid ' + this.mdDirection + ' option to md-direction option');
      }

      this.topPosition = cssPosition.top;
      this.leftPosition = cssPosition.left;
    },
    generateTooltipClasses: function generateTooltipClasses() {
      var classes = [];

      [].concat((0, _toConsumableArray3.default)(this.parentElement.classList)).forEach((function (cssClass) {
        if (cssClass.indexOf('md-') >= 0 && cssClass !== 'md-active') {
          classes.push(cssClass + '-tooltip');
        }
      }));

      this.parentClass = classes.join(' ');
    },
    open: function open() {
      var _this = this;

      this.removeTooltips();

      this.$nextTick((function () {
        document.body.appendChild(_this.tooltipElement);
        getComputedStyle(_this.tooltipElement).top;
        _this.transitionOff = true;
        _this.generateTooltipClasses();
        _this.calculateTooltipPosition();

        window.setTimeout((function () {
          _this.transitionOff = false;
          _this.active = true;
        }), 10);
      }));
    },
    close: function close() {
      this.active = false;
      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
      this.tooltipElement.addEventListener(_transitionEndEventName2.default, this.removeTooltips);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.tooltipElement = _this2.$el;
      _this2.parentElement = _this2.tooltipElement.parentNode;

      _this2.$el.parentNode.removeChild(_this2.$el);

      _this2.parentElement.addEventListener('mouseenter', _this2.open);
      _this2.parentElement.addEventListener('focus', _this2.open);
      _this2.parentElement.addEventListener('mouseleave', _this2.close);
      _this2.parentElement.addEventListener('blur', _this2.close);
    }));
  },
  beforeDestroy: function beforeDestroy() {
    this.active = false;

    this.removeTooltips();

    if (this.parentElement) {
      this.parentElement.removeEventListener('mouseenter', this.open);
      this.parentElement.removeEventListener('focus', this.open);
      this.parentElement.removeEventListener('mouseleave', this.close);
      this.parentElement.removeEventListener('blur', this.close);
    }
  }
}; //
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "md-tooltip",
    class: _vm.classes,
    style: (_vm.style)
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-afcfcec4", module.exports)
  }
}

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdWhiteframe = __webpack_require__(303);

var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-whiteframe', _mdWhiteframe2.default);
}
module.exports = exports['default'];

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(304)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(305),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/dikunin/Projects/vue-material/src/components/mdWhiteframe/mdWhiteframe.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-489a6ee4", Component.options)
  } else {
    hotAPI.reload("data-v-489a6ee4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 304 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//

exports.default = {
  name: 'md-whiteframe',
  props: {
    mdElevation: {
      type: [String, Number],
      default: 1
    },
    mdTag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    classes: function classes() {
      var numberedElevation = parseInt(this.mdElevation, 10);
      var elevationClass = 'md-whiteframe-';

      if (!isNaN(numberedElevation) && typeof numberedElevation === 'number') {
        elevationClass += numberedElevation;
        elevationClass += 'dp';
      } else if (this.mdElevation.indexOf('dp') > -1) {
        elevationClass += this.mdElevation;
      }

      return elevationClass;
    }
  },
  render: function render(createElement) {
    return createElement(this.mdTag, {
      staticClass: 'md-whiteframe',
      class: this.classes
    }, this.$slots.default);
  }
};
module.exports = exports['default'];

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(307);


/***/ }),
/* 307 */
/***/ ((function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(80);

var _core2 = _interopRequireDefault(_core);

var _mdAvatar = __webpack_require__(95);

var _mdAvatar2 = _interopRequireDefault(_mdAvatar);

var _mdBackdrop = __webpack_require__(101);

var _mdBackdrop2 = _interopRequireDefault(_mdBackdrop);

var _mdButton = __webpack_require__(106);

var _mdButton2 = _interopRequireDefault(_mdButton);

var _mdCard = __webpack_require__(112);

var _mdCard2 = _interopRequireDefault(_mdCard);

var _mdCheckbox = __webpack_require__(145);

var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);

var _mdDialog = __webpack_require__(151);

var _mdDialog2 = _interopRequireDefault(_mdDialog);

var _mdInputContainer = __webpack_require__(175);

var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);

var _mdList = __webpack_require__(196);

var _mdList2 = _interopRequireDefault(_mdList);

var _mdMenu = __webpack_require__(236);

var _mdMenu2 = _interopRequireDefault(_mdMenu);

var _mdProgress = __webpack_require__(250);

var _mdProgress2 = _interopRequireDefault(_mdProgress);

var _mdRadio = __webpack_require__(256);

var _mdRadio2 = _interopRequireDefault(_mdRadio);

var _mdSelect = __webpack_require__(262);

var _mdSelect2 = _interopRequireDefault(_mdSelect);

var _mdSidenav = __webpack_require__(271);

var _mdSidenav2 = _interopRequireDefault(_mdSidenav);

var _mdSnackbar = __webpack_require__(277);

var _mdSnackbar2 = _interopRequireDefault(_mdSnackbar);

var _mdSubheader = __webpack_require__(285);

var _mdSubheader2 = _interopRequireDefault(_mdSubheader);

var _mdToolbar = __webpack_require__(291);

var _mdToolbar2 = _interopRequireDefault(_mdToolbar);

var _mdTooltip = __webpack_require__(297);

var _mdTooltip2 = _interopRequireDefault(_mdTooltip);

var _mdWhiteframe = __webpack_require__(302);

var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  MdCore: _core2.default,
  MdAvatar: _mdAvatar2.default,
  MdButton: _mdButton2.default,
  MdBackdrop: _mdBackdrop2.default,
  MdCard: _mdCard2.default,
  MdCheckbox: _mdCheckbox2.default,
  MdDialog: _mdDialog2.default,
  MdInputContainer: _mdInputContainer2.default,
  MdList: _mdList2.default,
  MdMenu: _mdMenu2.default,
  MdProgress: _mdProgress2.default,
  MdRadio: _mdRadio2.default,
  MdSelect: _mdSelect2.default,
  MdSidenav: _mdSidenav2.default,
  MdSnackbar: _mdSnackbar2.default,
  MdSubheader: _mdSubheader2.default,
  MdToolbar: _mdToolbar2.default,
  MdTooltip: _mdTooltip2.default,
  MdWhiteframe: _mdWhiteframe2.default
};

options.install = function (Vue) {
  for (var component in options) {
    var componentInstaller = options[component];

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller);
    }
  }
};

exports.default = options;
module.exports = exports['default'];

/***/ }))
/******/ ]);
}));