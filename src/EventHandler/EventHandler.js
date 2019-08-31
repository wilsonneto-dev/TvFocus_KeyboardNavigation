class EventHandler {
  constructor() {
    this.callbacks = [];
  }

  on(trigger, callback) {
    this.callbacks[trigger] = this.callbacks[trigger] || [];
    this.callbacks[trigger].push(callback);
  }

  trigger(trigger, parameters = []) {
<<<<<<< HEAD
    const callbacks = this.callbacks[trigger] || [];
    callbacks.forEach((f) => {
      f.bind(...parameters).call();
=======
    // console.log(trigger);
    const callbacks = this.callbacks[trigger] || [];
    callbacks.forEach((f) => {
      f.bind((parameters[0] || null), ...parameters).call();
>>>>>>> 41cc32f992cde1fdf02b907c62295a39a72ab0c2
    });
  }
}

export default EventHandler;
