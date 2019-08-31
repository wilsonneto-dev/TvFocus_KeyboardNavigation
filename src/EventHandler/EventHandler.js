class EventHandler {
  constructor() {
    this.callbacks = [];
  }

  on(trigger, callback) {
    this.callbacks[trigger] = this.callbacks[trigger] || [];
    this.callbacks[trigger].push(callback);
  }

  trigger(trigger, parameters = []) {
    // console.log(trigger);
    const callbacks = this.callbacks[trigger] || [];
    callbacks.forEach((f) => {
      f.bind((parameters[0] || null), ...parameters).call();
    });
  }
}

export default EventHandler;
