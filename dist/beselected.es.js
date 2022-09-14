var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _pida = function() {
  let ObjProto = Object.prototype;
  let ArrayProto = Array.prototype;
  let toString = ObjProto.toString;
  let nativeIsArray = Array.isArray;
  let slice = ArrayProto.slice;
  let hasOwnProperty = ObjProto.hasOwnProperty;
  let navigator$1 = window.navigator;
  let document$1 = window.document;
  let userAgent = navigator$1.userAgent;
  let FuncProto = Function.prototype;
  let nativeBind = FuncProto.bind;
  let nativeForEach = ArrayProto.forEach;
  let nativeIndexOf = ArrayProto.indexOf;
  let breaker = {};
  const _ = {
    trim: function(str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
  };
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  _.isObject = function(obj) {
    return obj === Object(obj) && !_.isArray(obj);
  };
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };
  _.bind = function(func, context) {
    let args, bound;
    if (nativeBind && func.bind === nativeBind) {
      return nativeBind.apply(func, slice.call(arguments, 1));
    }
    if (!_.isFunction(func)) {
      throw new TypeError();
    }
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) {
        return func.apply(context, args.concat(slice.call(arguments)));
      }
      let ctor = {};
      ctor.prototype = func.prototype;
      let self = new ctor();
      ctor.prototype = null;
      let result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return self;
    };
    return bound;
  };
  _.bind_instance_methods = function(obj) {
    for (let func in obj) {
      if (typeof obj[func] === "function") {
        obj[func] = _.bind(obj[func], obj);
      }
    }
  };
  _.each = function(obj, iterator, context) {
    if (obj === null || obj === void 0) {
      return;
    }
    if (obj instanceof chainable) {
      _.each(obj.elements, iterator, context);
      return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
          return;
        }
      }
    } else {
      for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return;
          }
        }
      }
    }
  };
  _.extend = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
      for (let prop in source) {
        if (source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };
  _.isFunction = function(f) {
    try {
      return /^\s*\bfunction\b/.test(f);
    } catch (x) {
      return false;
    }
  };
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, "callee"));
  };
  _.toArray = function(iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (_.isArray(iterable)) {
      return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
      return slice.call(iterable);
    }
    return _.values(iterable);
  };
  _.values = function(obj) {
    let results = [];
    if (obj === null) {
      return results;
    }
    _.each(obj, function(value) {
      results[results.length] = value;
    });
    return results;
  };
  _.identity = function(value) {
    return value;
  };
  _.include = function(obj, target) {
    let found = false;
    if (obj === null) {
      return found;
    }
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
      return obj.indexOf(target) !== -1;
    }
    _.each(obj, function(value) {
      if (found || (found = value === target)) {
        return breaker;
      }
    });
    return found;
  };
  _.includes = function(str, needle) {
    return str.indexOf(needle) !== -1;
  };
  _.isEmptyObject = function(obj) {
    if (_.isObject(obj)) {
      for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
  _.isUndefined = function(obj) {
    return obj === void 0;
  };
  _.isString = function(obj) {
    return toString.call(obj) === "[object String]";
  };
  _.isDate = function(obj) {
    return toString.call(obj) === "[object Date]";
  };
  _.isNumber = function(obj) {
    return toString.call(obj) === "[object Number]";
  };
  _.timestamp = function() {
    Date.now = Date.now || function() {
      return +new Date();
    };
    return Date.now();
  };
  _.strip_empty_properties = function(p) {
    let ret = {};
    _.each(p, function(v, k) {
      if (_.isString(v) && v.length > 0) {
        ret[k] = v;
      }
    });
    return ret;
  };
  function getAllChildren(e2) {
    if (e2) {
      return e2.all ? e2.all : e2.getElementsByTagName("*");
    } else {
      return [];
    }
  }
  let bad_whitespace = /[\t\r\n]/g;
  function hasClass(elem, selector) {
    let className = " " + selector + " ";
    return (" " + elem.className + " ").replace(bad_whitespace, " ").indexOf(className) >= 0;
  }
  function getElementsBySelector(selector, root) {
    if (!window.document.getElementsByTagName) {
      return [];
    }
    let tokens = selector.split(" ");
    let token, bits, tagName, found, foundCount, i, j, k, elements, currentContextIndex;
    let currentContext;
    if (!root) {
      currentContext = [window.document];
    } else {
      if (_.isArray(root)) {
        currentContext = root;
      } else {
        currentContext = [root];
      }
    }
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i].replace(/^\s+/, "").replace(/\s+$/, "");
      if (token.indexOf("#") > -1) {
        bits = token.split("#");
        tagName = bits[0];
        let id = bits[1];
        let element = window.document.getElementById(id);
        if (!element || tagName && element.nodeName.toLowerCase() !== tagName) {
          return [];
        }
        currentContext = [element];
        continue;
      }
      if (token.indexOf(".") > -1) {
        bits = token.split(".");
        tagName = bits[0];
        let className = bits[1];
        if (!tagName) {
          tagName = "*";
        }
        found = [];
        foundCount = 0;
        for (j = 0; j < currentContext.length; j++) {
          if (tagName === "*") {
            elements = getAllChildren(currentContext[j]);
          } else {
            elements = currentContext[j].getElementsByTagName(tagName);
          }
          for (k = 0; k < elements.length; k++) {
            found[foundCount++] = elements[k];
          }
        }
        currentContext = [];
        currentContextIndex = 0;
        for (j = 0; j < found.length; j++) {
          if (found[j].className && _.isString(found[j].className) && hasClass(found[j], className)) {
            currentContext[currentContextIndex++] = found[j];
          }
        }
        continue;
      }
      let token_match = token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
      if (token_match) {
        tagName = token_match[1];
        let attrName = token_match[2];
        let attrOperator = token_match[3];
        let attrValue = token_match[4];
        if (!tagName) {
          tagName = "*";
        }
        found = [];
        foundCount = 0;
        for (j = 0; j < currentContext.length; j++) {
          if (tagName === "*") {
            elements = getAllChildren(currentContext[j]);
          } else {
            elements = currentContext[j].getElementsByTagName(tagName);
          }
          for (k = 0; k < elements.length; k++) {
            found[foundCount++] = elements[k];
          }
        }
        currentContext = [];
        currentContextIndex = 0;
        let checkFunction;
        switch (attrOperator) {
          case "=":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName) === attrValue;
            };
            break;
          case "~":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName).match(new RegExp("\\b" + attrValue + "\\b"));
            };
            break;
          case "|":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName).match(new RegExp("^" + attrValue + "-?"));
            };
            break;
          case "^":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName).indexOf(attrValue) === 0;
            };
            break;
          case "$":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName).lastIndexOf(attrValue) === e2.getAttribute(attrName).length - attrValue.length;
            };
            break;
          case "*":
            checkFunction = function(e2) {
              return e2.getAttribute(attrName).indexOf(attrValue) > -1;
            };
            break;
          default:
            checkFunction = function(e2) {
              return e2.getAttribute(attrName);
            };
        }
        currentContext = [];
        currentContextIndex = 0;
        for (j = 0; j < found.length; j++) {
          if (checkFunction(found[j])) {
            currentContext[currentContextIndex++] = found[j];
          }
        }
        continue;
      }
      tagName = token;
      found = [];
      foundCount = 0;
      for (j = 0; j < currentContext.length; j++) {
        elements = currentContext[j].getElementsByTagName(tagName);
        for (k = 0; k < elements.length; k++) {
          found[foundCount++] = elements[k];
        }
      }
      currentContext = found;
    }
    return currentContext;
  }
  class chainable {
    constructor(list) {
      __publicField(this, "elements", []);
      this.elements = list;
    }
    $(selector, root) {
      return _.$(selector, root);
    }
    attr(k, v) {
      if (arguments.length > 1) {
        for (let obj of this.elements) {
          obj.setAttribute(k, v);
        }
      } else {
        for (let obj of this.elements) {
          return obj.getAttribute(k);
        }
      }
    }
    html(data) {
      if (arguments.length === 0) {
        let results = [];
        for (let obj of this.elements) {
          results.push(obj.innerHTML);
        }
        return results.join("");
      } else {
        for (let obj of this.elements) {
          obj.innerHTML = data;
        }
      }
      return this;
    }
    text(data) {
      if (arguments.length === 0) {
        let results = [];
        for (let obj of this.elements) {
          results.push(obj.innerText);
        }
        return results.join("");
      } else {
        for (let obj of this.elements) {
          obj.innerText = data;
        }
      }
      return this;
    }
    hide(data) {
      for (let obj of this.elements) {
        obj.hidden = true;
        if (obj.style.display) {
          obj.setAttribute("data-old-display", obj.style.display);
          obj.style.display = "none";
        }
      }
      return this;
    }
    toggle() {
      for (let obj of this.elements) {
        if (obj.hidden) {
          $(obj).show();
        } else {
          $(obj).hide();
        }
      }
      return this;
    }
    show() {
      for (let obj of this.elements) {
        obj.hidden = false;
        if (obj.getAttribute("data-old-display")) {
          obj.style.display = obj.getAttribute("data-old-display");
        }
      }
      return this;
    }
    *[Symbol.iterator]() {
      for (let item of this.elements) {
        yield new chainable([item]);
      }
    }
    on(event, callback) {
      for (let item of this.elements) {
        _.addListener(item, event, callback);
      }
      return this;
    }
    val(data) {
      if (arguments.length === 0) {
        let results = [];
        for (let obj of this.elements) {
          results.push(obj.value);
        }
        return results.join("");
      } else {
        for (let obj of this.elements) {
          obj.value = data;
        }
      }
      return this;
    }
    addClass(klass) {
      for (let obj of this.elements) {
        obj.value.classList.add(klass);
      }
      return this;
    }
    removeClass(klass) {
      for (let obj of this.elements) {
        obj.value.classList.remove(klass);
      }
      return this;
    }
    each(callback, context) {
      _.each(this.elements, callback, context);
    }
  }
  _.$ = function(query, root) {
    if (_.isElement(query)) {
      return new chainable([query]);
    }
    if (!_.isString(query)) {
      throw Error("query must be string or HTMLElement");
    }
    if (root === void 0) {
      return new chainable(getElementsBySelector.call(this, query));
    }
    if (root instanceof chainable) {
      return new chainable(getElementsBySelector.call(this, query, root.elements));
    } else {
      return new chainable(getElementsBySelector.call(this, query, root));
    }
  };
  _.cookie = {
    get: function(name) {
      let nameEQ = name + "=";
      let ca = document$1.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function(name, value, days, cross_subdomain, is_secure) {
      let cdomain = "", expires = "", secure = "";
      if (cross_subdomain) {
        let matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i), domain = matches ? matches[0] : "";
        cdomain = domain ? "; domain=." + domain : "";
      }
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
        expires = "; expires=" + date.toGMTString();
      }
      if (is_secure) {
        secure = "; secure";
      }
      let new_cookie_val = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure;
      document$1.cookie = new_cookie_val;
      return new_cookie_val;
    }
  };
  _.info = {
    browser: function(user_agent, vendor, opera) {
      vendor = vendor || "";
      if (opera || _.includes(user_agent, " OPR/")) {
        if (_.includes(user_agent, "Mini")) {
          return "Opera Mini";
        }
        return "Opera";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
        return "BlackBerry";
      } else if (_.includes(user_agent, "IEMobile") || _.includes(user_agent, "WPDesktop")) {
        return "Internet Explorer Mobile";
      } else if (_.includes(user_agent, "Edge")) {
        return "Microsoft Edge";
      } else if (_.includes(user_agent, "FBIOS")) {
        return "Facebook Mobile";
      } else if (_.includes(user_agent, "Chrome")) {
        return "Chrome";
      } else if (_.includes(user_agent, "CriOS")) {
        return "Chrome iOS";
      } else if (_.includes(user_agent, "UCWEB") || _.includes(user_agent, "UCBrowser")) {
        return "UC Browser";
      } else if (_.includes(user_agent, "FxiOS")) {
        return "Firefox iOS";
      } else if (_.includes(vendor, "Apple")) {
        if (_.includes(user_agent, "Mobile")) {
          return "Mobile Safari";
        }
        return "Safari";
      } else if (_.includes(user_agent, "Android")) {
        return "Android Mobile";
      } else if (_.includes(user_agent, "Konqueror")) {
        return "Konqueror";
      } else if (_.includes(user_agent, "Firefox")) {
        return "Firefox";
      } else if (_.includes(user_agent, "MSIE") || _.includes(user_agent, "Trident/")) {
        return "Internet Explorer";
      } else if (_.includes(user_agent, "Gecko")) {
        return "Mozilla";
      } else {
        return "";
      }
    },
    browserVersion: function(userAgent2, vendor, opera) {
      let browser = _.info.browser(userAgent2, vendor, opera);
      let versionRegexs = {
        "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
        "Microsoft Edge": /Edge\/(\d+(\.\d+)?)/,
        "Chrome": /Chrome\/(\d+(\.\d+)?)/,
        "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
        "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
        "Safari": /Version\/(\d+(\.\d+)?)/,
        "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
        "Opera": /(Opera|OPR)\/(\d+(\.\d+)?)/,
        "Firefox": /Firefox\/(\d+(\.\d+)?)/,
        "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
        "Konqueror": /Konqueror:(\d+(\.\d+)?)/,
        "BlackBerry": /BlackBerry (\d+(\.\d+)?)/,
        "Android Mobile": /android\s(\d+(\.\d+)?)/,
        "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
        "Mozilla": /rv:(\d+(\.\d+)?)/
      };
      let regex = versionRegexs[browser];
      if (regex === void 0) {
        return null;
      }
      let matches = userAgent2.match(regex);
      if (!matches) {
        return null;
      }
      return parseFloat(matches[matches.length - 2]);
    },
    os: function() {
      let a = userAgent;
      if (/Windows/i.test(a)) {
        if (/Phone/.test(a) || /WPDesktop/.test(a)) {
          return "Windows Phone";
        }
        return "Windows";
      } else if (/(iPhone|iPad|iPod)/.test(a)) {
        return "iOS";
      } else if (/Android/.test(a)) {
        return "Android";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
        return "BlackBerry";
      } else if (/Mac/i.test(a)) {
        return "Mac OS X";
      } else if (/Linux/.test(a)) {
        return "Linux";
      } else {
        return "";
      }
    },
    referringDomain: function(referrer) {
      let split = referrer.split("/");
      if (split.length >= 3) {
        return split[2];
      }
      return "";
    },
    properties: function() {
      let ref = document$1.referrer;
      if (ref.length > 255) {
        ref = ref.substring(0, 255);
      }
      return _.extend(_.strip_empty_properties({
        "os": _.info.os(),
        "browser": _.info.browser(userAgent, navigator$1.vendor, window.opera),
        "referrer": ref
      }), {
        "current_url": window.location.href,
        "browser_version": _.info.browserVersion(userAgent, navigator$1.vendor, window.opera)
      });
    }
  };
  _.addListener = function() {
    let register_single_event = function(element, type, handler, oldSchool, useCapture) {
      if (!element) {
        console$1.error("No valid element provided to register_single_event");
        return;
      }
      if (element.addEventListener && !oldSchool) {
        element.addEventListener(type, handler, !!useCapture);
      } else {
        let ontype = "on" + type;
        let old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler);
      }
    };
    function makeHandler(element, new_handler, old_handlers) {
      return function(event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return void 0;
        }
        let ret = true;
        let old_result, new_result;
        if (_.isFunction(old_handlers)) {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        if (old_result === false || new_result === false) {
          ret = false;
        }
        return ret;
      };
    }
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
      }
      return event;
    }
    fixEvent.preventDefault = function() {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
      this.cancelBubble = true;
    };
    return function(element, type, handler, oldSchool, useCapture) {
      if (_.isElement(element)) {
        register_single_event(element, type, handler, oldSchool, useCapture);
      } else if (_.isArray(element)) {
        _.each(element, (item) => {
          register_single_event(item, type, handler, oldSchool, useCapture);
        });
      }
    };
  }();
  let ie = !!(window.attachEvent && !window.opera);
  let wk = /webkit\/(\d+)/i.test(navigator.userAgent) && RegExp.$1 < 525;
  let fn = [];
  let run = function() {
    for (let i = 0; i < fn.length; i++)
      fn[i]();
  };
  let d = document;
  _.onDomReady = (f) => {
    if (!ie && !wk && d.addEventListener) {
      return d.addEventListener("DOMContentLoaded", f, false);
    }
    if (fn.push(f) > 1) {
      return;
    }
    if (ie) {
      (function() {
        try {
          d.documentElement.doScroll("left");
          run();
        } catch (err) {
          setTimeout(arguments.callee, 10);
        }
      })();
    } else if (wk) {
      let t = setInterval(function() {
        if (/^(loaded|complete)$/.test(d.readyState))
          clearInterval(t), run();
      }, 10);
    }
  };
  _.jshook = {
    "pida_hooks": {},
    "add": function(hook_type, func) {
      _.jshook["pida_hooks"][hook_type] = func;
    },
    "init": function() {
      _.addListener(document.body, "click", function(e2) {
        e2 = e2 || window.event;
        try {
          let hook_name = e2.target.getAttribute("data-pida-hook");
          if (hook_name && _.jshook["pida_hooks"][hook_name]) {
            _.jshook["pida_hooks"][hook_name].apply(e2.target);
            return false;
          }
        } catch (ex) {
          console.log("unknown error" + ex);
        }
      }, false, true);
    }
  };
  const initXhr = (options, resolve, reject) => {
    if (!options) {
      options = {};
    }
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.withCredentials = options.withCredentials || false;
    xhr.timeout = options.timeout || 10 * 1e3;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            let json = JSON.parse(xhr.responseText);
            resolve && resolve.call(xhr, json);
          } catch (err) {
            resolve && resolve.call(err);
          }
        } else {
          reject.call(xhr, "status not 200");
        }
      }
    };
    xhr.onerror = function(e2) {
      reject.call(xhr, e2);
    };
    if (options.on) {
      for (let idx of ["abort", "load", "loaded", "loadstart", "progress", "timeout"]) {
        if (options.on[idx]) {
          xhr["on" + idx] = options.on[idx];
        }
      }
    }
    return xhr;
  };
  _.post = (url, options, data) => {
    console.log("try post data ");
    console.log(data);
    return new Promise((resolve, reject) => {
      let xhr = initXhr(options, resolve, reject);
      xhr.open("POST", url);
      if (options.headers) {
        _.each(options.headers, (item, name2) => {
          xhr.setRequestHeader(name2, options.headers[name2]);
        });
      }
      let name = "Object";
      try {
        name = Object.prototype.toString.call(data).match(/\[object (.*?)\]/)[1];
      } catch (e2) {
      }
      if (_.isString(data) || name === "FormData") {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
  _.get = (url, options) => {
    return new Promise((resolve, reject) => {
      let xhr = initXhr(options, resolve, reject);
      xhr.open("GET", url);
      if (options.headers) {
        _.each(options.headers, (item, name) => {
          xhr.setRequestHeader(name, options.headers[name]);
        });
      }
      xhr.send();
    });
  };
  _.chainable = chainable;
  return _;
}();
var index = () => {
  let obj = {
    selectedText: ""
  };
  let rootId = "b-drag-div";
  let u = false, q, p;
  const stopProp = (a) => {
    a = a || e.event || {};
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = true;
  };
  const loadStyle = (a) => {
    let b = document.createElement("style");
    b.setAttribute("type", "text/css");
    b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));
    console.log(b);
    document.getElementsByTagName("head")[0].appendChild(b);
  };
  const defaultSetup = () => {
    let a;
    let o = "Gotapi.net\u63D0\u4F9B\u5212\u8BCD\u652F\u6301";
    let d = a * 36;
    let e2 = 16 * (o.length + 1) + 16;
    a = "#" + rootId + " {position:absolute;background-color:#fff;*display:inline;zoom:1;display:inline-block;display:none;}\n";
    a += ".gotapi-drag-wrapper {padding:2px 10px;border:2px solid rgb(8,63,12);border-radius:8px;overflow:hidden;width:" + Math.min(d, e2) + "px;}\n";
    a += ".gotapi-drag-wrapper .gotapi-bottom { border-top:1px solid #e9e9e9;text-indent:2em;height:25px;*height:18px;font-size:15px;padding:2px;color:#aaa; }";
    a += ".gotapi-drag-arrow {position:absolute;margin:-4px 40px;width:10px;height:5px;background:url(/assets/arrow.gif) no-repeat;}\n";
    a += ".gotapi-drag-wrapper .gotapicaptain {display:block;background:#fff;overflow:hidden;height:25px;*height:18px;font-size:15px;}\n";
    a += ".gotapi-drag-wrapper .gotapicaptain span {float:left;}\n";
    a += ".gotapi-drag-wrapper .gotapicaptain .gpclose {cursor:pointer;float:right;font-family:Arial,\u5B8B\u4F53,sans-serif;font-weight:bold;width:22px;height:22px;text-align:center;position:relative;right:2px;top:2px;}\n";
    a += ".gotapi-drag-wrapper .gotapi-list {height:40px;margin-top:5px;}\n";
    a += ".gotapi-drag-wrapper .gotapi-list .listitem {float:left;height:30px;width:34px;margin:0 1px;padding:5px 0 0;cursor:pointer;text-align:center;list-style:none;zoom:1;vertical-align:top;}\n";
    a += ".gotapi-drag-wrapper .gotapi-list .listitem:hover {border-radius:3px;background-color:#e9e9e9;}\n";
    a += ".gotapi-drag-wrapper .gotapi-list .gotapiicon {width:24px;height:24px;margin:0 auto;display:block;}\n";
    a += ".gotapi-drag-wrapper .gotapi-popup-content { padding-top:15px; \n}";
    loadStyle(a);
    _pida.addListener(document.body, "click", (evt) => {
      if (evt.target.getAttribute("data-close")) {
        let target = evt.target.getAttribute("data-target");
        console.log(_pida.$("#" + target));
        try {
          obj.shown = false;
          _pida.$("#" + target).hide();
        } catch (e3) {
        }
      }
    });
  };
  const defaultLeftHandler = () => {
    let c = '<div class="gotapi-list">';
    c = c + '<span class="gotapi-drag-arrow BSHARE_IMAGE_NO"></span>';
    c = c + '<div class="gotapi-drag-wrapper">';
    c = c + '<div class="gotapicaptain"><a class="gpclose" title="close" ><img data-close="true" src="https://static.yuanfenxi.com/gshare/close.svg" widht="22" height="22" class="data-close-popup" data-target="' + rootId + '"/></a></div>';
    c += "<div class='gotapi-popup-content'>";
    return c;
  };
  const defaultRightHandler = () => {
    return '</div><div class="gotapi-bottom"><span>Gotapi\u63D0\u4F9B\u5212\u8BCD\u652F\u6301...</span></div></div></div>';
  };
  const defaultMainHandler = (selectedText) => {
    return "\u8FD9\u662F\u4E00\u6BB5\u9700\u8981\u81EA\u5B9A\u4E49\u7684\u6587\u5B57";
  };
  const position = (a) => {
    return {
      left: a.pageX || a.clientX + eventCallbacks.scrollLeft - eventCallbacks.clientLeft,
      top: a.pageY || a.clientY + eventCallbacks.scrollTop - eventCallbacks.clientTop
    };
  };
  const getSelectText = () => {
    let selectedText = "";
    if (window.getSelection) {
      selectedText = window.getSelection().toString();
    } else if (document.getSelection) {
      selectedText = document.getSelection();
    } else if (document.selection)
      try {
        selectedText = document.selection.createRange().text;
      } catch (c) {
      }
    return selectedText;
  };
  const eventCallbacks = {
    onmousedown: function(a) {
      p = position(a || window.event);
    },
    onmouseup: function(event) {
      event = event || window.event;
      q = position(event);
      if (!p || !q || p.left !== q.left || p.top !== q.top) {
        u = true;
      }
      let selectedText = getSelectText();
      if (selectedText.length !== 0 && u && !obj.shown) {
        let point = position(event);
        obj.selectedText = selectedText;
        setTimeout(function() {
          defaultPopupCallback(point);
          obj.options.popupCallback(point);
          obj.shown = true;
        }, 100);
        u = false;
        stopProp(event);
      }
    }
  };
  const getHTML = () => {
    let options = obj.options;
    return options.leftHandler(options) + options.mainHandler(options, getSelectText()) + options.rightHandler(options);
  };
  const defaultPopupCallback = (point) => {
    let j = document.getElementById(rootId);
    j.style.top = point.top + 15 + "px";
    j.style.left = point.left - 40 + "px";
    j.style.display = "inline-block";
  };
  const getPopupElement = () => {
    return document.getElementById(rootId);
  };
  const setup = (options) => {
    if (!options.setupHandler) {
      options.setupHandler = defaultSetup;
    }
    if (!options.mainHandler) {
      options.mainHandler = defaultMainHandler;
    }
    if (!options.leftHandler) {
      options.leftHandler = defaultLeftHandler;
    }
    if (!options.rightHandler) {
      options.rightHandler = defaultRightHandler;
    }
    if (!options.popupCallback) {
      options.popupCallback = defaultPopupCallback;
    }
    if (!options.trigger) {
      options.trigger = ".gotapi-share";
    }
    console.log(options);
    options.setupHandler(options);
    obj.options = options;
    let html = getHTML();
    let j = document.getElementById(rootId);
    if (!j) {
      j = document.createElement("div");
      j.innerHTML = html;
      j.setAttribute("id", rootId);
      document.body.appendChild(j);
    }
    _pida.$(options.trigger).on("mousedown", eventCallbacks.onmousedown);
    _pida.$(options.trigger).on("mouseup", eventCallbacks.onmouseup);
  };
  obj.defaultSetup = defaultSetup;
  obj.defaultLeftHandler = defaultLeftHandler;
  obj.defaultMainHandler = defaultMainHandler;
  obj.defaultRightHandler = defaultRightHandler;
  obj.defaultPopupCallback = defaultPopupCallback;
  obj.getPopupElement = getPopupElement;
  obj.getHtml = getHTML;
  obj.init = setup;
  obj.loadStyle = loadStyle;
  return obj;
};
export { index as default };
