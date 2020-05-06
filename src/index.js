/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import ItemNavigation from './Navigation/ItemNavigation.js';
import CursorNavigation from './Navigation/CursorNavigation.js';
import Directions from './Navigation/Directions.js';

const cursorNavigation = new CursorNavigation();

// setting up navigation controllers
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    e.preventDefault();
    cursorNavigation.move(e.keyCode);
  }

  if (e.keyCode == 13) {
    e.preventDefault();
    cursorNavigation.currentItem.action();
  }
});

// settings in UI
const parentListFooter = new ItemNavigation();
parentListFooter.ui = document.querySelector('.parent-list-footer');

let lastItem = null;
parentListFooter.ui.querySelectorAll('.item').forEach((itemUI) => {
  const item = new ItemNavigation();
  parentListFooter.childs.push(item);
  item.parent = parentListFooter;
  item.ui = itemUI;
  if (lastItem != null) item.next(Directions.LEFT, lastItem, Directions.RIGHT);
  lastItem = item;
});

// initializing
parentListFooter.active = 1;
[cursorNavigation.currentItem] = parentListFooter.childs;
cursorNavigation.currentItem.active = 1;
cursorNavigation.currentItem.uptadeUI();

cursorNavigation.events.on('moved', (currentItem, prevItem) => {
  currentItem.ui.classList.add('active');
  prevItem.ui.classList.remove('active');
  // currentItem.parent.ui.style.backgroundColor = '#909090';
});
