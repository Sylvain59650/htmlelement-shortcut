window.__SC = (function() {

  const keys = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    PAUSE: 19,
    CAPSLOCK: 20,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    META: 91,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLLLOCK: 145
  }

  let __registerEvents = [];

  function encodeShortcut(shortcutName) {
    shortcutName = shortcutName.toUpperCase();
    let humain = shortcutName;
    let ctrl = (shortcutName.indexOf("CTRL+") >= 0);
    let shift = (shortcutName.indexOf("SHIFT+") >= 0);
    let alt = (shortcutName.indexOf("ALT+") >= 0);
    let meta = (shortcutName.indexOf("META+") >= 0);
    shortcutName = shortcutName
      .replace("CTRL+", "")
      .replace("SHIFT+", "")
      .replace("ALT+", "")
      .replace("META+", "");
    let k = keys[shortcutName] || shortcutName.charCodeAt(0);
    return { ctrl: ctrl, alt: alt, shift: shift, meta: meta, key: k, humain: humain };
  }

  function __registerEvent(el, shortcutName, fn, propage) {
    let enc = encodeShortcut(shortcutName);
    enc.propage = propage;
    enc.fn = fn;
    enc.target = el;
    __registerEvents.push(enc);
  }

  function __unregisterEvent(el, shortcutName) {
    let humain = shortcutName.toUpperCase();
    for (let i = __registerEvents.length - 1; i >= 0; i--) {
      let sc = __registerEvents[i];
      if (sc.humain === humain && sc.target === el) {
        __registerEvents.splice(i, 1);
        el.off("keydown", sc.fn);
      }
    }
  }

  let __isPressing = false;

  function __reactivate() {
    window.setTimeout(() => { __isPressing = false; }, 50);
  }

  function __onkeydown(el, event) {
    let code = 0;
    if (event.keyCode) { code = event.keyCode; } else if (event.which) { code = event.which; }
    if (__isPressing) { return; }
    for (let e of __registerEvents) {
      if (e.target === el) {
        if (e.key === code && e.ctrl === event.ctrlKey &&
          e.alt === event.altKey &&
          (e.meta === event.metaKey) &&
          e.shift === event.shiftKey) {
          __isPressing = true;
          if (!e.propage) {
            event.stopPropagation();
            event.preventDefault();
          }
          e.fn();
          __reactivate();
          return;
        }
      }
    }
  }

  function __shortcut(el, shortcutName, fn, propage) {
    /*eslint-disable */
    el.on("keydown", function(e) { return __onkeydown(el, e) });
    /* eslint-enable */
    if (typeof propage === "undefined") {
      propage = true;
    }
    __registerEvent(el, shortcutName, fn, propage);
  }

  function __unshortcut(el, shortcutName) {
    __unregisterEvent(el, shortcutName);
  }

  return {
    shortcut: __shortcut,
    unshortcut: __unshortcut
  }

})();


HTMLElement.prototype.shortcut = function(shortcutName, fn, propage) {
  window.__SC.shortcut(this, shortcutName, fn, propage);
}

HTMLElement.prototype.unshortcut = function(shortcutName) {
  window.__SC.unshortcut(this, shortcutName);
}