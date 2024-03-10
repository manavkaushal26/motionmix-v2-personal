class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  // on or the subscribe method
  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => {
        callback(data);
      });
    } else {
      throw new Error("no listeners implemented for this process");
    }
  }
  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== callback
      );
    }
  }
}

const emitter = new EventEmitter();
export default emitter;
