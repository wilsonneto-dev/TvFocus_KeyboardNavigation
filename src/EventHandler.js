class EventHandler {
  constructor() {
    this.callbacks = [];
  }

  on(trigger, callback) {
    this.callbacks[trigger] = this.callbacks[trigger] || [];
    this.callbacks[trigger].push(callback);
  }

  trigger(trigger, parameters = []) {
    const callbacks = this.callbacks[trigger] || [];
    callbacks.forEach((f) => {
      f.bind(...parameters).call();
    });
  }
}

export default EventHandler;
