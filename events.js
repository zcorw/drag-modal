class Events {
  constructor() {
    this.events = {};
  }
  addEventListener(type, callback) {
    if (!this.events[type]) this.events[type] = [];
    this.events[type].push(callback);
  }
  removeEventListener(type, callback) {
    if (!this.events[type]) return;
    const index = this.events[type].indexOf(callback);
    if (index > -1) {
      this.events[type].splice(index, 1);
    }
  }
  dispatchEvent(type, data) {
    if (!this.events[type]) return;
    this.events[type].forEach(callback => {
      callback(data);
    });
  }
  removeAllEventListener() {
    this.events = {};
  }  
}

export default Events;