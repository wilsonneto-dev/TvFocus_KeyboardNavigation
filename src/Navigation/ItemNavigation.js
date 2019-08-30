/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import EventHandler from '../EventHandler/EventHandler.js';

class ItemNavigation {
  constructor() {
    this.parent = null;
    this.childs = [];
    this.neighborhood = [];

    this.active = false;
    this.ui = null;

    this.events = new EventHandler();
    // own events: focusin, focusout, updateui,
    // child events: child-focusin, child-focusout, child-updateui, child-action
  }

  focusIn(direction, cursor) {
    this.active = true;
    this.eventTrigger('focusin', [this, direction, cursor]);
  }

  focusOut(direction, cursor) {
    this.active = false;
    this.eventTrigger('focusout', [this, direction, cursor]);
  }

  uptadeUI(direction, cursor) {
    this.eventTrigger('updateui', [this, direction, cursor]);
  }

  eventTrigger(trigger, parameters = []) {
    this.events.trigger('updateui', parameters);

    let level = 1;
    let parentIterator = this.parent;

    do {
      parentIterator.events.trigger(`child-${trigger}`, [level, ...parameters]);
      level += 1;
      parentIterator = parentIterator.parent;
    } while (parentIterator != null);
  }

  next(direction, item = null) {
    if (item != null) {
      // putting item
      this.neighborhood[`n${direction}`] = item;
    } 
    return this.neighborhood[`n${direction}`] || null;
  }

  action() {
    this.eventTrigger('action', []);
  }
}

export default ItemNavigation;
