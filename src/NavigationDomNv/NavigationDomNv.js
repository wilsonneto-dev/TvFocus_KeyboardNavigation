import ItemNavigation from '../Navigation/ItemNavigation.js';
import CursorNavigation from '../Navigation/CursorNavigation.js';
import Directions from '../Navigation/Directions.js';

const NvDirections = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const KeyboardKeys = {
  ENTER: 13,
};

class NavigationDomNv {
  cursorNavigation;
  rootItemNavigation;

  constructor(uiRootElement) {
    this.cursorNavigation = new CursorNavigation();
    this.registerDomArrowKeysEvents();

    this.rootItemNavigation = new ItemNavigation();
    this.rootItemNavigation.ui = uiRootElement;

    let uiNavItems = this.extractElementsWithNvAttr(this.rootItemNavigation.ui);

    this.initNavigationByUiDomTags(uiNavItems, this.rootItemNavigation);
  }

  initNavigationByUiDomTags(uiNavItems, parentItem) {
    const parentNavigationDirection = this.getNvDirection(parentItem.ui);
    const backDirection =
      parentNavigationDirection === NvDirections.VERTICAL
        ? Directions.UP
        : Directions.LEFT;

    const nextDirection =
      parentNavigationDirection === NvDirections.VERTICAL
        ? Directions.DOWN
        : Directions.RIGHT;

    let lastItem;
    for (let uiNavItem of uiNavItems) {
      let currentNavItem = new ItemNavigation();
      currentNavItem.ui = uiNavItem;
      if (parentItem) {
        currentNavItem.parent = parentItem;
        parentItem.childs.push(currentNavItem);
      }

      if (lastItem) currentNavItem.next(backDirection, lastItem, nextDirection);
      lastItem = currentNavItem;

      if (this.isParent(currentNavItem.ui)) {
        let uiChildNavItems = this.extractElementsWithNvAttr(currentNavItem.ui);
        this.initNavigationByUiDomTags(uiChildNavItems, currentNavItem);
      }

      if (this.isItem(currentNavItem.ui)) {
        if (!this.cursorNavigation.currentItem) {
          this.cursorNavigation.currentItem = currentNavItem;
          this.cursorNavigation.currentItem.active = 1;
          this.cursorNavigation.currentItem.uptadeUI();
        }
      }
    }
  }

  registerDomArrowKeysEvents() {
    window.addEventListener('keydown', (e) => {
      // arrows
      if (e.keyCode >= Directions.LEFT && e.keyCode <= Directions.DOWN) {
        e.preventDefault();
        this.cursorNavigation.move(e.keyCode);
      }

      // enter
      if (e.keyCode === KeyboardKeys.ENTER) {
        e.preventDefault();
        this.cursorNavigation.currentItem.action();
      }
    });
  }

  extractElementsWithNvAttr(uiTargetElement) {
    let arrUiElements = [];
    uiTargetElement.childNodes.forEach((element) => {
      if (element.attributes)
        if (element.attributes['nv-parent'] || element.attributes['nv-item'])
          arrUiElements.push(element);
    });

    if (arrUiElements.length === 0) {
      console.log('** zeroooo');
      console.log(uiTargetElement);
      uiTargetElement.querySelectorAll('[nv-item]').forEach((element) => {
        if (element.attributes)
          if (element.attributes['nv-item']) arrUiElements.push(element);
      });
      console.log(arrUiElements);
    }
    return arrUiElements;
  }

  isParent(uiElement) {
    if (uiElement.attributes && uiElement.attributes['nv-parent']) return true;
    return false;
  }

  isItem(uiElement) {
    if (uiElement.attributes) if (uiElement.attributes['nv-item']) return true;
    return false;
  }

  getNvDirection(element) {
    if (element.attributes) {
      if (element.attributes['nv-direction']) {
        const nvDirection = element.attributes['nv-direction'].value;
        switch (nvDirection) {
          case NvDirections.HORIZONTAL:
            return NvDirections.HORIZONTAL;
            break;

          case NvDirections.VERTICAL:
            return NvDirections.VERTICAL;
            break;
        }
      }
    }

    // default horizontal
    return NvDirections.HORIZONTAL;
  }

  initEvents() {
    // update to first
    this.cursorNavigation.events.trigger('parents_moved', [
      this.cursorNavigation.currentItem.parent,
      null,
      this.cursorNavigation.currentItem,
      null,
      this.cursorNavigation,
      null,
    ]);

    this.cursorNavigation.events.trigger('moved', [
      this.cursorNavigation.currentItem,
      null,
      this.cursorNavigation,
      null,
    ]);
  }
}

export default NavigationDomNv;
