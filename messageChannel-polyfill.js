// MessageChannel polyfill for Cloudflare Workers
(function() {
  'use strict';
  
  // Determine the global object
  var globalObj = (function() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof global !== 'undefined') return global;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    return {};
  })();

  // Only add polyfill if MessageChannel doesn't exist
  if (typeof globalObj.MessageChannel === 'undefined') {
    
    function MessageChannelPolyfill() {
      this.port1 = new MessagePortPolyfill();
      this.port2 = new MessagePortPolyfill();
      
      // Connect the ports
      this.port1._otherPort = this.port2;
      this.port2._otherPort = this.port1;
    }

    function MessagePortPolyfill() {
      this._otherPort = null;
      this.onmessage = null;
      this._listeners = new Map();
    }

    MessagePortPolyfill.prototype.postMessage = function(message) {
      var self = this;
      if (this._otherPort) {
        // Use setTimeout for async execution
        setTimeout(function() {
          var event = { 
            data: message,
            type: 'message',
            target: self._otherPort,
            currentTarget: self._otherPort
          };
          
          // Call onmessage handler if set
          if (self._otherPort.onmessage) {
            self._otherPort.onmessage(event);
          }
          
          // Call event listeners
          var listeners = self._otherPort._listeners.get('message') || [];
          listeners.forEach(function(listener) {
            try {
              listener(event);
            } catch (e) {
              console.error('MessagePort listener error:', e);
            }
          });
        }, 0);
      }
    };

    MessagePortPolyfill.prototype.start = function() {
      // No-op for compatibility
    };

    MessagePortPolyfill.prototype.close = function() {
      this._otherPort = null;
      this._listeners.clear();
    };

    MessagePortPolyfill.prototype.addEventListener = function(type, listener) {
      if (!this._listeners.has(type)) {
        this._listeners.set(type, []);
      }
      this._listeners.get(type).push(listener);
    };

    MessagePortPolyfill.prototype.removeEventListener = function(type, listener) {
      var listeners = this._listeners.get(type);
      if (listeners) {
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    };

    // Add to global object
    globalObj.MessageChannel = MessageChannelPolyfill;
    
    console.log('MessageChannel polyfill loaded');
  }
})();