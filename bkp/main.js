var index = 0;
const KEY_RIGHT = 39, KEY_LEFT = 37;

window.addEventListener('load', () => {

});

window.addEventListener('click', (ev) => {
    let elm_index = Array.from(ev.target.parentNode.childNodes).indexOf(ev.target);
    index = --elm_index;
    window.UI();
} );

window.addEventListener('keydown', (ev) => {
    switch (ev.keyCode) {
        case KEY_RIGHT:
            ev.preventDefault();
            index++;
            break;
        case KEY_LEFT:
            ev.preventDefault();
            index--;
            break;
    }
    console.log(index);
    window.UI();
});

window.UI = () => {
    uiList = document.getElementById("list");
    uiItems = uiList.getElementsByTagName("div");
    
    uiLastActive = document.getElementsByClassName("active");
    if(uiLastActive && uiLastActive.length > 0){
        uiLastActive[0].classList.remove("active");
    }

    if(uiItems && uiItems.length > 0){
        uiItems[index].classList.add("active");
    }
};