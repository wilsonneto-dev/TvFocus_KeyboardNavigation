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
    // own events: cursorin, cursorout (this/item, direction, cursor)
    // child events: child_cursorin, child_cursorout, child_updateui
    // hit (direction, cursor)
    // updateui (this/item)
  }

  cursorIn(direction, cursor) {
    this.active = true;
    this.triggerEvent('cursorin', [this, direction, cursor]);
    return this;
  }

  cursorOut(direction, cursor) {
    this.active = false;
    this.triggerEvent('cursorout', [this, direction, cursor]);
    return this;
  }

  uptadeUI() {
    this.triggerEvent('updateui', [this]);
    return this;
  }

  triggerEvent(trigger, parameters = []) {
    this.events.trigger('updateui', parameters);

    let level = 1;
    let parentIterator = this.parent;

    do {
      parentIterator.events.trigger(`child_${trigger}`, [level, ...parameters]);
      level += 1;
      parentIterator = parentIterator.parent;
    } while (parentIterator != null);
  }

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
      prevParent = prevParent.parent;
      nextParent = prevParent.next(direction);
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
  }
}

export default ItemNavigation;
