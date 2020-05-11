import NavigationDomNv from './NavigationDomNv/NavigationDomNv.js';

const documentNavigation = new NavigationDomNv(document.body);

documentNavigation.cursorNavigation.events.on(
  'moved',
  (currentItem, prevItem) => {
    currentItem.ui.classList.add('nv-active');
    prevItem?.ui.classList.remove('nv-active');
  }
);

documentNavigation.cursorNavigation.events.on(
  'parents_moved',
  (_, __, currentItem, prevItem) => {
    if (currentItem.parent) {
      currentItem.parent.ui.classList.add('nv-active');
    }
    if (prevItem && prevItem.parent) {
      prevItem.parent.ui.classList.remove('nv-active');
    }
  }
);

documentNavigation.initEvents();
