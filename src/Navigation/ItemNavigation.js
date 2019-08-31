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
<<<<<<< HEAD
    // own events: focusin, focusout, updateui,
    // child events: child-focusin, child-focusout, child-updateui, child-action
=======
    // own events: cursorin, cursorout (this/item, direction, cursor)
    // child events: child_cursorin, child_cursorout, child_updateui
    // hit (direction, cursor)
    // updateui (this/item)
>>>>>>> 41cc32f992cde1fdf02b907c62295a39a72ab0c2
  }

  cursorIn(direction, cursor) {
    this.active = true;
<<<<<<< HEAD
    this.eventTrigger('focusin', [this, direction, cursor]);
=======
    this.triggerEvent('cursorin', [this, direction, cursor]);
    return this;
>>>>>>> 41cc32f992cde1fdf02b907c62295a39a72ab0c2
  }

  cursorOut(direction, cursor) {
    this.active = false;
<<<<<<< HEAD
    this.eventTrigger('focusout', [this, direction, cursor]);
  }

  uptadeUI(direction, cursor) {
    this.eventTrigger('updateui', [this, direction, cursor]);
  }

  eventTrigger(trigger, parameters = []) {
    this.events.trigger('updateui', parameters);
=======
    this.triggerEvent('cursorout', [this, direction, cursor]);
    return this;
  }

  uptadeUI() {
    this.triggerEvent('updateui', [this]);
    return this;
  }

  triggerEvent(trigger, parameters = []) {
    this.events.trigger(trigger, parameters);
>>>>>>> 41cc32f992cde1fdf02b907c62295a39a72ab0c2

    // parents propagation
    let level = 1;
    let parentIterator = this.parent;
    if (parentIterator == null) return;

    do {
      parentIterator.events.trigger(`child_${trigger}`, [level, ...parameters]);
      level += 1;
      parentIterator = parentIterator.parent;
    } while (parentIterator != null);
  }

<<<<<<< HEAD
  next(direction, item = null) {
    if (item != null) {
      // putting item
      this.neighborhood[`n${direction}`] = item;
    } 
    return this.neighborhood[`n${direction}`] || null;
  }

  action() {
    this.eventTrigger('action', []);
=======
  next(direction, item = null, directionReverse = null) {
    // if item passed, put it in direction
    if (item != null) this.neighborhood[`n${direction}`] = item;

    // if directionReverse put this in the position of item passed here
    if (directionReverse != null) item.next(directionReverse, this);

    return this.neighborhood[`n${direction}`] || null;
  }

  nextParentsRecursive(direction) {
    let prevParent = this.parent;
    let nextParent = null;

    do {
      // search for the next parent node
      nextParent = prevParent.next(direction);
      prevParent = prevParent.parent;
    } while (prevParent != null && nextParent == null);
    return [nextParent, prevParent];
  }

  firstChildRecursive() {
    let iteratorItem = this;
    while (iteratorItem.childs.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      [iteratorItem] = iteratorItem.childs;
    }
    return iteratorItem;
  }

  action() {
    this.triggerEvent('action', []);
>>>>>>> 41cc32f992cde1fdf02b907c62295a39a72ab0c2
  }
}

export default ItemNavigation;
