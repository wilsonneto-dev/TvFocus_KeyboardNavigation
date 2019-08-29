/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import EventHandler from './EventHandler.js';

class ItemNavigation {
  constructor() {
    this.parent = null;
    this.childs = [];
    this.neighborhood = [];

    this.active = false;
    this.ui = null;

    this.events = new EventHandler();
    // own events: focusin, focusout, updateui
    // child events: child-focusin, child-focusout, child-updateui
  }

  focusIn(direction, cursor) {
    this.active = true;
    this.events.trigger('focusin', [this, direction, cursor]);
  }

  focusOut(direction, cursor) {
    this.active = false;
    this.events.trigger('focusout', [this, direction, cursor]);
  }

  uptadeUI() {
    this.executeCallbacksInArray(this.onUpdateUiCallbacks);
    this.events.trigger('updateui', []);
  }

  triggerEvent(trigger, parameters = []) {
    this.events.trigger('updateui', parameters);

    let level = 1;
    let parentIterator = this.parent;

    do {
      parentIterator.events.trigger(`child-${trigger}`, [level, ...parameters]);
      level += 1;
      parentIterator = parentIterator.parent;
    } while (parentIterator != null);
  }

  next() {
    return 'next...';
  }

  action() {
    return 'action...';
  }
}

export default ItemNavigation;
