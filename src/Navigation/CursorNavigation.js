/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import EventHandler from '../EventHandler/EventHandler.js';

class CursorNavigation {
  constructor() {
    this.currentItem = null;
    this.events = new EventHandler();
    // events: moved (nextItem, prevItem, cursor/this, direction)
    // events: parents_moved (nextParent, prevParent, nextItem, prevItem, cursor/this, direction)
    // events: hit (currentItem, direction)
  }

  move(direction) {
    const prevItem = this.currentItem;
    let nextItem = this.currentItem.next(direction);

    if (nextItem === null) {
      // search a parent that has a next element in this direction
      const [nextParent, prevParent] = prevItem.nextParentsRecursive(direction);

      if (nextParent != null) nextItem = nextParent.firstChildRecursive();

      if (nextItem != null) {
        nextParent.active = true;
        prevParent.active = false;
        // parents trigers
        nextParent.cursorIn(direction, this).uptadeUI();
        prevParent.cursorOut(direction, this).uptadeUI();
        this.events.trigger('parents_moved', [
          nextParent,
          prevParent,
          nextItem,
          prevItem,
          this,
          direction,
        ]);
      }
    }

    if (nextItem !== null) {
      nextItem = nextItem.firstChildRecursive();
      // eslint-disable-next-line no-use-before-define
      this.currentItem = nextItem;
      prevItem.active = false;
      nextItem.active = true;
      // trigger events
      prevItem.cursorOut(direction, this).uptadeUI();
      nextItem.cursorIn(direction, this).uptadeUI();
      this.events.trigger('moved', [nextItem, prevItem, this, direction]);
    } else {
      // if dont find the next node, trigger a hit event and return false
      this.events.trigger('hit', [prevItem, direction]);
      this.currentItem.triggerEvent('hit', [direction, this]);
    }
  }
}

export default CursorNavigation;
