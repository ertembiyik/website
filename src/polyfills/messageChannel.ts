// MessageChannel polyfill for environments that don't support it (browser + Workers)

// Determine the global object
const globalObj = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
  return {};
})();

// Only add polyfill if MessageChannel doesn't exist
if (typeof (globalObj as any).MessageChannel === 'undefined') {
  // Simple MessageChannel polyfill using setTimeout/setImmediate
  class MessageChannelPolyfill {
    port1: any;
    port2: any;

    constructor() {
      this.port1 = new MessagePortPolyfill();
      this.port2 = new MessagePortPolyfill();
      
      // Connect the ports
      this.port1._otherPort = this.port2;
      this.port2._otherPort = this.port1;
    }
  }

  class MessagePortPolyfill {
    _otherPort: MessagePortPolyfill | null = null;
    onmessage: ((event: any) => void) | null = null;
    _listeners: Map<string, Function[]> = new Map();

    postMessage(message: any): void {
      if (this._otherPort) {
        // Use setImmediate if available (Node.js-like), otherwise setTimeout
        const scheduleCallback = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
        
        scheduleCallback(() => {
          const event = { 
            data: message,
            type: 'message',
            target: this._otherPort,
            currentTarget: this._otherPort
          };
          
          // Call onmessage handler if set
          if (this._otherPort!.onmessage) {
            this._otherPort!.onmessage(event);
          }
          
          // Call event listeners
          const listeners = this._otherPort!._listeners.get('message') || [];
          listeners.forEach(listener => {
            try {
              listener(event);
            } catch (e) {
              console.error('MessagePort listener error:', e);
            }
          });
        });
      }
    }

    start(): void {
      // No-op for compatibility
    }

    close(): void {
      this._otherPort = null;
      this._listeners.clear();
    }

    addEventListener(type: string, listener: Function): void {
      if (!this._listeners.has(type)) {
        this._listeners.set(type, []);
      }
      this._listeners.get(type)!.push(listener);
    }

    removeEventListener(type: string, listener: Function): void {
      const listeners = this._listeners.get(type);
      if (listeners) {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }
  }

  // Add to global object
  (globalObj as any).MessageChannel = MessageChannelPolyfill;
  
  // For environments that expect it on the global scope
  if (typeof global !== 'undefined') {
    (global as any).MessageChannel = MessageChannelPolyfill;
  }
}