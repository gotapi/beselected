var is$1 = {};
(function(exports) {
  exports.node = function(value) {
    return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
  };
  exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);
    return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports.node(value[0]));
  };
  exports.string = function(value) {
    return typeof value === "string" || value instanceof String;
  };
  exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);
    return type === "[object Function]";
  };
})(is$1);
var DOCUMENT_NODE_TYPE = 9;
if (typeof Element !== "undefined" && !Element.prototype.matches) {
  var proto = Element.prototype;
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}
function closest$1(element, selector) {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof element.matches === "function" && element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
}
var closest_1 = closest$1;
var closest = closest_1;
function _delegate(element, selector, type, callback, useCapture) {
  var listenerFn = listener.apply(this, arguments);
  element.addEventListener(type, listenerFn, useCapture);
  return {
    destroy: function() {
      element.removeEventListener(type, listenerFn, useCapture);
    }
  };
}
function delegate$1(elements, selector, type, callback, useCapture) {
  if (typeof elements.addEventListener === "function") {
    return _delegate.apply(null, arguments);
  }
  if (typeof type === "function") {
    return _delegate.bind(null, document).apply(null, arguments);
  }
  if (typeof elements === "string") {
    elements = document.querySelectorAll(elements);
  }
  return Array.prototype.map.call(elements, function(element) {
    return _delegate(element, selector, type, callback, useCapture);
  });
}
function listener(element, selector, type, callback) {
  return function(e2) {
    e2.delegateTarget = closest(e2.target, selector);
    if (e2.delegateTarget) {
      callback.call(element, e2);
    }
  };
}
var delegate_1 = delegate$1;
var is = is$1;
var delegate = delegate_1;
function listen(target, type, callback) {
  if (!target && !type && !callback) {
    throw new Error("Missing required arguments");
  }
  if (!is.string(type)) {
    throw new TypeError("Second argument must be a String");
  }
  if (!is.fn(callback)) {
    throw new TypeError("Third argument must be a Function");
  }
  if (is.node(target)) {
    return listenNode(target, type, callback);
  } else if (is.nodeList(target)) {
    return listenNodeList(target, type, callback);
  } else if (is.string(target)) {
    return listenSelector(target, type, callback);
  } else {
    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
  }
}
function listenNode(node, type, callback) {
  node.addEventListener(type, callback);
  return {
    destroy: function() {
      node.removeEventListener(type, callback);
    }
  };
}
function listenNodeList(nodeList, type, callback) {
  Array.prototype.forEach.call(nodeList, function(node) {
    node.addEventListener(type, callback);
  });
  return {
    destroy: function() {
      Array.prototype.forEach.call(nodeList, function(node) {
        node.removeEventListener(type, callback);
      });
    }
  };
}
function listenSelector(selector, type, callback) {
  return delegate(document.body, selector, type, callback);
}
var listen_1 = listen;
var index = () => {
  let obj = {
    selectedText: ""
  };
  let rootId = "b-drag-div";
  let E = "bsMorePanelHolder";
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
    listen_1(document.body, "click", (evt) => {
      if (evt.target.getAttribute("data-close")) {
        let target = evt.target.getAttribute("data-target");
        try {
          let node = document.getElementById(target);
          console.log(node);
          node.style.display = "none";
        } catch (e3) {
        }
      }
    });
  };
  const defaultLeftHandler = () => {
    let c = '<div class="gotapi-list">';
    c = c + '<span class="gotapi-drag-arrow BSHARE_IMAGE_NO"></span>';
    c = c + '<div class="gotapi-drag-wrapper">';
    c = c + '<div class="gotapicaptain"><a class="gpclose" title="close" ><img data-close="true" src="/assets/close.svg" widht="22" height="22" class="data-close-popup" data-target="' + rootId + '"/></a></div>';
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
      console.log("mousedown");
      p = position(a || window.event);
    },
    onmouseup: function(event) {
      console.log("mouse up ");
      event = event || window.event;
      q = position(event);
      if (!p || !q || p.left !== q.left || p.top !== q.top) {
        u = true;
      }
      let selectedText = getSelectText();
      console.log("selectedText" + selectedText);
      if (selectedText.length !== 0 && u) {
        let point = position(event);
        obj.selectedText = selectedText;
        setTimeout(function() {
          defaultPopupCallback(point);
          obj.options.popupCallback(point);
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
    listen_1(".gotapi_share", "mousedown", eventCallbacks.onmousedown);
    listen_1(".gotapi_share", "mouseup", eventCallbacks.onmouseup);
    listen_1(document.body, "mouseup", (a) => {
      a = a || window.event;
      for (a = a.srcElement || a.target; a; ) {
        if (a.id === rootId || a.id === E)
          return;
        a = a.parentNode;
      }
      j.style.display = "none";
    });
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
