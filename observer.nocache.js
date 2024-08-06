/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;
__webpack_unused_export__ = ({
  value: true
});
exports.Y = wrapper;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _currentScript() {
  try {
    throw new Error();
  } catch (err) {
    var stackDetails = err.stack.split('\n');
    var scriptContent = null;
    // Extract script content from the stack trace
    for (var i = 0; i < stackDetails.length; i++) {
      var line = stackDetails[i].trim();
      var match = line.match(/(?:at\s+)?(?:\S+\s+)?(?:\(?.*\)?@)?(\S+):(\d+):(\d+)/);
      if (match) {
        var fileName = match[1];
        var lineNumber = parseInt(match[2], 10);
        var columnNumber = parseInt(match[3], 10);
        if (fileName && lineNumber && columnNumber) {
          scriptContent = stackDetails[i];
          break;
        }
      }
    }
    // Find the script element by content
    if (scriptContent) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scriptContent.indexOf(scripts[i].src) !== -1) {
          return scripts[i];
        }
      }
    }
    // If no match, return null
    return null;
  }
}
var $cur_script = document.currentScript;
if ($cur_script == null) {
  $cur_script = _currentScript();
}
var $wfx_namespace = $cur_script.getAttribute("data-wfx-namespace");
var $wfx_is_sso = $cur_script.getAttribute("data-wfx-is-sso");
var _wnd;
if ($wfx_is_sso == "true") {
  if ($wfx_namespace) {
    _wnd = window[$wfx_namespace];
  } else {
    _wnd = window;
  }
} else {
  if ($wfx_namespace) {
    _wnd = window.parent[$wfx_namespace];
  } else {
    _wnd = window.parent;
  }
}
function observer(resolve, reject) {
  var $wnd_0 = window,
    $doc_0 = document,
    gwtOnLoad_0,
    bodyDone,
    base = '',
    metaProps = {},
    values = [],
    providers = [],
    answers = [],
    softPermutationId = 0,
    onLoadErrorFunc,
    propertyErrorFunc;
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode() {
    var result = false;
    try {
      var query = $wnd_0.location.search;
      return (query.indexOf('gwt.codesvr=') != -1 || query.indexOf('gwt.hosted=') != -1 || $wnd_0.external && $wnd_0.external.gwtOnLoad) && query.indexOf('gwt.hybrid') == -1;
    } catch (e) {}
    isHostedMode = function isHostedMode() {
      return result;
    };
    return result;
  }
  function maybeStartModule() {
    if (gwtOnLoad_0 && bodyDone) {
      gwtOnLoad_0(onLoadErrorFunc, 'observer', base, softPermutationId);
      resolve('observer');
    }
  }
  function getScript(scriptId) {
    var scriptNode = document.createElement('script');
    scriptNode.id = scriptId;
    return scriptNode;
  }
  function computeScriptBase() {
    var thisScript,
      markerId = '__gwt_marker_observer',
      markerScript;
    $doc_0.body.appendChild(getScript(markerId));
    markerScript = $doc_0.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != 'SCRIPT') {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path) {
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0 ? path.substring(0, slashIndex + 1) : '';
    }
    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == '') {
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      } else {
        base = getDirectoryOfFile($doc_0.location.href);
      }
    } else if (base.match(/^\w+:\/\//)) {} else {
      var img = $doc_0.createElement('img');
      img.src = base + 'clear.cache.gif';
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }
  function processMetas() {
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i],
        name_0 = meta.getAttribute('name'),
        content_0;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_0,
              eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_0 = content_0.substring(0, eq);
              value_0 = content_0.substring(eq + 1);
            } else {
              name_0 = content_0;
              value_0 = '';
            }
            metaProps[name_0] = value_0;
          }
        } else if (name_0 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {} catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        } else if (name_0 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {} catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }
  var __gwt_isKnownPropertyValue = function __gwt_isKnownPropertyValue(propName, propValue) {
    return propValue in values[propName];
  };
  var __gwt_getMetaProperty = function __gwt_getMetaProperty(name_0) {
    var value_0 = metaProps[name_0];
    return value_0 == null ? null : value_0;
  };
  function unflattenKeylistIntoAnswers(propValArray, value_0) {
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value_0;
  }
  function computePropValue(propName) {
    var value_0 = providers[propName](),
      allowedValuesMap = values[propName];
    if (value_0 in allowedValuesMap) {
      return value_0;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value_0);
    }
    throw null;
  }
  providers['user.agent'] = function () {
    var ua = navigator.userAgent.toLowerCase();
    var docMode = $doc_0.documentMode;
    if (function () {
      return ua.indexOf('webkit') != -1;
    }()) return 'safari';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 10 && docMode < 11;
    }()) return 'ie10';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 9 && docMode < 11;
    }()) return 'ie9';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 8 && docMode < 11;
    }()) return 'ie8';
    if (function () {
      return ua.indexOf('gecko') != -1 || docMode >= 11;
    }()) return 'gecko1_8';
    return '';
  };
  values['user.agent'] = {
    'gecko1_8': 0,
    'ie10': 1,
    'ie8': 2,
    'ie9': 3,
    'safari': 4
  };
  observer.onScriptLoad = function (gwtOnLoadFunc) {
    observer = null;
    gwtOnLoad_0 = gwtOnLoadFunc;
    maybeStartModule();
  };
  computeScriptBase();
  processMetas();
  try {
    var strongName;
    unflattenKeylistIntoAnswers(['gecko1_8'], '668391DAA089FEA2BC2C2E4ADF570F2E');
    unflattenKeylistIntoAnswers(['safari'], '668391DAA089FEA2BC2C2E4ADF570F2E' + ':1');
    strongName = answers[computePropValue('user.agent')];
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = Number(strongName.substring(idx + 1));
    }
  } catch (e) {
    return;
  }
  var onBodyDoneTimerId;
  function onBodyDone() {
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }
  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function () {
      onBodyDone();
    }, false);
  }
  var onBodyDoneTimerId = setInterval(function () {
    if (/loaded|complete/.test($doc_0.readyState)) {
      onBodyDone();
    }
  }, 50);
}
function linkModuleCode() {
  var $gwt_version = "0.0.0";
  var $wnd = window;
  var $doc = $wnd.document;
  var $moduleName, $moduleBase;
  var $stats = $wnd.__gwtStatsEvent ? function (a) {
    $wnd.__gwtStatsEvent(a);
  } : null;
  var $strongName = '668391DAA089FEA2BC2C2E4ADF570F2E';
  var $intern_0 = {
      3: 1,
      4: 1
    },
    $intern_1 = {
      3: 1,
      7: 1,
      6: 1,
      5: 1
    },
    $intern_2 = 4194303,
    $intern_3 = 1048575,
    $intern_4 = 524288,
    $intern_5 = 4194304,
    $intern_6 = 17592186044416,
    $intern_7 = -17592186044416,
    $intern_8 = {
      3: 1,
      20: 1,
      5: 1
    },
    $intern_9 = {
      32: 1,
      3: 1,
      4: 1
    },
    $intern_10 = {
      11: 1
    },
    $intern_11 = {
      42: 1,
      3: 1,
      4: 1
    },
    $intern_12 = {
      12: 1,
      31: 1
    },
    $intern_13 = {
      3: 1,
      12: 1,
      41: 1
    },
    $intern_14 = {
      3: 1,
      12: 1,
      31: 1
    };
  var _,
    prototypesByTypeId_0,
    initFnList_0,
    permutationId = -1;
  function create_com_google_gwt_useragent_client_UserAgent() {
    if (permutationId == 0) {
      return new UserAgentImplGecko1_8();
    }
    return new UserAgentImplSafari();
  }
  function setGwtProperty(propertyName, propertyValue) {
    (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && _typeof(window['$gwt']) === 'object' && (window['$gwt'][propertyName] = propertyValue);
  }
  function gwtOnLoad_0(errFn, modName, modBase, softPermutationId) {
    ensureModuleInit();
    var initFnList = initFnList_0;
    $moduleName = modName;
    $moduleBase = modBase;
    permutationId = softPermutationId;
    function initializeModules() {
      for (var i = 0; i < initFnList.length; i++) {
        initFnList[i]();
      }
    }
    if (errFn) {
      try {
        $entry(initializeModules)();
      } catch (e) {
        errFn(modName, e);
      }
    } else {
      $entry(initializeModules)();
    }
  }
  function ensureModuleInit() {
    initFnList_0 == null && (initFnList_0 = []);
  }
  function addInitFunctions() {
    ensureModuleInit();
    var initFnList = initFnList_0;
    for (var i = 0; i < arguments.length; i++) {
      initFnList.push(arguments[i]);
    }
  }
  function typeMarkerFn() {}
  function toString_2(object) {
    var number;
    if (Array.isArray(object) && object.typeMarker === typeMarkerFn) {
      return $getName(getClass__Ljava_lang_Class___devirtual$(object)) + '@' + (number = hashCode__I__devirtual$(object) >>> 0, number.toString(16));
    }
    return object.toString();
  }
  function portableObjCreate(obj) {
    function F() {}
    ;
    F.prototype = obj || {};
    return new F();
  }
  function makeLambdaFunction(samMethod, ctor, ctorArguments) {
    var lambda = function lambda() {
      return samMethod.apply(lambda, arguments);
    };
    ctor.apply(lambda, ctorArguments);
    return lambda;
  }
  function emptyMethod() {}
  function defineClass(typeId, superTypeIdOrPrototype, castableTypeMap) {
    var prototypesByTypeId = prototypesByTypeId_0,
      superPrototype;
    var prototype_0 = prototypesByTypeId[typeId];
    var clazz = prototype_0 instanceof Array ? prototype_0[0] : null;
    if (prototype_0 && !clazz) {
      _ = prototype_0;
    } else {
      _ = (superPrototype = superTypeIdOrPrototype && superTypeIdOrPrototype.prototype, !superPrototype && (superPrototype = prototypesByTypeId_0[superTypeIdOrPrototype]), portableObjCreate(superPrototype));
      _.castableTypeMap = castableTypeMap;
      !superTypeIdOrPrototype && (_.typeMarker = typeMarkerFn);
      prototypesByTypeId[typeId] = _;
    }
    for (var i = 3; i < arguments.length; ++i) {
      arguments[i].prototype = _;
    }
    clazz && (_.___clazz = clazz);
  }
  function bootstrap() {
    prototypesByTypeId_0 = {};
    !Array.isArray && (Array.isArray = function (vArg) {
      return Object.prototype.toString.call(vArg) === '[object Array]';
    });
    function now_0() {
      return new Date().getTime();
    }
    !Date.now && (Date.now = now_0);
  }
  bootstrap();
  function Object_0() {}
  function equals_Ljava_lang_Object__Z__devirtual$(this$static, other) {
    return instanceOfString(this$static) ? $equals_0(this$static, other) : instanceOfDouble(this$static) ? (checkCriticalNotNull(this$static), this$static === other) : instanceOfBoolean(this$static) ? (checkCriticalNotNull(this$static), this$static === other) : hasJavaObjectVirtualDispatch(this$static) ? this$static.equals_0(other) : isJavaArray(this$static) ? this$static === other : $equals(this$static, other);
  }
  function getClass__Ljava_lang_Class___devirtual$(this$static) {
    return instanceOfString(this$static) ? Ljava_lang_String_2_classLit : instanceOfDouble(this$static) ? Ljava_lang_Double_2_classLit : instanceOfBoolean(this$static) ? Ljava_lang_Boolean_2_classLit : hasJavaObjectVirtualDispatch(this$static) ? this$static.___clazz : isJavaArray(this$static) ? this$static.___clazz : this$static.___clazz || Array.isArray(this$static) && getClassLiteralForArray(Lcom_google_gwt_core_client_JavaScriptObject_2_classLit, 1) || Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
  }
  function hashCode__I__devirtual$(this$static) {
    return instanceOfString(this$static) ? getHashCode_0(this$static) : instanceOfDouble(this$static) ? round_int((checkCriticalNotNull(this$static), this$static)) : instanceOfBoolean(this$static) ? (checkCriticalNotNull(this$static), this$static) ? 1231 : 1237 : hasJavaObjectVirtualDispatch(this$static) ? this$static.hashCode_0() : isJavaArray(this$static) ? getHashCode(this$static) : !!this$static && !!this$static.hashCode ? this$static.hashCode() : getHashCode(this$static);
  }
  defineClass(1, null, {}, Object_0);
  _.equals_0 = function equals(other) {
    return this === other;
  };
  _.getClass_0 = function getClass_0() {
    return this.___clazz;
  };
  _.hashCode_0 = function hashCode_0() {
    return getHashCode(this);
  };
  _.toString_0 = function toString_0() {
    var number;
    return $getName(getClass__Ljava_lang_Class___devirtual$(this)) + '@' + (number = hashCode__I__devirtual$(this) >>> 0, number.toString(16));
  };
  _.equals = function (other) {
    return this.equals_0(other);
  };
  _.hashCode = function () {
    return this.hashCode_0();
  };
  _.toString = function () {
    return this.toString_0();
  };
  function canCast(src_0, dstId) {
    if (instanceOfString(src_0)) {
      return !!stringCastMap[dstId];
    } else if (src_0.castableTypeMap) {
      return !!src_0.castableTypeMap[dstId];
    } else if (instanceOfDouble(src_0)) {
      return !!doubleCastMap[dstId];
    } else if (instanceOfBoolean(src_0)) {
      return !!booleanCastMap[dstId];
    }
    return false;
  }
  function castTo(src_0, dstId) {
    checkCriticalType(src_0 == null || canCast(src_0, dstId));
    return src_0;
  }
  function castToBoolean(src_0) {
    checkCriticalType(src_0 == null || instanceOfBoolean(src_0));
    return src_0;
  }
  function castToJso(src_0) {
    checkCriticalType(src_0 == null || isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn));
    return src_0;
  }
  function castToString(src_0) {
    checkCriticalType(src_0 == null || instanceOfString(src_0));
    return src_0;
  }
  function hasJavaObjectVirtualDispatch(src_0) {
    return !Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
  }
  function instanceOf(src_0, dstId) {
    return src_0 != null && canCast(src_0, dstId);
  }
  function instanceOfBoolean(src_0) {
    return typeof src_0 === 'boolean';
  }
  function instanceOfDouble(src_0) {
    return typeof src_0 === 'number';
  }
  function instanceOfJso(src_0) {
    return src_0 != null && isJsObjectOrFunction(src_0) && !(src_0.typeMarker === typeMarkerFn);
  }
  function instanceOfString(src_0) {
    return typeof src_0 === 'string';
  }
  function isJsObjectOrFunction(src_0) {
    return _typeof(src_0) === 'object' || typeof src_0 === 'function';
  }
  function maskUndefined(src_0) {
    return src_0 == null ? null : src_0;
  }
  function round_int(x_0) {
    return Math.max(Math.min(x_0, 2147483647), -2147483648) | 0;
  }
  var booleanCastMap, doubleCastMap, stringCastMap;
  function $ensureNamesAreInitialized(this$static) {
    if (this$static.typeName != null) {
      return;
    }
    initializeNames(this$static);
  }
  function $getName(this$static) {
    $ensureNamesAreInitialized(this$static);
    return this$static.typeName;
  }
  function Class() {
    ++nextSequentialId;
    this.typeName = null;
    this.simpleName = null;
    this.packageName = null;
    this.compoundName = null;
    this.canonicalName = null;
    this.typeId = null;
    this.arrayLiterals = null;
  }
  function createClassObject(packageName, compoundClassName) {
    var clazz;
    clazz = new Class();
    clazz.packageName = packageName;
    clazz.compoundName = compoundClassName;
    return clazz;
  }
  function createForClass(packageName, compoundClassName, typeId, superclass) {
    var clazz;
    clazz = createClassObject(packageName, compoundClassName);
    maybeSetClassLiteral(typeId, clazz);
    clazz.superclass = superclass;
    return clazz;
  }
  function createForEnum(packageName, compoundClassName, typeId, superclass, enumConstantsFunc) {
    var clazz;
    clazz = createClassObject(packageName, compoundClassName);
    maybeSetClassLiteral(typeId, clazz);
    clazz.modifiers = enumConstantsFunc ? 8 : 0;
    clazz.superclass = superclass;
    return clazz;
  }
  function createForInterface(packageName, compoundClassName) {
    var clazz;
    clazz = createClassObject(packageName, compoundClassName);
    clazz.modifiers = 2;
    return clazz;
  }
  function getClassLiteralForArray_0(leafClass, dimensions) {
    var arrayLiterals = leafClass.arrayLiterals = leafClass.arrayLiterals || [];
    return arrayLiterals[dimensions] || (arrayLiterals[dimensions] = leafClass.createClassLiteralForArray(dimensions));
  }
  function getPrototypeForClass(clazz) {
    if (clazz.isPrimitive()) {
      return null;
    }
    var typeId = clazz.typeId;
    return prototypesByTypeId_0[typeId];
  }
  function initializeNames(clazz) {
    if (clazz.isArray_0()) {
      var componentType = clazz.componentType;
      componentType.isPrimitive() ? clazz.typeName = '[' + componentType.typeId : !componentType.isArray_0() ? clazz.typeName = '[L' + componentType.getName() + ';' : clazz.typeName = '[' + componentType.getName();
      clazz.canonicalName = componentType.getCanonicalName() + '[]';
      clazz.simpleName = componentType.getSimpleName() + '[]';
      return;
    }
    var packageName = clazz.packageName;
    var compoundName = clazz.compoundName;
    compoundName = compoundName.split('/');
    clazz.typeName = join_0('.', [packageName, join_0('$', compoundName)]);
    clazz.canonicalName = join_0('.', [packageName, join_0('.', compoundName)]);
    clazz.simpleName = compoundName[compoundName.length - 1];
  }
  function join_0(separator, strings) {
    var i = 0;
    while (!strings[i] || strings[i] == '') {
      i++;
    }
    var result = strings[i++];
    for (; i < strings.length; i++) {
      if (!strings[i] || strings[i] == '') {
        continue;
      }
      result += separator + strings[i];
    }
    return result;
  }
  function maybeSetClassLiteral(typeId, clazz) {
    var proto;
    if (!typeId) {
      return;
    }
    clazz.typeId = typeId;
    var prototype_0 = getPrototypeForClass(clazz);
    if (!prototype_0) {
      prototypesByTypeId_0[typeId] = [clazz];
      return;
    }
    prototype_0.___clazz = clazz;
  }
  defineClass(44, 1, {
    44: 1
  }, Class);
  _.createClassLiteralForArray = function createClassLiteralForArray(dimensions) {
    var clazz;
    clazz = new Class();
    clazz.modifiers = 4;
    clazz.superclass = Ljava_lang_Object_2_classLit;
    dimensions > 1 ? clazz.componentType = getClassLiteralForArray_0(this, dimensions - 1) : clazz.componentType = this;
    return clazz;
  };
  _.getCanonicalName = function getCanonicalName() {
    $ensureNamesAreInitialized(this);
    return this.canonicalName;
  };
  _.getName = function getName() {
    return $getName(this);
  };
  _.getSimpleName = function getSimpleName() {
    $ensureNamesAreInitialized(this);
    return this.simpleName;
  };
  _.isArray_0 = function isArray() {
    return (this.modifiers & 4) != 0;
  };
  _.isPrimitive = function isPrimitive_0() {
    return (this.modifiers & 1) != 0;
  };
  _.toString_0 = function toString_5() {
    return ((this.modifiers & 2) != 0 ? 'interface ' : (this.modifiers & 1) != 0 ? '' : 'class ') + ($ensureNamesAreInitialized(this), this.typeName);
  };
  _.modifiers = 0;
  var nextSequentialId = 1;
  var Ljava_lang_Object_2_classLit = createForClass('java.lang', 'Object', 1, null);
  var Ljava_lang_Class_2_classLit = createForClass('java.lang', 'Class', 44, Ljava_lang_Object_2_classLit);
  function $$init(this$static) {
    this$static.stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 15, 0, 0, 1);
  }
  function $fillInStackTrace(this$static) {
    if (this$static.writetableStackTrace) {
      this$static.backingJsObject !== '__noinit__' && this$static.initializeBackingError();
      this$static.stackTrace = null;
    }
    return this$static;
  }
  function $printStackTraceImpl(this$static, out, ident) {
    var t, t$array, t$index, t$max, theCause;
    $printStackTraceItems(this$static);
    for (t$array = (this$static.suppressedExceptions == null && (this$static.suppressedExceptions = initUnidimensionalArray(Ljava_lang_Throwable_2_classLit, $intern_0, 5, 0, 0, 1)), this$static.suppressedExceptions), t$index = 0, t$max = t$array.length; t$index < t$max; ++t$index) {
      t = t$array[t$index];
      $printStackTraceImpl(t, out, '\t' + ident);
    }
    theCause = this$static.cause;
    !!theCause && $printStackTraceImpl(theCause, out, ident);
  }
  function $printStackTraceItems(this$static) {
    var element$array, element$index, element$max, stackTrace;
    for (element$array = (this$static.stackTrace == null && (this$static.stackTrace = ($clinit_StackTraceCreator(), stackTrace = collector_1.getStackTrace(this$static), dropInternalFrames(stackTrace))), this$static.stackTrace), element$index = 0, element$max = element$array.length; element$index < element$max; ++element$index);
  }
  function $setBackingJsObject(this$static, backingJsObject) {
    this$static.backingJsObject = backingJsObject;
    backingJsObject != null && setPropertySafe(backingJsObject, '__java$exception', this$static);
  }
  function $toString(this$static, message) {
    var className;
    className = $getName(this$static.___clazz);
    return message == null ? className : className + ': ' + message;
  }
  function fixIE(e) {
    if (!('stack' in e)) {
      try {
        throw e;
      } catch (ignored) {}
    }
    return e;
  }
  defineClass(5, 1, {
    3: 1,
    5: 1
  });
  _.createError = function createError(msg) {
    return new Error(msg);
  };
  _.getMessage_0 = function getMessage() {
    return this.detailMessage;
  };
  _.initializeBackingError = function initializeBackingError() {
    var className, errorMessage, message;
    message = this.detailMessage == null ? null : this.detailMessage.replace(new RegExp('\n', 'g'), ' ');
    errorMessage = (className = $getName(this.___clazz), message == null ? className : className + ': ' + message);
    $setBackingJsObject(this, fixIE(this.createError(errorMessage)));
    captureStackTrace(this);
  };
  _.toString_0 = function toString_1() {
    return $toString(this, this.getMessage_0());
  };
  _.backingJsObject = '__noinit__';
  _.writetableStackTrace = true;
  var Ljava_lang_Throwable_2_classLit = createForClass('java.lang', 'Throwable', 5, Ljava_lang_Object_2_classLit);
  defineClass(7, 5, {
    3: 1,
    7: 1,
    5: 1
  });
  var Ljava_lang_Exception_2_classLit = createForClass('java.lang', 'Exception', 7, Ljava_lang_Throwable_2_classLit);
  function RuntimeException() {
    $$init(this);
    $fillInStackTrace(this);
    this.initializeBackingError();
  }
  function RuntimeException_0(message) {
    $$init(this);
    this.detailMessage = message;
    $fillInStackTrace(this);
    this.initializeBackingError();
  }
  defineClass(6, 7, $intern_1, RuntimeException_0);
  var Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang', 'RuntimeException', 6, Ljava_lang_Exception_2_classLit);
  defineClass(56, 6, $intern_1);
  var Ljava_lang_JsException_2_classLit = createForClass('java.lang', 'JsException', 56, Ljava_lang_RuntimeException_2_classLit);
  defineClass(80, 56, $intern_1);
  var Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit = createForClass('com.google.gwt.core.client.impl', 'JavaScriptExceptionBase', 80, Ljava_lang_JsException_2_classLit);
  function $clinit_JavaScriptException() {
    $clinit_JavaScriptException = emptyMethod;
    NOT_SET = new Object_0();
  }
  function $ensureInit(this$static) {
    var exception;
    if (this$static.message_0 == null) {
      exception = maskUndefined(this$static.e) === maskUndefined(NOT_SET) ? null : this$static.e;
      this$static.name_0 = exception == null ? 'null' : instanceOfJso(exception) ? getExceptionName0(castToJso(exception)) : instanceOfString(exception) ? 'String' : $getName(getClass__Ljava_lang_Class___devirtual$(exception));
      this$static.description = this$static.description + ': ' + (instanceOfJso(exception) ? getExceptionDescription0(castToJso(exception)) : exception + '');
      this$static.message_0 = '(' + this$static.name_0 + ') ' + this$static.description;
    }
  }
  function JavaScriptException(e) {
    $clinit_JavaScriptException();
    $$init(this);
    $fillInStackTrace(this);
    this.backingJsObject = e;
    e != null && setPropertySafe(e, '__java$exception', this);
    this.detailMessage = e == null ? 'null' : toString_2(e);
    this.description = '';
    this.e = e;
    this.description = '';
  }
  function getExceptionDescription0(e) {
    return e == null ? null : e.message;
  }
  function getExceptionName0(e) {
    return e == null ? null : e.name;
  }
  defineClass(45, 80, {
    45: 1,
    3: 1,
    7: 1,
    6: 1,
    5: 1
  }, JavaScriptException);
  _.getMessage_0 = function getMessage_0() {
    $ensureInit(this);
    return this.message_0;
  };
  _.getThrown = function getThrown() {
    return maskUndefined(this.e) === maskUndefined(NOT_SET) ? null : this.e;
  };
  var NOT_SET;
  var Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptException', 45, Lcom_google_gwt_core_client_impl_JavaScriptExceptionBase_2_classLit);
  function $equals(this$static, other) {
    return !!this$static && !!this$static.equals ? this$static.equals(other) : maskUndefined(this$static) === maskUndefined(other);
  }
  var Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client', 'JavaScriptObject$', 0, Ljava_lang_Object_2_classLit);
  function now_1() {
    if (Date.now) {
      return Date.now();
    }
    return new Date().getTime();
  }
  defineClass(138, 1, {});
  var Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client', 'Scheduler', 138, Ljava_lang_Object_2_classLit);
  function $clinit_Impl() {
    $clinit_Impl = emptyMethod;
    !!($clinit_StackTraceCreator(), collector_1);
  }
  function apply_0(jsFunction, thisObj, args) {
    return jsFunction.apply(thisObj, args);
    var __0;
  }
  function enter() {
    var now_0;
    if (entryDepth != 0) {
      now_0 = now_1();
      if (now_0 - watchdogEntryDepthLastScheduled > 2000) {
        watchdogEntryDepthLastScheduled = now_0;
        watchdogEntryDepthTimerId = $wnd.setTimeout(watchdogEntryDepthRun, 10);
      }
    }
    if (entryDepth++ == 0) {
      $flushEntryCommands(($clinit_SchedulerImpl(), INSTANCE));
      return true;
    }
    return false;
  }
  function entry_0(jsFunction) {
    $clinit_Impl();
    return function () {
      return entry0(jsFunction, this, arguments);
      var __0;
    };
  }
  function entry0(jsFunction, thisObj, args) {
    var initialEntry;
    initialEntry = enter();
    try {
      return apply_0(jsFunction, thisObj, args);
    } finally {
      exit(initialEntry);
    }
  }
  function exit(initialEntry) {
    initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl(), INSTANCE));
    --entryDepth;
    if (initialEntry) {
      if (watchdogEntryDepthTimerId != -1) {
        watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
        watchdogEntryDepthTimerId = -1;
      }
    }
  }
  function reportToBrowser(e) {
    $clinit_Impl();
    $wnd.setTimeout(function () {
      throw e;
    }, 0);
  }
  function watchdogEntryDepthCancel(timerId) {
    $wnd.clearTimeout(timerId);
  }
  function watchdogEntryDepthRun() {
    entryDepth != 0 && (entryDepth = 0);
    watchdogEntryDepthTimerId = -1;
  }
  var entryDepth = 0,
    watchdogEntryDepthLastScheduled = 0,
    watchdogEntryDepthTimerId = -1;
  function $clinit_SchedulerImpl() {
    $clinit_SchedulerImpl = emptyMethod;
    INSTANCE = new SchedulerImpl();
  }
  function $flushEntryCommands(this$static) {
    var oldQueue, rescheduled;
    if (this$static.entryCommands) {
      rescheduled = null;
      do {
        oldQueue = this$static.entryCommands;
        this$static.entryCommands = null;
        rescheduled = runScheduledTasks(oldQueue, rescheduled);
      } while (this$static.entryCommands);
      this$static.entryCommands = rescheduled;
    }
  }
  function $flushFinallyCommands(this$static) {
    var oldQueue, rescheduled;
    if (this$static.finallyCommands) {
      rescheduled = null;
      do {
        oldQueue = this$static.finallyCommands;
        this$static.finallyCommands = null;
        rescheduled = runScheduledTasks(oldQueue, rescheduled);
      } while (this$static.finallyCommands);
      this$static.finallyCommands = rescheduled;
    }
  }
  function SchedulerImpl() {}
  function push_0(queue, task) {
    !queue && (queue = []);
    queue[queue.length] = task;
    return queue;
  }
  function runScheduledTasks(tasks, rescheduled) {
    var e, i, j, t;
    for (i = 0, j = tasks.length; i < j; i++) {
      t = tasks[i];
      try {
        t[1] ? t[0].$_nullMethod() && (rescheduled = push_0(rescheduled, t)) : t[0].$_nullMethod();
      } catch ($e0) {
        $e0 = toJava($e0);
        if (instanceOf($e0, 5)) {
          e = $e0;
          $clinit_Impl();
          reportToBrowser(instanceOf(e, 45) ? castTo(e, 45).getThrown() : e);
        } else throw toJs($e0);
      }
    }
    return rescheduled;
  }
  defineClass(89, 138, {}, SchedulerImpl);
  var INSTANCE;
  var Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl', 'SchedulerImpl', 89, Lcom_google_gwt_core_client_Scheduler_2_classLit);
  function $clinit_StackTraceCreator() {
    $clinit_StackTraceCreator = emptyMethod;
    var c, enforceLegacy;
    enforceLegacy = !supportsErrorStack();
    c = new StackTraceCreator$CollectorModernNoSourceMap();
    collector_1 = enforceLegacy ? new StackTraceCreator$CollectorLegacy() : c;
  }
  function captureStackTrace(error) {
    $clinit_StackTraceCreator();
    collector_1.collect(error);
  }
  function dropInternalFrames(stackTrace) {
    var dropFrameUntilFnName, dropFrameUntilFnName2, i, numberOfFramesToSearch;
    dropFrameUntilFnName = 'captureStackTrace';
    dropFrameUntilFnName2 = 'initializeBackingError';
    numberOfFramesToSearch = $wnd.Math.min(stackTrace.length, 5);
    for (i = numberOfFramesToSearch - 1; i >= 0; i--) {
      if ($equals_0(stackTrace[i].methodName, dropFrameUntilFnName) || $equals_0(stackTrace[i].methodName, dropFrameUntilFnName2)) {
        stackTrace.length >= i + 1 && stackTrace.splice(0, i + 1);
        break;
      }
    }
    return stackTrace;
  }
  function extractFunctionName(fnName) {
    var fnRE = /function(?:\s+([\w$]+))?\s*\(/;
    var match_0 = fnRE.exec(fnName);
    return match_0 && match_0[1] || 'anonymous';
  }
  function parseInt_0(number) {
    $clinit_StackTraceCreator();
    return parseInt(number) || -1;
  }
  function supportsErrorStack() {
    if (Error.stackTraceLimit > 0) {
      return true;
    }
    return 'stack' in new Error();
  }
  var collector_1;
  defineClass(150, 1, {});
  var Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/Collector', 150, Ljava_lang_Object_2_classLit);
  function StackTraceCreator$CollectorLegacy() {}
  defineClass(81, 150, {}, StackTraceCreator$CollectorLegacy);
  _.collect = function collect(error) {
    var seen = {},
      name_1;
    var fnStack = [];
    error['fnStack'] = fnStack;
    var callee = arguments.callee.caller;
    while (callee) {
      var name_0 = ($clinit_StackTraceCreator(), callee.name || (callee.name = extractFunctionName(callee.toString())));
      fnStack.push(name_0);
      var keyName = ':' + name_0;
      var withThisName = seen[keyName];
      if (withThisName) {
        var i, j;
        for (i = 0, j = withThisName.length; i < j; i++) {
          if (withThisName[i] === callee) {
            return;
          }
        }
      }
      (withThisName || (seen[keyName] = [])).push(callee);
      callee = callee.caller;
    }
  };
  _.getStackTrace = function getStackTrace(t) {
    var i, length_0, stack_0, stackTrace;
    stack_0 = ($clinit_StackTraceCreator(), t && t['fnStack'] ? t['fnStack'] : []);
    length_0 = stack_0.length;
    stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 15, length_0, 0, 1);
    for (i = 0; i < length_0; i++) {
      stackTrace[i] = new StackTraceElement(stack_0[i], null, -1);
    }
    return stackTrace;
  };
  var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorLegacy_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorLegacy', 81, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit);
  function $parse(this$static, stString) {
    var closeParen, col, endFileUrlIndex, fileName, index_0, lastColonIndex, line, location_0, toReturn;
    if (stString.length == 0) {
      return this$static.createSte('Unknown', 'anonymous', -1, -1);
    }
    toReturn = $trim(stString);
    $equals_0(toReturn.substr(0, 3), 'at ') && (toReturn = toReturn.substr(3));
    toReturn = toReturn.replace(/\[.*?\]/g, '');
    index_0 = toReturn.indexOf('(');
    if (index_0 == -1) {
      index_0 = toReturn.indexOf('@');
      if (index_0 == -1) {
        location_0 = toReturn;
        toReturn = '';
      } else {
        location_0 = $trim(toReturn.substr(index_0 + 1));
        toReturn = $trim(toReturn.substr(0, index_0));
      }
    } else {
      closeParen = toReturn.indexOf(')', index_0);
      location_0 = toReturn.substr(index_0 + 1, closeParen - (index_0 + 1));
      toReturn = $trim(toReturn.substr(0, index_0));
    }
    index_0 = $indexOf(toReturn, fromCodePoint(46));
    index_0 != -1 && (toReturn = toReturn.substr(index_0 + 1));
    (toReturn.length == 0 || $equals_0(toReturn, 'Anonymous function')) && (toReturn = 'anonymous');
    lastColonIndex = $lastIndexOf(location_0, fromCodePoint(58));
    endFileUrlIndex = $lastIndexOf_0(location_0, fromCodePoint(58), lastColonIndex - 1);
    line = -1;
    col = -1;
    fileName = 'Unknown';
    if (lastColonIndex != -1 && endFileUrlIndex != -1) {
      fileName = location_0.substr(0, endFileUrlIndex);
      line = parseInt_0(location_0.substr(endFileUrlIndex + 1, lastColonIndex - (endFileUrlIndex + 1)));
      col = parseInt_0(location_0.substr(lastColonIndex + 1));
    }
    return this$static.createSte(fileName, toReturn, line, col);
  }
  defineClass(151, 150, {});
  _.collect = function collect_0(error) {};
  _.createSte = function createSte(fileName, method, line, col) {
    return new StackTraceElement(method, fileName + '@' + col, line < 0 ? -1 : line);
  };
  _.getStackTrace = function getStackTrace_0(t) {
    var addIndex, i, length_0, stack_0, stackTrace, ste, e;
    stack_0 = ($clinit_StackTraceCreator(), e = t.backingJsObject, e && e.stack ? e.stack.split('\n') : []);
    stackTrace = initUnidimensionalArray(Ljava_lang_StackTraceElement_2_classLit, $intern_0, 15, 0, 0, 1);
    addIndex = 0;
    length_0 = stack_0.length;
    if (length_0 == 0) {
      return stackTrace;
    }
    ste = $parse(this, stack_0[0]);
    $equals_0(ste.methodName, 'anonymous') || (stackTrace[addIndex++] = ste);
    for (i = 1; i < length_0; i++) {
      stackTrace[addIndex++] = $parse(this, stack_0[i]);
    }
    return stackTrace;
  };
  var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModern', 151, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit);
  function StackTraceCreator$CollectorModernNoSourceMap() {}
  defineClass(82, 151, {}, StackTraceCreator$CollectorModernNoSourceMap);
  _.createSte = function createSte_0(fileName, method, line, col) {
    return new StackTraceElement(method, fileName, -1);
  };
  var Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModernNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl', 'StackTraceCreator/CollectorModernNoSourceMap', 82, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorModern_2_classLit);
  function canSet(array, value_0) {
    var elementTypeCategory;
    switch (getElementTypeCategory(array)) {
      case 6:
        return instanceOfString(value_0);
      case 7:
        return instanceOfDouble(value_0);
      case 8:
        return instanceOfBoolean(value_0);
      case 3:
        return Array.isArray(value_0) && (elementTypeCategory = getElementTypeCategory(value_0), !(elementTypeCategory >= 14 && elementTypeCategory <= 16));
      case 11:
        return value_0 != null && typeof value_0 === 'function';
      case 12:
        return value_0 != null && (_typeof(value_0) === 'object' || typeof value_0 == 'function');
      case 0:
        return canCast(value_0, array.__elementTypeId$);
      case 2:
        return isJsObjectOrFunction(value_0) && !(value_0.typeMarker === typeMarkerFn);
      case 1:
        return isJsObjectOrFunction(value_0) && !(value_0.typeMarker === typeMarkerFn) || canCast(value_0, array.__elementTypeId$);
      default:
        return true;
    }
  }
  function getClassLiteralForArray(clazz, dimensions) {
    return getClassLiteralForArray_0(clazz, dimensions);
  }
  function getElementTypeCategory(array) {
    return array.__elementTypeCategory$ == null ? 10 : array.__elementTypeCategory$;
  }
  function initUnidimensionalArray(leafClassLiteral, castableTypeMap, elementTypeId, length_0, elementTypeCategory, dimensions) {
    var result;
    result = initializeArrayElementsWithDefaults(elementTypeCategory, length_0);
    elementTypeCategory != 10 && stampJavaTypeInfo(getClassLiteralForArray(leafClassLiteral, dimensions), castableTypeMap, elementTypeId, elementTypeCategory, result);
    return result;
  }
  function initializeArrayElementsWithDefaults(elementTypeCategory, length_0) {
    var array = new Array(length_0);
    var initValue;
    switch (elementTypeCategory) {
      case 14:
      case 15:
        initValue = 0;
        break;
      case 16:
        initValue = false;
        break;
      default:
        return array;
    }
    for (var i = 0; i < length_0; ++i) {
      array[i] = initValue;
    }
    return array;
  }
  function isJavaArray(src_0) {
    return Array.isArray(src_0) && src_0.typeMarker === typeMarkerFn;
  }
  function setCheck(array, index_0, value_0) {
    checkCriticalArrayType(value_0 == null || canSet(array, value_0));
    return array[index_0] = value_0;
  }
  function stampJavaTypeInfo(arrayClass, castableTypeMap, elementTypeId, elementTypeCategory, array) {
    array.___clazz = arrayClass;
    array.castableTypeMap = castableTypeMap;
    array.typeMarker = typeMarkerFn;
    array.__elementTypeId$ = elementTypeId;
    array.__elementTypeCategory$ = elementTypeCategory;
    return array;
  }
  function stampJavaTypeInfo_0(array, referenceType) {
    getElementTypeCategory(referenceType) != 10 && stampJavaTypeInfo(getClass__Ljava_lang_Class___devirtual$(referenceType), referenceType.castableTypeMap, referenceType.__elementTypeId$, getElementTypeCategory(referenceType), array);
    return array;
  }
  function create(value_0) {
    var a0, a1, a2;
    a0 = value_0 & $intern_2;
    a1 = value_0 >> 22 & $intern_2;
    a2 = value_0 < 0 ? $intern_3 : 0;
    return create0(a0, a1, a2);
  }
  function create_0(a) {
    return create0(a.l, a.m, a.h);
  }
  function create0(l, m, h) {
    return {
      l: l,
      m: m,
      h: h
    };
  }
  function divMod(a, b, computeRemainder) {
    var aIsCopy, aIsMinValue, aIsNegative, bpower, c, negative;
    if (b.l == 0 && b.m == 0 && b.h == 0) {
      throw toJs(new ArithmeticException());
    }
    if (a.l == 0 && a.m == 0 && a.h == 0) {
      computeRemainder && (remainder = create0(0, 0, 0));
      return create0(0, 0, 0);
    }
    if (b.h == $intern_4 && b.m == 0 && b.l == 0) {
      return divModByMinValue(a, computeRemainder);
    }
    negative = false;
    if (b.h >> 19 != 0) {
      b = neg(b);
      negative = true;
    }
    bpower = powerOfTwo(b);
    aIsNegative = false;
    aIsMinValue = false;
    aIsCopy = false;
    if (a.h == $intern_4 && a.m == 0 && a.l == 0) {
      aIsMinValue = true;
      aIsNegative = true;
      if (bpower == -1) {
        a = create_0(($clinit_BigLongLib$Const(), MAX_VALUE));
        aIsCopy = true;
        negative = !negative;
      } else {
        c = shr(a, bpower);
        negative && negate(c);
        computeRemainder && (remainder = create0(0, 0, 0));
        return c;
      }
    } else if (a.h >> 19 != 0) {
      aIsNegative = true;
      a = neg(a);
      aIsCopy = true;
      negative = !negative;
    }
    if (bpower != -1) {
      return divModByShift(a, bpower, negative, aIsNegative, computeRemainder);
    }
    if (compare(a, b) < 0) {
      computeRemainder && (aIsNegative ? remainder = neg(a) : remainder = create0(a.l, a.m, a.h));
      return create0(0, 0, 0);
    }
    return divModHelper(aIsCopy ? a : create0(a.l, a.m, a.h), b, negative, aIsNegative, aIsMinValue, computeRemainder);
  }
  function divModByMinValue(a, computeRemainder) {
    if (a.h == $intern_4 && a.m == 0 && a.l == 0) {
      computeRemainder && (remainder = create0(0, 0, 0));
      return create_0(($clinit_BigLongLib$Const(), ONE));
    }
    computeRemainder && (remainder = create0(a.l, a.m, a.h));
    return create0(0, 0, 0);
  }
  function divModByShift(a, bpower, negative, aIsNegative, computeRemainder) {
    var c;
    c = shr(a, bpower);
    negative && negate(c);
    if (computeRemainder) {
      a = maskRight(a, bpower);
      aIsNegative ? remainder = neg(a) : remainder = create0(a.l, a.m, a.h);
    }
    return c;
  }
  function divModHelper(a, b, negative, aIsNegative, aIsMinValue, computeRemainder) {
    var bshift, gte, quotient, shift_0, a1, a2, a0;
    shift_0 = numberOfLeadingZeros(b) - numberOfLeadingZeros(a);
    bshift = shl(b, shift_0);
    quotient = create0(0, 0, 0);
    while (shift_0 >= 0) {
      gte = trialSubtract(a, bshift);
      if (gte) {
        shift_0 < 22 ? (quotient.l |= 1 << shift_0, undefined) : shift_0 < 44 ? (quotient.m |= 1 << shift_0 - 22, undefined) : (quotient.h |= 1 << shift_0 - 44, undefined);
        if (a.l == 0 && a.m == 0 && a.h == 0) {
          break;
        }
      }
      a1 = bshift.m;
      a2 = bshift.h;
      a0 = bshift.l;
      bshift.h = a2 >>> 1;
      bshift.m = a1 >>> 1 | (a2 & 1) << 21;
      bshift.l = a0 >>> 1 | (a1 & 1) << 21;
      --shift_0;
    }
    negative && negate(quotient);
    if (computeRemainder) {
      if (aIsNegative) {
        remainder = neg(a);
        aIsMinValue && (remainder = sub_0(remainder, ($clinit_BigLongLib$Const(), ONE)));
      } else {
        remainder = create0(a.l, a.m, a.h);
      }
    }
    return quotient;
  }
  function maskRight(a, bits) {
    var b0, b1, b2;
    if (bits <= 22) {
      b0 = a.l & (1 << bits) - 1;
      b1 = b2 = 0;
    } else if (bits <= 44) {
      b0 = a.l;
      b1 = a.m & (1 << bits - 22) - 1;
      b2 = 0;
    } else {
      b0 = a.l;
      b1 = a.m;
      b2 = a.h & (1 << bits - 44) - 1;
    }
    return create0(b0, b1, b2);
  }
  function negate(a) {
    var neg0, neg1, neg2;
    neg0 = ~a.l + 1 & $intern_2;
    neg1 = ~a.m + (neg0 == 0 ? 1 : 0) & $intern_2;
    neg2 = ~a.h + (neg0 == 0 && neg1 == 0 ? 1 : 0) & $intern_3;
    a.l = neg0;
    a.m = neg1;
    a.h = neg2;
  }
  function numberOfLeadingZeros(a) {
    var b1, b2;
    b2 = numberOfLeadingZeros_0(a.h);
    if (b2 == 32) {
      b1 = numberOfLeadingZeros_0(a.m);
      return b1 == 32 ? numberOfLeadingZeros_0(a.l) + 32 : b1 + 20 - 10;
    } else {
      return b2 - 12;
    }
  }
  function powerOfTwo(a) {
    var h, l, m;
    l = a.l;
    if ((l & l - 1) != 0) {
      return -1;
    }
    m = a.m;
    if ((m & m - 1) != 0) {
      return -1;
    }
    h = a.h;
    if ((h & h - 1) != 0) {
      return -1;
    }
    if (h == 0 && m == 0 && l == 0) {
      return -1;
    }
    if (h == 0 && m == 0 && l != 0) {
      return numberOfTrailingZeros(l);
    }
    if (h == 0 && m != 0 && l == 0) {
      return numberOfTrailingZeros(m) + 22;
    }
    if (h != 0 && m == 0 && l == 0) {
      return numberOfTrailingZeros(h) + 44;
    }
    return -1;
  }
  function toDoubleHelper(a) {
    return a.l + a.m * $intern_5 + a.h * $intern_6;
  }
  function trialSubtract(a, b) {
    var sum0, sum1, sum2;
    sum2 = a.h - b.h;
    if (sum2 < 0) {
      return false;
    }
    sum0 = a.l - b.l;
    sum1 = a.m - b.m + (sum0 >> 22);
    sum2 += sum1 >> 22;
    if (sum2 < 0) {
      return false;
    }
    a.l = sum0 & $intern_2;
    a.m = sum1 & $intern_2;
    a.h = sum2 & $intern_3;
    return true;
  }
  var remainder;
  function compare(a, b) {
    var a0, a1, a2, b0, b1, b2, signA, signB;
    signA = a.h >> 19;
    signB = b.h >> 19;
    if (signA != signB) {
      return signB - signA;
    }
    a2 = a.h;
    b2 = b.h;
    if (a2 != b2) {
      return a2 - b2;
    }
    a1 = a.m;
    b1 = b.m;
    if (a1 != b1) {
      return a1 - b1;
    }
    a0 = a.l;
    b0 = b.l;
    return a0 - b0;
  }
  function fromDouble(value_0) {
    var a0, a1, a2, negative, result;
    if (isNaN(value_0)) {
      return $clinit_BigLongLib$Const(), ZERO;
    }
    if (value_0 < -9223372036854775808) {
      return $clinit_BigLongLib$Const(), MIN_VALUE;
    }
    if (value_0 >= 9223372036854775807) {
      return $clinit_BigLongLib$Const(), MAX_VALUE;
    }
    negative = false;
    if (value_0 < 0) {
      negative = true;
      value_0 = -value_0;
    }
    a2 = 0;
    if (value_0 >= $intern_6) {
      a2 = round_int(value_0 / $intern_6);
      value_0 -= a2 * $intern_6;
    }
    a1 = 0;
    if (value_0 >= $intern_5) {
      a1 = round_int(value_0 / $intern_5);
      value_0 -= a1 * $intern_5;
    }
    a0 = round_int(value_0);
    result = create0(a0, a1, a2);
    negative && negate(result);
    return result;
  }
  function neg(a) {
    var neg0, neg1, neg2;
    neg0 = ~a.l + 1 & $intern_2;
    neg1 = ~a.m + (neg0 == 0 ? 1 : 0) & $intern_2;
    neg2 = ~a.h + (neg0 == 0 && neg1 == 0 ? 1 : 0) & $intern_3;
    return create0(neg0, neg1, neg2);
  }
  function shl(a, n) {
    var res0, res1, res2;
    n &= 63;
    if (n < 22) {
      res0 = a.l << n;
      res1 = a.m << n | a.l >> 22 - n;
      res2 = a.h << n | a.m >> 22 - n;
    } else if (n < 44) {
      res0 = 0;
      res1 = a.l << n - 22;
      res2 = a.m << n - 22 | a.l >> 44 - n;
    } else {
      res0 = 0;
      res1 = 0;
      res2 = a.l << n - 44;
    }
    return create0(res0 & $intern_2, res1 & $intern_2, res2 & $intern_3);
  }
  function shr(a, n) {
    var a2, negative, res0, res1, res2;
    n &= 63;
    a2 = a.h;
    negative = (a2 & $intern_4) != 0;
    negative && (a2 |= -1048576);
    if (n < 22) {
      res2 = a2 >> n;
      res1 = a.m >> n | a2 << 22 - n;
      res0 = a.l >> n | a.m << 22 - n;
    } else if (n < 44) {
      res2 = negative ? $intern_3 : 0;
      res1 = a2 >> n - 22;
      res0 = a.m >> n - 22 | a2 << 44 - n;
    } else {
      res2 = negative ? $intern_3 : 0;
      res1 = negative ? $intern_2 : 0;
      res0 = a2 >> n - 44;
    }
    return create0(res0 & $intern_2, res1 & $intern_2, res2 & $intern_3);
  }
  function shru(a, n) {
    var a2, res0, res1, res2;
    n &= 63;
    a2 = a.h & $intern_3;
    if (n < 22) {
      res2 = a2 >>> n;
      res1 = a.m >> n | a2 << 22 - n;
      res0 = a.l >> n | a.m << 22 - n;
    } else if (n < 44) {
      res2 = 0;
      res1 = a2 >>> n - 22;
      res0 = a.m >> n - 22 | a.h << 44 - n;
    } else {
      res2 = 0;
      res1 = 0;
      res0 = a2 >>> n - 44;
    }
    return create0(res0 & $intern_2, res1 & $intern_2, res2 & $intern_3);
  }
  function sub_0(a, b) {
    var sum0, sum1, sum2;
    sum0 = a.l - b.l;
    sum1 = a.m - b.m + (sum0 >> 22);
    sum2 = a.h - b.h + (sum1 >> 22);
    return create0(sum0 & $intern_2, sum1 & $intern_2, sum2 & $intern_3);
  }
  function toDouble(a) {
    if (compare(a, ($clinit_BigLongLib$Const(), ZERO)) < 0) {
      return -toDoubleHelper(neg(a));
    }
    return a.l + a.m * $intern_5 + a.h * $intern_6;
  }
  function xor(a, b) {
    return create0(a.l ^ b.l, a.m ^ b.m, a.h ^ b.h);
  }
  function $clinit_BigLongLib$Const() {
    $clinit_BigLongLib$Const = emptyMethod;
    MAX_VALUE = create0($intern_2, $intern_2, 524287);
    MIN_VALUE = create0(0, 0, $intern_4);
    ONE = create(1);
    create(2);
    ZERO = create(0);
  }
  var MAX_VALUE, MIN_VALUE, ONE, ZERO;
  function toJava(e) {
    var javaException;
    if (instanceOf(e, 5)) {
      return e;
    }
    javaException = e && e['__java$exception'];
    if (!javaException) {
      javaException = new JavaScriptException(e);
      captureStackTrace(javaException);
    }
    return javaException;
  }
  function toJs(t) {
    return t.backingJsObject;
  }
  function compare_0(a, b) {
    var result;
    if (isSmallLong0(a) && isSmallLong0(b)) {
      result = a - b;
      if (!isNaN(result)) {
        return result;
      }
    }
    return compare(isSmallLong0(a) ? toBigLong(a) : a, isSmallLong0(b) ? toBigLong(b) : b);
  }
  function createLongEmul(big_0) {
    var a2;
    a2 = big_0.h;
    if (a2 == 0) {
      return big_0.l + big_0.m * $intern_5;
    }
    if (a2 == $intern_3) {
      return big_0.l + big_0.m * $intern_5 - $intern_6;
    }
    return big_0;
  }
  function eq(a, b) {
    return compare_0(a, b) == 0;
  }
  function fromDouble_0(value_0) {
    if ($intern_7 < value_0 && value_0 < $intern_6) {
      return value_0 < 0 ? $wnd.Math.ceil(value_0) : $wnd.Math.floor(value_0);
    }
    return createLongEmul(fromDouble(value_0));
  }
  function isSmallLong0(value_0) {
    return typeof value_0 === 'number';
  }
  function mod(a, b) {
    var result;
    if (isSmallLong0(a) && isSmallLong0(b)) {
      result = a % b;
      if ($intern_7 < result && result < $intern_6) {
        return result;
      }
    }
    return createLongEmul((divMod(isSmallLong0(a) ? toBigLong(a) : a, isSmallLong0(b) ? toBigLong(b) : b, true), remainder));
  }
  function shru_0(a, n) {
    return createLongEmul(shru(isSmallLong0(a) ? toBigLong(a) : a, n));
  }
  function toBigLong(longValue) {
    var a0, a1, a3, value_0;
    value_0 = longValue;
    a3 = 0;
    if (value_0 < 0) {
      value_0 += $intern_6;
      a3 = $intern_3;
    }
    a1 = round_int(value_0 / $intern_5);
    a0 = round_int(value_0 - a1 * $intern_5);
    return create0(a0, a1, a3);
  }
  function toDouble_0(a) {
    var d;
    if (isSmallLong0(a)) {
      d = a;
      return d == -0. ? 0 : d;
    }
    return toDouble(a);
  }
  function toInt(a) {
    if (isSmallLong0(a)) {
      return a | 0;
    }
    return a.l | a.m << 22;
  }
  function xor_0(a, b) {
    return createLongEmul(xor(isSmallLong0(a) ? toBigLong(a) : a, isSmallLong0(b) ? toBigLong(b) : b));
  }
  function init() {
    $wnd.setTimeout($entry(assertCompileTimeUserAgent));
    $onModuleLoad();
    $clinit_ExporterUtil();
    new IJsFilter_ExporterImpl();
    new IJsWriter_ExporterImpl();
    new ConsoleObserver_ExporterImpl();
    new IObserverFilter_ExporterImpl();
    new IObserverWriter_ExporterImpl();
    new Observer_ExporterImpl();
    new ObserverLevelFilter_ExporterImpl();
    new Observer_DefaultWriter_ExporterImpl();
    new ObserverLevel_ExporterImpl();
    new ObserverRecord_ExporterImpl();
    new ObserverStore_ExporterImpl();
    new DeviceInfo_ExporterImpl();
  }
  function $onModuleLoad() {
    var allowedModes, currentMode, i;
    currentMode = $doc.compatMode;
    allowedModes = stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_0, 2, 6, ['CSS1Compat']);
    for (i = 0; i < allowedModes.length; i++) {
      if ($equals_0(allowedModes[i], currentMode)) {
        return;
      }
    }
    allowedModes.length == 1 && $equals_0('CSS1Compat', allowedModes[0]) && $equals_0('BackCompat', currentMode) ? "GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;' : "Your *.gwt.xml module configuration prohibits the use of the current document rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom " + "'document.compatMode' configuration property settings.";
  }
  function assertCompileTimeUserAgent() {
    var compileTimeValue, impl, runtimeValue;
    impl = castTo(create_com_google_gwt_useragent_client_UserAgent(), 75);
    compileTimeValue = impl.getCompileTimeValue();
    runtimeValue = impl.getRuntimeValue();
    if (!$equals_0(compileTimeValue, runtimeValue)) {
      throw toJs(new UserAgentAsserter$UserAgentAssertionError(compileTimeValue, runtimeValue));
    }
  }
  function Error_0(message, cause) {
    $$init(this);
    this.cause = cause;
    this.detailMessage = message;
    $fillInStackTrace(this);
    this.initializeBackingError();
  }
  defineClass(20, 5, $intern_8);
  var Ljava_lang_Error_2_classLit = createForClass('java.lang', 'Error', 20, Ljava_lang_Throwable_2_classLit);
  defineClass(8, 20, $intern_8);
  var Ljava_lang_AssertionError_2_classLit = createForClass('java.lang', 'AssertionError', 8, Ljava_lang_Error_2_classLit);
  function UserAgentAsserter$UserAgentAssertionError(compileTimeValue, runtimeValue) {
    Error_0.call(this, 'Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.' == null ? 'null' : toString_2('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.'), instanceOf('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 5) ? castTo('Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (' + compileTimeValue + ') ' + 'does not match the runtime user.agent value (' + runtimeValue + ').\n' + 'Expect more errors.', 5) : null);
  }
  defineClass(76, 8, $intern_8, UserAgentAsserter$UserAgentAssertionError);
  var Lcom_google_gwt_useragent_client_UserAgentAsserter$UserAgentAssertionError_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentAsserter/UserAgentAssertionError', 76, Ljava_lang_AssertionError_2_classLit);
  function UserAgentImplGecko1_8() {}
  defineClass(91, 1, {
    75: 1
  }, UserAgentImplGecko1_8);
  _.getCompileTimeValue = function getCompileTimeValue() {
    return 'gecko1_8';
  };
  _.getRuntimeValue = function getRuntimeValue() {
    var ua = navigator.userAgent.toLowerCase();
    var docMode = $doc.documentMode;
    if (function () {
      return ua.indexOf('webkit') != -1;
    }()) return 'safari';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 10 && docMode < 11;
    }()) return 'ie10';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 9 && docMode < 11;
    }()) return 'ie9';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 8 && docMode < 11;
    }()) return 'ie8';
    if (function () {
      return ua.indexOf('gecko') != -1 || docMode >= 11;
    }()) return 'gecko1_8';
    return 'unknown';
  };
  var Lcom_google_gwt_useragent_client_UserAgentImplGecko1_18_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentImplGecko1_8', 91, Ljava_lang_Object_2_classLit);
  function UserAgentImplSafari() {}
  defineClass(90, 1, {
    75: 1
  }, UserAgentImplSafari);
  _.getCompileTimeValue = function getCompileTimeValue_0() {
    return 'safari';
  };
  _.getRuntimeValue = function getRuntimeValue_0() {
    var ua = navigator.userAgent.toLowerCase();
    var docMode = $doc.documentMode;
    if (function () {
      return ua.indexOf('webkit') != -1;
    }()) return 'safari';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 10 && docMode < 11;
    }()) return 'ie10';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 9 && docMode < 11;
    }()) return 'ie9';
    if (function () {
      return ua.indexOf('msie') != -1 && docMode >= 8 && docMode < 11;
    }()) return 'ie8';
    if (function () {
      return ua.indexOf('gecko') != -1 || docMode >= 11;
    }()) return 'gecko1_8';
    return 'unknown';
  };
  var Lcom_google_gwt_useragent_client_UserAgentImplSafari_2_classLit = createForClass('com.google.gwt.useragent.client', 'UserAgentImplSafari', 90, Ljava_lang_Object_2_classLit);
  var Lcom_whatfix_exporter_client_Exportable_2_classLit = createForInterface('com.whatfix.exporter.client', 'Exportable');
  defineClass(154, 1, {});
  var Lcom_whatfix_exporter_client_ExporterBaseImpl_2_classLit = createForClass('com.whatfix.exporter.client', 'ExporterBaseImpl', 154, Ljava_lang_Object_2_classLit);
  function $addExporter(this$static, c, o) {
    $put(this$static.exporterMap, c, o);
  }
  function $computeVarArguments(len, args) {
    var ret = [];
    for (var i = 0; i < len - 1; i++) ret.push(args[i]);
    var alen = args.length;
    var p_0 = len - 1;
    if (alen >= len && Object.prototype.toString.apply(args[p_0]) === '[object Array]') {
      ret.push(args[p_0]);
    } else {
      var a = [];
      for (var i = p_0; i < alen; i++) a.push(args[i]);
      ret.push(a);
    }
    return ret;
  }
  function $declarePackage(qualifiedExportName) {
    var i, l, o, prefix, superPackages;
    superPackages = $split(qualifiedExportName);
    prefix = _wnd;
    i = 0;
    for (l = superPackages.length - 1; i < l; i++) {
      if (!$equals_0(superPackages[i], 'client')) {
        prefix[superPackages[i]] || (prefix[superPackages[i]] = {});
        prefix = getProp(prefix, superPackages[i]);
      }
    }
    o = getProp(prefix, superPackages[i]);
    return o;
  }
  function $getMaxArity(jsoMap, meth) {
    var o = jsoMap[meth];
    var r = 0;
    for (var k in o) r = Math.max(r, k);
    return r;
  }
  function $registerDispatchMap(this$static, clazz, dispMap, isStatic) {
    var jso, map_0;
    map_0 = isStatic ? this$static.staticDispatchMap : this$static.dispatchMap;
    jso = castToJso(getEntryValueOrNull($getEntry(map_0.hashCodeMap, clazz)));
    !jso ? jso = dispMap : mergeJso(jso, dispMap);
    $put_0(map_0.hashCodeMap, clazz, jso);
  }
  function $runDispatch(this$static, instance, clazz, meth, arguments_0, isStatic, isVarArgs) {
    var args, dmap, i, l, ret;
    dmap = isStatic ? this$static.staticDispatchMap : this$static.dispatchMap;
    if (isVarArgs) {
      for (l = $getMaxArity(castToJso(getEntryValueOrNull($getEntry(dmap.hashCodeMap, clazz))), meth), i = l; i >= 1; i--) {
        args = $computeVarArguments(i, arguments_0);
        ret = $runDispatch_0(instance, dmap, clazz, meth, args);
        if (!ret) {
          args = $unshift(instance, args);
          ret = $runDispatch_0(instance, dmap, clazz, meth, args);
        }
        if (ret) {
          return ret;
        }
      }
    } else {
      ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
      if (!ret) {
        arguments_0 = $unshift(instance, arguments_0);
        ret = $runDispatch_0(instance, dmap, clazz, meth, arguments_0);
      }
      if (ret) {
        return ret;
      }
    }
    throw toJs(new RuntimeException_0("Can't find exported method for given arguments: " + meth + ':' + arguments_0.length + '\n' + ''));
  }
  function $runDispatch_0(instance, dmap, clazz, meth, arguments_0) {
    var aFunc, i, jFunc, l, r, sig, sigs, wFunc;
    sigs = castToJso(getEntryValueOrNull($getEntry(dmap.hashCodeMap, clazz)))[meth][arguments_0.length];
    jFunc = null;
    wFunc = null;
    aFunc = null;
    for (i = 0, l = !sigs ? 0 : sigs.length; i < l; i++) {
      sig = sigs[i];
      if ($matches(sig, arguments_0)) {
        jFunc = sig[0];
        wFunc = sig[1];
        aFunc = sig[2];
        break;
      }
    }
    if (!jFunc) {
      return null;
    } else {
      arguments_0 = aFunc ? wrapArguments(instance, aFunc, arguments_0) : arguments_0;
      r = runDispatch(instance, jFunc, wFunc, arguments_0);
      return r;
    }
  }
  function $setWrapper(this$static, type_0) {
    var a, cons, i, wrapper, wrapperArray, elementTypeCategory;
    if ((getClass__Ljava_lang_Class___devirtual$(type_0).modifiers & 4) != 0) {
      a = (checkCriticalType(type_0 == null || Array.isArray(type_0) && (elementTypeCategory = getElementTypeCategory(type_0), !(elementTypeCategory >= 14 && elementTypeCategory <= 16))), type_0);
      wrapperArray = [];
      for (i = 0; i < a.length; i++) {
        wrapperArray[i] = $setWrapper(this$static, a[i]);
      }
      return wrapperArray;
    }
    cons = $typeConstructor_0(this$static, type_0);
    wrapper = cons && typeof cons == 'function' ? new cons(type_0) : type_0;
    type_0['__gwtex_wrap'] = wrapper;
    return wrapper;
  }
  function $toArrObject(j, ret) {
    var i, l, o, s;
    s = j;
    l = s.length;
    for (i = 0; i < l; i++) {
      o = s[i];
      instanceOfJso(o) && getGwtInstance(castToJso(o)) != null && (o = getGwtInstance(castToJso(o)));
      setCheck(ret, i, o);
    }
    return ret;
  }
  function $typeConstructor(this$static, clz) {
    var e, sup_0;
    e = castTo($get(this$static.exporterMap, clz), 11);
    sup_0 = clz.superclass;
    if (!e && !!sup_0 && sup_0 != Ljava_lang_Object_2_classLit) {
      return $typeConstructor(this$static, sup_0);
    }
    return e ? e.getJsConstructor() : null;
  }
  function $typeConstructor_0(this$static, type_0) {
    var e, e$iterator, entry, jso, outerIter;
    jso = $typeConstructor(this$static, getClass__Ljava_lang_Class___devirtual$(type_0));
    if (!jso) {
      for (e$iterator = (outerIter = new AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySet(new AbstractMap$2(this$static.exporterMap).this$01).this$01), new AbstractMap$2$1(outerIter)); e$iterator.val$outerIter2.hasNext;) {
        e = (entry = $next(e$iterator.val$outerIter2), castTo(entry.getValue_0(), 11));
        if (e.isAssignable(type_0)) {
          jso = e.getJsConstructor();
          break;
        }
      }
    }
    return jso;
  }
  function $unshift(o, arr) {
    var ret = [o];
    for (var i = 0; i < arr.length; i++) ret.push(arr[i]);
    return ret;
  }
  function $wrap(this$static, type_0) {
    var wrapper;
    if (type_0 == null) {
      return null;
    }
    return wrapper = type_0['__gwtex_wrap'], !wrapper && (wrapper = $setWrapper(this$static, type_0)), wrapper;
  }
  function $wrap_0(this$static, type_0) {
    var i, wrapperArray;
    if (type_0 == null) {
      return null;
    }
    wrapperArray = [];
    for (i = 0; i < type_0.length; i++) {
      wrapperArray[i] = $wrap(this$static, type_0[i]);
    }
    return wrapperArray;
  }
  function ExporterBaseActual() {
    this.exporterMap = new HashMap();
    this.dispatchMap = new HashMap();
    this.staticDispatchMap = new HashMap();
  }
  function getGwtInstance(o) {
    return o && o.g ? o.g : null;
  }
  function getProp(jso, key) {
    return jso != null ? jso[key] : null;
  }
  function isAssignableToClass(o, clazz) {
    var sup_0;
    if (Ljava_lang_Object_2_classLit == clazz) {
      return true;
    }
    if (Lcom_whatfix_exporter_client_Exportable_2_classLit == clazz && instanceOf(o, 13)) {
      return true;
    }
    if (o != null) {
      for (sup_0 = getClass__Ljava_lang_Class___devirtual$(o); !!sup_0 && sup_0 != Ljava_lang_Object_2_classLit; sup_0 = sup_0.superclass) {
        if (sup_0 == clazz) {
          return true;
        }
      }
    }
    return false;
  }
  function mergeJso(o1, o2) {
    for (p in o2) {
      o1[p] = o2[p];
    }
  }
  function runDispatch(instance, java_0, wrapper, arguments_0) {
    var x_0 = java_0.apply(instance, arguments_0);
    return [wrapper ? wrapper(x_0) : x_0];
  }
  function wrapArguments(instance, wrapper, arguments_0) {
    return wrapper(instance, arguments_0);
  }
  defineClass(88, 154, {}, ExporterBaseActual);
  var Lcom_whatfix_exporter_client_ExporterBaseActual_2_classLit = createForClass('com.whatfix.exporter.client', 'ExporterBaseActual', 88, Lcom_whatfix_exporter_client_ExporterBaseImpl_2_classLit);
  function $matches(this$static, arguments_0) {
    var argJsType, gwt, i, isBoolean, isClass, isNumber, isPrimitive, jsType, l, o;
    for (i = 0, l = arguments_0.length; i < l; i++) {
      jsType = this$static[i + 3];
      argJsType = typeof_0(arguments_0, i);
      if ($equals_0(argJsType, jsType)) {
        continue;
      }
      if ($equals_0('string', jsType) && $equals_0('null', argJsType)) {
        continue;
      }
      isNumber = $equals_0('number', argJsType);
      isBoolean = $equals_0('boolean', argJsType);
      if (maskUndefined(Ljava_lang_Object_2_classLit) === maskUndefined(jsType)) {
        isNumber && (arguments_0[i] = arguments_0[i], undefined);
        isBoolean && (arguments_0[i] = ($clinit_Boolean(), arguments_0[i] ? true : false), undefined);
        continue;
      }
      isPrimitive = isNumber || isBoolean;
      isClass = !isPrimitive && jsType != null && getClass__Ljava_lang_Class___devirtual$(jsType) == Ljava_lang_Class_2_classLit;
      if (isClass) {
        o = arguments_0[i];
        if (o == null || isAssignableToClass(o, castTo(jsType, 44))) {
          continue;
        }
        if (instanceOfJso(o)) {
          gwt = getGwtInstance(castToJso(o));
          if (gwt != null) {
            if (isAssignableToClass(gwt, castTo(jsType, 44))) {
              arguments_0[i] = gwt;
              continue;
            }
          }
        }
      }
      if ($equals_0('object', jsType) && !isNumber && !isBoolean) {
        continue;
      }
      return false;
    }
    return true;
  }
  function typeof_0(args, i) {
    var o = args[i];
    var t = o == null ? 'null' : _typeof(o);
    if (t == 'object') {
      return Object.prototype.toString.call(o) == '[object Array]' || typeof o.length == 'number' ? 'array' : t;
    }
    return t;
  }
  function $clinit_ExporterUtil() {
    $clinit_ExporterUtil = emptyMethod;
    impl_0 = new ExporterBaseActual();
  }
  function registerDispatchMap(clazz, dispMap, isStatic) {
    $clinit_ExporterUtil();
    $registerDispatchMap(impl_0, clazz, dispMap, isStatic);
  }
  function runDispatch_0(instance, clazz, meth, arguments_0, isStatic, isVarArgs) {
    $clinit_ExporterUtil();
    return $runDispatch(impl_0, instance, clazz, meth, arguments_0, isStatic, isVarArgs);
  }
  function setWrapper(instance, wrapper) {
    $clinit_ExporterUtil();
    instance['__gwtex_wrap'] = wrapper;
  }
  function unshift(o, arr) {
    $clinit_ExporterUtil();
    return $unshift(o, arr);
  }
  function wrap(type_0) {
    $clinit_ExporterUtil();
    return $wrap(impl_0, type_0);
  }
  function wrap_0(type_0) {
    $clinit_ExporterUtil();
    return $wrap_0(impl_0, type_0);
  }
  var impl_0;
  function $$init_0(this$static) {
    this$static.filters = new HashSet();
    this$static.isGroupingNeeded = $booleanValue(($clinit_Boolean(), FALSE));
    this$static.groupLogs = new HashMap();
  }
  function $debug(this$static, className, methodName, module, message, args) {
    $log_1(this$static, ($clinit_ObserverLevel(), DEBUG), className, methodName, module, {}, message, args);
  }
  function $error(this$static, className, methodName, module, errorStackTrace, message, args) {
    $log_0(this$static, ($clinit_ObserverLevel(), ERROR), className, methodName, module, {}, errorStackTrace, message, args);
  }
  function $info(this$static, className, methodName, module, meta, message, args) {
    $log_1(this$static, ($clinit_ObserverLevel(), INFO), className, methodName, module, meta, message, args);
  }
  function $lambda$3(this$static, record_1, resolve_1) {
    this$static.writer.execute_0(record_1, ($clinit_DeviceInfo(), $clinit_DeviceInfo(), INSTANCE_1));
    resolve_1(($clinit_Boolean(), true));
  }
  function $log(this$static, level, className, methodName, module, perfTime, meta, message, args) {
    var aRecord;
    aRecord = $meta($performanceTime($message($moduleName_0($methodName($className($level(new ObserverRecord$Builder(), level), className), methodName), module), format(message, args)), perfTime), meta).instance;
    this$static.log_0(aRecord);
  }
  function $log_0(this$static, level, className, methodName, module, meta, errorStacktrace, message, args) {
    var aRecord, aRecord0;
    aRecord0 = (aRecord = $message($errorStacktrace($meta($moduleName_0($methodName($className($level(new ObserverRecord$Builder(), level), className), methodName), module), meta), errorStacktrace), format(message, args)).instance, aRecord);
    this$static.log_0(aRecord0);
  }
  function $log_1(this$static, level, className, methodName, module, meta, message, args) {
    var aRecord, aRecord0;
    aRecord0 = (aRecord = $message($errorStacktrace($meta($moduleName_0($methodName($className($level(new ObserverRecord$Builder(), level), className), methodName), module), meta), null), format(message, args)).instance, aRecord);
    this$static.log_0(aRecord0);
  }
  function $log_2(this$static, level, groupKey, className, methodName, module, perfTime, meta, message, args) {
    var aRecord;
    aRecord = $meta($performanceTime($message($moduleName_0($methodName($className($groupKey($level(new ObserverRecord$Builder(), level), groupKey), className), methodName), module), format(message, args)), perfTime), meta).instance;
    this$static.log_0(aRecord);
  }
  function $log_3(this$static, level, groupKey, className, methodName, module, meta, message, args) {
    var aRecord;
    aRecord = $message($meta($moduleName_0($methodName($className($groupKey($level(new ObserverRecord$Builder(), level), groupKey), className), methodName), module), meta), format(message, args)).instance;
    this$static.log_0(aRecord);
  }
  function $nfr(this$static, className, methodName, module, performanceTime, message, args) {
    $log(this$static, ($clinit_ObserverLevel(), NFR), className, methodName, module, performanceTime, {}, message, args);
  }
  function $performance(this$static, className, groupKey, methodName, module, performanceTime, meta, message, args) {
    $log_2(this$static, ($clinit_ObserverLevel(), PERFORMANCE), groupKey, className, methodName, module, performanceTime, meta, message, args);
  }
  function $warning(this$static, className, methodName, module, message, args) {
    $log_1(this$static, ($clinit_ObserverLevel(), WARNING), className, methodName, module, {}, message, args);
  }
  function Observer(filter, writer, isGroupingNeeded) {
    $$init_0(this);
    this.filters = castTo($orElse($map(($clinit_Optional(), !filter ? EMPTY : new Optional(checkCriticalNotNull(filter))), new Observer$lambda$0$Type()), new HashSet()), 31);
    this.isGroupingNeeded = isGroupingNeeded;
    this.writer = writer;
  }
  function Observer_0(filters, writer, isGroupingNeeded) {
    $$init_0(this);
    this.filters = filters;
    this.isGroupingNeeded = isGroupingNeeded;
    this.writer = writer;
  }
  function lambda$1(record_0, aFilter_1) {
    return aFilter_1.shouldFilter_0(record_0);
  }
  function toMap(jsObject) {
    var metaMap;
    metaMap = castTo($orElse($map(($clinit_Optional(), !jsObject ? EMPTY : new Optional(checkCriticalNotNull(jsObject))), new Observer$lambda$4$Type()), ($clinit_Collections(), EMPTY_MAP)), 40);
    return metaMap;
  }
  defineClass(19, 1, {
    13: 1,
    19: 1
  }, Observer);
  _.flush_0 = function flush(groupName) {
    this.flushLog_0(groupName);
  };
  _.flushLog_0 = function flushLog(groupName) {
    var collected, groupLogs, logs;
    groupLogs = castTo($getOrDefault(this.groupLogs, groupName, new ArrayList()), 41);
    if (groupLogs.size_1() > 0) {
      logs = (collected = castTo($collect(groupLogs.stream(), of_0(new Collectors$21methodref$ctor$Type(), new Collectors$20methodref$add$Type(), new Collectors$lambda$21$Type(), stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 30, 0, [($clinit_Collector$Characteristics(), IDENTITY_FINISH)]))), 41), castTo(collected.toArray_0(initUnidimensionalArray(Lcom_whatfix_observer_ObserverRecord_2_classLit, $intern_9, 18, collected.size_1(), 0, 1)), 32));
      this.writer.execute_1(groupName, logs, ($clinit_DeviceInfo(), $clinit_DeviceInfo(), INSTANCE_1));
      $removeStringValue(this.groupLogs, groupName);
    }
  };
  _.log_0 = function log_0(record) {
    var e, existingLogs, groupKey, shouldLog;
    try {
      shouldLog = castToBoolean($reduce($map_0(this.filters.stream(), new Observer$lambda$1$Type(record)), ($clinit_Boolean(), TRUE), new Observer$lambda$2$Type()));
      if (checkCriticalNotNull(shouldLog), shouldLog) {
        groupKey = record.groupKey;
        if (null != groupKey && this.isGroupingNeeded) {
          existingLogs = castTo($getOrDefault(this.groupLogs, groupKey, new ArrayList()), 41);
          existingLogs.add_0(record);
          $putStringValue(this.groupLogs, groupKey, existingLogs);
        } else {
          new $wnd.Promise(makeLambdaFunction(Observer$lambda$3$Type.prototype.exec_0, Observer$lambda$3$Type, [this, record]));
        }
      }
    } catch ($e0) {
      $e0 = toJava($e0);
      if (instanceOf($e0, 7)) {
        e = $e0;
        $error_0('Exception in logger :' + e.getMessage_0());
      } else throw toJs($e0);
    }
  };
  _.isGroupingNeeded = false;
  var Lcom_whatfix_observer_Observer_2_classLit = createForClass('com.whatfix.observer', 'Observer', 19, Ljava_lang_Object_2_classLit);
  function ConsoleObserver(filters) {
    Observer_0.call(this, filters, new Observer$DefaultWriter(), $booleanValue(($clinit_Boolean(), TRUE)));
  }
  function ConsoleObserver_0(filters, isGroupingNeeded) {
    Observer_0.call(this, filters, new Observer$DefaultWriter(), isGroupingNeeded);
  }
  defineClass(50, 19, {
    13: 1,
    50: 1,
    19: 1
  }, ConsoleObserver, ConsoleObserver_0);
  _.equals_0 = function equals_0(obj) {
    if (obj == null) {
      return $booleanValue(($clinit_Boolean(), FALSE));
    }
    return Lcom_whatfix_observer_ConsoleObserver_2_classLit == getClass__Ljava_lang_Class___devirtual$(obj);
  };
  _.hashCode_0 = function hashCode_1() {
    return getHashCode(Lcom_whatfix_observer_ConsoleObserver_2_classLit);
  };
  var Lcom_whatfix_observer_ConsoleObserver_2_classLit = createForClass('com.whatfix.observer', 'ConsoleObserver', 50, Lcom_whatfix_observer_Observer_2_classLit);
  function $export(this$static) {
    if (!exported) {
      exported = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_ConsoleObserver_2_classLit, this$static);
      new ObserverLevel_ExporterImpl();
      $export0(this$static);
    }
  }
  function $export0(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.ConsoleObserver'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.ConsoleObserver = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) ? g = a[0] : a.length == 1 ? g = new ConsoleObserver(a[0]) : a.length == 2 && (g = new ConsoleObserver_0(a[0], a[1]));
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.ConsoleObserver.prototype = new Object();
    __0.debug = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 0, arguments, false, true)[0];
    });
    __0.equals = $entry(function (a0) {
      return runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 3, arguments, false, false)[0];
    });
    __0.error = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 6, arguments, false, true)[0];
    });
    __0.flush = $entry(function (a0) {
      this.g.flush_0(a0);
    });
    __0.flushLog = $entry(function (a0) {
      this.g.flushLog_0(a0);
    });
    __0.hashCode = $entry(function () {
      return this.g.hashCode_0();
    });
    __0.info = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 7, arguments, false, true)[0];
    });
    __0.log = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 2, arguments, false, true)[0];
    });
    __0.nfr = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 5, arguments, false, true)[0];
    });
    __0.performance = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 1, arguments, false, true)[0];
    });
    __0.warning = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ConsoleObserver_2_classLit, 4, arguments, false, true)[0];
    });
    registerDispatchMap(Lcom_whatfix_observer_ConsoleObserver_2_classLit, {
      0: {
        5: [[__static_wrapper_debug, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      1: {
        8: [[__static_wrapper_performance, null, unshift, 'string', 'string', 'string', 'string', 'number', 'object', 'string', 'array']]
      },
      2: {
        7: [[__static_wrapper_log, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'object', 'string', 'array']],
        8: [[__static_wrapper_log_0, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'string', 'object', 'string', 'array']]
      },
      3: {
        1: [[function () {
          return this.equals_0.apply(this, arguments);
        }, null, undefined, Ljava_lang_Object_2_classLit]]
      },
      4: {
        5: [[__static_wrapper_warning, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      5: {
        6: [[__static_wrapper_nfr, null, unshift, 'string', 'string', 'string', 'number', 'string', 'array']]
      },
      6: {
        6: [[__static_wrapper_error, null, unshift, 'string', 'string', 'string', 'string', 'string', 'array']]
      },
      7: {
        6: [[__static_wrapper_info, null, unshift, 'string', 'string', 'string', 'object', 'string', 'array']]
      }
    }, false);
    if (pkg) for (p in pkg) _wnd.whatfix.observer.ConsoleObserver[p] === undefined && (_wnd.whatfix.observer.ConsoleObserver[p] = pkg[p]);
  }
  function ConsoleObserver_ExporterImpl() {
    $export(this);
  }
  function __static_wrapper_debug(instance, a0, a1, a2, a3, a4) {
    $debug(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  function __static_wrapper_error(instance, a0, a1, a2, a3, a4, a5) {
    $error(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_info(instance, a0, a1, a2, a3, a4, a5) {
    $info(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_log(instance, a0, a1, a2, a3, a4, a5, a6) {
    $log_1(instance, a0, a1, a2, a3, a4, a5, ($clinit_ExporterUtil(), $toArrObject(a6, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a6.length, 5, 1))));
  }
  function __static_wrapper_log_0(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $log_3(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_nfr(instance, a0, a1, a2, a3, a4, a5) {
    $nfr(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_performance(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $performance(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_warning(instance, a0, a1, a2, a3, a4) {
    $warning(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  defineClass(102, 1, $intern_10, ConsoleObserver_ExporterImpl);
  _.getJsConstructor = function getJsConstructor() {
    return _wnd.whatfix.observer.ConsoleObserver;
  };
  _.isAssignable = function isAssignable(o) {
    return o != null && instanceOf(o, 50);
  };
  var exported = false;
  var Lcom_whatfix_observer_ConsoleObserver_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'ConsoleObserver_ExporterImpl', 102, Ljava_lang_Object_2_classLit);
  function $error_0(message) {
    window.console && window.console.error && window.console.error(message);
  }
  function $logNative(message) {
    window.console && window.console.log && window.console.log(message);
  }
  var Lcom_whatfix_observer_IObserverFilter_2_classLit = createForInterface('com.whatfix.observer', 'IObserverFilter');
  function $export_0(this$static) {
    if (!exported_0) {
      exported_0 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_IObserverFilter_2_classLit, this$static);
      new ObserverRecord_ExporterImpl();
      $export0_0(this$static);
    }
  }
  function $export0_0(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.IObserverFilter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.IObserverFilter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.IObserverFilter.prototype = new Object();
    __0.shouldFilter = $entry(function (a0) {
      return this.g.shouldFilter_0(a0 == null ? null : a0.g);
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.IObserverFilter[p] === undefined && (_wnd.whatfix.observer.IObserverFilter[p] = pkg[p]);
  }
  function IObserverFilter_ExporterImpl() {
    $export_0(this);
  }
  defineClass(60, 1, $intern_10, IObserverFilter_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_0() {
    return _wnd.whatfix.observer.IObserverFilter;
  };
  _.isAssignable = function isAssignable_0(o) {
    return o != null && instanceOf(o, 62);
  };
  var exported_0 = false;
  var Lcom_whatfix_observer_IObserverFilter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'IObserverFilter_ExporterImpl', 60, Ljava_lang_Object_2_classLit);
  var Lcom_whatfix_observer_IObserverWriter_2_classLit = createForInterface('com.whatfix.observer', 'IObserverWriter');
  function $export_1(this$static) {
    if (!exported_1) {
      exported_1 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_IObserverWriter_2_classLit, this$static);
      new ObserverRecord_ExporterImpl();
      new DeviceInfo_ExporterImpl();
      $export0_1(this$static);
    }
  }
  function $export0_1(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.IObserverWriter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.IObserverWriter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.IObserverWriter.prototype = new Object();
    __0.execute = $entry(function (a0, a1, a2) {
      runDispatch_0(this.g, Lcom_whatfix_observer_IObserverWriter_2_classLit, 0, arguments, false, false)[0];
    });
    registerDispatchMap(Lcom_whatfix_observer_IObserverWriter_2_classLit, {
      0: {
        2: [[function () {
          return this.execute_0.apply(this, arguments);
        }, null, undefined, Lcom_whatfix_observer_ObserverRecord_2_classLit, Lcom_whatfix_observer_device_DeviceInfo_2_classLit]],
        3: [[__static_wrapper_execute, null, unshift, 'string', 'array', Lcom_whatfix_observer_device_DeviceInfo_2_classLit]]
      }
    }, false);
    if (pkg) for (p in pkg) _wnd.whatfix.observer.IObserverWriter[p] === undefined && (_wnd.whatfix.observer.IObserverWriter[p] = pkg[p]);
  }
  function IObserverWriter_ExporterImpl() {
    $export_1(this);
  }
  function __static_wrapper_execute(instance, a0, a1, a2) {
    instance.execute_1(a0, ($clinit_ExporterUtil(), castTo($toArrObject(a1, initUnidimensionalArray(Lcom_whatfix_observer_ObserverRecord_2_classLit, $intern_9, 18, a1.length, 0, 1)), 32)), a2);
  }
  defineClass(103, 1, $intern_10, IObserverWriter_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_1() {
    return _wnd.whatfix.observer.IObserverWriter;
  };
  _.isAssignable = function isAssignable_1(o) {
    return o != null && instanceOf(o, 137);
  };
  var exported_1 = false;
  var Lcom_whatfix_observer_IObserverWriter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'IObserverWriter_ExporterImpl', 103, Ljava_lang_Object_2_classLit);
  function $getMap(this$static) {
    var key, key$array, key$index, key$max, ledger;
    ledger = new HashMap();
    for (key$array = $keys(this$static), key$index = 0, key$max = key$array.length; key$index < key$max; ++key$index) {
      key = key$array[key$index];
      $putStringValue(ledger, key, this$static[key] != null ? this$static[key] : '');
    }
    return ledger;
  }
  function $keys(this$static) {
    var keys_0 = [];
    for (var key in this$static) {
      this$static.hasOwnProperty(key) && keys_0.push(key);
    }
    return keys_0;
  }
  function $execute(record) {
    $logNative($getLoggingMessage(record));
  }
  function $execute_0(this$static, groupName, records, device) {
    var aRecord, aRecord$index, aRecord$max;
    if (groupName == null && records.length > 0) {
      $execute(records[0]);
      return;
    }
    window.console && window.console.groupCollapsed && window.console.groupCollapsed(groupName);
    for (aRecord$index = 0, aRecord$max = records.length; aRecord$index < aRecord$max; ++aRecord$index) {
      aRecord = records[aRecord$index];
      $logNative($getLoggingMessage(aRecord));
    }
    window.console && window.console.groupEnd && window.console.groupEnd();
  }
  function $getLoggingMessage(record) {
    var logMessage, metaAsStr;
    metaAsStr = castToString($orElse($map(ofNullable(toMap(record.meta)), new Observer$DefaultWriter$lambda$0$Type()), ''));
    logMessage = $trim(join_1(' ', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_CharSequence_2_classLit, 1), $intern_0, 33, 0, [$toString_1(new Timestamp(($clinit_System(), fromDouble_0(Date.now())))), $name(record.level_0), record.className, record.methodName, 'Message :', record.message_0, metaAsStr])));
    return logMessage;
  }
  function Observer$DefaultWriter() {}
  defineClass(28, 1, {
    13: 1,
    137: 1,
    28: 1
  }, Observer$DefaultWriter);
  _.execute_0 = function execute(record, device) {
    $execute(record);
  };
  _.execute_1 = function execute_0(groupName, records, device) {
    $execute_0(this, groupName, records, device);
  };
  var Lcom_whatfix_observer_Observer$DefaultWriter_2_classLit = createForClass('com.whatfix.observer', 'Observer/DefaultWriter', 28, Ljava_lang_Object_2_classLit);
  function Observer$DefaultWriter$lambda$0$Type() {}
  defineClass(108, 1, {}, Observer$DefaultWriter$lambda$0$Type);
  _.apply_0 = function apply_1(arg0) {
    return castToString($collect($map_0(new StreamImpl(null, new Spliterators$IteratorSpliterator(castTo(arg0, 40).entrySet(), 1)), new Observer$DefaultWriter$lambda$1$Type()), of(new Collectors$lambda$6$Type(), new Collectors$9methodref$add$Type(), new Collectors$10methodref$merge$Type(), new Collectors$11methodref$toString$Type(), stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 30, 0, []))));
  };
  var Lcom_whatfix_observer_Observer$DefaultWriter$lambda$0$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/DefaultWriter/lambda$0$Type', 108, Ljava_lang_Object_2_classLit);
  function Observer$DefaultWriter$lambda$1$Type() {}
  defineClass(107, 1, {}, Observer$DefaultWriter$lambda$1$Type);
  _.apply_0 = function apply_2(arg0) {
    return join_1(' : ', stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_CharSequence_2_classLit, 1), $intern_0, 33, 0, [castTo(castTo(arg0, 9).getKey(), 33), castTo(castTo(arg0, 9).getValue_0(), 33)]));
  };
  var Lcom_whatfix_observer_Observer$DefaultWriter$lambda$1$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/DefaultWriter/lambda$1$Type', 107, Ljava_lang_Object_2_classLit);
  function Observer$lambda$0$Type() {}
  defineClass(109, 1, {}, Observer$lambda$0$Type);
  _.apply_0 = function apply_3(arg0) {
    return new HashSet_0(new Arrays$ArrayList(stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_IObserverFilter_2_classLit, 1), $intern_0, 62, 0, [castTo(arg0, 62)])));
  };
  var Lcom_whatfix_observer_Observer$lambda$0$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/lambda$0$Type', 109, Ljava_lang_Object_2_classLit);
  function Observer$lambda$1$Type(record_0) {
    this.record_0 = record_0;
  }
  defineClass(110, 1, {}, Observer$lambda$1$Type);
  _.apply_0 = function apply_4(arg0) {
    return lambda$1(this.record_0, arg0);
  };
  var Lcom_whatfix_observer_Observer$lambda$1$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/lambda$1$Type', 110, Ljava_lang_Object_2_classLit);
  function Observer$lambda$2$Type() {}
  defineClass(111, 1, {}, Observer$lambda$2$Type);
  _.apply_1 = function apply_5(arg0, arg1) {
    return $clinit_Boolean(), (checkCriticalNotNull(castToBoolean(arg0)), castToBoolean(arg0)) && (checkCriticalNotNull(castToBoolean(arg1)), castToBoolean(arg1)) ? true : false;
  };
  var Lcom_whatfix_observer_Observer$lambda$2$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/lambda$2$Type', 111, Ljava_lang_Object_2_classLit);
  function Observer$lambda$3$Type($$outer_0, record_1) {
    this.$$outer_0 = $$outer_0;
    this.record_1 = record_1;
  }
  defineClass(163, $wnd.Function, {}, Observer$lambda$3$Type);
  _.exec_0 = function exec_0(arg0, arg1) {
    $lambda$3(this.$$outer_0, this.record_1, arg0);
  };
  function Observer$lambda$4$Type() {}
  defineClass(112, 1, {}, Observer$lambda$4$Type);
  _.apply_0 = function apply_6(arg0) {
    return $getMap(castToJso(arg0));
  };
  var Lcom_whatfix_observer_Observer$lambda$4$Type_2_classLit = createForClass('com.whatfix.observer', 'Observer/lambda$4$Type', 112, Ljava_lang_Object_2_classLit);
  function $name(this$static) {
    return this$static.name_0 != null ? this$static.name_0 : '' + this$static.ordinal;
  }
  function $toString_0(this$static) {
    return this$static.name_0 != null ? this$static.name_0 : '' + this$static.ordinal;
  }
  function Enum(name_0, ordinal) {
    this.name_0 = name_0;
    this.ordinal = ordinal;
  }
  function createValueOfMap(enumConstants) {
    var result, value_0, value$index, value$max;
    result = {};
    for (value$index = 0, value$max = enumConstants.length; value$index < value$max; ++value$index) {
      value_0 = enumConstants[value$index];
      result[':' + (value_0.name_0 != null ? value_0.name_0 : '' + value_0.ordinal)] = value_0;
    }
    return result;
  }
  function valueOf(map_0, name_0) {
    var result;
    checkCriticalNotNull(name_0);
    result = map_0[':' + name_0];
    checkCriticalArgument_0(!!result, stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [name_0]));
    return result;
  }
  defineClass(17, 1, {
    3: 1,
    16: 1,
    17: 1
  });
  _.equals_0 = function equals_1(other) {
    return this === other;
  };
  _.hashCode_0 = function hashCode_2() {
    return getHashCode(this);
  };
  _.toString_0 = function toString_3() {
    return $toString_0(this);
  };
  _.ordinal = 0;
  var Ljava_lang_Enum_2_classLit = createForClass('java.lang', 'Enum', 17, Ljava_lang_Object_2_classLit);
  function $clinit_ObserverLevel() {
    $clinit_ObserverLevel = emptyMethod;
    ALL = new ObserverLevel('ALL', 0, 100);
    DEBUG = new ObserverLevel('DEBUG', 1, 200);
    WARNING = new ObserverLevel('WARNING', 2, 300);
    PERFORMANCE = new ObserverLevel('PERFORMANCE', 3, 400);
    ERROR = new ObserverLevel('ERROR', 4, 500);
    INFO = new ObserverLevel('INFO', 5, 600);
    NFR = new ObserverLevel('NFR', 6, 700);
  }
  function ObserverLevel(enum$name, enum$ordinal, level) {
    Enum.call(this, enum$name, enum$ordinal);
    this.level_0 = level;
  }
  function getEnumValue(name_0) {
    $clinit_ObserverLevel();
    var enm, enumVal, enumVal$array, enumVal$index, enumVal$max;
    enm = ALL;
    for (enumVal$array = stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, 1), $intern_11, 10, 0, [ALL, DEBUG, WARNING, PERFORMANCE, ERROR, INFO, NFR]), enumVal$index = 0, enumVal$max = enumVal$array.length; enumVal$index < enumVal$max; ++enumVal$index) {
      enumVal = enumVal$array[enumVal$index];
      if ($equalsIgnoreCase(enumVal.name_0 != null ? enumVal.name_0 : '' + enumVal.ordinal, name_0)) {
        enm = enumVal;
        break;
      }
    }
    return enm;
  }
  function values_0() {
    $clinit_ObserverLevel();
    return stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, 1), $intern_11, 10, 0, [ALL, DEBUG, WARNING, PERFORMANCE, ERROR, INFO, NFR]);
  }
  defineClass(10, 17, {
    13: 1,
    10: 1,
    3: 1,
    16: 1,
    17: 1
  }, ObserverLevel);
  _.getLevel_0 = function getLevel() {
    return this.level_0;
  };
  _.getValue = function getValue() {
    return this.name_0 != null ? this.name_0 : '' + this.ordinal;
  };
  _.level_0 = 0;
  var ALL, DEBUG, ERROR, INFO, NFR, PERFORMANCE, WARNING;
  var Lcom_whatfix_observer_ObserverLevel_2_classLit = createForEnum('com.whatfix.observer', 'ObserverLevel', 10, Ljava_lang_Enum_2_classLit, values_0);
  function $clinit_ObserverLevel$Map() {
    $clinit_ObserverLevel$Map = emptyMethod;
    $MAP = createValueOfMap(($clinit_ObserverLevel(), stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, 1), $intern_11, 10, 0, [ALL, DEBUG, WARNING, PERFORMANCE, ERROR, INFO, NFR])));
  }
  var $MAP;
  function $getAcceptedLogLevels(this$static) {
    return this$static.acceptedLogLevels;
  }
  function ObserverLevelFilter(acceptedLogLevels) {
    var acceptedLevels;
    this.acceptedLogLevels = new HashSet();
    acceptedLevels = castTo($orElse($map(($clinit_Optional(), acceptedLogLevels == null ? EMPTY : new Optional(checkCriticalNotNull(acceptedLogLevels))), new ObserverLevelFilter$lambda$0$Type()), new HashSet()), 31);
    this.acceptedLogLevels = acceptedLevels;
  }
  defineClass(46, 1, {
    13: 1,
    62: 1,
    46: 1
  }, ObserverLevelFilter);
  _.getAcceptedLogLevels_0 = function getAcceptedLogLevels() {
    return $getAcceptedLogLevels(this);
  };
  _.setAcceptedLogLevels_0 = function setAcceptedLogLevels(acceptedLogLevels) {
    this.acceptedLogLevels = acceptedLogLevels;
  };
  _.shouldFilter_0 = function shouldFilter(record) {
    if ($getAcceptedLogLevels(this).contains(($clinit_ObserverLevel(), ALL))) {
      return $clinit_Boolean(), TRUE;
    }
    return $clinit_Boolean(), $getAcceptedLogLevels(this).contains(record.level_0) ? true : false;
  };
  var Lcom_whatfix_observer_ObserverLevelFilter_2_classLit = createForClass('com.whatfix.observer', 'ObserverLevelFilter', 46, Ljava_lang_Object_2_classLit);
  function ObserverLevelFilter$lambda$0$Type() {}
  defineClass(114, 1, {}, ObserverLevelFilter$lambda$0$Type);
  _.apply_0 = function apply_7(arg0) {
    return new HashSet_0(new Arrays$ArrayList(castTo(arg0, 42)));
  };
  var Lcom_whatfix_observer_ObserverLevelFilter$lambda$0$Type_2_classLit = createForClass('com.whatfix.observer', 'ObserverLevelFilter/lambda$0$Type', 114, Ljava_lang_Object_2_classLit);
  function $export_2(this$static) {
    if (!exported_2) {
      exported_2 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_ObserverLevelFilter_2_classLit, this$static);
      new IObserverFilter_ExporterImpl();
      new ObserverLevel_ExporterImpl();
      new ObserverRecord_ExporterImpl();
      $export0_2(this$static);
    }
  }
  function $export0_2(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.ObserverLevelFilter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.ObserverLevelFilter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) ? g = a[0] : a.length == 1 && (g = new ObserverLevelFilter(a[0]));
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.ObserverLevelFilter.prototype = new Object();
    __0.getAcceptedLogLevels = $entry(function () {
      return this.g.getAcceptedLogLevels_0();
    });
    _wnd.whatfix.observer.ObserverLevelFilter.getInstance = $entry(function (a0) {
      return wrap(new ObserverLevelFilter(castTo($toArrObject(a0, initUnidimensionalArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, $intern_11, 10, a0.length, 0, 1)), 42)));
    });
    __0.setAcceptedLogLevels = $entry(function (a0) {
      this.g.setAcceptedLogLevels_0(a0);
    });
    __0.shouldFilter = $entry(function (a0) {
      return this.g.shouldFilter_0(a0 == null ? null : a0.g);
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.ObserverLevelFilter[p] === undefined && (_wnd.whatfix.observer.ObserverLevelFilter[p] = pkg[p]);
  }
  function ObserverLevelFilter_ExporterImpl() {
    $export_2(this);
  }
  defineClass(104, 1, $intern_10, ObserverLevelFilter_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_2() {
    return _wnd.whatfix.observer.ObserverLevelFilter;
  };
  _.isAssignable = function isAssignable_2(o) {
    return o != null && instanceOf(o, 46);
  };
  var exported_2 = false;
  var Lcom_whatfix_observer_ObserverLevelFilter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'ObserverLevelFilter_ExporterImpl', 104, Ljava_lang_Object_2_classLit);
  function $export_3(this$static) {
    if (!exported_3) {
      exported_3 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_ObserverLevel_2_classLit, this$static);
      $export0_3(this$static);
    }
  }
  function $export0_3(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.ObserverLevel'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.ObserverLevel = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.ObserverLevel.prototype = new Object();
    _wnd.whatfix.observer.ObserverLevel.ALL = ($clinit_ObserverLevel(), ALL);
    _wnd.whatfix.observer.ObserverLevel.DEBUG = DEBUG;
    _wnd.whatfix.observer.ObserverLevel.WARNING = WARNING;
    _wnd.whatfix.observer.ObserverLevel.PERFORMANCE = PERFORMANCE;
    _wnd.whatfix.observer.ObserverLevel.ERROR = ERROR;
    _wnd.whatfix.observer.ObserverLevel.INFO = INFO;
    _wnd.whatfix.observer.ObserverLevel.NFR = NFR;
    _wnd.whatfix.observer.ObserverLevel.getEnumValue = $entry(function (a0) {
      return wrap(getEnumValue(a0));
    });
    __0.level = $entry(function () {
      return this.g.getLevel_0();
    });
    __0.value = $entry(function () {
      return this.g.getValue();
    });
    _wnd.whatfix.observer.ObserverLevel.valueOf = $entry(function (a0) {
      return wrap(valueOf(($clinit_ObserverLevel$Map(), $MAP), a0));
    });
    _wnd.whatfix.observer.ObserverLevel.values = $entry(function () {
      return wrap_0(stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, 1), $intern_11, 10, 0, [ALL, DEBUG, WARNING, PERFORMANCE, ERROR, INFO, NFR]));
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.ObserverLevel[p] === undefined && (_wnd.whatfix.observer.ObserverLevel[p] = pkg[p]);
  }
  function ObserverLevel_ExporterImpl() {
    $export_3(this);
  }
  defineClass(37, 1, $intern_10, ObserverLevel_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_3() {
    return _wnd.whatfix.observer.ObserverLevel;
  };
  _.isAssignable = function isAssignable_3(o) {
    return o != null && instanceOf(o, 10);
  };
  var exported_3 = false;
  var Lcom_whatfix_observer_ObserverLevel_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'ObserverLevel_ExporterImpl', 37, Ljava_lang_Object_2_classLit);
  function $setClassName(this$static, className) {
    this$static.className = className;
  }
  function $setErrorStacktrace(this$static, errorStacktrace) {
    this$static.errorStacktrace = errorStacktrace;
  }
  function $setGroupKey(this$static, groupKey) {
    this$static.groupKey = groupKey;
  }
  function $setLevel(this$static, level) {
    this$static.level_0 = level;
  }
  function $setMessage(this$static, message) {
    this$static.message_0 = message;
  }
  function $setMeta(this$static, meta) {
    this$static.meta = meta;
  }
  function $setMethodName(this$static, methodName) {
    this$static.methodName = methodName;
  }
  function $setModuleName(this$static, moduleName) {
    this$static.moduleName = moduleName;
  }
  function $setPerformanceTime(this$static, performanceTime) {
    this$static.performanceTime = performanceTime;
  }
  function ObserverRecord() {}
  defineClass(18, 1, {
    13: 1,
    18: 1
  }, ObserverRecord);
  _.getClassName_0 = function getClassName() {
    return this.className;
  };
  _.getErrorStacktrace_0 = function getErrorStacktrace() {
    return this.errorStacktrace;
  };
  _.getGroupKey_0 = function getGroupKey() {
    return this.groupKey;
  };
  _.getLevel_1 = function getLevel_0() {
    return this.level_0;
  };
  _.getMessage_0 = function getMessage_1() {
    return this.message_0;
  };
  _.getMeta_0 = function getMeta() {
    return this.meta;
  };
  _.getMethodName_0 = function getMethodName() {
    return this.methodName;
  };
  _.getModuleName_0 = function getModuleName() {
    return this.moduleName;
  };
  _.getPerformanceTime_0 = function getPerformanceTime() {
    return this.performanceTime;
  };
  _.getUseCase_0 = function getUseCase() {
    return this.useCase;
  };
  _.setClassName_0 = function setClassName(className) {
    $setClassName(this, className);
  };
  _.setErrorStacktrace_0 = function setErrorStacktrace(errorStacktrace) {
    $setErrorStacktrace(this, errorStacktrace);
  };
  _.setGroupKey_0 = function setGroupKey(groupKey) {
    $setGroupKey(this, groupKey);
  };
  _.setLevel_0 = function setLevel(level) {
    $setLevel(this, level);
  };
  _.setMessage_0 = function setMessage(message) {
    $setMessage(this, message);
  };
  _.setMeta_0 = function setMeta(meta) {
    $setMeta(this, meta);
  };
  _.setMethodName_0 = function setMethodName(methodName) {
    $setMethodName(this, methodName);
  };
  _.setModuleName_0 = function setModuleName(moduleName) {
    $setModuleName(this, moduleName);
  };
  _.setPerformanceTime_0 = function setPerformanceTime(performanceTime) {
    $setPerformanceTime(this, performanceTime);
  };
  _.setUseCase_0 = function setUseCase(useCase) {
    this.useCase = useCase;
  };
  _.performanceTime = 0;
  var Lcom_whatfix_observer_ObserverRecord_2_classLit = createForClass('com.whatfix.observer', 'ObserverRecord', 18, Ljava_lang_Object_2_classLit);
  function $className(this$static, value_0) {
    $setClassName(this$static.instance, value_0);
    return this$static;
  }
  function $errorStacktrace(this$static, value_0) {
    $setErrorStacktrace(this$static.instance, value_0);
    return this$static;
  }
  function $groupKey(this$static, value_0) {
    $setGroupKey(this$static.instance, value_0);
    return this$static;
  }
  function $level(this$static, level) {
    $setLevel(this$static.instance, level);
    return this$static;
  }
  function $message(this$static, value_0) {
    $setMessage(this$static.instance, value_0);
    return this$static;
  }
  function $meta(this$static, value_0) {
    $setMeta(this$static.instance, value_0);
    return this$static;
  }
  function $methodName(this$static, value_0) {
    $setMethodName(this$static.instance, value_0);
    return this$static;
  }
  function $moduleName_0(this$static, value_0) {
    $setModuleName(this$static.instance, value_0);
    return this$static;
  }
  function $performanceTime(this$static, value_0) {
    $setPerformanceTime(this$static.instance, value_0);
    return this$static;
  }
  function ObserverRecord$Builder() {
    this.instance = new ObserverRecord();
  }
  defineClass(38, 1, {}, ObserverRecord$Builder);
  var Lcom_whatfix_observer_ObserverRecord$Builder_2_classLit = createForClass('com.whatfix.observer', 'ObserverRecord/Builder', 38, Ljava_lang_Object_2_classLit);
  function $export_4(this$static) {
    if (!exported_4) {
      exported_4 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_ObserverRecord_2_classLit, this$static);
      new ObserverLevel_ExporterImpl();
      $export0_4(this$static);
    }
  }
  function $export0_4(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('com.whatfix.ObserverRecord'));
    var __0,
      __ = this$static;
    _wnd.com.whatfix.ObserverRecord = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) ? g = a[0] : a.length == 0 && (g = new ObserverRecord());
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.com.whatfix.ObserverRecord.prototype = new Object();
    _wnd.com.whatfix.ObserverRecord.builder = $entry(function () {
      return new ObserverRecord$Builder();
    });
    __0.getClassName = $entry(function () {
      return this.g.getClassName_0();
    });
    __0.getErrorStacktrace = $entry(function () {
      return this.g.getErrorStacktrace_0();
    });
    __0.getGroupKey = $entry(function () {
      return this.g.getGroupKey_0();
    });
    __0.getLevel = $entry(function () {
      return wrap(this.g.getLevel_1());
    });
    __0.getMessage = $entry(function () {
      return this.g.getMessage_0();
    });
    __0.getMeta = $entry(function () {
      return this.g.getMeta_0();
    });
    __0.getMethodName = $entry(function () {
      return this.g.getMethodName_0();
    });
    __0.getModuleName = $entry(function () {
      return this.g.getModuleName_0();
    });
    __0.getPerformanceTime = $entry(function () {
      return this.g.getPerformanceTime_0();
    });
    __0.getUseCase = $entry(function () {
      return this.g.getUseCase_0();
    });
    __0.setClassName = $entry(function (a0) {
      this.g.setClassName_0(a0);
    });
    __0.setErrorStacktrace = $entry(function (a0) {
      this.g.setErrorStacktrace_0(a0);
    });
    __0.setGroupKey = $entry(function (a0) {
      this.g.setGroupKey_0(a0);
    });
    __0.setLevel = $entry(function (a0) {
      this.g.setLevel_0(a0 == null ? null : a0.g);
    });
    __0.setMessage = $entry(function (a0) {
      this.g.setMessage_0(a0);
    });
    __0.setMeta = $entry(function (a0) {
      this.g.setMeta_0(a0);
    });
    __0.setMethodName = $entry(function (a0) {
      this.g.setMethodName_0(a0);
    });
    __0.setModuleName = $entry(function (a0) {
      this.g.setModuleName_0(a0);
    });
    __0.setPerformanceTime = $entry(function (a0) {
      this.g.setPerformanceTime_0(a0);
    });
    __0.setUseCase = $entry(function (a0) {
      this.g.setUseCase_0(a0);
    });
    if (pkg) for (p in pkg) _wnd.com.whatfix.ObserverRecord[p] === undefined && (_wnd.com.whatfix.ObserverRecord[p] = pkg[p]);
  }
  function ObserverRecord_ExporterImpl() {
    $export_4(this);
  }
  defineClass(29, 1, $intern_10, ObserverRecord_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_4() {
    return _wnd.com.whatfix.ObserverRecord;
  };
  _.isAssignable = function isAssignable_4(o) {
    return o != null && instanceOf(o, 18);
  };
  var exported_4 = false;
  var Lcom_whatfix_observer_ObserverRecord_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'ObserverRecord_ExporterImpl', 29, Ljava_lang_Object_2_classLit);
  function $clinit_ObserverStore() {
    $clinit_ObserverStore = emptyMethod;
    INSTANCE_0 = new ObserverStore();
  }
  function $registerObserver(this$static, observer) {
    if ($contains_0(this$static.observers, observer)) {
      return $booleanValue(($clinit_Boolean(), FALSE));
    }
    return $add(this$static.observers, observer);
  }
  function ObserverStore() {
    Observer_0.call(this, new HashSet(), new Observer$DefaultWriter(), true);
    this.observers = new HashSet();
  }
  function lambda$1_0(record_0, aObserver_1) {
    $clinit_ObserverStore();
    aObserver_1.log_0(record_0);
  }
  function lambda$2(groupName_0, aObserver_1) {
    $clinit_ObserverStore();
    aObserver_1.flushLog_0(groupName_0);
  }
  defineClass(51, 19, {
    13: 1,
    19: 1,
    51: 1
  }, ObserverStore);
  _.flushLog_0 = function flushLog_0(groupName) {
    $forEach(this.observers, new ObserverStore$lambda$2$Type(groupName));
  };
  _.log_0 = function log_1(record) {
    $forEach(this.observers, new ObserverStore$lambda$1$Type(record));
  };
  _.registerObserver_0 = function registerObserver(observer) {
    return $registerObserver(this, observer);
  };
  _.subscribe_0 = function subscribe(writer, filter, isGroupingNeeded) {
    var aFilter, aWriter, anObserver;
    if (!writer) {
      return null;
    }
    aWriter = new ObserverStore$1(writer);
    aFilter = new ObserverStore$lambda$0$Type(filter);
    anObserver = new Observer(aFilter, aWriter, (checkCriticalNotNull(isGroupingNeeded), isGroupingNeeded));
    $registerObserver(this, anObserver);
    return anObserver;
  };
  _.unSubscribe_0 = function unSubscribe(observer) {
    $remove_0(this.observers, observer);
  };
  var INSTANCE_0;
  var Lcom_whatfix_observer_ObserverStore_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore', 51, Lcom_whatfix_observer_Observer_2_classLit);
  function ObserverStore$1(val$writer) {
    this.val$writer2 = val$writer;
  }
  defineClass(115, 1, {
    13: 1,
    137: 1
  }, ObserverStore$1);
  _.execute_0 = function execute_1(record, device) {
    $execute_1(this.val$writer2, null, stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_ObserverRecord_2_classLit, 1), $intern_9, 18, 0, [record]), device);
  };
  _.execute_1 = function execute_2(groupName, records, device) {
    $execute_1(this.val$writer2, groupName, records, device);
  };
  var Lcom_whatfix_observer_ObserverStore$1_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore/1', 115, Ljava_lang_Object_2_classLit);
  function ObserverStore$lambda$0$Type(filter_0) {
    this.filter_0 = filter_0;
  }
  defineClass(116, 1, {
    13: 1,
    62: 1
  }, ObserverStore$lambda$0$Type);
  _.shouldFilter_0 = function shouldFilter_0(arg0) {
    return $clinit_ObserverStore(), $clinit_Boolean(), $shouldFilter(this.filter_0, arg0) ? true : false;
  };
  var Lcom_whatfix_observer_ObserverStore$lambda$0$Type_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore/lambda$0$Type', 116, Ljava_lang_Object_2_classLit);
  function ObserverStore$lambda$1$Type(record_0) {
    this.record_0 = record_0;
  }
  defineClass(117, 1, {}, ObserverStore$lambda$1$Type);
  _.accept = function accept(arg0) {
    lambda$1_0(this.record_0, arg0);
  };
  var Lcom_whatfix_observer_ObserverStore$lambda$1$Type_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore/lambda$1$Type', 117, Ljava_lang_Object_2_classLit);
  function ObserverStore$lambda$2$Type(groupName_0) {
    this.groupName_0 = groupName_0;
  }
  defineClass(118, 1, {}, ObserverStore$lambda$2$Type);
  _.accept = function accept_0(arg0) {
    lambda$2(this.groupName_0, arg0);
  };
  var Lcom_whatfix_observer_ObserverStore$lambda$2$Type_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore/lambda$2$Type', 118, Ljava_lang_Object_2_classLit);
  function $export_5(this$static) {
    if (!exported_5) {
      exported_5 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_ObserverStore_2_classLit, this$static);
      new IObserverFilter_ExporterImpl();
      new ObserverLevel_ExporterImpl();
      new Observer_ExporterImpl();
      new IJsWriter_ExporterImpl();
      new IJsFilter_ExporterImpl();
      $export0_5(this$static);
    }
  }
  function $export0_5(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.Store'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.Store = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.Store.prototype = new Object();
    __0.debug = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 0, arguments, false, true)[0];
    });
    __0.error = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 5, arguments, false, true)[0];
    });
    __0.flush = $entry(function (a0) {
      this.g.flush_0(a0);
    });
    _wnd.whatfix.observer.Store.getDefaultFilter = $entry(function (a0) {
      return wrap(($clinit_ObserverStore(), new ObserverLevelFilter(castTo($toArrObject(a0, initUnidimensionalArray(Lcom_whatfix_observer_ObserverLevel_2_classLit, $intern_11, 10, a0.length, 0, 1)), 42))));
    });
    _wnd.whatfix.observer.Store.getDefaultStore = $entry(function () {
      return wrap(($clinit_ObserverStore(), new ObserverStore()));
    });
    _wnd.whatfix.observer.Store.getInstance = $entry(function () {
      return wrap(($clinit_ObserverStore(), INSTANCE_0));
    });
    __0.info = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 6, arguments, false, true)[0];
    });
    __0.log = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 2, arguments, false, true)[0];
    });
    __0.nfr = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 4, arguments, false, true)[0];
    });
    __0.performance = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 1, arguments, false, true)[0];
    });
    __0.registerObserver = $entry(function (a0) {
      return this.g.registerObserver_0(a0 == null ? null : a0.g);
    });
    __0.subscribe = $entry(function (a0, a1, a2) {
      var g;
      return wrap(this.g.subscribe_0(a0 == null ? null : a0.constructor == _wnd.whatfix.observer.v2.IJsWriter ? a0.g : new IJsWriter_ExporterImpl_0(a0), a1 == null ? null : a1.constructor == _wnd.whatfix.observer.v2.IJsFilter ? a1.g : new IJsFilter_ExporterImpl_0(a1), a2 != null && instanceOfJso(a2) && (g = getGwtInstance(castToJso(a2))) != null ? g : a2));
    });
    __0.unSubscribe = $entry(function (a0) {
      this.g.unSubscribe_0(a0 == null ? null : a0.g);
    });
    __0.warning = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_ObserverStore_2_classLit, 3, arguments, false, true)[0];
    });
    registerDispatchMap(Lcom_whatfix_observer_ObserverStore_2_classLit, {
      0: {
        5: [[__static_wrapper_debug_0, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      1: {
        8: [[__static_wrapper_performance_0, null, unshift, 'string', 'string', 'string', 'string', 'number', 'object', 'string', 'array']]
      },
      2: {
        7: [[__static_wrapper_log_1, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'object', 'string', 'array']],
        8: [[__static_wrapper_log_2, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'string', 'object', 'string', 'array']]
      },
      3: {
        5: [[__static_wrapper_warning_0, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      4: {
        6: [[__static_wrapper_nfr_0, null, unshift, 'string', 'string', 'string', 'number', 'string', 'array']]
      },
      5: {
        6: [[__static_wrapper_error_0, null, unshift, 'string', 'string', 'string', 'string', 'string', 'array']]
      },
      6: {
        6: [[__static_wrapper_info_0, null, unshift, 'string', 'string', 'string', 'object', 'string', 'array']]
      }
    }, false);
    if (pkg) for (p in pkg) _wnd.whatfix.observer.Store[p] === undefined && (_wnd.whatfix.observer.Store[p] = pkg[p]);
  }
  function ObserverStore_ExporterImpl() {
    $export_5(this);
  }
  function __static_wrapper_debug_0(instance, a0, a1, a2, a3, a4) {
    $debug(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  function __static_wrapper_error_0(instance, a0, a1, a2, a3, a4, a5) {
    $error(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_info_0(instance, a0, a1, a2, a3, a4, a5) {
    $info(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_log_1(instance, a0, a1, a2, a3, a4, a5, a6) {
    $log_1(instance, a0, a1, a2, a3, a4, a5, ($clinit_ExporterUtil(), $toArrObject(a6, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a6.length, 5, 1))));
  }
  function __static_wrapper_log_2(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $log_3(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_nfr_0(instance, a0, a1, a2, a3, a4, a5) {
    $nfr(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_performance_0(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $performance(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_warning_0(instance, a0, a1, a2, a3, a4) {
    $warning(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  defineClass(106, 1, $intern_10, ObserverStore_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_5() {
    return _wnd.whatfix.observer.Store;
  };
  _.isAssignable = function isAssignable_5(o) {
    return o != null && instanceOf(o, 51);
  };
  var exported_5 = false;
  var Lcom_whatfix_observer_ObserverStore_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'ObserverStore_ExporterImpl', 106, Ljava_lang_Object_2_classLit);
  function format(template, args) {
    var e, i, len, idx;
    if (template == null) {
      return '';
    }
    try {
      len = args.length;
      for (i = 0; i < len; i++) {
        template = (idx = template.indexOf('{' + i + '}'), idx == -1 ? template : template.substr(0, idx) + ('' + args[i]) + $substring(template, idx + ('{' + i + '}').length));
      }
      return template;
    } catch ($e0) {
      $e0 = toJava($e0);
      if (instanceOf($e0, 5)) {
        e = $e0;
        $printStackTraceImpl(e, ($clinit_System(), err), '');
      } else throw toJs($e0);
    }
    return template;
  }
  function $export_6(this$static) {
    if (!exported_6) {
      exported_6 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_Observer$DefaultWriter_2_classLit, this$static);
      new ObserverRecord_ExporterImpl();
      new DeviceInfo_ExporterImpl();
      $export0_6(this$static);
    }
  }
  function $export0_6(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.DefaultWriter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.DefaultWriter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) ? g = a[0] : a.length == 0 && (g = new Observer$DefaultWriter());
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.DefaultWriter.prototype = new Object();
    __0.execute = $entry(function (a0, a1, a2) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer$DefaultWriter_2_classLit, 0, arguments, false, false)[0];
    });
    _wnd.whatfix.observer.DefaultWriter.getInstance = $entry(function () {
      return wrap(new Observer$DefaultWriter());
    });
    registerDispatchMap(Lcom_whatfix_observer_Observer$DefaultWriter_2_classLit, {
      0: {
        2: [[function () {
          return this.execute_0.apply(this, arguments);
        }, null, undefined, Lcom_whatfix_observer_ObserverRecord_2_classLit, Lcom_whatfix_observer_device_DeviceInfo_2_classLit]],
        3: [[__static_wrapper_execute_0, null, unshift, 'string', 'array', Lcom_whatfix_observer_device_DeviceInfo_2_classLit]]
      }
    }, false);
    if (pkg) for (p in pkg) _wnd.whatfix.observer.DefaultWriter[p] === undefined && (_wnd.whatfix.observer.DefaultWriter[p] = pkg[p]);
  }
  function Observer_DefaultWriter_ExporterImpl() {
    $export_6(this);
  }
  function __static_wrapper_execute_0(instance, a0, a1, a2) {
    $execute_0(instance, a0, ($clinit_ExporterUtil(), castTo($toArrObject(a1, initUnidimensionalArray(Lcom_whatfix_observer_ObserverRecord_2_classLit, $intern_9, 18, a1.length, 0, 1)), 32)), a2);
  }
  defineClass(105, 1, $intern_10, Observer_DefaultWriter_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_6() {
    return _wnd.whatfix.observer.DefaultWriter;
  };
  _.isAssignable = function isAssignable_6(o) {
    return o != null && instanceOf(o, 28);
  };
  var exported_6 = false;
  var Lcom_whatfix_observer_Observer_1DefaultWriter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'Observer_DefaultWriter_ExporterImpl', 105, Ljava_lang_Object_2_classLit);
  function $export_7(this$static) {
    if (!exported_7) {
      exported_7 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_Observer_2_classLit, this$static);
      new ObserverLevel_ExporterImpl();
      $export0_7(this$static);
    }
  }
  function $export0_7(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.Observer'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.Observer = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) ? g = a[0] : a.length == 3 && (g = ___create(a[0] == null ? null : a[0].g, a[1] == null ? null : a[1].g, a[2]));
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.Observer.prototype = new Object();
    __0.debug = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 0, arguments, false, true)[0];
    });
    __0.error = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 5, arguments, false, true)[0];
    });
    __0.flush = $entry(function (a0) {
      this.g.flush_0(a0);
    });
    __0.flushLog = $entry(function (a0) {
      this.g.flushLog_0(a0);
    });
    __0.info = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 6, arguments, false, true)[0];
    });
    __0.log = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 2, arguments, false, true)[0];
    });
    __0.nfr = $entry(function (a0, a1, a2, a3, a4, a5) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 4, arguments, false, true)[0];
    });
    __0.performance = $entry(function (a0, a1, a2, a3, a4, a5, a6, a7) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 1, arguments, false, true)[0];
    });
    _wnd.whatfix.observer.Observer.toMap = $entry(function (a0) {
      return toMap(a0);
    });
    __0.warning = $entry(function (a0, a1, a2, a3, a4) {
      runDispatch_0(this.g, Lcom_whatfix_observer_Observer_2_classLit, 3, arguments, false, true)[0];
    });
    registerDispatchMap(Lcom_whatfix_observer_Observer_2_classLit, {
      0: {
        5: [[__static_wrapper_debug_1, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      1: {
        8: [[__static_wrapper_performance_1, null, unshift, 'string', 'string', 'string', 'string', 'number', 'object', 'string', 'array']]
      },
      2: {
        7: [[__static_wrapper_log_3, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'object', 'string', 'array']],
        8: [[__static_wrapper_log_4, null, unshift, Lcom_whatfix_observer_ObserverLevel_2_classLit, 'string', 'string', 'string', 'string', 'object', 'string', 'array']]
      },
      3: {
        5: [[__static_wrapper_warning_1, null, unshift, 'string', 'string', 'string', 'string', 'array']]
      },
      4: {
        6: [[__static_wrapper_nfr_1, null, unshift, 'string', 'string', 'string', 'number', 'string', 'array']]
      },
      5: {
        6: [[__static_wrapper_error_1, null, unshift, 'string', 'string', 'string', 'string', 'string', 'array']]
      },
      6: {
        6: [[__static_wrapper_info_1, null, unshift, 'string', 'string', 'string', 'object', 'string', 'array']]
      }
    }, false);
    if (pkg) for (p in pkg) _wnd.whatfix.observer.Observer[p] === undefined && (_wnd.whatfix.observer.Observer[p] = pkg[p]);
  }
  function Observer_ExporterImpl() {
    $export_7(this);
  }
  function ___create(a0, a1, a2) {
    return new Observer(a0, a1, a2);
  }
  function __static_wrapper_debug_1(instance, a0, a1, a2, a3, a4) {
    $debug(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  function __static_wrapper_error_1(instance, a0, a1, a2, a3, a4, a5) {
    $error(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_info_1(instance, a0, a1, a2, a3, a4, a5) {
    $info(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_log_3(instance, a0, a1, a2, a3, a4, a5, a6) {
    $log_1(instance, a0, a1, a2, a3, a4, a5, ($clinit_ExporterUtil(), $toArrObject(a6, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a6.length, 5, 1))));
  }
  function __static_wrapper_log_4(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $log_3(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_nfr_1(instance, a0, a1, a2, a3, a4, a5) {
    $nfr(instance, a0, a1, a2, a3, a4, ($clinit_ExporterUtil(), $toArrObject(a5, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a5.length, 5, 1))));
  }
  function __static_wrapper_performance_1(instance, a0, a1, a2, a3, a4, a5, a6, a7) {
    $performance(instance, a0, a1, a2, a3, a4, a5, a6, ($clinit_ExporterUtil(), $toArrObject(a7, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a7.length, 5, 1))));
  }
  function __static_wrapper_warning_1(instance, a0, a1, a2, a3, a4) {
    $warning(instance, a0, a1, a2, a3, ($clinit_ExporterUtil(), $toArrObject(a4, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, a4.length, 5, 1))));
  }
  defineClass(71, 1, $intern_10, Observer_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_7() {
    return _wnd.whatfix.observer.Observer;
  };
  _.isAssignable = function isAssignable_7(o) {
    return o != null && instanceOf(o, 19);
  };
  var exported_7 = false;
  var Lcom_whatfix_observer_Observer_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer', 'Observer_ExporterImpl', 71, Ljava_lang_Object_2_classLit);
  var Lcom_whatfix_observer_closure_IJsFilter_2_classLit = createForInterface('com.whatfix.observer.closure', 'IJsFilter');
  function $export_8(this$static) {
    if (!exported_8) {
      exported_8 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_closure_IJsFilter_2_classLit, this$static);
      new ObserverRecord_ExporterImpl();
      $export0_8(this$static);
    }
  }
  function $export0_8(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.v2.IJsFilter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.v2.IJsFilter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.v2.IJsFilter.prototype = new Object();
    __0.shouldFilter = $entry(function (a0) {
      return this.g.shouldFilter_1(a0 == null ? null : a0.g);
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.v2.IJsFilter[p] === undefined && (_wnd.whatfix.observer.v2.IJsFilter[p] = pkg[p]);
  }
  function $invoke_shouldFilter(closure, a0) {
    var r = closure.apply(null, [wrap(a0)]);
    return !!r;
  }
  function $shouldFilter(this$static, a0) {
    return $invoke_shouldFilter(this$static.jso, a0);
  }
  function IJsFilter_ExporterImpl() {
    $export_8(this);
  }
  function IJsFilter_ExporterImpl_0(jso) {
    $export_8(this);
    this.jso = jso;
  }
  defineClass(26, 1, {
    13: 1,
    11: 1,
    26: 1
  }, IJsFilter_ExporterImpl, IJsFilter_ExporterImpl_0);
  _.equals_0 = function equals_2(obj) {
    return obj != null && instanceOf(obj, 26) && $equals(this.jso, castTo(obj, 26).jso);
  };
  _.getJsConstructor = function getJsConstructor_8() {
    return _wnd.whatfix.observer.v2.IJsFilter;
  };
  _.isAssignable = function isAssignable_8(o) {
    return o != null && instanceOf(o, 26);
  };
  _.shouldFilter_1 = function shouldFilter_1(a0) {
    return $shouldFilter(this, a0);
  };
  var exported_8 = false;
  var Lcom_whatfix_observer_closure_IJsFilter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer.closure', 'IJsFilter_ExporterImpl', 26, Ljava_lang_Object_2_classLit);
  var Lcom_whatfix_observer_closure_IJsWriter_2_classLit = createForInterface('com.whatfix.observer.closure', 'IJsWriter');
  function $execute_1(this$static, a0, a1, a2) {
    $invoke_execute(this$static.jso, a0, a1, a2);
  }
  function $export_9(this$static) {
    if (!exported_9) {
      exported_9 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_closure_IJsWriter_2_classLit, this$static);
      new ObserverRecord_ExporterImpl();
      new DeviceInfo_ExporterImpl();
      $export0_9(this$static);
    }
  }
  function $export0_9(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.v2.IJsWriter'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.v2.IJsWriter = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.v2.IJsWriter.prototype = new Object();
    __0.execute = $entry(function (a0, a1, a2) {
      __static_wrapper_execute_1(this.g, a0, a1, a2 == null ? null : a2.g);
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.v2.IJsWriter[p] === undefined && (_wnd.whatfix.observer.v2.IJsWriter[p] = pkg[p]);
  }
  function $invoke_execute(closure, a0, a1, a2) {
    closure.apply(null, [a0, wrap_0(a1), wrap(a2)]);
  }
  function IJsWriter_ExporterImpl() {
    $export_9(this);
  }
  function IJsWriter_ExporterImpl_0(jso) {
    $export_9(this);
    this.jso = jso;
  }
  function __static_wrapper_execute_1(instance, a0, a1, a2) {
    $execute_1(instance, a0, ($clinit_ExporterUtil(), castTo($toArrObject(a1, initUnidimensionalArray(Lcom_whatfix_observer_ObserverRecord_2_classLit, $intern_9, 18, a1.length, 0, 1)), 32)), a2);
  }
  defineClass(27, 1, {
    13: 1,
    11: 1,
    27: 1
  }, IJsWriter_ExporterImpl, IJsWriter_ExporterImpl_0);
  _.equals_0 = function equals_3(obj) {
    return obj != null && instanceOf(obj, 27) && $equals(this.jso, castTo(obj, 27).jso);
  };
  _.getJsConstructor = function getJsConstructor_9() {
    return _wnd.whatfix.observer.v2.IJsWriter;
  };
  _.isAssignable = function isAssignable_9(o) {
    return o != null && instanceOf(o, 27);
  };
  var exported_9 = false;
  var Lcom_whatfix_observer_closure_IJsWriter_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer.closure', 'IJsWriter_ExporterImpl', 27, Ljava_lang_Object_2_classLit);
  function chromeVersion() {
    try {
      var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      return raw ? parseInt(raw[2], 10) : false;
    } catch (e) {
      return 0;
    }
  }
  function edgeChromiumVersion() {
    try {
      var raw = navigator.userAgent.match(/Edg\/([0-9]+)\./);
      return raw ? parseInt(raw[1], 10) : false;
    } catch (e) {
      return 0;
    }
  }
  function firefoxVersion() {
    try {
      var raw = navigator.userAgent.match(/Firefox\/([0-9]+)\./);
      return raw ? parseInt(raw[1], 10) : false;
    } catch (e) {
      return 0;
    }
  }
  function isSafari_0() {
    try {
      var isSafari = $wnd.safari && typeof $wnd.safari !== 'undefined' ? true : false;
      if (!isSafari) {
        var vendor = $wnd.navigator && $wnd.navigator.vendor;
        isSafari = vendor.toLowerCase().indexOf('apple') > -1 ? true : false;
      }
      return isSafari;
    } catch (e) {
      return false;
    }
  }
  function safariVersion() {
    try {
      var raw = navigator.userAgent.toLowerCase().match(/version\/([0-9]+)/);
      return raw ? parseInt(raw[1], 10) : false;
    } catch (e) {
      return 0;
    }
  }
  function $clinit_DeviceInfo() {
    $clinit_DeviceInfo = emptyMethod;
    INSTANCE_1 = new DeviceInfo();
  }
  function $setDeviceInformation(this$static) {
    var userAgent;
    userAgent = $wnd.navigator.userAgent;
    try {
      if (userAgent.indexOf('Windows NT') != -1) {
        this$static.osType = $toString_0(($clinit_OSTypes(), windows));
        this$static.osVersion = $substring_0(userAgent, userAgent.indexOf('Windows NT ') + 11, userAgent.indexOf(';'));
      } else if (userAgent.indexOf('Mac OS') != -1) {
        this$static.osType = $toString_0(($clinit_OSTypes(), mac));
        this$static.osVersion = $substring_0(userAgent, userAgent.indexOf('Mac OS ') + 7, userAgent.indexOf(')'));
        if (userAgent.indexOf('iPhone') != -1) {
          this$static.deviceCategory = $toString_0(iphone);
          this$static.mobileDeviceInfo = $substring_0(userAgent, userAgent.indexOf('iPhone ') + 7, userAgent.indexOf(')'));
        } else if (userAgent.indexOf('iPad') != -1) {
          this$static.deviceCategory = $toString_0(ipad);
          this$static.mobileDeviceInfo = $substring_0(userAgent, userAgent.indexOf('iPad ') + 5, userAgent.indexOf(')'));
        }
      } else if (userAgent.indexOf('X11') != -1) {
        this$static.osType = $toString_0(($clinit_OSTypes(), unix));
      } else if (userAgent.indexOf('Android') != -1) {
        this$static.osType = $toString_0(($clinit_OSTypes(), android));
        this$static.mobileDeviceInfo = $substring_0(userAgent, userAgent.indexOf('Android ') + 8, userAgent.indexOf(')'));
      }
      if (navigator.userAgent.toLowerCase().indexOf('edg/') > -1) {
        this$static.deviceBrowser = $toString_0(($clinit_SupportedBrowsers(), edge));
        this$static.deviceBrowserVersion = '' + edgeChromiumVersion();
      } else if (isSafari_0()) {
        this$static.deviceBrowser = $toString_0(($clinit_SupportedBrowsers(), safari));
        this$static.deviceBrowserVersion = '' + safariVersion();
      } else if ($wnd.chrome && typeof $wnd.chrome !== 'undefined' ? true : false) {
        this$static.deviceBrowser = $toString_0(($clinit_SupportedBrowsers(), chrome_0));
        this$static.deviceBrowserVersion = '' + chromeVersion();
      } else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        this$static.deviceBrowser = $toString_0(($clinit_SupportedBrowsers(), firefox));
        this$static.deviceBrowserVersion = '' + firefoxVersion();
      }
    } catch ($e0) {
      $e0 = toJava($e0);
      if (!instanceOf($e0, 7)) throw toJs($e0);
    }
  }
  function DeviceInfo() {
    var deviceScreenResolution, deviceBrowserSize;
    $setDeviceInformation(this);
    this.deviceLanguage = $wnd.navigator.language;
    this.deviceScreenResolution = (deviceScreenResolution = {}, deviceScreenResolution.availWidth = $wnd.screen.availWidth, deviceScreenResolution.availHeight = $wnd.screen.availHeight, deviceScreenResolution);
    this.deviceBrowserSize = (deviceBrowserSize = {}, deviceBrowserSize.screenHeight = $wnd.screen.height, deviceBrowserSize.screenWidth = $wnd.screen.width, deviceBrowserSize);
  }
  defineClass(61, 1, {
    13: 1,
    61: 1
  }, DeviceInfo);
  _.getDeviceBrowser_0 = function getDeviceBrowser() {
    return this.deviceBrowser;
  };
  _.getDeviceBrowserSize_0 = function getDeviceBrowserSize() {
    return this.deviceBrowserSize;
  };
  _.getDeviceBrowserVersion_0 = function getDeviceBrowserVersion() {
    return this.deviceBrowserVersion;
  };
  _.getDeviceCategory_0 = function getDeviceCategory() {
    return this.deviceCategory;
  };
  _.getDeviceLanguage_0 = function getDeviceLanguage() {
    return this.deviceLanguage;
  };
  _.getDeviceScreenResolution_0 = function getDeviceScreenResolution() {
    return this.deviceScreenResolution;
  };
  _.getMobileDeviceInfo_0 = function getMobileDeviceInfo() {
    return this.mobileDeviceInfo;
  };
  _.getOsType_0 = function getOsType() {
    return this.osType;
  };
  _.getOsVersion_0 = function getOsVersion() {
    return this.osVersion;
  };
  _.setDeviceBrowser_0 = function setDeviceBrowser(deviceBrowser) {
    this.deviceBrowser = deviceBrowser;
  };
  _.setDeviceBrowserSize_0 = function setDeviceBrowserSize(deviceBrowserSize) {
    this.deviceBrowserSize = deviceBrowserSize;
  };
  _.setDeviceBrowserVersion_0 = function setDeviceBrowserVersion(deviceBrowserVersion) {
    this.deviceBrowserVersion = deviceBrowserVersion;
  };
  _.setDeviceCategory_0 = function setDeviceCategory(deviceCategory) {
    this.deviceCategory = deviceCategory;
  };
  _.setDeviceLanguage_0 = function setDeviceLanguage(deviceLanguage) {
    this.deviceLanguage = deviceLanguage;
  };
  _.setDeviceScreenResolution_0 = function setDeviceScreenResolution(deviceScreenResolution) {
    this.deviceScreenResolution = deviceScreenResolution;
  };
  _.setMobileDeviceInfo_0 = function setMobileDeviceInfo(mobileDeviceInfo) {
    this.mobileDeviceInfo = mobileDeviceInfo;
  };
  _.setOsType_0 = function setOsType(osType) {
    this.osType = osType;
  };
  _.setOsVersion_0 = function setOsVersion(osVersion) {
    this.osVersion = osVersion;
  };
  _.deviceBrowser = 'Unknown';
  _.deviceBrowserVersion = 'Unknown';
  _.deviceCategory = 'Unknown';
  _.mobileDeviceInfo = 'Unknown';
  _.osType = 'Unknown';
  _.osVersion = 'Unknown';
  var INSTANCE_1;
  var Lcom_whatfix_observer_device_DeviceInfo_2_classLit = createForClass('com.whatfix.observer.device', 'DeviceInfo', 61, Ljava_lang_Object_2_classLit);
  function $export_10(this$static) {
    if (!exported_10) {
      exported_10 = true;
      $clinit_ExporterUtil();
      $addExporter(impl_0, Lcom_whatfix_observer_device_DeviceInfo_2_classLit, this$static);
      $export0_10(this$static);
    }
  }
  function $export0_10(this$static) {
    var pkg = ($clinit_ExporterUtil(), $declarePackage('whatfix.observer.DeviceInfo'));
    var __0,
      __ = this$static;
    _wnd.whatfix.observer.DeviceInfo = $entry(function () {
      var g,
        j = this,
        a = arguments;
      a.length == 1 && __.isAssignable(a[0]) && (g = a[0]);
      j.g = g;
      setWrapper(g, j);
      return j;
    });
    __0 = _wnd.whatfix.observer.DeviceInfo.prototype = new Object();
    _wnd.whatfix.observer.DeviceInfo.INSTANCE = ($clinit_DeviceInfo(), INSTANCE_1);
    _wnd.whatfix.observer.DeviceInfo.UNKNOWN = 'Unknown';
    __0.getDeviceBrowser = $entry(function () {
      return this.g.getDeviceBrowser_0();
    });
    __0.getDeviceBrowserSize = $entry(function () {
      return this.g.getDeviceBrowserSize_0();
    });
    __0.getDeviceBrowserVersion = $entry(function () {
      return this.g.getDeviceBrowserVersion_0();
    });
    __0.getDeviceCategory = $entry(function () {
      return this.g.getDeviceCategory_0();
    });
    __0.getDeviceLanguage = $entry(function () {
      return this.g.getDeviceLanguage_0();
    });
    __0.getDeviceScreenResolution = $entry(function () {
      return this.g.getDeviceScreenResolution_0();
    });
    _wnd.whatfix.observer.DeviceInfo.getInstance = $entry(function () {
      return wrap(INSTANCE_1);
    });
    __0.getMobileDeviceInfo = $entry(function () {
      return this.g.getMobileDeviceInfo_0();
    });
    __0.getOsType = $entry(function () {
      return this.g.getOsType_0();
    });
    __0.getOsVersion = $entry(function () {
      return this.g.getOsVersion_0();
    });
    __0.setDeviceBrowser = $entry(function (a0) {
      this.g.setDeviceBrowser_0(a0);
    });
    __0.setDeviceBrowserSize = $entry(function (a0) {
      this.g.setDeviceBrowserSize_0(a0);
    });
    __0.setDeviceBrowserVersion = $entry(function (a0) {
      this.g.setDeviceBrowserVersion_0(a0);
    });
    __0.setDeviceCategory = $entry(function (a0) {
      this.g.setDeviceCategory_0(a0);
    });
    __0.setDeviceLanguage = $entry(function (a0) {
      this.g.setDeviceLanguage_0(a0);
    });
    __0.setDeviceScreenResolution = $entry(function (a0) {
      this.g.setDeviceScreenResolution_0(a0);
    });
    __0.setMobileDeviceInfo = $entry(function (a0) {
      this.g.setMobileDeviceInfo_0(a0);
    });
    __0.setOsType = $entry(function (a0) {
      this.g.setOsType_0(a0);
    });
    __0.setOsVersion = $entry(function (a0) {
      this.g.setOsVersion_0(a0);
    });
    if (pkg) for (p in pkg) _wnd.whatfix.observer.DeviceInfo[p] === undefined && (_wnd.whatfix.observer.DeviceInfo[p] = pkg[p]);
  }
  function DeviceInfo_ExporterImpl() {
    $export_10(this);
  }
  defineClass(52, 1, $intern_10, DeviceInfo_ExporterImpl);
  _.getJsConstructor = function getJsConstructor_10() {
    return _wnd.whatfix.observer.DeviceInfo;
  };
  _.isAssignable = function isAssignable_10(o) {
    return o != null && instanceOf(o, 61);
  };
  var exported_10 = false;
  var Lcom_whatfix_observer_device_DeviceInfo_1ExporterImpl_2_classLit = createForClass('com.whatfix.observer.device', 'DeviceInfo_ExporterImpl', 52, Ljava_lang_Object_2_classLit);
  function $clinit_OSTypes() {
    $clinit_OSTypes = emptyMethod;
    windows = new OSTypes('windows', 0);
    mac = new OSTypes('mac', 1);
    iphone = new OSTypes('iphone', 2);
    ipad = new OSTypes('ipad', 3);
    unix = new OSTypes('unix', 4);
    android = new OSTypes('android', 5);
  }
  function OSTypes(enum$name, enum$ordinal) {
    Enum.call(this, enum$name, enum$ordinal);
  }
  function values_1() {
    $clinit_OSTypes();
    return stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_device_OSTypes_2_classLit, 1), $intern_0, 23, 0, [windows, mac, iphone, ipad, unix, android]);
  }
  defineClass(23, 17, {
    23: 1,
    3: 1,
    16: 1,
    17: 1
  }, OSTypes);
  var android, ipad, iphone, mac, unix, windows;
  var Lcom_whatfix_observer_device_OSTypes_2_classLit = createForEnum('com.whatfix.observer.device', 'OSTypes', 23, Ljava_lang_Enum_2_classLit, values_1);
  function $clinit_SupportedBrowsers() {
    $clinit_SupportedBrowsers = emptyMethod;
    edge = new SupportedBrowsers('edge', 0);
    safari = new SupportedBrowsers('safari', 1);
    chrome_0 = new SupportedBrowsers('chrome', 2);
    firefox = new SupportedBrowsers('firefox', 3);
  }
  function SupportedBrowsers(enum$name, enum$ordinal) {
    Enum.call(this, enum$name, enum$ordinal);
  }
  function values_2() {
    $clinit_SupportedBrowsers();
    return stampJavaTypeInfo(getClassLiteralForArray(Lcom_whatfix_observer_device_SupportedBrowsers_2_classLit, 1), $intern_0, 39, 0, [edge, safari, chrome_0, firefox]);
  }
  defineClass(39, 17, {
    39: 1,
    3: 1,
    16: 1,
    17: 1
  }, SupportedBrowsers);
  var chrome_0, edge, firefox, safari;
  var Lcom_whatfix_observer_device_SupportedBrowsers_2_classLit = createForEnum('com.whatfix.observer.device', 'SupportedBrowsers', 39, Ljava_lang_Enum_2_classLit, values_2);
  defineClass(152, 1, {});
  var Ljava_io_OutputStream_2_classLit = createForClass('java.io', 'OutputStream', 152, Ljava_lang_Object_2_classLit);
  defineClass(153, 152, {});
  var Ljava_io_FilterOutputStream_2_classLit = createForClass('java.io', 'FilterOutputStream', 153, Ljava_io_OutputStream_2_classLit);
  function PrintStream() {}
  defineClass(85, 153, {}, PrintStream);
  var Ljava_io_PrintStream_2_classLit = createForClass('java.io', 'PrintStream', 85, Ljava_io_FilterOutputStream_2_classLit);
  var Ljava_lang_CharSequence_2_classLit = createForInterface('java.lang', 'CharSequence');
  function AbstractStringBuilder(string) {
    this.string = string;
  }
  defineClass(64, 1, {
    33: 1
  });
  _.toString_0 = function toString_4() {
    return this.string;
  };
  var Ljava_lang_AbstractStringBuilder_2_classLit = createForClass('java.lang', 'AbstractStringBuilder', 64, Ljava_lang_Object_2_classLit);
  function ArithmeticException() {
    RuntimeException_0.call(this, 'divide by zero');
  }
  defineClass(87, 6, $intern_1, ArithmeticException);
  var Ljava_lang_ArithmeticException_2_classLit = createForClass('java.lang', 'ArithmeticException', 87, Ljava_lang_RuntimeException_2_classLit);
  function ArrayStoreException() {
    RuntimeException.call(this);
  }
  defineClass(86, 6, $intern_1, ArrayStoreException);
  var Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang', 'ArrayStoreException', 86, Ljava_lang_RuntimeException_2_classLit);
  function $clinit_Boolean() {
    $clinit_Boolean = emptyMethod;
    FALSE = false;
    TRUE = true;
  }
  function $booleanValue(this$static) {
    return checkCriticalNotNull(this$static), this$static;
  }
  booleanCastMap = {
    3: 1,
    77: 1,
    16: 1
  };
  var FALSE, TRUE;
  var Ljava_lang_Boolean_2_classLit = createForClass('java.lang', 'Boolean', 77, Ljava_lang_Object_2_classLit);
  function ClassCastException() {
    RuntimeException_0.call(this, null);
  }
  defineClass(78, 6, $intern_1, ClassCastException);
  var Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang', 'ClassCastException', 78, Ljava_lang_RuntimeException_2_classLit);
  defineClass(55, 1, {
    3: 1,
    55: 1
  });
  var Ljava_lang_Number_2_classLit = createForClass('java.lang', 'Number', 55, Ljava_lang_Object_2_classLit);
  doubleCastMap = {
    3: 1,
    16: 1,
    55: 1
  };
  var Ljava_lang_Double_2_classLit = createForClass('java.lang', 'Double', 149, Ljava_lang_Number_2_classLit);
  function IllegalArgumentException(message) {
    RuntimeException_0.call(this, message);
  }
  defineClass(63, 6, $intern_1, IllegalArgumentException);
  var Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang', 'IllegalArgumentException', 63, Ljava_lang_RuntimeException_2_classLit);
  function IllegalStateException() {
    RuntimeException_0.call(this, "Stream already terminated, can't be modified or used");
  }
  defineClass(83, 6, $intern_1, IllegalStateException);
  var Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang', 'IllegalStateException', 83, Ljava_lang_RuntimeException_2_classLit);
  function IndexOutOfBoundsException(message) {
    RuntimeException_0.call(this, message);
  }
  defineClass(57, 6, $intern_1, IndexOutOfBoundsException);
  var Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'IndexOutOfBoundsException', 57, Ljava_lang_RuntimeException_2_classLit);
  function Integer(value_0) {
    this.value_0 = value_0;
  }
  function numberOfLeadingZeros_0(i) {
    var m, n, y_0;
    if (i < 0) {
      return 0;
    } else if (i == 0) {
      return 32;
    } else {
      y_0 = -(i >> 16);
      m = y_0 >> 16 & 16;
      n = 16 - m;
      i = i >> m;
      y_0 = i - 256;
      m = y_0 >> 16 & 8;
      n += m;
      i <<= m;
      y_0 = i - 4096;
      m = y_0 >> 16 & 4;
      n += m;
      i <<= m;
      y_0 = i - 16384;
      m = y_0 >> 16 & 2;
      n += m;
      i <<= m;
      y_0 = i >> 14;
      m = y_0 & ~(y_0 >> 1);
      return n + 2 - m;
    }
  }
  function numberOfTrailingZeros(i) {
    var r, rtn;
    if (i == 0) {
      return 32;
    } else {
      rtn = 0;
      for (r = 1; (r & i) == 0; r <<= 1) {
        ++rtn;
      }
      return rtn;
    }
  }
  function valueOf_0(i) {
    var rebase, result;
    if (i > -129 && i < 128) {
      rebase = i + 128;
      result = ($clinit_Integer$BoxedValues(), boxedValues)[rebase];
      !result && (result = boxedValues[rebase] = new Integer(i));
      return result;
    }
    return new Integer(i);
  }
  defineClass(34, 55, {
    3: 1,
    16: 1,
    34: 1,
    55: 1
  }, Integer);
  _.equals_0 = function equals_4(o) {
    return instanceOf(o, 34) && castTo(o, 34).value_0 == this.value_0;
  };
  _.hashCode_0 = function hashCode_3() {
    return this.value_0;
  };
  _.toString_0 = function toString_6() {
    return '' + this.value_0;
  };
  _.value_0 = 0;
  var Ljava_lang_Integer_2_classLit = createForClass('java.lang', 'Integer', 34, Ljava_lang_Number_2_classLit);
  function $clinit_Integer$BoxedValues() {
    $clinit_Integer$BoxedValues = emptyMethod;
    boxedValues = initUnidimensionalArray(Ljava_lang_Integer_2_classLit, $intern_0, 34, 256, 0, 1);
  }
  var boxedValues;
  function $forEach(this$static, action) {
    var entry, outerIter, t, t$iterator;
    checkCriticalNotNull(action);
    for (t$iterator = (outerIter = new AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySet(new AbstractMap$1(this$static.map_0).this$01).this$01), new AbstractMap$1$1(outerIter)); t$iterator.val$outerIter2.hasNext;) {
      t = (entry = $next(t$iterator.val$outerIter2), entry.getKey());
      action.accept(t);
    }
  }
  defineClass(180, 1, {});
  function NullPointerException() {
    RuntimeException.call(this);
  }
  defineClass(65, 56, $intern_1, NullPointerException);
  _.createError = function createError_0(msg) {
    return new TypeError(msg);
  };
  var Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang', 'NullPointerException', 65, Ljava_lang_JsException_2_classLit);
  function StackTraceElement(methodName, fileName, lineNumber) {
    this.className = 'Unknown';
    this.methodName = methodName;
    this.fileName = fileName;
    this.lineNumber = lineNumber;
  }
  defineClass(15, 1, {
    3: 1,
    15: 1
  }, StackTraceElement);
  _.equals_0 = function equals_5(other) {
    var st;
    if (instanceOf(other, 15)) {
      st = castTo(other, 15);
      return this.lineNumber == st.lineNumber && this.methodName == st.methodName && this.className == st.className && this.fileName == st.fileName;
    }
    return false;
  };
  _.hashCode_0 = function hashCode_4() {
    return hashCode_12(stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_Object_2_classLit, 1), $intern_0, 1, 5, [valueOf_0(this.lineNumber), this.className, this.methodName, this.fileName]));
  };
  _.toString_0 = function toString_7() {
    return this.className + '.' + this.methodName + '(' + (this.fileName != null ? this.fileName : 'Unknown Source') + (this.lineNumber >= 0 ? ':' + this.lineNumber : '') + ')';
  };
  _.lineNumber = 0;
  var Ljava_lang_StackTraceElement_2_classLit = createForClass('java.lang', 'StackTraceElement', 15, Ljava_lang_Object_2_classLit);
  function $charAt(this$static, index_0) {
    checkCriticalStringElementIndex(index_0, this$static.length);
    return this$static.charCodeAt(index_0);
  }
  function $equals_0(this$static, other) {
    return checkCriticalNotNull(this$static), this$static === other;
  }
  function $equalsIgnoreCase(this$static, other) {
    checkCriticalNotNull(this$static);
    if (other == null) {
      return false;
    }
    if ($equals_0(this$static, other)) {
      return true;
    }
    return this$static.length == other.length && $equals_0(this$static.toLowerCase(), other.toLowerCase());
  }
  function $indexOf(this$static, str) {
    return this$static.indexOf(str);
  }
  function $lastIndexOf(this$static, str) {
    return this$static.lastIndexOf(str);
  }
  function $lastIndexOf_0(this$static, str, start_0) {
    return this$static.lastIndexOf(str, start_0);
  }
  function $split(this$static) {
    var compiled, count, lastNonEmpty, lastTrail, matchIndex, matchObj, out, trail;
    compiled = new RegExp('\\.', 'g');
    out = initUnidimensionalArray(Ljava_lang_String_2_classLit, $intern_0, 2, 0, 6, 1);
    count = 0;
    trail = this$static;
    lastTrail = null;
    while (true) {
      matchObj = compiled.exec(trail);
      if (matchObj == null || trail == '') {
        out[count] = trail;
        break;
      } else {
        matchIndex = matchObj.index;
        out[count] = trail.substr(0, matchIndex);
        trail = $substring_0(trail, matchIndex + matchObj[0].length, trail.length);
        compiled.lastIndex = 0;
        if (lastTrail == trail) {
          out[count] = trail.substr(0, 1);
          trail = trail.substr(1);
        }
        lastTrail = trail;
        ++count;
      }
    }
    if (this$static.length > 0) {
      lastNonEmpty = out.length;
      while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
        --lastNonEmpty;
      }
      lastNonEmpty < out.length && (out.length = lastNonEmpty);
    }
    return out;
  }
  function $substring(this$static, beginIndex) {
    return this$static.substr(beginIndex);
  }
  function $substring_0(this$static, beginIndex, endIndex) {
    return this$static.substr(beginIndex, endIndex - beginIndex);
  }
  function $trim(this$static) {
    var end, length_0, start_0;
    length_0 = this$static.length;
    start_0 = 0;
    while (start_0 < length_0 && (checkCriticalStringElementIndex(start_0, this$static.length), this$static.charCodeAt(start_0) <= 32)) {
      ++start_0;
    }
    end = length_0;
    while (end > start_0 && (checkCriticalStringElementIndex(end - 1, this$static.length), this$static.charCodeAt(end - 1) <= 32)) {
      --end;
    }
    return start_0 > 0 || end < length_0 ? this$static.substr(start_0, end - start_0) : this$static;
  }
  function fromCodePoint(codePoint) {
    var hiSurrogate, loSurrogate;
    if (codePoint >= 65536) {
      hiSurrogate = 55296 + (codePoint - 65536 >> 10 & 1023) & 65535;
      loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
      return String.fromCharCode(hiSurrogate) + ('' + String.fromCharCode(loSurrogate));
    } else {
      return String.fromCharCode(codePoint & 65535);
    }
  }
  function join_1(delimiter, elements) {
    var e, e$index, e$max, joiner;
    joiner = new StringJoiner(delimiter);
    for (e$index = 0, e$max = elements.length; e$index < e$max; ++e$index) {
      e = elements[e$index];
      !joiner.builder_0 ? joiner.builder_0 = new StringBuilder_0(joiner.prefix) : $append_2(joiner.builder_0, joiner.delimiter);
      $append(joiner.builder_0, e);
    }
    return !joiner.builder_0 ? joiner.emptyValue : joiner.suffix.length == 0 ? joiner.builder_0.string : joiner.builder_0.string + ('' + joiner.suffix);
  }
  function valueOf_1(x_0) {
    return x_0 == null ? 'null' : toString_2(x_0);
  }
  stringCastMap = {
    3: 1,
    33: 1,
    16: 1,
    2: 1
  };
  var Ljava_lang_String_2_classLit = createForClass('java.lang', 'String', 2, Ljava_lang_Object_2_classLit);
  function $append(this$static, x_0) {
    this$static.string += '' + x_0;
    return this$static;
  }
  function $append_0(this$static, x_0, start_0, end) {
    this$static.string += '' + $substring_0(!x_0 ? 'null' : x_0.string, start_0, end);
    return this$static;
  }
  function $append_1(this$static, x_0) {
    this$static.string += '' + x_0;
    return this$static;
  }
  function $append_2(this$static, x_0) {
    this$static.string += '' + x_0;
    return this$static;
  }
  function $replace(this$static, start_0, toInsert) {
    this$static.string = $substring_0(this$static.string, 0, start_0) + toInsert + this$static.string.substr(9);
    return this$static;
  }
  function StringBuilder() {
    AbstractStringBuilder.call(this, '');
  }
  function StringBuilder_0(s) {
    AbstractStringBuilder.call(this, (checkCriticalNotNull(s), s));
  }
  defineClass(43, 64, {
    33: 1
  }, StringBuilder, StringBuilder_0);
  var Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang', 'StringBuilder', 43, Ljava_lang_AbstractStringBuilder_2_classLit);
  function StringIndexOutOfBoundsException(message) {
    IndexOutOfBoundsException.call(this, message);
  }
  defineClass(84, 57, $intern_1, StringIndexOutOfBoundsException);
  var Ljava_lang_StringIndexOutOfBoundsException_2_classLit = createForClass('java.lang', 'StringIndexOutOfBoundsException', 84, Ljava_lang_IndexOutOfBoundsException_2_classLit);
  function $clinit_System() {
    $clinit_System = emptyMethod;
    err = new PrintStream();
  }
  defineClass(184, 1, {});
  var err;
  function UnsupportedOperationException(message) {
    RuntimeException_0.call(this, message);
  }
  defineClass(66, 6, $intern_1, UnsupportedOperationException);
  var Ljava_lang_UnsupportedOperationException_2_classLit = createForClass('java.lang', 'UnsupportedOperationException', 66, Ljava_lang_RuntimeException_2_classLit);
  function padTwo(number) {
    return number < 10 ? '0' + number : '' + number;
  }
  defineClass(48, 1, {
    3: 1,
    16: 1,
    48: 1
  });
  _.equals_0 = function equals_6(obj) {
    return instanceOf(obj, 48) && eq(this.getTime_0(), castTo(obj, 48).getTime_0());
  };
  _.getTime_0 = function getTime() {
    return fromDouble_0(this.jsdate.getTime());
  };
  _.hashCode_0 = function hashCode_5() {
    var time;
    return time = this.getTime_0(), toInt(xor_0(time, shru_0(time, 32)));
  };
  _.toString_0 = function toString_8() {
    var hourOffset, minuteOffset, offset;
    offset = -this.jsdate.getTimezoneOffset();
    hourOffset = (offset >= 0 ? '+' : '') + (offset / 60 | 0);
    minuteOffset = padTwo($wnd.Math.abs(offset) % 60);
    return ($clinit_Date$StringData(), DAYS)[this.jsdate.getDay()] + ' ' + MONTHS[this.jsdate.getMonth()] + ' ' + padTwo(this.jsdate.getDate()) + ' ' + padTwo(this.jsdate.getHours()) + ':' + padTwo(this.jsdate.getMinutes()) + ':' + padTwo(this.jsdate.getSeconds()) + ' GMT' + hourOffset + minuteOffset + ' ' + this.jsdate.getFullYear();
  };
  var Ljava_util_Date_2_classLit = createForClass('java.util', 'Date', 48, Ljava_lang_Object_2_classLit);
  function $equals_1(this$static, ts) {
    return !!ts && eq(fromDouble_0(this$static.jsdate.getTime()), fromDouble_0(ts.jsdate.getTime())) && this$static.nanos == ts.nanos;
  }
  function $toString_1(this$static) {
    return '' + (1900 + (this$static.jsdate.getFullYear() - 1900)) + '-' + padTwo(1 + this$static.jsdate.getMonth()) + '-' + padTwo(this$static.jsdate.getDate()) + ' ' + padTwo(this$static.jsdate.getHours()) + ':' + padTwo(this$static.jsdate.getMinutes()) + ':' + padTwo(this$static.jsdate.getSeconds()) + '.' + padNine(this$static.nanos);
  }
  function Timestamp(time) {
    this.jsdate = new $wnd.Date(toDouble_0(time));
    this.nanos = toInt(mod(time, 1000)) * 1000000;
  }
  function padNine(value_0) {
    var asString, toReturn;
    toReturn = new StringBuilder_0('000000000');
    asString = '' + value_0;
    toReturn = $replace(toReturn, 9 - asString.length, asString);
    return toReturn.string;
  }
  defineClass(53, 48, {
    3: 1,
    16: 1,
    53: 1,
    48: 1
  }, Timestamp);
  _.equals_0 = function equals_7(ts) {
    return instanceOf(ts, 53) && $equals_1(this, castTo(ts, 53));
  };
  _.getTime_0 = function getTime_0() {
    return fromDouble_0(this.jsdate.getTime());
  };
  _.hashCode_0 = function hashCode_6() {
    var time;
    return time = fromDouble_0(this.jsdate.getTime()), toInt(xor_0(time, shru_0(time, 32)));
  };
  _.toString_0 = function toString_9() {
    return $toString_1(this);
  };
  _.nanos = 0;
  var Ljava_sql_Timestamp_2_classLit = createForClass('java.sql', 'Timestamp', 53, Ljava_util_Date_2_classLit);
  function $addAll(this$static, c) {
    var changed, e, e$iterator;
    checkCriticalNotNull(c);
    changed = false;
    for (e$iterator = c.iterator(); e$iterator.hasNext_0();) {
      e = e$iterator.next_0();
      changed = changed | this$static.add_0(e);
    }
    return changed;
  }
  function $advanceToFind(this$static, o) {
    var e, iter;
    for (iter = this$static.iterator(); iter.hasNext_0();) {
      e = iter.next_0();
      if (maskUndefined(o) === maskUndefined(e) || o != null && equals_Ljava_lang_Object__Z__devirtual$(o, e)) {
        return true;
      }
    }
    return false;
  }
  function $containsAll(this$static, c) {
    var e, e$iterator;
    checkCriticalNotNull(c);
    for (e$iterator = c.iterator(); e$iterator.hasNext_0();) {
      e = e$iterator.next_0();
      if (!this$static.contains(e)) {
        return false;
      }
    }
    return true;
  }
  defineClass(156, 1, {
    12: 1
  });
  _.spliterator_0 = function spliterator_0() {
    return new Spliterators$IteratorSpliterator(this, 0);
  };
  _.stream = function stream() {
    return new StreamImpl(null, this.spliterator_0());
  };
  _.add_0 = function add_0(o) {
    throw toJs(new UnsupportedOperationException('Add not supported on this collection'));
  };
  _.addAll = function addAll(c) {
    return $addAll(this, c);
  };
  _.contains = function contains(o) {
    return $advanceToFind(this, o);
  };
  _.toArray = function toArray() {
    return this.toArray_0(initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, this.size_1(), 5, 1));
  };
  _.toArray_0 = function toArray_0(a) {
    var i, it, size_0;
    size_0 = this.size_1();
    a.length < size_0 && (a = stampJavaTypeInfo_1(new Array(size_0), a));
    it = this.iterator();
    for (i = 0; i < size_0; ++i) {
      setCheck(a, i, it.next_0());
    }
    a.length > size_0 && setCheck(a, size_0, null);
    return a;
  };
  _.toString_0 = function toString_10() {
    var e, e$iterator, joiner;
    joiner = new StringJoiner_0(', ', '[', ']');
    for (e$iterator = this.iterator(); e$iterator.hasNext_0();) {
      e = e$iterator.next_0();
      $add_0(joiner, e === this ? '(this Collection)' : e == null ? 'null' : toString_2(e));
    }
    return !joiner.builder_0 ? joiner.emptyValue : joiner.suffix.length == 0 ? joiner.builder_0.string : joiner.builder_0.string + ('' + joiner.suffix);
  };
  var Ljava_util_AbstractCollection_2_classLit = createForClass('java.util', 'AbstractCollection', 156, Ljava_lang_Object_2_classLit);
  function $containsEntry(this$static, entry) {
    var key, ourValue, value_0;
    key = entry.getKey();
    value_0 = entry.getValue_0();
    ourValue = this$static.get_0(key);
    if (!(maskUndefined(value_0) === maskUndefined(ourValue) || value_0 != null && equals_Ljava_lang_Object__Z__devirtual$(value_0, ourValue))) {
      return false;
    }
    if (ourValue == null && !this$static.containsKey(key)) {
      return false;
    }
    return true;
  }
  function $getOrDefault(this$static, key, defaultValue) {
    var currentValue;
    return currentValue = key == null ? getEntryValueOrNull($getEntry(this$static.hashCodeMap, null)) : $get_0(this$static.stringMap, key), currentValue == null && !(key == null ? !!$getEntry(this$static.hashCodeMap, null) : $contains_1(this$static.stringMap, key)) ? defaultValue : currentValue;
  }
  function $implFindEntry(this$static, key) {
    var entry, iter, k;
    for (iter = this$static.entrySet().iterator(); iter.hasNext_0();) {
      entry = castTo(iter.next_0(), 9);
      k = entry.getKey();
      if (maskUndefined(key) === maskUndefined(k) || key != null && equals_Ljava_lang_Object__Z__devirtual$(key, k)) {
        return entry;
      }
    }
    return null;
  }
  function $toString_2(this$static, o) {
    return o === this$static ? '(this Map)' : o == null ? 'null' : toString_2(o);
  }
  function getEntryValueOrNull(entry) {
    return !entry ? null : entry.getValue_0();
  }
  defineClass(155, 1, {
    40: 1
  });
  _.containsKey = function containsKey(key) {
    return !!$implFindEntry(this, key);
  };
  _.equals_0 = function equals_8(obj) {
    var entry, entry$iterator, otherMap;
    if (obj === this) {
      return true;
    }
    if (!instanceOf(obj, 40)) {
      return false;
    }
    otherMap = castTo(obj, 40);
    if (this.size_1() != otherMap.size_1()) {
      return false;
    }
    for (entry$iterator = otherMap.entrySet().iterator(); entry$iterator.hasNext_0();) {
      entry = castTo(entry$iterator.next_0(), 9);
      if (!$containsEntry(this, entry)) {
        return false;
      }
    }
    return true;
  };
  _.get_0 = function get_0(key) {
    return getEntryValueOrNull($implFindEntry(this, key));
  };
  _.hashCode_0 = function hashCode_7() {
    return hashCode_13(this.entrySet());
  };
  _.size_1 = function size_1() {
    return this.entrySet().size_1();
  };
  _.toString_0 = function toString_11() {
    var entry, entry$iterator, joiner;
    joiner = new StringJoiner_0(', ', '{', '}');
    for (entry$iterator = this.entrySet().iterator(); entry$iterator.hasNext_0();) {
      entry = castTo(entry$iterator.next_0(), 9);
      $add_0(joiner, $toString_2(this, entry.getKey()) + '=' + $toString_2(this, entry.getValue_0()));
    }
    return !joiner.builder_0 ? joiner.emptyValue : joiner.suffix.length == 0 ? joiner.builder_0.string : joiner.builder_0.string + ('' + joiner.suffix);
  };
  var Ljava_util_AbstractMap_2_classLit = createForClass('java.util', 'AbstractMap', 155, Ljava_lang_Object_2_classLit);
  function $containsKey(this$static, key) {
    return instanceOfString(key) ? key == null ? !!$getEntry(this$static.hashCodeMap, null) : $contains_1(this$static.stringMap, key) : !!$getEntry(this$static.hashCodeMap, key);
  }
  function $containsValue(this$static, value_0) {
    return $containsValue_0(value_0, this$static.stringMap) || $containsValue_0(value_0, this$static.hashCodeMap);
  }
  function $containsValue_0(value_0, entries) {
    var entry, entry$iterator;
    for (entry$iterator = entries.iterator(); entry$iterator.hasNext_0();) {
      entry = castTo(entry$iterator.next_0(), 9);
      if ($equals_2(value_0, entry.getValue_0())) {
        return true;
      }
    }
    return false;
  }
  function $get(this$static, key) {
    return instanceOfString(key) ? key == null ? getEntryValueOrNull($getEntry(this$static.hashCodeMap, null)) : $get_0(this$static.stringMap, key) : getEntryValueOrNull($getEntry(this$static.hashCodeMap, key));
  }
  function $put(this$static, key, value_0) {
    return instanceOfString(key) ? $putStringValue(this$static, key, value_0) : $put_0(this$static.hashCodeMap, key, value_0);
  }
  function $putStringValue(this$static, key, value_0) {
    return key == null ? $put_0(this$static.hashCodeMap, null, value_0) : $put_1(this$static.stringMap, key, value_0);
  }
  function $remove(this$static, key) {
    return $remove_1(this$static.hashCodeMap, key);
  }
  function $removeStringValue(this$static, key) {
    return key == null ? $remove_1(this$static.hashCodeMap, null) : $remove_2(this$static.stringMap, key);
  }
  function $reset(this$static) {
    this$static.hashCodeMap = new InternalHashCodeMap(this$static);
    this$static.stringMap = new InternalStringMap(this$static);
    structureChanged(this$static);
  }
  function $size(this$static) {
    return this$static.hashCodeMap.size_0 + this$static.stringMap.size_0;
  }
  defineClass(58, 155, {
    40: 1
  });
  _.containsKey = function containsKey_0(key) {
    return $containsKey(this, key);
  };
  _.entrySet = function entrySet() {
    return new AbstractHashMap$EntrySet(this);
  };
  _.get_0 = function get_1(key) {
    return $get(this, key);
  };
  _.size_1 = function size_2() {
    return $size(this);
  };
  var Ljava_util_AbstractHashMap_2_classLit = createForClass('java.util', 'AbstractHashMap', 58, Ljava_util_AbstractMap_2_classLit);
  defineClass(157, 156, $intern_12);
  _.spliterator_0 = function spliterator_1() {
    return new Spliterators$IteratorSpliterator(this, 1);
  };
  _.equals_0 = function equals_9(o) {
    var other;
    if (o === this) {
      return true;
    }
    if (!instanceOf(o, 31)) {
      return false;
    }
    other = castTo(o, 31);
    if (other.size_1() != this.size_1()) {
      return false;
    }
    return $containsAll(this, other);
  };
  _.hashCode_0 = function hashCode_8() {
    return hashCode_13(this);
  };
  var Ljava_util_AbstractSet_2_classLit = createForClass('java.util', 'AbstractSet', 157, Ljava_util_AbstractCollection_2_classLit);
  function $contains(this$static, o) {
    if (instanceOf(o, 9)) {
      return $containsEntry(this$static.this$01, castTo(o, 9));
    }
    return false;
  }
  function AbstractHashMap$EntrySet(this$0) {
    this.this$01 = this$0;
  }
  defineClass(35, 157, $intern_12, AbstractHashMap$EntrySet);
  _.contains = function contains_0(o) {
    return $contains(this, o);
  };
  _.iterator = function iterator_0() {
    return new AbstractHashMap$EntrySetIterator(this.this$01);
  };
  _.size_1 = function size_3() {
    return $size(this.this$01);
  };
  var Ljava_util_AbstractHashMap$EntrySet_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySet', 35, Ljava_util_AbstractSet_2_classLit);
  function $forEachRemaining(this$static, consumer) {
    checkCriticalNotNull(consumer);
    while (this$static.hasNext_0()) {
      $accept_0(consumer, this$static.next_0());
    }
  }
  function $computeHasNext(this$static) {
    if (this$static.current.hasNext_0()) {
      return true;
    }
    if (this$static.current != this$static.stringMapEntries) {
      return false;
    }
    this$static.current = new InternalHashCodeMap$1(this$static.this$01.hashCodeMap);
    return this$static.current.hasNext_0();
  }
  function $next(this$static) {
    var rv;
    checkStructuralChange(this$static.this$01, this$static);
    checkCriticalElement(this$static.hasNext);
    rv = castTo(this$static.current.next_0(), 9);
    this$static.hasNext = $computeHasNext(this$static);
    return rv;
  }
  function AbstractHashMap$EntrySetIterator(this$0) {
    this.this$01 = this$0;
    this.stringMapEntries = new InternalStringMap$1(this.this$01.stringMap);
    this.current = this.stringMapEntries;
    this.hasNext = $computeHasNext(this);
    this.$modCount = this$0.$modCount;
  }
  defineClass(36, 1, {}, AbstractHashMap$EntrySetIterator);
  _.forEachRemaining = function forEachRemaining(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.next_0 = function next() {
    return $next(this);
  };
  _.hasNext_0 = function hasNext() {
    return this.hasNext;
  };
  _.hasNext = false;
  var Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit = createForClass('java.util', 'AbstractHashMap/EntrySetIterator', 36, Ljava_lang_Object_2_classLit);
  function $indexOf_0(this$static, toFind) {
    var i, n;
    for (i = 0, n = this$static.size_1(); i < n; ++i) {
      if (equals_13(toFind, this$static.get_1(i))) {
        return i;
      }
    }
    return -1;
  }
  defineClass(158, 156, {
    12: 1,
    41: 1
  });
  _.spliterator_0 = function spliterator_2() {
    return new Spliterators$IteratorSpliterator(this, 16);
  };
  _.add_1 = function add_1(index_0, element) {
    throw toJs(new UnsupportedOperationException('Add not supported on this list'));
  };
  _.add_0 = function add_2(obj) {
    this.add_1(this.size_1(), obj);
    return true;
  };
  _.equals_0 = function equals_10(o) {
    var elem, elem$iterator, elemOther, iterOther, other;
    if (o === this) {
      return true;
    }
    if (!instanceOf(o, 41)) {
      return false;
    }
    other = castTo(o, 41);
    if (this.size_1() != other.size_1()) {
      return false;
    }
    iterOther = other.iterator();
    for (elem$iterator = this.iterator(); elem$iterator.hasNext_0();) {
      elem = elem$iterator.next_0();
      elemOther = iterOther.next_0();
      if (!(maskUndefined(elem) === maskUndefined(elemOther) || elem != null && equals_Ljava_lang_Object__Z__devirtual$(elem, elemOther))) {
        return false;
      }
    }
    return true;
  };
  _.hashCode_0 = function hashCode_9() {
    return hashCode_14(this);
  };
  _.iterator = function iterator_1() {
    return new AbstractList$IteratorImpl(this);
  };
  var Ljava_util_AbstractList_2_classLit = createForClass('java.util', 'AbstractList', 158, Ljava_util_AbstractCollection_2_classLit);
  function AbstractList$IteratorImpl(this$0) {
    this.this$01 = this$0;
  }
  defineClass(98, 1, {}, AbstractList$IteratorImpl);
  _.forEachRemaining = function forEachRemaining_0(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.hasNext_0 = function hasNext_0() {
    return this.i < this.this$01.size_1();
  };
  _.next_0 = function next_0() {
    checkCriticalElement(this.i < this.this$01.size_1());
    return this.this$01.get_1(this.i++);
  };
  _.i = 0;
  var Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util', 'AbstractList/IteratorImpl', 98, Ljava_lang_Object_2_classLit);
  function AbstractMap$1(this$0) {
    this.this$01 = this$0;
  }
  defineClass(67, 157, $intern_12, AbstractMap$1);
  _.contains = function contains_1(key) {
    return $containsKey(this.this$01, key);
  };
  _.iterator = function iterator_2() {
    var outerIter;
    return outerIter = new AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySet(this.this$01).this$01), new AbstractMap$1$1(outerIter);
  };
  _.size_1 = function size_4() {
    return $size(this.this$01);
  };
  var Ljava_util_AbstractMap$1_2_classLit = createForClass('java.util', 'AbstractMap/1', 67, Ljava_util_AbstractSet_2_classLit);
  function AbstractMap$1$1(val$outerIter) {
    this.val$outerIter2 = val$outerIter;
  }
  defineClass(59, 1, {}, AbstractMap$1$1);
  _.forEachRemaining = function forEachRemaining_1(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.hasNext_0 = function hasNext_1() {
    return this.val$outerIter2.hasNext;
  };
  _.next_0 = function next_1() {
    var entry;
    return entry = $next(this.val$outerIter2), entry.getKey();
  };
  var Ljava_util_AbstractMap$1$1_2_classLit = createForClass('java.util', 'AbstractMap/1/1', 59, Ljava_lang_Object_2_classLit);
  function AbstractMap$2(this$0) {
    this.this$01 = this$0;
  }
  defineClass(94, 156, {
    12: 1
  }, AbstractMap$2);
  _.contains = function contains_2(value_0) {
    return $containsValue(this.this$01, value_0);
  };
  _.iterator = function iterator_3() {
    var outerIter;
    return outerIter = new AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySet(this.this$01).this$01), new AbstractMap$2$1(outerIter);
  };
  _.size_1 = function size_5() {
    return $size(this.this$01);
  };
  var Ljava_util_AbstractMap$2_2_classLit = createForClass('java.util', 'AbstractMap/2', 94, Ljava_util_AbstractCollection_2_classLit);
  function AbstractMap$2$1(val$outerIter) {
    this.val$outerIter2 = val$outerIter;
  }
  defineClass(68, 1, {}, AbstractMap$2$1);
  _.forEachRemaining = function forEachRemaining_2(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.hasNext_0 = function hasNext_2() {
    return this.val$outerIter2.hasNext;
  };
  _.next_0 = function next_2() {
    var entry;
    return entry = $next(this.val$outerIter2), entry.getValue_0();
  };
  var Ljava_util_AbstractMap$2$1_2_classLit = createForClass('java.util', 'AbstractMap/2/1', 68, Ljava_lang_Object_2_classLit);
  defineClass(92, 1, {
    9: 1
  });
  _.equals_0 = function equals_11(other) {
    var entry;
    if (!instanceOf(other, 9)) {
      return false;
    }
    entry = castTo(other, 9);
    return equals_13(this.key, entry.getKey()) && equals_13(this.value_0, entry.getValue_0());
  };
  _.getKey = function getKey() {
    return this.key;
  };
  _.getValue_0 = function getValue_0() {
    return this.value_0;
  };
  _.hashCode_0 = function hashCode_10() {
    return hashCode_15(this.key) ^ hashCode_15(this.value_0);
  };
  _.setValue = function setValue(value_0) {
    var oldValue;
    oldValue = this.value_0;
    this.value_0 = value_0;
    return oldValue;
  };
  _.toString_0 = function toString_12() {
    return this.key + '=' + this.value_0;
  };
  var Ljava_util_AbstractMap$AbstractEntry_2_classLit = createForClass('java.util', 'AbstractMap/AbstractEntry', 92, Ljava_lang_Object_2_classLit);
  function AbstractMap$SimpleEntry(key, value_0) {
    this.key = key;
    this.value_0 = value_0;
  }
  defineClass(93, 92, {
    9: 1
  }, AbstractMap$SimpleEntry);
  var Ljava_util_AbstractMap$SimpleEntry_2_classLit = createForClass('java.util', 'AbstractMap/SimpleEntry', 93, Ljava_util_AbstractMap$AbstractEntry_2_classLit);
  defineClass(159, 1, {
    9: 1
  });
  _.equals_0 = function equals_12(other) {
    var entry;
    if (!instanceOf(other, 9)) {
      return false;
    }
    entry = castTo(other, 9);
    return equals_13(this.val$entry2.value[0], entry.getKey()) && equals_13($getValue(this), entry.getValue_0());
  };
  _.hashCode_0 = function hashCode_11() {
    return hashCode_15(this.val$entry2.value[0]) ^ hashCode_15($getValue(this));
  };
  _.toString_0 = function toString_13() {
    return this.val$entry2.value[0] + '=' + $getValue(this);
  };
  var Ljava_util_AbstractMapEntry_2_classLit = createForClass('java.util', 'AbstractMapEntry', 159, Ljava_lang_Object_2_classLit);
  function $indexOf_1(this$static, o, index_0) {
    for (; index_0 < this$static.array.length; ++index_0) {
      if (equals_13(o, this$static.array[index_0])) {
        return index_0;
      }
    }
    return -1;
  }
  function ArrayList() {
    this.array = initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, 0, 5, 1);
  }
  defineClass(47, 158, $intern_13, ArrayList);
  _.add_1 = function add_3(index_0, o) {
    checkCriticalPositionIndex(index_0, this.array.length);
    insertTo(this.array, index_0, o);
  };
  _.add_0 = function add_4(o) {
    return this.array[this.array.length] = o, true;
  };
  _.addAll = function addAll_0(c) {
    var cArray, len;
    cArray = c.toArray();
    len = cArray.length;
    if (len == 0) {
      return false;
    }
    insertTo_0(this.array, this.array.length, cArray);
    return true;
  };
  _.contains = function contains_3(o) {
    return $indexOf_1(this, o, 0) != -1;
  };
  _.get_1 = function get_2(index_0) {
    return checkCriticalElementIndex(index_0, this.array.length), this.array[index_0];
  };
  _.iterator = function iterator_4() {
    return new ArrayList$1(this);
  };
  _.size_1 = function size_6() {
    return this.array.length;
  };
  _.toArray = function toArray_1() {
    return clone(this.array, this.array.length);
  };
  _.toArray_0 = function toArray_2(out) {
    var i, size_0;
    size_0 = this.array.length;
    out.length < size_0 && (out = stampJavaTypeInfo_1(new Array(size_0), out));
    for (i = 0; i < size_0; ++i) {
      setCheck(out, i, this.array[i]);
    }
    out.length > size_0 && setCheck(out, size_0, null);
    return out;
  };
  var Ljava_util_ArrayList_2_classLit = createForClass('java.util', 'ArrayList', 47, Ljava_util_AbstractList_2_classLit);
  function ArrayList$1(this$0) {
    this.this$01 = this$0;
  }
  defineClass(119, 1, {}, ArrayList$1);
  _.forEachRemaining = function forEachRemaining_3(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.hasNext_0 = function hasNext_3() {
    return this.i < this.this$01.array.length;
  };
  _.next_0 = function next_3() {
    checkCriticalElement(this.i < this.this$01.array.length);
    this.last = this.i++;
    return this.this$01.array[this.last];
  };
  _.i = 0;
  _.last = -1;
  var Ljava_util_ArrayList$1_2_classLit = createForClass('java.util', 'ArrayList/1', 119, Ljava_lang_Object_2_classLit);
  function hashCode_12(a) {
    var e, e$index, e$max, hashCode;
    hashCode = 1;
    for (e$index = 0, e$max = a.length; e$index < e$max; ++e$index) {
      e = a[e$index];
      hashCode = 31 * hashCode + (e != null ? hashCode__I__devirtual$(e) : 0);
      hashCode = hashCode | 0;
    }
    return hashCode;
  }
  function $toArray(this$static, out) {
    var i, size_0;
    size_0 = this$static.array.length;
    out.length < size_0 && (out = stampJavaTypeInfo_1(new Array(size_0), out));
    for (i = 0; i < size_0; ++i) {
      setCheck(out, i, this$static.array[i]);
    }
    out.length > size_0 && setCheck(out, size_0, null);
    return out;
  }
  function Arrays$ArrayList(array) {
    checkCriticalNotNull(array);
    this.array = array;
  }
  defineClass(73, 158, $intern_13, Arrays$ArrayList);
  _.contains = function contains_4(o) {
    return $indexOf_0(this, o) != -1;
  };
  _.get_1 = function get_3(index_0) {
    checkCriticalElementIndex(index_0, this.array.length);
    return this.array[index_0];
  };
  _.size_1 = function size_7() {
    return this.array.length;
  };
  _.toArray = function toArray_3() {
    return $toArray(this, initUnidimensionalArray(Ljava_lang_Object_2_classLit, $intern_0, 1, this.array.length, 5, 1));
  };
  _.toArray_0 = function toArray_4(out) {
    return $toArray(this, out);
  };
  var Ljava_util_Arrays$ArrayList_2_classLit = createForClass('java.util', 'Arrays/ArrayList', 73, Ljava_util_AbstractList_2_classLit);
  function $clinit_Collections() {
    $clinit_Collections = emptyMethod;
    EMPTY_MAP = new Collections$EmptyMap();
    EMPTY_SET = new Collections$EmptySet();
  }
  function hashCode_13(collection) {
    $clinit_Collections();
    var e, e$iterator, hashCode;
    hashCode = 0;
    for (e$iterator = collection.iterator(); e$iterator.hasNext_0();) {
      e = e$iterator.next_0();
      hashCode = hashCode + (e != null ? hashCode__I__devirtual$(e) : 0);
      hashCode = hashCode | 0;
    }
    return hashCode;
  }
  function hashCode_14(list) {
    $clinit_Collections();
    var e, e$iterator, hashCode;
    hashCode = 1;
    for (e$iterator = list.iterator(); e$iterator.hasNext_0();) {
      e = e$iterator.next_0();
      hashCode = 31 * hashCode + (e != null ? hashCode__I__devirtual$(e) : 0);
      hashCode = hashCode | 0;
    }
    return hashCode;
  }
  var EMPTY_MAP, EMPTY_SET;
  function $clinit_Collections$EmptyListIterator() {
    $clinit_Collections$EmptyListIterator = emptyMethod;
    INSTANCE_2 = new Collections$EmptyListIterator();
  }
  function Collections$EmptyListIterator() {}
  defineClass(95, 1, {}, Collections$EmptyListIterator);
  _.forEachRemaining = function forEachRemaining_4(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.hasNext_0 = function hasNext_4() {
    return false;
  };
  _.next_0 = function next_4() {
    throw toJs(new NoSuchElementException());
  };
  var INSTANCE_2;
  var Ljava_util_Collections$EmptyListIterator_2_classLit = createForClass('java.util', 'Collections/EmptyListIterator', 95, Ljava_lang_Object_2_classLit);
  function Collections$EmptyMap() {}
  defineClass(97, 155, {
    3: 1,
    40: 1
  }, Collections$EmptyMap);
  _.containsKey = function containsKey_1(key) {
    return false;
  };
  _.entrySet = function entrySet_0() {
    return $clinit_Collections(), EMPTY_SET;
  };
  _.get_0 = function get_4(key) {
    return null;
  };
  _.size_1 = function size_8() {
    return 0;
  };
  var Ljava_util_Collections$EmptyMap_2_classLit = createForClass('java.util', 'Collections/EmptyMap', 97, Ljava_util_AbstractMap_2_classLit);
  function Collections$EmptySet() {}
  defineClass(96, 157, $intern_14, Collections$EmptySet);
  _.contains = function contains_5(object) {
    return false;
  };
  _.iterator = function iterator_5() {
    return $clinit_Collections(), $clinit_Collections$EmptyListIterator(), INSTANCE_2;
  };
  _.size_1 = function size_9() {
    return 0;
  };
  var Ljava_util_Collections$EmptySet_2_classLit = createForClass('java.util', 'Collections/EmptySet', 96, Ljava_util_AbstractSet_2_classLit);
  function checkStructuralChange(host, iterator) {
    if (iterator.$modCount != host.$modCount) {
      throw toJs(new ConcurrentModificationException());
    }
  }
  function structureChanged(host) {
    var modCount, modCountable;
    modCountable = host;
    modCount = modCountable.$modCount | 0;
    modCountable.$modCount = modCount + 1;
  }
  function ConcurrentModificationException() {
    RuntimeException.call(this);
  }
  defineClass(120, 6, $intern_1, ConcurrentModificationException);
  var Ljava_util_ConcurrentModificationException_2_classLit = createForClass('java.util', 'ConcurrentModificationException', 120, Ljava_lang_RuntimeException_2_classLit);
  function $clinit_Date$StringData() {
    $clinit_Date$StringData = emptyMethod;
    DAYS = stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_0, 2, 6, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    MONTHS = stampJavaTypeInfo(getClassLiteralForArray(Ljava_lang_String_2_classLit, 1), $intern_0, 2, 6, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  }
  var DAYS, MONTHS;
  function $equals_2(value1, value2) {
    return maskUndefined(value1) === maskUndefined(value2) || value1 != null && equals_Ljava_lang_Object__Z__devirtual$(value1, value2);
  }
  function HashMap() {
    $reset(this);
  }
  function HashMap_0(ignored) {
    checkCriticalArgument(ignored >= 0, 'Negative initial capacity');
    checkCriticalArgument(true, 'Non-positive load factor');
    $reset(this);
  }
  defineClass(24, 58, {
    3: 1,
    40: 1
  }, HashMap, HashMap_0);
  var Ljava_util_HashMap_2_classLit = createForClass('java.util', 'HashMap', 24, Ljava_util_AbstractHashMap_2_classLit);
  function $add(this$static, o) {
    var old;
    old = $put(this$static.map_0, o, this$static);
    return old == null;
  }
  function $contains_0(this$static, o) {
    return $containsKey(this$static.map_0, o);
  }
  function $remove_0(this$static, o) {
    return $remove(this$static.map_0, o) != null;
  }
  function HashSet() {
    this.map_0 = new HashMap();
  }
  function HashSet_0(c) {
    this.map_0 = new HashMap_0(c.array.length);
    $addAll(this, c);
  }
  defineClass(22, 157, $intern_14, HashSet, HashSet_0);
  _.add_0 = function add_5(o) {
    return $add(this, o);
  };
  _.contains = function contains_6(o) {
    return $contains_0(this, o);
  };
  _.iterator = function iterator_6() {
    var outerIter;
    return outerIter = new AbstractHashMap$EntrySetIterator(new AbstractHashMap$EntrySet(new AbstractMap$1(this.map_0).this$01).this$01), new AbstractMap$1$1(outerIter);
  };
  _.size_1 = function size_10() {
    return $size(this.map_0);
  };
  var Ljava_util_HashSet_2_classLit = createForClass('java.util', 'HashSet', 22, Ljava_util_AbstractSet_2_classLit);
  function $findEntryInChain(key, chain) {
    var entry, entry$index, entry$max;
    for (entry$index = 0, entry$max = chain.length; entry$index < entry$max; ++entry$index) {
      entry = chain[entry$index];
      if ($equals_2(key, entry.getKey())) {
        return entry;
      }
    }
    return null;
  }
  function $getChainOrEmpty(this$static, hashCode) {
    var chain;
    chain = this$static.backingMap.get(hashCode);
    return chain == null ? new Array() : chain;
  }
  function $getEntry(this$static, key) {
    var hashCode;
    return $findEntryInChain(key, $getChainOrEmpty(this$static, key == null ? 0 : (hashCode = hashCode__I__devirtual$(key), hashCode | 0)));
  }
  function $put_0(this$static, key, value_0) {
    var chain, chain0, entry, hashCode, hashCode0;
    hashCode0 = key == null ? 0 : (hashCode = hashCode__I__devirtual$(key), hashCode | 0);
    chain0 = (chain = this$static.backingMap.get(hashCode0), chain == null ? new Array() : chain);
    if (chain0.length == 0) {
      this$static.backingMap.set(hashCode0, chain0);
    } else {
      entry = $findEntryInChain(key, chain0);
      if (entry) {
        return entry.setValue(value_0);
      }
    }
    setCheck(chain0, chain0.length, new AbstractMap$SimpleEntry(key, value_0));
    ++this$static.size_0;
    structureChanged(this$static.host);
    return null;
  }
  function $remove_1(this$static, key) {
    var chain, chain0, entry, hashCode, hashCode0, i;
    hashCode0 = !key ? 0 : (hashCode = hashCode__I__devirtual$(key), hashCode | 0);
    chain0 = (chain = this$static.backingMap.get(hashCode0), chain == null ? new Array() : chain);
    for (i = 0; i < chain0.length; i++) {
      entry = chain0[i];
      if ($equals_2(key, entry.getKey())) {
        if (chain0.length == 1) {
          chain0.length = 0;
          $delete(this$static.backingMap, hashCode0);
        } else {
          chain0.splice(i, 1);
        }
        --this$static.size_0;
        structureChanged(this$static.host);
        return entry.getValue_0();
      }
    }
    return null;
  }
  function InternalHashCodeMap(host) {
    this.backingMap = newJsMap();
    this.host = host;
  }
  defineClass(99, 1, {}, InternalHashCodeMap);
  _.iterator = function iterator_7() {
    return new InternalHashCodeMap$1(this);
  };
  _.size_0 = 0;
  var Ljava_util_InternalHashCodeMap_2_classLit = createForClass('java.util', 'InternalHashCodeMap', 99, Ljava_lang_Object_2_classLit);
  function InternalHashCodeMap$1(this$0) {
    this.this$01 = this$0;
    this.chains = this.this$01.backingMap.entries();
    this.chain = new Array();
  }
  defineClass(69, 1, {}, InternalHashCodeMap$1);
  _.forEachRemaining = function forEachRemaining_5(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.next_0 = function next_5() {
    return this.lastEntry = this.chain[this.itemIndex++], this.lastEntry;
  };
  _.hasNext_0 = function hasNext_5() {
    var current;
    if (this.itemIndex < this.chain.length) {
      return true;
    }
    current = this.chains.next();
    if (!current.done) {
      this.chain = current.value[1];
      this.itemIndex = 0;
      return true;
    }
    return false;
  };
  _.itemIndex = 0;
  _.lastEntry = null;
  var Ljava_util_InternalHashCodeMap$1_2_classLit = createForClass('java.util', 'InternalHashCodeMap/1', 69, Ljava_lang_Object_2_classLit);
  function $delete(this$static, key) {
    var fn;
    fn = this$static['delete'];
    fn.call(this$static, key);
  }
  function $delete_0(this$static, key) {
    var fn;
    fn = this$static['delete'];
    fn.call(this$static, key);
  }
  function $clinit_InternalJsMapFactory() {
    $clinit_InternalJsMapFactory = emptyMethod;
    jsMapCtor = getJsMapConstructor();
  }
  function canHandleObjectCreateAndProto() {
    if (!Object.create || !Object.getOwnPropertyNames) {
      return false;
    }
    var protoField = '__proto__';
    var map_0 = Object.create(null);
    if (map_0[protoField] !== undefined) {
      return false;
    }
    var keys_0 = Object.getOwnPropertyNames(map_0);
    if (keys_0.length != 0) {
      return false;
    }
    map_0[protoField] = 42;
    if (map_0[protoField] !== 42) {
      return false;
    }
    if (Object.getOwnPropertyNames(map_0).length == 0) {
      return false;
    }
    return true;
  }
  function getJsMapConstructor() {
    function isCorrectIterationProtocol() {
      try {
        return new Map().entries().next().done;
      } catch (e) {
        return false;
      }
    }
    if (typeof Map === 'function' && Map.prototype.entries && isCorrectIterationProtocol()) {
      return Map;
    } else {
      return getJsMapPolyFill();
    }
  }
  function getJsMapPolyFill() {
    function Stringmap() {
      this.obj = this.createObject();
    }
    ;
    Stringmap.prototype.createObject = function (key) {
      return Object.create(null);
    };
    Stringmap.prototype.get = function (key) {
      return this.obj[key];
    };
    Stringmap.prototype.set = function (key, value_0) {
      this.obj[key] = value_0;
    };
    Stringmap.prototype['delete'] = function (key) {
      delete this.obj[key];
    };
    Stringmap.prototype.keys = function () {
      return Object.getOwnPropertyNames(this.obj);
    };
    Stringmap.prototype.entries = function () {
      var keys_0 = this.keys();
      var map_0 = this;
      var nextIndex = 0;
      return {
        next: function next() {
          if (nextIndex >= keys_0.length) return {
            done: true
          };
          var key = keys_0[nextIndex++];
          return {
            value: [key, map_0.get(key)],
            done: false
          };
        }
      };
    };
    if (!canHandleObjectCreateAndProto()) {
      Stringmap.prototype.createObject = function () {
        return {};
      };
      Stringmap.prototype.get = function (key) {
        return this.obj[':' + key];
      };
      Stringmap.prototype.set = function (key, value_0) {
        this.obj[':' + key] = value_0;
      };
      Stringmap.prototype['delete'] = function (key) {
        delete this.obj[':' + key];
      };
      Stringmap.prototype.keys = function () {
        var result = [];
        for (var key in this.obj) {
          key.charCodeAt(0) == 58 && result.push(key.substring(1));
        }
        return result;
      };
    }
    return Stringmap;
  }
  function newJsMap() {
    $clinit_InternalJsMapFactory();
    return new jsMapCtor();
  }
  var jsMapCtor;
  function $contains_1(this$static, key) {
    return !(this$static.backingMap.get(key) === undefined);
  }
  function $get_0(this$static, key) {
    return this$static.backingMap.get(key);
  }
  function $put_1(this$static, key, value_0) {
    var oldValue;
    oldValue = this$static.backingMap.get(key);
    this$static.backingMap.set(key, value_0 === undefined ? null : value_0);
    if (oldValue === undefined) {
      ++this$static.size_0;
      structureChanged(this$static.host);
    } else {
      ++this$static.valueMod;
    }
    return oldValue;
  }
  function $remove_2(this$static, key) {
    var value_0;
    value_0 = this$static.backingMap.get(key);
    if (value_0 === undefined) {
      ++this$static.valueMod;
    } else {
      $delete_0(this$static.backingMap, key);
      --this$static.size_0;
      structureChanged(this$static.host);
    }
    return value_0;
  }
  function InternalStringMap(host) {
    this.backingMap = newJsMap();
    this.host = host;
  }
  defineClass(100, 1, {}, InternalStringMap);
  _.iterator = function iterator_8() {
    return new InternalStringMap$1(this);
  };
  _.size_0 = 0;
  _.valueMod = 0;
  var Ljava_util_InternalStringMap_2_classLit = createForClass('java.util', 'InternalStringMap', 100, Ljava_lang_Object_2_classLit);
  function InternalStringMap$1(this$0) {
    this.this$01 = this$0;
    this.entries_0 = this.this$01.backingMap.entries();
    this.current = this.entries_0.next();
  }
  defineClass(70, 1, {}, InternalStringMap$1);
  _.forEachRemaining = function forEachRemaining_6(consumer) {
    $forEachRemaining(this, consumer);
  };
  _.next_0 = function next_6() {
    return this.last = this.current, this.current = this.entries_0.next(), new InternalStringMap$2(this.this$01, this.last, this.this$01.valueMod);
  };
  _.hasNext_0 = function hasNext_6() {
    return !this.current.done;
  };
  var Ljava_util_InternalStringMap$1_2_classLit = createForClass('java.util', 'InternalStringMap/1', 70, Ljava_lang_Object_2_classLit);
  function $getValue(this$static) {
    if (this$static.this$01.valueMod != this$static.val$lastValueMod3) {
      return $get_0(this$static.this$01, this$static.val$entry2.value[0]);
    }
    return this$static.val$entry2.value[1];
  }
  function InternalStringMap$2(this$0, val$entry, val$lastValueMod) {
    this.this$01 = this$0;
    this.val$entry2 = val$entry;
    this.val$lastValueMod3 = val$lastValueMod;
  }
  defineClass(101, 159, {
    9: 1
  }, InternalStringMap$2);
  _.getKey = function getKey_0() {
    return this.val$entry2.value[0];
  };
  _.getValue_0 = function getValue_1() {
    return $getValue(this);
  };
  _.setValue = function setValue_0(object) {
    return $put_1(this.this$01, this.val$entry2.value[0], object);
  };
  _.val$lastValueMod3 = 0;
  var Ljava_util_InternalStringMap$2_2_classLit = createForClass('java.util', 'InternalStringMap/2', 101, Ljava_util_AbstractMapEntry_2_classLit);
  function NoSuchElementException() {
    RuntimeException.call(this);
  }
  defineClass(72, 6, $intern_1, NoSuchElementException);
  var Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util', 'NoSuchElementException', 72, Ljava_lang_RuntimeException_2_classLit);
  function equals_13(a, b) {
    return maskUndefined(a) === maskUndefined(b) || a != null && equals_Ljava_lang_Object__Z__devirtual$(a, b);
  }
  function hashCode_15(o) {
    return o != null ? hashCode__I__devirtual$(o) : 0;
  }
  function $clinit_Optional() {
    $clinit_Optional = emptyMethod;
    EMPTY = new Optional(null);
  }
  function $map(this$static, mapper) {
    checkCriticalNotNull(mapper);
    if (this$static.ref != null) {
      return ofNullable(mapper.apply_0(this$static.ref));
    }
    return EMPTY;
  }
  function $orElse(this$static, other) {
    return this$static.ref != null ? this$static.ref : other;
  }
  function Optional(ref) {
    $clinit_Optional();
    this.ref = ref;
  }
  function ofNullable(value_0) {
    $clinit_Optional();
    return value_0 == null ? EMPTY : new Optional(checkCriticalNotNull(value_0));
  }
  defineClass(21, 1, {
    21: 1
  }, Optional);
  _.equals_0 = function equals_14(obj) {
    var other;
    if (obj === this) {
      return true;
    }
    if (!instanceOf(obj, 21)) {
      return false;
    }
    other = castTo(obj, 21);
    return equals_13(this.ref, other.ref);
  };
  _.hashCode_0 = function hashCode_16() {
    return hashCode_15(this.ref);
  };
  _.toString_0 = function toString_14() {
    return this.ref != null ? 'Optional.of(' + valueOf_1(this.ref) + ')' : 'Optional.empty()';
  };
  var EMPTY;
  var Ljava_util_Optional_2_classLit = createForClass('java.util', 'Optional', 21, Ljava_lang_Object_2_classLit);
  function $forEachRemaining_0(this$static, consumer) {
    while (this$static.tryAdvance(consumer));
  }
  defineClass(122, 1, {});
  _.forEachRemaining = function forEachRemaining_7(consumer) {
    $forEachRemaining_0(this, consumer);
  };
  _.characteristics_0 = function characteristics_0() {
    return this.characteristics;
  };
  _.estimateSize_0 = function estimateSize() {
    return this.sizeEstimate;
  };
  _.characteristics = 0;
  _.sizeEstimate = 0;
  var Ljava_util_Spliterators$BaseSpliterator_2_classLit = createForClass('java.util', 'Spliterators/BaseSpliterator', 122, Ljava_lang_Object_2_classLit);
  function Spliterators$AbstractSpliterator(size_0, characteristics) {
    this.sizeEstimate = size_0;
    this.characteristics = (characteristics & 64) != 0 ? characteristics | 16384 : characteristics;
  }
  defineClass(123, 122, {});
  var Ljava_util_Spliterators$AbstractSpliterator_2_classLit = createForClass('java.util', 'Spliterators/AbstractSpliterator', 123, Ljava_util_Spliterators$BaseSpliterator_2_classLit);
  function $initIterator(this$static) {
    if (!this$static.it) {
      this$static.it = this$static.collection.iterator();
      this$static.estimateSize = this$static.collection.size_1();
    }
  }
  function Spliterators$IteratorSpliterator(collection, characteristics) {
    this.collection = (checkCriticalNotNull(collection), collection);
    this.characteristics = (characteristics & 4096) == 0 ? characteristics | 64 | 16384 : characteristics;
  }
  defineClass(25, 1, {}, Spliterators$IteratorSpliterator);
  _.characteristics_0 = function characteristics_1() {
    return this.characteristics;
  };
  _.estimateSize_0 = function estimateSize_0() {
    $initIterator(this);
    return this.estimateSize;
  };
  _.forEachRemaining = function forEachRemaining_8(consumer) {
    $initIterator(this);
    this.it.forEachRemaining(consumer);
  };
  _.tryAdvance = function tryAdvance(consumer) {
    checkCriticalNotNull(consumer);
    $initIterator(this);
    if (this.it.hasNext_0()) {
      consumer.accept(this.it.next_0());
      return true;
    }
    return false;
  };
  _.characteristics = 0;
  _.estimateSize = 0;
  var Ljava_util_Spliterators$IteratorSpliterator_2_classLit = createForClass('java.util', 'Spliterators/IteratorSpliterator', 25, Ljava_lang_Object_2_classLit);
  function $add_0(this$static, newElement) {
    !this$static.builder_0 ? this$static.builder_0 = new StringBuilder_0(this$static.prefix) : $append_2(this$static.builder_0, this$static.delimiter);
    $append(this$static.builder_0, newElement);
    return this$static;
  }
  function $merge(this$static, other) {
    var otherLength;
    if (other.builder_0) {
      otherLength = other.builder_0.string.length;
      !this$static.builder_0 ? this$static.builder_0 = new StringBuilder_0(this$static.prefix) : $append_2(this$static.builder_0, this$static.delimiter);
      $append_0(this$static.builder_0, other.builder_0, other.prefix.length, otherLength);
    }
    return this$static;
  }
  function $toString_3(this$static) {
    return !this$static.builder_0 ? this$static.emptyValue : this$static.suffix.length == 0 ? this$static.builder_0.string : this$static.builder_0.string + ('' + this$static.suffix);
  }
  function StringJoiner(delimiter) {
    StringJoiner_0.call(this, delimiter, '', '');
  }
  function StringJoiner_0(delimiter, prefix, suffix) {
    this.delimiter = (checkCriticalNotNull(delimiter), delimiter);
    this.prefix = (checkCriticalNotNull(prefix), prefix);
    this.suffix = (checkCriticalNotNull(suffix), suffix);
    this.emptyValue = this.prefix + ('' + this.suffix);
  }
  defineClass(14, 1, {
    14: 1
  }, StringJoiner, StringJoiner_0);
  _.toString_0 = function toString_15() {
    return $toString_3(this);
  };
  var Ljava_util_StringJoiner_2_classLit = createForClass('java.util', 'StringJoiner', 14, Ljava_lang_Object_2_classLit);
  function Function$lambda$0$Type() {}
  defineClass(113, 1, {}, Function$lambda$0$Type);
  _.apply_0 = function apply_8(t) {
    return t;
  };
  var Ljava_util_function_Function$lambda$0$Type_2_classLit = createForClass('java.util.function', 'Function/lambda$0$Type', 113, Ljava_lang_Object_2_classLit);
  function of(supplier, accumulator, combiner, finisher, characteristics) {
    checkCriticalNotNull(supplier);
    checkCriticalNotNull(accumulator);
    checkCriticalNotNull(combiner);
    checkCriticalNotNull(finisher);
    checkCriticalNotNull(characteristics);
    return new CollectorImpl(supplier, accumulator, finisher);
  }
  function of_0(supplier, accumulator, combiner, characteristics) {
    checkCriticalNotNull(supplier);
    checkCriticalNotNull(accumulator);
    checkCriticalNotNull(combiner);
    checkCriticalNotNull(characteristics);
    return new CollectorImpl(supplier, accumulator, new Function$lambda$0$Type());
  }
  function $clinit_Collector$Characteristics() {
    $clinit_Collector$Characteristics = emptyMethod;
    CONCURRENT = new Collector$Characteristics('CONCURRENT', 0);
    IDENTITY_FINISH = new Collector$Characteristics('IDENTITY_FINISH', 1);
    UNORDERED = new Collector$Characteristics('UNORDERED', 2);
  }
  function Collector$Characteristics(enum$name, enum$ordinal) {
    Enum.call(this, enum$name, enum$ordinal);
  }
  function values_3() {
    $clinit_Collector$Characteristics();
    return stampJavaTypeInfo(getClassLiteralForArray(Ljava_util_stream_Collector$Characteristics_2_classLit, 1), $intern_0, 30, 0, [CONCURRENT, IDENTITY_FINISH, UNORDERED]);
  }
  defineClass(30, 17, {
    3: 1,
    16: 1,
    17: 1,
    30: 1
  }, Collector$Characteristics);
  var CONCURRENT, IDENTITY_FINISH, UNORDERED;
  var Ljava_util_stream_Collector$Characteristics_2_classLit = createForEnum('java.util.stream', 'Collector/Characteristics', 30, Ljava_lang_Enum_2_classLit, values_3);
  function CollectorImpl(supplier, accumulator, finisher) {
    this.supplier = supplier;
    this.accumulator = accumulator;
    $clinit_Collections();
    this.finisher = finisher;
  }
  defineClass(74, 1, {}, CollectorImpl);
  var Ljava_util_stream_CollectorImpl_2_classLit = createForClass('java.util.stream', 'CollectorImpl', 74, Ljava_lang_Object_2_classLit);
  function Collectors$10methodref$merge$Type() {}
  defineClass(132, 1, {}, Collectors$10methodref$merge$Type);
  _.apply_1 = function apply_9(arg0, arg1) {
    return $merge(castTo(arg0, 14), castTo(arg1, 14));
  };
  var Ljava_util_stream_Collectors$10methodref$merge$Type_2_classLit = createForClass('java.util.stream', 'Collectors/10methodref$merge$Type', 132, Ljava_lang_Object_2_classLit);
  function Collectors$11methodref$toString$Type() {}
  defineClass(133, 1, {}, Collectors$11methodref$toString$Type);
  _.apply_0 = function apply_10(arg0) {
    return $toString_3(castTo(arg0, 14));
  };
  var Ljava_util_stream_Collectors$11methodref$toString$Type_2_classLit = createForClass('java.util.stream', 'Collectors/11methodref$toString$Type', 133, Ljava_lang_Object_2_classLit);
  function Collectors$20methodref$add$Type() {}
  defineClass(134, 1, {}, Collectors$20methodref$add$Type);
  _.accept_0 = function accept_1(arg0, arg1) {
    castTo(arg0, 12).add_0(arg1);
  };
  var Ljava_util_stream_Collectors$20methodref$add$Type_2_classLit = createForClass('java.util.stream', 'Collectors/20methodref$add$Type', 134, Ljava_lang_Object_2_classLit);
  function Collectors$21methodref$ctor$Type() {}
  defineClass(136, 1, {}, Collectors$21methodref$ctor$Type);
  _.get_2 = function get_5() {
    return new ArrayList();
  };
  var Ljava_util_stream_Collectors$21methodref$ctor$Type_2_classLit = createForClass('java.util.stream', 'Collectors/21methodref$ctor$Type', 136, Ljava_lang_Object_2_classLit);
  function Collectors$9methodref$add$Type() {}
  defineClass(131, 1, {}, Collectors$9methodref$add$Type);
  _.accept_0 = function accept_2(arg0, arg1) {
    $add_0(castTo(arg0, 14), castTo(arg1, 33));
  };
  var Ljava_util_stream_Collectors$9methodref$add$Type_2_classLit = createForClass('java.util.stream', 'Collectors/9methodref$add$Type', 131, Ljava_lang_Object_2_classLit);
  function Collectors$lambda$21$Type() {}
  defineClass(135, 1, {}, Collectors$lambda$21$Type);
  _.apply_1 = function apply_11(arg0, arg1) {
    return castTo(arg0, 12).addAll(castTo(arg1, 12)), castTo(arg0, 12);
  };
  var Ljava_util_stream_Collectors$lambda$21$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$21$Type', 135, Ljava_lang_Object_2_classLit);
  function Collectors$lambda$6$Type() {
    this.delimiter_0 = ', ';
    this.prefix_1 = '';
    this.suffix_2 = '';
  }
  defineClass(130, 1, {}, Collectors$lambda$6$Type);
  _.get_2 = function get_6() {
    return new StringJoiner_0(this.delimiter_0, this.prefix_1, this.suffix_2);
  };
  var Ljava_util_stream_Collectors$lambda$6$Type_2_classLit = createForClass('java.util.stream', 'Collectors/lambda$6$Type', 130, Ljava_lang_Object_2_classLit);
  function $terminate(this$static) {
    if (!this$static.root) {
      $throwIfTerminated(this$static);
      this$static.terminated = true;
    } else {
      $terminate(this$static.root);
    }
  }
  function $throwIfTerminated(this$static) {
    if (this$static.root) {
      $throwIfTerminated(this$static.root);
    } else if (this$static.terminated) {
      throw toJs(new IllegalStateException());
    }
  }
  function TerminatableStream(previous) {
    if (!previous) {
      this.root = null;
      new ArrayList();
    } else {
      this.root = previous;
    }
  }
  defineClass(121, 1, {});
  _.terminated = false;
  var Ljava_util_stream_TerminatableStream_2_classLit = createForClass('java.util.stream', 'TerminatableStream', 121, Ljava_lang_Object_2_classLit);
  function $collect(this$static, collector) {
    var lastArg;
    return collector.finisher.apply_0($reduce(this$static, collector.supplier.get_2(), (lastArg = new StreamImpl$lambda$4$Type(collector), lastArg)));
  }
  function $map_0(this$static, mapper) {
    $throwIfTerminated(this$static);
    return new StreamImpl(this$static, new StreamImpl$MapToObjSpliterator(mapper, this$static.spliterator));
  }
  function $reduce(this$static, identity, accumulator) {
    var consumer;
    $terminate(this$static);
    consumer = new StreamImpl$ValueConsumer();
    consumer.value_0 = identity;
    this$static.spliterator.forEachRemaining(new StreamImpl$lambda$5$Type(consumer, accumulator));
    return consumer.value_0;
  }
  function StreamImpl(prev, spliterator) {
    TerminatableStream.call(this, prev);
    this.spliterator = spliterator;
  }
  function lambda$4(collector_0, a_1, t_2) {
    collector_0.accumulator.accept_0(a_1, t_2);
    return a_1;
  }
  function lambda$5(consumer_0, accumulator_1, item_2) {
    $accept(consumer_0, accumulator_1.apply_1(consumer_0.value_0, item_2));
  }
  defineClass(54, 121, {}, StreamImpl);
  var Ljava_util_stream_StreamImpl_2_classLit = createForClass('java.util.stream', 'StreamImpl', 54, Ljava_util_stream_TerminatableStream_2_classLit);
  function $lambda$0(this$static, action_1, u_1) {
    action_1.accept(this$static.map_0.apply_0(u_1));
  }
  function StreamImpl$MapToObjSpliterator(map_0, original) {
    Spliterators$AbstractSpliterator.call(this, original.estimateSize_0(), original.characteristics_0() & -6);
    checkCriticalNotNull(map_0);
    this.map_0 = map_0;
    this.original = original;
  }
  defineClass(124, 123, {}, StreamImpl$MapToObjSpliterator);
  _.tryAdvance = function tryAdvance_0(action) {
    return this.original.tryAdvance(new StreamImpl$MapToObjSpliterator$lambda$0$Type(this, action));
  };
  var Ljava_util_stream_StreamImpl$MapToObjSpliterator_2_classLit = createForClass('java.util.stream', 'StreamImpl/MapToObjSpliterator', 124, Ljava_util_Spliterators$AbstractSpliterator_2_classLit);
  function StreamImpl$MapToObjSpliterator$lambda$0$Type($$outer_0, action_1) {
    this.$$outer_0 = $$outer_0;
    this.action_1 = action_1;
  }
  defineClass(126, 1, {}, StreamImpl$MapToObjSpliterator$lambda$0$Type);
  _.accept = function accept_3(arg0) {
    $lambda$0(this.$$outer_0, this.action_1, arg0);
  };
  var Ljava_util_stream_StreamImpl$MapToObjSpliterator$lambda$0$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/MapToObjSpliterator/lambda$0$Type', 126, Ljava_lang_Object_2_classLit);
  function $accept(this$static, value_0) {
    this$static.value_0 = value_0;
  }
  function StreamImpl$ValueConsumer() {}
  defineClass(125, 1, {}, StreamImpl$ValueConsumer);
  _.accept = function accept_4(value_0) {
    $accept(this, value_0);
  };
  var Ljava_util_stream_StreamImpl$ValueConsumer_2_classLit = createForClass('java.util.stream', 'StreamImpl/ValueConsumer', 125, Ljava_lang_Object_2_classLit);
  function StreamImpl$lambda$4$Type(collector_0) {
    this.collector_0 = collector_0;
  }
  defineClass(127, 1, {}, StreamImpl$lambda$4$Type);
  _.apply_1 = function apply_12(arg0, arg1) {
    return lambda$4(this.collector_0, arg0, arg1);
  };
  var Ljava_util_stream_StreamImpl$lambda$4$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/lambda$4$Type', 127, Ljava_lang_Object_2_classLit);
  function $accept_0(this$static, arg0) {
    lambda$5(this$static.consumer_0, this$static.accumulator_1, arg0);
  }
  function StreamImpl$lambda$5$Type(consumer_0, accumulator_1) {
    this.consumer_0 = consumer_0;
    this.accumulator_1 = accumulator_1;
  }
  defineClass(128, 1, {}, StreamImpl$lambda$5$Type);
  _.accept = function accept_5(arg0) {
    $accept_0(this, arg0);
  };
  var Ljava_util_stream_StreamImpl$lambda$5$Type_2_classLit = createForClass('java.util.stream', 'StreamImpl/lambda$5$Type', 128, Ljava_lang_Object_2_classLit);
  function clone(array, toIndex) {
    var result;
    result = array.slice(0, toIndex);
    return stampJavaTypeInfo_0(result, array);
  }
  function copy(src_0, srcOfs, dest, destOfs, len) {
    var batchEnd, batchStart, destArray, end, spliceArgs;
    if (src_0 === dest) {
      src_0 = src_0.slice(srcOfs, srcOfs + len);
      srcOfs = 0;
    }
    destArray = dest;
    for (batchStart = srcOfs, end = srcOfs + len; batchStart < end;) {
      batchEnd = $wnd.Math.min(batchStart + 10000, end);
      len = batchEnd - batchStart;
      spliceArgs = src_0.slice(batchStart, batchEnd);
      spliceArgs.splice(0, 0, destOfs, 0);
      Array.prototype.splice.apply(destArray, spliceArgs);
      batchStart = batchEnd;
      destOfs += len;
    }
  }
  function insertTo(array, index_0, value_0) {
    array.splice(index_0, 0, value_0);
  }
  function insertTo_0(array, index_0, values) {
    copy(values, 0, array, index_0, values.length);
  }
  defineClass(182, 1, {});
  function stampJavaTypeInfo_1(array, referenceType) {
    return stampJavaTypeInfo_0(array, referenceType);
  }
  function checkCriticalArgument(expression, errorMessage) {
    if (!expression) {
      throw toJs(new IllegalArgumentException(errorMessage));
    }
  }
  function checkCriticalArgument_0(expression, errorMessageArgs) {
    if (!expression) {
      throw toJs(new IllegalArgumentException(format_0('Enum constant undefined: %s', errorMessageArgs)));
    }
  }
  function checkCriticalArrayType(expression) {
    if (!expression) {
      throw toJs(new ArrayStoreException());
    }
  }
  function checkCriticalElement(expression) {
    if (!expression) {
      throw toJs(new NoSuchElementException());
    }
  }
  function checkCriticalElementIndex(index_0, size_0) {
    if (index_0 < 0 || index_0 >= size_0) {
      throw toJs(new IndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
    }
  }
  function checkCriticalNotNull(reference) {
    if (reference == null) {
      throw toJs(new NullPointerException());
    }
    return reference;
  }
  function checkCriticalPositionIndex(index_0, size_0) {
    if (index_0 < 0 || index_0 > size_0) {
      throw toJs(new IndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
    }
  }
  function checkCriticalStringElementIndex(index_0, size_0) {
    if (index_0 < 0 || index_0 >= size_0) {
      throw toJs(new StringIndexOutOfBoundsException('Index: ' + index_0 + ', Size: ' + size_0));
    }
  }
  function checkCriticalType(expression) {
    if (!expression) {
      throw toJs(new ClassCastException());
    }
  }
  function format_0(template, args) {
    var builder, i, placeholderStart, templateStart;
    template = template;
    builder = new StringBuilder();
    templateStart = 0;
    i = 0;
    while (i < args.length) {
      placeholderStart = template.indexOf('%s', templateStart);
      if (placeholderStart == -1) {
        break;
      }
      $append_2(builder, template.substr(templateStart, placeholderStart - templateStart));
      $append_1(builder, args[i++]);
      templateStart = placeholderStart + 2;
    }
    $append_2(builder, template.substr(templateStart));
    if (i < args.length) {
      builder.string += ' [';
      $append_1(builder, args[i++]);
      while (i < args.length) {
        builder.string += ', ';
        $append_1(builder, args[i++]);
      }
      builder.string += ']';
    }
    return builder.string;
  }
  function setPropertySafe(map_0, key, value_0) {
    try {
      map_0[key] = value_0;
    } catch (ignored) {}
  }
  defineClass(179, 1, {});
  function getHashCode(o) {
    return o.$H || (o.$H = ++nextHashId);
  }
  var nextHashId = 0;
  function $clinit_StringHashCache() {
    $clinit_StringHashCache = emptyMethod;
    back_0 = new Object_0();
    front = new Object_0();
  }
  function compute(str) {
    var hashCode, i, n, nBatch;
    hashCode = 0;
    n = str.length;
    nBatch = n - 4;
    i = 0;
    while (i < nBatch) {
      hashCode = (checkCriticalStringElementIndex(i + 3, str.length), str.charCodeAt(i + 3) + (checkCriticalStringElementIndex(i + 2, str.length), 31 * (str.charCodeAt(i + 2) + (checkCriticalStringElementIndex(i + 1, str.length), 31 * (str.charCodeAt(i + 1) + (checkCriticalStringElementIndex(i, str.length), 31 * (str.charCodeAt(i) + 31 * hashCode)))))));
      hashCode = hashCode | 0;
      i += 4;
    }
    while (i < n) {
      hashCode = hashCode * 31 + $charAt(str, i++);
    }
    hashCode = hashCode | 0;
    return hashCode;
  }
  function getHashCode_0(str) {
    $clinit_StringHashCache();
    var hashCode, key, result;
    key = ':' + str;
    result = front[key];
    if (result != null) {
      return round_int((checkCriticalNotNull(result), result));
    }
    result = back_0[key];
    hashCode = result == null ? compute(str) : round_int((checkCriticalNotNull(result), result));
    increment();
    front[key] = hashCode;
    return hashCode;
  }
  function increment() {
    if (count_0 == 256) {
      back_0 = front;
      front = new Object_0();
      count_0 = 0;
    }
    ++count_0;
  }
  var back_0,
    count_0 = 0,
    front;
  var $entry = ($clinit_Impl(), entry_0);
  var gwtOnLoad = gwtOnLoad = gwtOnLoad_0;
  addInitFunctions(init);
  setGwtProperty('permProps', [[['locale', 'default'], ['user.agent', 'gecko1_8']], [['locale', 'default'], ['user.agent', 'safari']]]);
  if (observer) observer.onScriptLoad(gwtOnLoad);
}
;
function wrapper() {
  return new Promise(function (e, n) {
    observer || e('module loaded'), observer(e, n), linkModuleCode(e, n);
  });
}

/***/ }),

/***/ 702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ 878:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export init */
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(702);
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _generated_observer_observer_nocache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

if (!window.Promise || typeof window.Promise === "undefined") {
    es6_promise__WEBPACK_IMPORTED_MODULE_0___default().polyfill();
}

function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0,_generated_observer_observer_nocache__WEBPACK_IMPORTED_MODULE_1__/* .wrapper */ .Y)()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
init().then(function () {
    console.debug("%cObserver has loaded", "color:green;font-weight:bold");
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	!function() {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = function(name, initScope) {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = function(msg) {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = "observer";
/******/ 			var register = function(name, version, factory, eager) {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = function(id) {
/******/ 				var handleError = function(err) { warn("Initialization of sharing external failed: " + err); };
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = function(module) { return module && module.init && module.init(__webpack_require__.S[name], initScope); }
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(function() { return initPromises[name] = 1; });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(878);
/******/ 	
/******/ })()
;