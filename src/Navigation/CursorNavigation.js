/* eslint-disable import/extensions */
// eslint-disable-next-line no-unused-vars
import Directions from './Directions';
import EventHandler from '../EventHandler/EventHandler.js';

class CursorNavigation {
  constructor() {
    this.currentItem = null;
    this.events = new EventHandler();
  }

  move(direction) {
    this.events.trigger('move', [this, direction, this.currentItem])
    return this.navItem;
  }
}

export default CursorNavigation;
